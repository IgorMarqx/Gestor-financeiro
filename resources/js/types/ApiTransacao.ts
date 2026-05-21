import { ApiConta } from './ApiConta';

export type ApiTransacaoTipo = 'credito' | 'debito';

export type ApiTransacao = {
    id: number;
    familia_id: number | null;
    conta_id: number;
    user_id: number;
    tipo: ApiTransacaoTipo;
    valor: string;
    descricao: string | null;
    anexo_url: string | null;
    created_at: string;
    updated_at: string;
    conta?: ApiConta | null;
};
