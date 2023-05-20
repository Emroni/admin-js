import { DashboardBankAccounts, DashboardEarningsChart, DashboardForecastChart, DashboardHoursChart, DashboardInvoices, DashboardTimer } from '@/partials';
import { Box } from '@mui/material';

export default function Dashboard() {

    return <>
        <DashboardTimer />
        <DashboardInvoices />
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
            <Box flex={1}>
                <DashboardBankAccounts />
            </Box>
            <Box flex={3}>
                <DashboardForecastChart />
            </Box>
        </Box>
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
