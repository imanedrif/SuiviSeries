<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // validate incoming request
        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        // attempt login
        $credentials = $request->only(['email', 'password']);
        if (!auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }
        // return token
        $token = auth()->user()->createToken('TokenName')->accessToken;
        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => auth()->user()
        ]);
    }
    public function register(Request $request)
    {
        $user = User::create($request->only(['name', 'email', 'password']));
        $token = $user->createToken('TokenName')->accessToken;
        return response()->json([
            'token' => $token,
            'success' => true,
            'user' => $user
        ], 201);
    }
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }
}
