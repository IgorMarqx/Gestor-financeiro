<?php

namespace App\Repositories;

use App\Models\Conta;
use App\Models\Transacao;
use Illuminate\Support\Collection;

class TransacaoRepository
{
    /**
     * @return Collection<int, Transacao>
     */
    public function listByUser(int $userId, ?int $familiaId = null): Collection
    {
        $builder = Transacao::query()->with('conta');
        $builder = $this->applyUserOrFamiliaScope($builder, $userId, $familiaId);

        return $builder
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * @param  array{familia_id:int|null,conta_id:int,user_id:int,tipo:string,valor:numeric-string|float|int,descricao?:string|null,anexo_url?:string|null}  $data
     */
    public function create(array $data): Transacao
    {
        return Transacao::query()->create($data);
    }

    public function findByIdForUser(int $transacaoId, int $userId, ?int $familiaId = null): ?Transacao
    {
        $builder = Transacao::query()->whereKey($transacaoId);
        $builder = $this->applyUserOrFamiliaScope($builder, $userId, $familiaId);

        return $builder->lockForUpdate()->first();
    }

    /**
     * @param  array{conta_id:int,tipo:string,valor:numeric-string|float|int,descricao?:string|null,anexo_url?:string|null}  $data
     */
    public function update(Transacao $transacao, array $data): Transacao
    {
        $transacao->fill($data);
        $transacao->save();

        return $transacao;
    }

    public function findContaForUser(int $contaId, int $userId, ?int $familiaId = null): ?Conta
    {
        $builder = Conta::query()->whereKey($contaId);

        if ($familiaId !== null) {
            $builder->where('familia_id', $familiaId);
        } else {
            $builder->where('user_id', $userId);
        }

        return $builder->lockForUpdate()->first();
    }

    public function delete(Transacao $transacao): void
    {
        $transacao->delete();
    }

    private function applyUserOrFamiliaScope(object $builder, int $userId, ?int $familiaId = null): object
    {
        if ($familiaId !== null) {
            return $builder->where('familia_id', $familiaId);
        }

        return $builder->where('user_id', $userId);
    }
}
