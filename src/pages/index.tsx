import { DashboardInvoices, DashboardTimer, TimesChart } from '@/partials';

export default function Dashboard() {

    return <>
        <DashboardTimer />
        <DashboardInvoices />
        <TimesChart type="hours" />
        <TimesChart type="earnings" />
    </>;

}
