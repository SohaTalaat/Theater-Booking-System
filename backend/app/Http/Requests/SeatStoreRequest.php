<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeatStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'seat_number' => 'required|string',
            'theater_id'  => 'required|exists:theaters,id',
            'status' => 'nullable|string',

        ];
    }
}
