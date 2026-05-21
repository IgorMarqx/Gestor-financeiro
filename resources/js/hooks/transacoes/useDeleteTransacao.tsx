import { useNotifications } from '@/components/notifications/notifications';
import { http, isApiError } from '@/lib/http';
import { ApiResponse } from '@/types/ApiResponse';
import { useState } from 'react';

export function useDeleteTransacao() {
    const notifications = useNotifications();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDeleteTransacao = async (
        transacaoId: number,
    ): Promise<boolean> => {
        setIsSubmitting(true);

        try {
            await http.delete<ApiResponse<null>>(`/transacao/${transacaoId}`);
            notifications.success(
                'Transação removida',
                'O lançamento foi excluído com sucesso.',
            );
            return true;
        } catch (error) {
            const message = isApiError(error)
                ? (error.response?.data?.message ??
                  'Não foi possível excluir a transação.')
                : 'Não foi possível excluir a transação.';

            notifications.error('Erro ao excluir transação', message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { isSubmitting, handleDeleteTransacao };
}
