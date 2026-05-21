import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteTransacao } from '@/hooks/transacoes/useDeleteTransacao';
import { ApiTransacao } from '@/types/ApiTransacao';

interface DeleteTransacaoDialogProps {
    transacao: ApiTransacao | null;
    isOpen: boolean;
    onClose: () => void;
    onDeleted?: () => void;
}

export default function DeleteTransacaoDialog({
    transacao,
    isOpen,
    onClose,
    onDeleted,
}: DeleteTransacaoDialogProps) {
    const { isSubmitting, handleDeleteTransacao } = useDeleteTransacao();

    const handleConfirm = async () => {
        if (!transacao) return;

        const deleted = await handleDeleteTransacao(transacao.id);
        if (deleted) {
            onDeleted?.();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir transação</DialogTitle>
                    <DialogDescription>
                        Esta ação remove o lançamento e recalcula os saldos da
                        conta.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={isSubmitting}
                    >
                        Confirmar exclusão
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
