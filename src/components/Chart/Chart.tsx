import { Card } from '@/components';
import { getDatesRange } from '@/helpers';
import { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// TODO: Fix resizing

export default function Chart({ dataMaps, format, from, loading, title, to, unit, onTooltip }: ChartProps) {

    const [data, setData] = useState<ChartData<'bar'> | null>(null);

    useEffect(() => {
        // Parse dates
        const dates = getDatesRange(from, to, unit);
        const datesMap: Map<string, ChartItem> = new Map();
        dates.forEach(date => {
            const label = date.format(format);
            datesMap.set(label, {
                value: 0,
                label,
            });
        });

        // Get datasets
        const datasets: ChartDataset[] = dataMaps.map(dataMap => ({
            backgroundColor: dataMap.color,
            data: dates.map(date => dataMap.data.get(date.format(format)) || 0),
            label: dataMap.label,
        }));

        // Get labels
        const labels = Array.from(datesMap.keys());
        
        // Get data
        const newData = {
            datasets,
            labels,
        };
        setData(newData);
    }, [
        dataMaps,
        format,
        from,
        to,
        unit,
    ]);

    return <Card loading={loading} title={title}>
        {data && (
            <Bar data={data} options={{
                aspectRatio: 3,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: item => onTooltip?.({
                                label: item.dataset.label as string,
                                value: item.raw as number,
                            }),
                        },
                    },
                },
                responsive: true,
            }} />
        )}
    </Card>;

}
