import { useNotifications } from '@/components/notifications/notifications';
import { http, isApiError } from '@/lib/http';
import { ApiResponse } from '@/types/ApiResponse';
import { useCallback, useState } from 'react';

export type TransacaoTipo = 'credito' | 'debito';

export interface CreateTransacaoPayload {
    conta_id: number;
    tipo: TransacaoTipo;
    valor: number;
    descricao: string | null;
    anexo: File | null;
}

export function useCreateTransacao() {
    const notifications = useNotifications();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const resetError = useCallback(() => setErrorMessage(null), []);

    const handleCreateTransacao = async (
        payload: CreateTransacaoPayload,
    ): Promise<boolean> => {
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const formData = new FormData();
            formData.append('conta_id', String(payload.conta_id));
            formData.append('tipo', payload.tipo);
            formData.append('valor', String(payload.valor));

            if (payload.descricao) {
                formData.append('descricao', payload.descricao);
            }

            if (payload.anexo) {
                formData.append('anexo', payload.anexo);
            }

            await http.post<ApiResponse<unknown>>('/transacao', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            notifications.success(
                'Transação cadastrada',
                'O lançamento foi registrado com sucesso.',
            );
            return true;
        } catch (error) {
            const message = isApiError(error)
                ? (error.response?.data?.message ??
                  'Não foi possível cadastrar a transação.')
                : 'Não foi possível cadastrar a transação.';

            setErrorMessage(message);
            notifications.error('Erro ao cadastrar transação', message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        errorMessage,
        resetError,
        handleCreateTransacao,
    };
}
