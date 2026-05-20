import ContentGrid from '@/components/transacoes/content-grid';
import MetricsGrid from '@/components/transacoes/metrics-grid';
import PageHeader from '@/components/transacoes/page-header';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transações',
        href: '/transacoes',
    },
];

export default function TransacoesIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transações" />

            <div className="min-h-full flex-1 overflow-auto bg-[#f7f9f8] px-6 py-6 md:px-8 dark:bg-background">
                <PageHeader />
                <MetricsGrid />
                <ContentGrid />
            </div>
        </AppLayout>
    );
}
