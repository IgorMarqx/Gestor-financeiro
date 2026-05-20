import { List } from 'lucide-react';
import EmptySwatch from './empty-swatch';
import FilterTabs from './filter-tabs';

const swatches = [
    'bg-[#e6f4ef]',
    'bg-[#fff0e6]',
    'bg-[#f0eeff]',
    'bg-[#e6f4ef]',
    'bg-[#fce8e8]',
    'bg-[#fff8e6]',
    'bg-[#fce8f3]',
    'bg-[#e6f4ef]',
];

export default function TransactionsTable() {
    return (
        <section className="overflow-hidden rounded-xl border border-[#e4e4e4] bg-white dark:border-sidebar-border dark:bg-sidebar">
            <div className="flex flex-col gap-3 border-b border-[#f0f0f0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-sidebar-border">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <List className="h-[17px] w-[17px] text-[#009966]" />
                    Lançamentos
                </div>
                <FilterTabs />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#f0f0f0] dark:border-sidebar-border">
                            <th className="w-16 px-5 py-2.5" />
                            <th className="px-5 py-2.5 text-left text-[11px] font-normal tracking-[0.05em] text-[#aaa] uppercase">
                                Descrição
                            </th>
                            <th className="px-5 py-2.5 text-left text-[11px] font-normal tracking-[0.05em] text-[#aaa] uppercase">
                                Data
                            </th>
                            <th className="px-5 py-2.5 text-left text-[11px] font-normal tracking-[0.05em] text-[#aaa] uppercase">
                                Tipo
                            </th>
                            <th className="px-5 py-2.5 text-right text-[11px] font-normal tracking-[0.05em] text-[#aaa] uppercase">
                                Valor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {swatches.map((swatch, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#f8f8f8] transition hover:bg-[#fafafa] dark:border-sidebar-border"
                            >
                                <td className="px-5 py-3">
                                    <EmptySwatch className={swatch} />
                                </td>
                                <td className="px-5 py-3">
                                    <div className="h-3.5 w-36 rounded bg-[#eef2f0] dark:bg-muted" />
                                    <div className="mt-2 h-2.5 w-20 rounded bg-[#f3f5f4] dark:bg-muted/70" />
                                </td>
                                <td className="px-5 py-3">
                                    <div className="h-3 w-20 rounded bg-[#f3f5f4] dark:bg-muted/70" />
                                </td>
                                <td className="px-5 py-3">
                                    <div className="h-5 w-14 rounded-full bg-[#eef2f0] dark:bg-muted" />
                                </td>
                                <td className="px-5 py-3">
                                    <div className="ml-auto h-3.5 w-24 rounded bg-[#eef2f0] dark:bg-muted" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
