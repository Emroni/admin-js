import { DashboardBalance, DashboardEarningsChart, DashboardHoursChart, DashboardInvoices, DashboardTimer } from '@/partials';
import { Box } from '@mui/material';

export default function Dashboard() {

    return <>
        <DashboardTimer />
        <DashboardInvoices />
        <DashboardBalance />
        <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
            <Box flex={1}>
                <DashboardHoursChart />
            </Box>
            <Box flex={1}>
                <DashboardEarningsChart />
            </Box>
        </Box>
    </>;

}
