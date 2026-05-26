import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from "@/types";
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Investimentos',
        href: '/investimentos',
    },
];

export default function Investimentos() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Investimentos" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Investimentos</h1>
                <p>Em breve...</p>
            </div>
        </AppLayout>
    )
}