import Chart from '@/components/Chart/Chart';
import { getHoursDuration } from '@/helpers';
import { gql, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export default function DashboardHoursChart() {

    const [dataMaps, setDataMaps] = useState<ChartDataMaps>(new Map());
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
            // Get data map
            const map: ChartDataMap = new Map();
            query.data.timesBetween.forEach(time => {
                const amount = (map.get(time.date) || 0) + time.hours;
                map.set(time.date, amount);
            });

            // Get data maps
            const newDataMaps = new Map();
            newDataMaps.set('Hours', map);
            setDataMaps(newDataMaps);
        }
    }, [
        query.data,
    ]);

    function handleTooltip(item: ChartItem) {
        return getHoursDuration(item.value);
    }

    return <Chart dataMaps={dataMaps} from={from} title="Hours" to={to} onTooltip={handleTooltip} />;

}
