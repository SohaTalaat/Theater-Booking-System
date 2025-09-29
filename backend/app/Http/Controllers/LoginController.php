<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function login(Request $request)
    {
        // 1. Validate the request data
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 2. Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            // 3. Regenerate the session on successful login
            $request->session()->regenerate();

            // 4. Return a success response, or redirect
            return response()->json(['message' => 'Login successful!']);
        }

        // 5. Return an error response on failure
        return response()->json(['message' => 'Invalid email or password.'], 401);
    }
}
