export default function MonthBalanceCard() {
    return (
        <section className="rounded-xl bg-gradient-to-br from-[#009966] to-[#007a52] px-5 py-[18px] text-white">
            <div className="text-xs opacity-75">Balanço do mês</div>
            <div className="my-1 text-[26px] font-medium">--</div>
            <div className="mb-2 h-1.5 overflow-hidden rounded bg-white/25">
                <div className="h-full w-2/3 rounded bg-white" />
            </div>
            <div className="flex justify-between text-xs opacity-80">
                <span>Entradas --</span>
                <span>Saídas --</span>
            </div>
        </section>
    );
}
