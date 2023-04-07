import { Card } from '@/components';
import { getDatesRange } from '@/helpers';
import { gql, useQuery } from '@apollo/client';
import { ChartData } from 'chart.js';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
    plugins: {
        legend: {
            display: false
        },
    },
    responsive: true,
};

export default function TimesChart({ type }: TimesChartProps) {

    const [data, setData] = useState<ChartData<'bar'> | null>(null);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());

    const query = useQuery<TimesBetweenQuery>(gql`query ($from: DateScalar!, $to: DateScalar!) {
        timesBetween (from: $from, to: $to) {
            id
            date
            duration
            earnings
            currency
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
            // Prepare map
            const dates = getDatesRange(from, to);
            const mapEntries = dates.map(date => ([date, {
                value: 0,
                label: dayjs.utc(date).format('ddd DD/MM'),
            }]));
            const map: IndexedObject = Object.fromEntries(mapEntries);

            // Map time hours to dates
            query.data.timesBetween.forEach(time => {
                map[time.date].value += time[type];
            });

            // Get chart data
            const list = Object.values(map);
            const newChartData = {
                datasets: [{
                    data: list.map(item => item.value),
                    backgroundColor: type === 'earnings' ? '#66bb6a' : '#90caf9',
                }],
                labels: list.map(item => item.label),
            };
            setData(newChartData);
        }
    }, [
        from,
        query.data,
        to,
        type,
    ]);

    return <Card loading={query.loading} title={`Times ${type}`}>
        {data && (
            <Bar options={options} data={data} />
        )}
    </Card>;

}
