import { http, isApiError } from '@/lib/http';
import { ApiResponse } from '@/types/ApiResponse';
import { ApiTransacao } from '@/types/ApiTransacao';
import { useCallback, useEffect, useState } from 'react';

export function useGetTransacoes() {
    const [transacoes, setTransacoes] = useState<ApiTransacao[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchTransacoes = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response =
                await http.get<ApiResponse<ApiTransacao[]>>('/transacao');
            setTransacoes(response.data.data);
        } catch (error) {
            const message = isApiError(error)
                ? (error.response?.data?.message ??
                  'Não foi possível carregar as transações.')
                : 'Não foi possível carregar as transações.';

            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchTransacoes();
    }, [fetchTransacoes]);

    return {
        transacoes,
        isLoading,
        errorMessage,
        refetch: fetchTransacoes,
    };
}
