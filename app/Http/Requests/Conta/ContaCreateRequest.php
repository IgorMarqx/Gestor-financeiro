<?php

namespace App\Http\Requests\Conta;

use Illuminate\Foundation\Http\FormRequest;

class ContaCreateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:120'],
            'saldo_atual' => ['nullable', 'numeric', 'min:0'],
        ];
    }
}
