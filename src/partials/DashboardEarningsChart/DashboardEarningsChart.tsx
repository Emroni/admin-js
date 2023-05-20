import Chart from '@/components/Chart/Chart';
import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const colors = [
    '#66bb6a',
    '#29b6f6',
    '#ce93d8',
];

export default function DashboardEarningsChart() {

    const [dataMaps, setDataMaps] = useState<ChartDataMap[]>([]);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());

    const query = useQuery<TimesBetweenQuery>(gql`query ($from: DateScalar!, $to: DateScalar!) {
        timesBetween (from: $from, to: $to) {
            id
            date
            earnings {
                amount
                currency
            }
        }
    }`, {
        variables: {
            from,
            to,
        },
    });

    useEffect(() => {
        const date = dayjs.utc();

        // Get from
        const newFrom = date.subtract(1, 'month').toDate();
        setFrom(newFrom);

        // Get to
        const newTo = date.toDate();
        setTo(newTo);
    }, []);

    useEffect(() => {
        if (query.data) {
            // Prepare data mappings
            const dataMapping: Map<string, ChartDataMap> = new Map();
            query.data.timesBetween.forEach(time => {
                time.earnings.forEach(earning => {
                    // Get formatted date
                    const date = dayjs.utc(time.date).format('ddd DD/MM');

                    // Add data map
                    let dataMap = dataMapping.get(earning.currency);
                    if (!dataMap) {
                        dataMap = {
                            color: colors[dataMapping.size % colors.length],
                            data: new Map(),
                            label: earning.currency,
                        };
                        dataMapping.set(earning.currency, dataMap);
                    }

                    // Add amount
                    const amount = (dataMap.data.get(date) || 0) + earning.amount;
                    dataMap.data.set(date, amount);
                });
            });

            // Get data maps
            const newDataMaps: ChartDataMap[] = Array.from(dataMapping.values());
            setDataMaps(newDataMaps);
        }
    }, [
        query.data,
    ]);

    function handleTooltip(item: any) {
        return `${item.label}: ${item.value.toLocaleString('en-US')}`;
    }

    return <Chart dataMaps={dataMaps} format="ddd DD/MM" from={from} title="Earnings" to={to} unit="days" onTooltip={handleTooltip} />;

}
