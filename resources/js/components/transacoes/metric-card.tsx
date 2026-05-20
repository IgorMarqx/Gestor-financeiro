import { type ReactNode } from 'react';

type MetricTone = 'neutral' | 'income' | 'expense';

type MetricCardProps = {
    icon: ReactNode;
    label: string;
    value: string;
    tone?: MetricTone;
    detail: ReactNode;
};

export default function MetricCard({
    icon,
    label,
    value,
    tone = 'neutral',
    detail,
}: MetricCardProps) {
    const valueClass =
        tone === 'income'
            ? 'text-[#009966]'
            : tone === 'expense'
              ? 'text-[#cc4444]'
              : 'text-foreground';

    return (
        <div className="flex min-h-28 flex-col gap-2 rounded-xl border border-[#e4e4e4] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.02)] dark:border-sidebar-border dark:bg-sidebar">
            <div className="flex items-center gap-2 text-xs text-[#999]">
                {icon}
                <span>{label}</span>
            </div>
            <div
                className={`text-[22px] leading-tight font-medium ${valueClass}`}
            >
                {value}
            </div>
            {detail}
        </div>
    );
}
