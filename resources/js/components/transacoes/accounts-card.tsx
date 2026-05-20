import { Building2, Plus } from 'lucide-react';
import AccountPlaceholder from './account-placeholder';

const accountPlaceholders = [
    { initials: 'IT', color: '#ff6b00' },
    { initials: 'NU', color: '#820ad1' },
    { initials: 'BB', color: '#007fff' },
    { initials: 'C6', color: '#00a859' },
];

export default function AccountsCard() {
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
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
            {accountPlaceholders.map((account) => (
                <AccountPlaceholder
                    key={account.initials}
                    initials={account.initials}
                    color={account.color}
                />
            ))}
        </section>
    );
}
