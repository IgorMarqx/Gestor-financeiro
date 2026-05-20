import { ArrowUpDown } from 'lucide-react';

export default function PageHeader() {
    return (
        <div className="mb-6">
            <h1 className="flex items-center gap-2 text-xl font-medium text-foreground">
                <ArrowUpDown className="h-[22px] w-[22px] text-[#009966]" />
                Transações
            </h1>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
                Acompanhe todas as suas movimentações financeiras em um só
                lugar.
            </p>
        </div>
    );
}
