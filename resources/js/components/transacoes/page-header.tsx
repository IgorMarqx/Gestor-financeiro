import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

interface PageHeaderProps {
    onCreateConta: () => void;
    onCreateTransacao: () => void;
}

export default function PageHeader({
    onCreateConta,
    onCreateTransacao,
}: PageHeaderProps) {
    return (
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
                <h1 className="flex items-center gap-2 text-xl font-medium text-foreground">
                    <ArrowUpDown className="h-[22px] w-[22px] text-[#009966]" />
                    Transações
                </h1>
                <p className="mt-1 text-[13.5px] text-muted-foreground">
                    Acompanhe todas as suas movimentações financeiras em um só
                    lugar.
                </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
                <Button type="button" variant="outline" onClick={onCreateConta}>
                    Criar conta
                </Button>
                <Button
                    type="button"
                    className="bg-[#00A56D] text-white shadow-sm hover:bg-[#00A56D]/90"
                    onClick={onCreateTransacao}
                >
                    Criar transação
                </Button>
            </div>
        </div>
    );
}
