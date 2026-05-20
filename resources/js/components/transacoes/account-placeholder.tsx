type AccountPlaceholderProps = {
    initials: string;
    color: string;
};

export default function AccountPlaceholder({
    initials,
    color,
}: AccountPlaceholderProps) {
    return (
        <div className="flex items-center gap-3 border-b border-[#f5f5f5] px-[18px] py-3.5 last:border-b-0 dark:border-sidebar-border">
            <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-xs font-bold text-white"
                style={{ backgroundColor: color }}
            >
                {initials}
            </div>
            <div className="min-w-0 flex-1">
                <div className="h-3.5 w-24 rounded bg-[#eef2f0] dark:bg-muted" />
                <div className="mt-2 h-2.5 w-32 rounded bg-[#f3f5f4] dark:bg-muted/70" />
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="h-3.5 w-20 rounded bg-[#eef2f0] dark:bg-muted" />
                <div className="h-2.5 w-24 rounded bg-[#f3f5f4] dark:bg-muted/70" />
            </div>
        </div>
    );
}
