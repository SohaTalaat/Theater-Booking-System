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
            'seat_id' => ['required', 'integer', 'exists:seats,id'],
            'booking_date' => ['required', 'date', 'after_or_equal:today'],
            'time_slot' => ['required', 'string'],
            'food_package_id' => ['nullable', 'integer', 'exists:food_packages,id'],
        ];
    }
}
