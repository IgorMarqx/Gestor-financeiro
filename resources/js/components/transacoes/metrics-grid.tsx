import { Calendar, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import MetricBadge from './metric-badge';
import MetricCard from './metric-card';

type MetricsGridProps = {
    saldoAtual: string;
    totalEntradas: string;
    totalSaidas: string;
    transacoesCount: number;
};

export default function MetricsGrid({
    saldoAtual,
    totalEntradas,
    totalSaidas,
    transacoesCount,
}: MetricsGridProps) {
    return (
        <div className="mb-6 grid gap-3.5 lg:grid-cols-4">
            <MetricCard
                icon={<Wallet className="h-3.5 w-3.5 text-[#009966]" />}
                label="Saldo atual"
                value={saldoAtual}
                detail={
                    <MetricBadge>{`${transacoesCount} lançamentos`}</MetricBadge>
                }
            />
            <MetricCard
                icon={<TrendingUp className="h-3.5 w-3.5 text-[#009966]" />}
                label="Total entradas"
                value={totalEntradas}
                tone="income"
                detail={<MetricBadge>Créditos registrados</MetricBadge>}
            />
            <MetricCard
                icon={<TrendingDown className="h-3.5 w-3.5 text-[#cc4444]" />}
                label="Total saídas"
                value={totalSaidas}
                tone="expense"
                detail={
                    <MetricBadge tone="expense">
                        Débitos registrados
                    </MetricBadge>
                }
            />
            <MetricCard
                icon={<Calendar className="h-3.5 w-3.5 text-[#888]" />}
                label="Período"
                value="Mês atual"
                detail={
                    <span className="text-[11.5px] text-[#aaa]">
                        Selecione um intervalo
                    </span>
                }
            />
        </div>
    );
}
