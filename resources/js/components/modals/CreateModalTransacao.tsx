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
import {
    TransacaoTipo,
    useCreateTransacao,
} from '@/hooks/transacoes/useCreateTransacao';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface CreateModalTransacaoProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

interface TransacaoFormData {
    conta_id: string;
    tipo: TransacaoTipo;
    valor: string;
    descricao: string;
    anexo: File | null;
}

const initialFormData: TransacaoFormData = {
    conta_id: '',
    tipo: 'debito',
    valor: '',
    descricao: '',
    anexo: null,
};

export default function CreateModalTransacao({
    isOpen,
    onClose,
    onCreated,
}: CreateModalTransacaoProps) {
    const [formData, setFormData] =
        useState<TransacaoFormData>(initialFormData);
    const { isSubmitting, errorMessage, resetError, handleCreateTransacao } =
        useCreateTransacao();

    useEffect(() => {
        if (!isOpen) {
            setFormData(initialFormData);
            resetError();
        }
    }, [isOpen, resetError]);

    const handleClose = () => {
        if (!isSubmitting) {
            onClose();
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            conta_id: Number(formData.conta_id),
            tipo: formData.tipo,
            valor: Number(formData.valor),
            descricao: formData.descricao.trim() || null,
            anexo: formData.anexo,
        };

        const created = await handleCreateTransacao(payload);
        if (created) {
            onCreated?.();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-xl">
                <form onSubmit={handleSubmit} className="grid gap-5">
                    <DialogHeader>
                        <DialogTitle>Nova transação</DialogTitle>
                        <DialogDescription>
                            Informe os dados do lançamento financeiro.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="transacao-conta">Conta</Label>
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
                            <Label htmlFor="transacao-tipo">Tipo</Label>
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
                                    id="transacao-tipo"
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
                            <Label htmlFor="transacao-valor">Valor</Label>
                            <InputMask
                                id="transacao-valor"
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
                            <Label htmlFor="transacao-anexo">Anexo</Label>
                            <Input
                                id="transacao-anexo"
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
                            <Label htmlFor="transacao-descricao">
                                Descrição
                            </Label>
                            <Input
                                id="transacao-descricao"
                                placeholder="Ex: Mercado, salário, aluguel"
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
                            Salvar transação
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
