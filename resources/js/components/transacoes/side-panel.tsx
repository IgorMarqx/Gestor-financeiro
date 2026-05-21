import { ApiConta } from '@/types/ApiConta';
import AccountsCard from './accounts-card';
import MonthBalanceCard from './month-balance-card';

type SidePanelProps = {
    contas: ApiConta[];
    monthBalance: string;
    totalEntradas: string;
    totalSaidas: string;
    onCreateConta: () => void;
};

export default function SidePanel({
    contas,
    monthBalance,
    totalEntradas,
    totalSaidas,
    onCreateConta,
}: SidePanelProps) {
    return (
        <aside className="flex flex-col gap-3.5">
            <MonthBalanceCard
                monthBalance={monthBalance}
                totalEntradas={totalEntradas}
                totalSaidas={totalSaidas}
            />
            <AccountsCard contas={contas} onCreateConta={onCreateConta} />
        </aside>
    );
}
