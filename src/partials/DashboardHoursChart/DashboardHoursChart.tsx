import Chart from '@/components/Chart/Chart';
import { getHoursDuration } from '@/helpers';
import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function DashboardHoursChart() {

    const [dataMaps, setDataMaps] = useState<ChartDataMap[]>([]);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());

    const query = useQuery<TimesBetweenQuery>(gql`query ($from: DateScalar!, $to: DateScalar!) {
        timesBetween (from: $from, to: $to) {
            id
            date
            duration
            hours
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
            // Create data map
            const dataMap: ChartDataMap = {
                color: '#29b6f6',
                data: new Map(),
                label: 'Hours',
            };

            // Parse times
            query.data.timesBetween.forEach(time => {
                // Get formatted date
                const date = dayjs.utc(time.date).format('ddd DD/MM');

                // Add amount
                const amount = (dataMap.data.get(date) || 0) + time.hours;
                dataMap.data.set(date, amount);
            });

            // Get data maps
            const newDataMaps = [
                dataMap,
            ]
            setDataMaps(newDataMaps);
        }
    }, [
        query.data,
    ]);

    function handleTooltip(item: ChartItem) {
        return getHoursDuration(item.value);
    }

    return <Chart dataMaps={dataMaps} format="ddd DD/MM" from={from} title="Hours" to={to} unit="days" onTooltip={handleTooltip} />;

}
