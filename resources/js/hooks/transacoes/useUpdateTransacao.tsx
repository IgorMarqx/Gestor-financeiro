import { useNotifications } from '@/components/notifications/notifications';
import { http, isApiError } from '@/lib/http';
import { ApiResponse } from '@/types/ApiResponse';
import { useCallback, useState } from 'react';
import { TransacaoTipo } from './useCreateTransacao';

export interface UpdateTransacaoPayload {
    conta_id: number;
    tipo: TransacaoTipo;
    valor: number;
    descricao: string | null;
    anexo: File | null;
}

export function useUpdateTransacao() {
    const notifications = useNotifications();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const resetError = useCallback(() => setErrorMessage(null), []);

    const handleUpdateTransacao = async (
        transacaoId: number,
        payload: UpdateTransacaoPayload,
    ): Promise<boolean> => {
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('conta_id', String(payload.conta_id));
            formData.append('tipo', payload.tipo);
            formData.append('valor', String(payload.valor));

            if (payload.descricao) {
                formData.append('descricao', payload.descricao);
            }

            if (payload.anexo) {
                formData.append('anexo', payload.anexo);
            }

            await http.post<ApiResponse<unknown>>(
                `/transacao/${transacaoId}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            notifications.success(
                'Transação atualizada',
                'O lançamento foi atualizado com sucesso.',
            );
            return true;
        } catch (error) {
            const message = isApiError(error)
                ? (error.response?.data?.message ??
                  'Não foi possível atualizar a transação.')
                : 'Não foi possível atualizar a transação.';

            setErrorMessage(message);
            notifications.error('Erro ao atualizar transação', message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        errorMessage,
        resetError,
        handleUpdateTransacao,
    };
}
