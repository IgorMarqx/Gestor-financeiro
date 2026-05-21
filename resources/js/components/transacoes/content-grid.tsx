import { ApiConta } from '@/types/ApiConta';
import { ApiTransacao } from '@/types/ApiTransacao';
import SidePanel from './side-panel';
import TransactionsTable from './transactions-table';

type ContentGridProps = {
    contas: ApiConta[];
    transacoes: ApiTransacao[];
    isLoading: boolean;
    monthBalance: string;
    totalEntradas: string;
    totalSaidas: string;
    onCreateConta: () => void;
    onEditTransacao: (transacao: ApiTransacao) => void;
    onDeleteTransacao: (transacao: ApiTransacao) => void;
};

export default function ContentGrid({
    contas,
    transacoes,
    isLoading,
    monthBalance,
    totalEntradas,
    totalSaidas,
    onCreateConta,
    onEditTransacao,
    onDeleteTransacao,
}: ContentGridProps) {
    return (
        <div className="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_300px]">
            <TransactionsTable
                transacoes={transacoes}
                isLoading={isLoading}
                onEdit={onEditTransacao}
                onDelete={onDeleteTransacao}
            />
            <SidePanel
                contas={contas}
                monthBalance={monthBalance}
                totalEntradas={totalEntradas}
                totalSaidas={totalSaidas}
                onCreateConta={onCreateConta}
            />
        </div>
    );
}
