<?php

namespace App\Services;

use App\Models\Transacao;
use App\Models\User;
use App\Repositories\TransacaoRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TransacaoService
{
    public function __construct(private readonly TransacaoRepository $transacaoRepository) {}

    /**
     * @return Collection<int, Transacao>
     */
    public function list(User $user): Collection
    {
        return $this->transacaoRepository->listByUser((int) $user->id, $user->familiaVinculadaId());
    }

    /**
     * @param  array{conta_id:int,tipo:string,valor:numeric-string|float|int,descricao?:string|null,anexo?:\Illuminate\Http\UploadedFile|null}  $payload
     */
    public function create(User $user, array $payload): Transacao
    {
        $familiaId = $user->familiaVinculadaId();

        return DB::transaction(function () use ($user, $payload, $familiaId) {
            $conta = $this->transacaoRepository->findContaForUser((int) $payload['conta_id'], (int) $user->id, $familiaId);
            if (! $conta) {
                abort(422, 'Conta não encontrada para este usuário ou família.');
            }

            $transacao = $this->transacaoRepository->create([
                'familia_id' => $familiaId,
                'conta_id' => (int) $payload['conta_id'],
                'user_id' => (int) $user->id,
                'tipo' => $payload['tipo'],
                'valor' => $payload['valor'],
                'descricao' => $payload['descricao'] ?? null,
                'anexo_url' => $this->storeAnexo($payload['anexo'] ?? null),
            ]);

            return $transacao->refresh();
        });
    }

    /**
     * @param  array{conta_id?:int,tipo?:string,valor?:numeric-string|float|int,descricao?:string|null,anexo?:\Illuminate\Http\UploadedFile|null}  $payload
     */
    public function update(User $user, int $transacaoId, array $payload): ?Transacao
    {
        $familiaId = $user->familiaVinculadaId();

        return DB::transaction(function () use ($user, $transacaoId, $payload, $familiaId) {
            $transacao = $this->transacaoRepository->findByIdForUser($transacaoId, (int) $user->id, $familiaId);
            if (! $transacao) {
                return null;
            }

            $newContaId = (int) ($payload['conta_id'] ?? $transacao->conta_id);
            if (! $this->transacaoRepository->findContaForUser($newContaId, (int) $user->id, $familiaId)) {
                abort(422, 'Conta não encontrada para este usuário ou família.');
            }

            $data = [
                'conta_id' => $newContaId,
                'tipo' => $payload['tipo'] ?? $transacao->tipo,
                'valor' => $payload['valor'] ?? $transacao->valor,
                'descricao' => array_key_exists('descricao', $payload) ? $payload['descricao'] : $transacao->descricao,
                'anexo_url' => array_key_exists('anexo', $payload) ? $this->storeAnexo($payload['anexo'] ?? null) : $transacao->anexo_url,
            ];

            $transacao = $this->transacaoRepository->update($transacao, $data);

            return $transacao->refresh();
        });
    }

    public function delete(User $user, int $transacaoId): bool
    {
        $familiaId = $user->familiaVinculadaId();

        return DB::transaction(function () use ($user, $transacaoId, $familiaId) {
            $transacao = $this->transacaoRepository->findByIdForUser($transacaoId, (int) $user->id, $familiaId);
            if (! $transacao) {
                return false;
            }

            $this->transacaoRepository->delete($transacao);

            return true;
        });
    }

    private function storeAnexo(mixed $anexo): ?string
    {
        if (! $anexo) {
            return null;
        }

        return Storage::disk('public')->url($anexo->store('transacoes/anexos', 'public'));
    }
}
