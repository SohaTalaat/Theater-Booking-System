<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'show_id' => ['required', 'integer', 'exists:shows,id'],
            'seats'      => 'required|array',
            'total_cost' => 'required|numeric|min:0',
        ];
    }
}
