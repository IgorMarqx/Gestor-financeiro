import { ArrowDown, ArrowUp } from 'lucide-react';

type MetricBadgeProps = {
    children: string;
    tone?: 'income' | 'expense';
};

export default function MetricBadge({
    children,
    tone = 'income',
}: MetricBadgeProps) {
    const isExpense = tone === 'expense';
    const Icon = isExpense ? ArrowDown : ArrowUp;

    return (
        <span
            className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                isExpense
                    ? 'bg-[#fce8e8] text-[#b33a3a]'
                    : 'bg-[#e6f4ef] text-[#007a52]'
            }`}
        >
            <Icon className="h-2.5 w-2.5" />
            {children}
        </span>
    );
}
