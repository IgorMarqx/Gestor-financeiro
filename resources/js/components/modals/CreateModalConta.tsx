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
import { Label } from '@/components/ui/label';
import { useCreateConta } from '@/hooks/contas/useCreateConta';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface CreateModalContaProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

const initialFormData = {
    nome: '',
    saldo_atual: '',
};

export default function CreateModalConta({
    isOpen,
    onClose,
    onCreated,
}: CreateModalContaProps) {
    const [formData, setFormData] = useState(initialFormData);
    const { isSubmitting, errorMessage, resetError, handleCreateConta } =
        useCreateConta();

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

        const conta = await handleCreateConta({
            nome: formData.nome.trim(),
            saldo_atual: Number(formData.saldo_atual || 0),
        });

        if (conta) {
            onCreated?.();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit} className="grid gap-5">
                    <DialogHeader>
                        <DialogTitle>Nova conta</DialogTitle>
                        <DialogDescription>
                            Cadastre uma conta para registrar seus lançamentos.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="conta-nome">Nome</Label>
                            <Input
                                id="conta-nome"
                                placeholder="Ex: Nubank, Itaú, Carteira"
                                value={formData.nome}
                                onChange={(event) =>
                                    setFormData((current) => ({
                                        ...current,
                                        nome: event.target.value,
                                    }))
                                }
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="conta-saldo">Saldo inicial</Label>
                            <Input
                                id="conta-saldo"
                                type="number"
                                min="0"
                                step="0.01"
                                inputMode="decimal"
                                placeholder="0,00"
                                value={formData.saldo_atual}
                                onChange={(event) =>
                                    setFormData((current) => ({
                                        ...current,
                                        saldo_atual: event.target.value,
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
                            Salvar conta
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
