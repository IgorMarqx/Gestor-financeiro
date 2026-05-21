import CreateModalConta from '@/components/modals/CreateModalConta';
import CreateModalTransacao from '@/components/modals/CreateModalTransacao';
import DeleteTransacaoDialog from '@/components/modals/DeleteTransacaoDialog';
import EditModalTransacao from '@/components/modals/EditModalTransacao';
import ContentGrid from '@/components/transacoes/content-grid';
import MetricsGrid from '@/components/transacoes/metrics-grid';
import PageHeader from '@/components/transacoes/page-header';
import { useGetContas } from '@/hooks/contas/useGetContas';
import { useGetTransacoes } from '@/hooks/transacoes/useGetTransacoes';
import AppLayout from '@/layouts/app-layout';
import { formatCurrencyBRL, parseApiDecimal } from '@/lib/format';
import { type BreadcrumbItem } from '@/types';
import { ApiTransacao } from '@/types/ApiTransacao';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transações',
        href: '/transacoes',
    },
];

export default function TransacoesIndex() {
    const [isCreateContaModalOpen, setIsCreateContaModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingTransacao, setEditingTransacao] =
        useState<ApiTransacao | null>(null);
    const [deletingTransacao, setDeletingTransacao] =
        useState<ApiTransacao | null>(null);
    const {
        contas,
        isLoading: isLoadingContas,
        refetch: refetchContas,
    } = useGetContas();
    const {
        transacoes,
        isLoading: isLoadingTransacoes,
        refetch: refetchTransacoes,
    } = useGetTransacoes();

    const totals = useMemo(() => {
        const now = new Date();
        const currentMonthTransacoes = transacoes.filter((transacao) => {
            const date = new Date(transacao.created_at);

            return (
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        });
        const totalEntradas = currentMonthTransacoes
            .filter((transacao) => transacao.tipo === 'credito')
            .reduce(
                (total, transacao) => total + parseApiDecimal(transacao.valor),
                0,
            );
        const totalSaidas = currentMonthTransacoes
            .filter((transacao) => transacao.tipo === 'debito')
            .reduce(
                (total, transacao) => total + parseApiDecimal(transacao.valor),
                0,
            );
        const saldoAtual = contas.reduce(
            (total, conta) => total + parseApiDecimal(conta.saldo_atual),
            0,
        );

        return {
            saldoAtual,
            totalEntradas,
            totalSaidas,
            monthBalance: totalEntradas - totalSaidas,
        };
    }, [contas, transacoes]);

    const refreshFinanceData = () => {
        void refetchContas();
        void refetchTransacoes();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transações" />

            <div className="min-h-full flex-1 overflow-auto bg-[#f7f9f8] px-6 py-6 md:px-8 dark:bg-background">
                <PageHeader
                    onCreateConta={() => setIsCreateContaModalOpen(true)}
                    onCreateTransacao={() => setIsCreateModalOpen(true)}
                />
                <MetricsGrid
                    saldoAtual={formatCurrencyBRL(totals.saldoAtual)}
                    totalEntradas={formatCurrencyBRL(totals.totalEntradas)}
                    totalSaidas={formatCurrencyBRL(totals.totalSaidas)}
                    transacoesCount={transacoes.length}
                />
                <ContentGrid
                    contas={contas}
                    transacoes={transacoes}
                    isLoading={isLoadingTransacoes || isLoadingContas}
                    monthBalance={formatCurrencyBRL(totals.monthBalance)}
                    totalEntradas={formatCurrencyBRL(totals.totalEntradas)}
                    totalSaidas={formatCurrencyBRL(totals.totalSaidas)}
                    onCreateConta={() => setIsCreateContaModalOpen(true)}
                    onEditTransacao={setEditingTransacao}
                    onDeleteTransacao={setDeletingTransacao}
                />
            </div>

            <CreateModalConta
                isOpen={isCreateContaModalOpen}
                onClose={() => setIsCreateContaModalOpen(false)}
                onCreated={refreshFinanceData}
            />

            <CreateModalTransacao
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreated={refreshFinanceData}
            />

            <EditModalTransacao
                transacao={editingTransacao}
                isOpen={editingTransacao !== null}
                onClose={() => setEditingTransacao(null)}
                onUpdated={refreshFinanceData}
            />

            <DeleteTransacaoDialog
                transacao={deletingTransacao}
                isOpen={deletingTransacao !== null}
                onClose={() => setDeletingTransacao(null)}
                onDeleted={refreshFinanceData}
            />
        </AppLayout>
    );
}
