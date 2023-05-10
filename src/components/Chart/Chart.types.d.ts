type ChartDataMap = Map<string, number>;
type ChartDataMaps = Map<string, ChartDataMap>;

interface ChartProps {
    dataMaps: ChartDataMaps;
    from: Date;
    loading?: boolean;
    title: string;
    to: Date;
    onTooltip?(item: ChartTooltipItem): string;
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