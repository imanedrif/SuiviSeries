<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// give me all routes needed for authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Route::get('/user/{userId}', [UserController::class, 'getUser']);
    Route::post('/user/favorite-series/{serieId}', [UserController::class, 'toggleSerieInFavorites']);
    Route::get('/user/favorite-series', [UserController::class, 'getFavorites']);
    Route::get('/user/favorite-series/{serieId}', [UserController::class, 'getIsFavorite']);

    Route::post('/user/watched-episode/{episode}', [UserController::class, 'toggleWatchedEpisode']);
});
