import AccountsCard from './accounts-card';
import MonthBalanceCard from './month-balance-card';

export default function SidePanel() {
    return (
        <aside className="flex flex-col gap-3.5">
            <MonthBalanceCard />
            <AccountsCard />
        </aside>
    );
}
