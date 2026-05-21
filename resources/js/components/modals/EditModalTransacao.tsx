import ContaSearchSelect from '@/components/contas/conta-search-select';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { InputMask } from '@/components/ui/input-mask';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TransacaoTipo } from '@/hooks/transacoes/useCreateTransacao';
import { useUpdateTransacao } from '@/hooks/transacoes/useUpdateTransacao';
import { parseApiDecimal } from '@/lib/format';
import { ApiTransacao } from '@/types/ApiTransacao';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface EditModalTransacaoProps {
    transacao: ApiTransacao | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdated?: () => void;
}

interface TransacaoFormData {
    conta_id: string;
    tipo: TransacaoTipo;
    valor: string;
    descricao: string;
    anexo: File | null;
}

const emptyFormData: TransacaoFormData = {
    conta_id: '',
    tipo: 'debito',
    valor: '',
    descricao: '',
    anexo: null,
};

export default function EditModalTransacao({
    transacao,
    isOpen,
    onClose,
    onUpdated,
}: EditModalTransacaoProps) {
    const [formData, setFormData] = useState<TransacaoFormData>(emptyFormData);
    const { isSubmitting, errorMessage, resetError, handleUpdateTransacao } =
        useUpdateTransacao();

    useEffect(() => {
        if (isOpen && transacao) {
            setFormData({
                conta_id: String(transacao.conta_id),
                tipo: transacao.tipo,
                valor: String(parseApiDecimal(transacao.valor)),
                descricao: transacao.descricao ?? '',
                anexo: null,
            });
            resetError();
        }
    }, [isOpen, resetError, transacao]);

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!transacao) return;

        const updated = await handleUpdateTransacao(transacao.id, {
            conta_id: Number(formData.conta_id),
            tipo: formData.tipo,
            valor: Number(formData.valor),
            descricao: formData.descricao.trim() || null,
            anexo: formData.anexo,
        });

        if (updated) {
            onUpdated?.();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={handleSubmit} className="grid gap-5">
                    <DialogHeader>
                        <DialogTitle>Editar transação</DialogTitle>
                        <DialogDescription>
                            Atualize os dados do lançamento financeiro.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Conta</Label>
                            <ContaSearchSelect
                                value={formData.conta_id || null}
                                onChange={(value) =>
                                    setFormData((current) => ({
                                        ...current,
                                        conta_id: value ?? '',
                                    }))
                                }
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-transacao-tipo">Tipo</Label>
                            <Select
                                value={formData.tipo}
                                onValueChange={(value: TransacaoTipo) =>
                                    setFormData((current) => ({
                                        ...current,
                                        tipo: value,
                                    }))
                                }
                            >
                                <SelectTrigger
                                    id="edit-transacao-tipo"
                                    className="w-full"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="debito">
                                        Débito
                                    </SelectItem>
                                    <SelectItem value="credito">
                                        Crédito
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-transacao-valor">Valor</Label>
                            <InputMask
                                id="edit-transacao-valor"
                                mask="money"
                                value={formData.valor}
                                onValueChange={({ raw }) =>
                                    setFormData((current) => ({
                                        ...current,
                                        valor: raw,
                                    }))
                                }
                                placeholder="R$ 0,00"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="edit-transacao-anexo">Anexo</Label>
                            <Input
                                id="edit-transacao-anexo"
                                type="file"
                                onChange={(event) =>
                                    setFormData((current) => ({
                                        ...current,
                                        anexo: event.target.files?.[0] ?? null,
                                    }))
                                }
                            />
                        </div>

                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="edit-transacao-descricao">
                                Descrição
                            </Label>
                            <Input
                                id="edit-transacao-descricao"
                                value={formData.descricao}
                                onChange={(event) =>
                                    setFormData((current) => ({
                                        ...current,
                                        descricao: event.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            {errorMessage}
                        </p>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && (
                                <LoaderCircle className="animate-spin" />
                            )}
                            Salvar alterações
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
