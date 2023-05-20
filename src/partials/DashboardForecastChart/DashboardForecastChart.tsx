import Chart from '@/components/Chart/Chart';
import { getDatesRange, parseDateInterval } from '@/helpers';
import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function DashboardForecastChart() {

    const [dataMaps, setDataMaps] = useState<ChartDataMap[]>([]);
    const [from] = useState(new Date());
    const [to] = useState(dayjs.utc().add(6, 'month').toDate());

    const query = useQuery<BankAccountsQuery>(gql`query {
        bankAccounts {
            rows {
                amount
                color
                currency
                id
                name
                fromExpenses {
                    active
                    amount
                    currency
                    id
                    name
                    nextDate
                    repeats
                }
                toExpenses {
                    active
                    amount
                    currency
                    id
                    name
                    nextDate
                    repeats
                }
            }
        }
    }`);

    useEffect(() => {
        if (query.data) {
            // Get data maps
            const newDataMaps = query.data.bankAccounts.rows.map(bankAccount => {
                // Create data map
                const dataMap: ChartDataMap = {
                    color: bankAccount.color,
                    data: new Map(),
                    label: bankAccount.name,
                };
                
                // Create timeline
                const timeline = getDatesRange(from, to, 'months').map(date => ({
                    amount: 0,
                    expenses: 0,
                    name: date.format('MMMM'),
                }));

                // Parse expenses
                const end = dayjs.utc().add(timeline.length, 'month');
                const toExpenses = bankAccount.toExpenses.map(expense => ({
                    ...expense,
                    amount: -expense.amount,
                }))
                bankAccount.fromExpenses.concat(toExpenses).forEach(expense => {
                    // Check active
                    if (!expense.active) {
                        return;
                    }
                    
                    // Parse repeats
                    const repeats = parseDateInterval(expense.repeats);
                    
                    // Add to timeline
                    let date = dayjs.utc(expense.nextDate);
                    while (date.isBefore(end)) {
                        const monthName = date.format('MMMM');
                        const month = timeline.find(m => m.name === monthName);
                        if (month) {
                            month.expenses += expense.amount;
                        }
                        date = date.add(repeats.amount, repeats.unit);
                    }
                });

                // Parse timeline amounts
                timeline.forEach((month, index) => {
                    const prevMonth = timeline[index - 1];
                    month.amount += prevMonth ? prevMonth.amount : bankAccount.amount;
                    month.amount -= month.expenses;
                    dataMap.data.set(month.name, month.amount);
                });

                return dataMap;
            });
            setDataMaps(newDataMaps);
        }
    }, [
        from,
        query.data,
        to,
    ]);

    function handleTooltip(item: any) {
        return `${item.label}: ${item.value.toLocaleString('en-US')}`;
    }

    return <Chart dataMaps={dataMaps} format="MMMM" from={from} title="Forecast" to={to} unit="months" onTooltip={handleTooltip} />;

}
