interface ChartProps {
    dataMaps: ChartDataMap[];
    format: string;
    from: Date;
    loading?: boolean;
    title: string;
    to: Date;
    unit: 'days' | 'months' | 'weeks' | 'years';
    onTooltip?(item: ChartTooltipItem): string;
}

interface ChartDataMap {
    color: string;
    data: Map<string, value>;
    label: string;
}

interface ChartDataset {
    backgroundColor: string;
    data: number[];
    label: string;
}

interface ChartItem {
    label: string;
    value: number;
}

interface ChartTooltipItem {
    label: string;
    value: number;
}