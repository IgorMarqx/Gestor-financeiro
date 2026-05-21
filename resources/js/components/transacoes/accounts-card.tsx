import { formatCurrencyBRL, parseApiDecimal } from '@/lib/format';
import { ApiConta } from '@/types/ApiConta';
import { Building2, Plus } from 'lucide-react';

type AccountsCardProps = {
    contas: ApiConta[];
    onCreateConta: () => void;
};

const colors = ['#ff6b00', '#820ad1', '#007fff', '#00a859', '#009966'];

function initialsFromName(name: string): string {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}

export default function AccountsCard({
    contas,
    onCreateConta,
}: AccountsCardProps) {
    return (
        <section className="overflow-hidden rounded-xl border border-[#e4e4e4] bg-white dark:border-sidebar-border dark:bg-sidebar">
            <div className="flex items-center justify-between border-b border-[#f0f0f0] px-[18px] py-3.5 dark:border-sidebar-border">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 className="h-[17px] w-[17px] text-[#009966]" />
                    Contas
                </div>
                <button
                    type="button"
                    className="text-[#009966]"
                    aria-label="Adicionar conta"
                    onClick={onCreateConta}
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
            {contas.map((conta, index) => (
                <div
                    key={conta.id}
                    className="flex items-center gap-3 border-b border-[#f5f5f5] px-[18px] py-3.5 last:border-b-0 dark:border-sidebar-border"
                >
                    <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-xs font-bold text-white"
                        style={{
                            backgroundColor: colors[index % colors.length],
                        }}
                    >
                        {initialsFromName(conta.nome)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-foreground">
                            {conta.nome}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                            Conta financeira
                        </div>
                    </div>
                    <div className="text-right text-sm font-medium text-foreground">
                        {formatCurrencyBRL(parseApiDecimal(conta.saldo_atual))}
                    </div>
                </div>
            ))}
            {contas.length === 0 && (
                <div className="px-[18px] py-6 text-sm text-muted-foreground">
                    Nenhuma conta cadastrada.
                </div>
            )}
        </section>
    );
}
