import Chart from '@/components/Chart/Chart';
import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function DashboardEarningsChart() {

    const [dataMaps, setDataMaps] = useState<ChartDataMaps>(new Map());
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
            // Get data maps
            const newDataMaps: ChartDataMaps = new Map();
            query.data.timesBetween.forEach(time => {
                time.earnings.forEach(earning => {
                    // Add data map
                    let map = newDataMaps.get(earning.currency);
                    if (!map) {
                        map = new Map();
                        newDataMaps.set(earning.currency, map);
                    }

                    // Add amount
                    const amount = (map.get(time.date) || 0) + earning.amount;
                    map.set(time.date, amount);
                });
            });
            setDataMaps(newDataMaps);
        }
    }, [
        query.data,
    ]);

    function handleTooltip(item: any) {
        return `${item.label}: ${item.value.toFixed(2)}`;
    }

    return <Chart dataMaps={dataMaps} from={from} title="Earnings" to={to} onTooltip={handleTooltip} />;

}
