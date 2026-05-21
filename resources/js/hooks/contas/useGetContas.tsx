import { http, isApiError } from '@/lib/http';
import { ApiConta } from '@/types/ApiConta';
import { ApiResponse } from '@/types/ApiResponse';
import { useCallback, useEffect, useState } from 'react';

export function useGetContas() {
    const [contas, setContas] = useState<ApiConta[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchContas = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await http.get<ApiResponse<ApiConta[]>>('/conta');
            setContas(response.data.data);
        } catch (error) {
            const message = isApiError(error)
                ? (error.response?.data?.message ??
                  'Não foi possível carregar as contas.')
                : 'Não foi possível carregar as contas.';

            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchContas();
    }, [fetchContas]);

    return {
        contas,
        isLoading,
        errorMessage,
        refetch: fetchContas,
    };
}
