import SidePanel from './side-panel';
import TransactionsTable from './transactions-table';

export default function ContentGrid() {
    return (
        <div className="grid gap-[18px] xl:grid-cols-[minmax(0,1fr)_300px]">
            <TransactionsTable />
            <SidePanel />
        </div>
    );
}
