const filterTabs = ['Todos', 'Entradas', 'Saídas'];

export default function FilterTabs() {
    return (
        <div className="flex gap-1">
            {filterTabs.map((tab, index) => (
                <button
                    key={tab}
                    type="button"
                    className={
                        index === 0
                            ? 'rounded-full border border-[#009966] bg-[#009966] px-3 py-1.5 text-xs font-medium text-white'
                            : 'rounded-full border border-[#e0e0e0] bg-transparent px-3 py-1.5 text-xs text-[#888] transition hover:bg-[#f5f5f5] dark:border-sidebar-border'
                    }
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
