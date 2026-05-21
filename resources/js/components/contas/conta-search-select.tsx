import {
    AsyncSearchSelect,
    AsyncSearchSelectOption,
} from '@/components/inputs/async-search-select';
import { http } from '@/lib/http';
import { ApiConta } from '@/types/ApiConta';
import { ApiResponse } from '@/types/ApiResponse';
import { useCallback } from 'react';

interface ContaSearchSelectProps {
    value: string | null;
    onChange: (value: string | null) => void;
    disabled?: boolean;
}

export default function ContaSearchSelect({
    value,
    onChange,
    disabled = false,
}: ContaSearchSelectProps) {
    const loadOptions = useCallback(
        async (query: string): Promise<AsyncSearchSelectOption[]> => {
            const response = await http.get<ApiResponse<ApiConta[]>>('/conta', {
                params: { q: query },
            });

            return response.data.data.map((conta) => ({
                value: String(conta.id),
                label: `${conta.nome} - Saldo R$ ${conta.saldo_atual}`,
            }));
        },
        [],
    );

    return (
        <AsyncSearchSelect
            label="Selecionar conta"
            placeholder="Pesquise uma conta"
            value={value}
            onChange={onChange}
            loadOptions={loadOptions}
            emptyMessage="Nenhuma conta encontrada."
            disabled={disabled}
        />
    );
}
