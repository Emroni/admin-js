import { DashboardInvoices, DashboardTimer, TimesChart } from '@/partials';
import { Box } from '@mui/material';

export default function Dashboard() {

    return <>
        <DashboardTimer />
        <DashboardInvoices />
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
            <Box flex={1}>
                <TimesChart type="hours" />
            </Box>
            <Box flex={1}>
                <TimesChart type="earnings" />
            </Box>
        </Box>
    </>;

}
