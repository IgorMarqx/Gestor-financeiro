<?php

namespace App\Http\Requests\Transacao;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TransacaoUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'conta_id' => ['sometimes', 'required', 'integer', Rule::exists('conta', 'id')],
            'tipo' => ['sometimes', 'required', 'string', Rule::in(['debito', 'credito'])],
            'valor' => ['sometimes', 'required', 'numeric', 'min:0.01'],
            'descricao' => ['nullable', 'string', 'max:255'],
            'anexo' => ['nullable', 'file', 'max:5120'],
        ];
    }
}
