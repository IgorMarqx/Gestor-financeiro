import { useNotifications } from '@/components/notifications/notifications';
import { http, isApiError } from '@/lib/http';
import { ApiConta } from '@/types/ApiConta';
import { ApiResponse } from '@/types/ApiResponse';
import { useCallback, useState } from 'react';

export interface CreateContaPayload {
    nome: string;
    saldo_atual: number;
}

export function useCreateConta() {
    const notifications = useNotifications();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const resetError = useCallback(() => setErrorMessage(null), []);

    const handleCreateConta = async (
        payload: CreateContaPayload,
    ): Promise<ApiConta | null> => {
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await http.post<ApiResponse<ApiConta>>(
                '/conta',
                payload,
            );
            notifications.success(
                'Conta criada',
                'A conta foi cadastrada com sucesso.',
            );
            return response.data.data;
        } catch (error) {
            const message = isApiError(error)
                ? (error.response?.data?.message ??
                  'Não foi possível criar a conta.')
                : 'Não foi possível criar a conta.';

            setErrorMessage(message);
            notifications.error('Erro ao criar conta', message);
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        errorMessage,
        resetError,
        handleCreateConta,
    };
}
