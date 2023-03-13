<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\PublishDataController;
use App\Http\Controllers\PinsController;
use App\Http\Controllers\LimitsController;
use App\Http\Controllers\UploadDataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function($router) {
    Route::post('/register', [JWTController::class, 'register']);
    Route::post('/login', [JWTController::class, 'login']);
    Route::post('/logout', [JWTController::class, 'logout']);
    Route::post('/refresh', [JWTController::class, 'refresh']);
    Route::post('/profile', [JWTController::class, 'profile']);
    Route::post('/me', [JWTController::class, 'me']);
});

Route::group(['middleware' => 'api', 'prefix' => 'publish'], function($router) {
    Route::post('/checkLimit', [PublishDataController::class, 'checkLimit']);
    Route::post('/publishData', [PublishDataController::class, 'addPublishData']);
    Route::post('/publishWholeData', [PublishDataController::class, 'addpublishWholeData']);
});


Route::group(['middleware' => 'api', 'prefix' => 'upload'], function($router) {
    Route::post('/uploadMedia', [UploadDataController::class, 'addMediaFile']);
});

Route::group(['middleware' => 'api', 'prefix' => 'pins'], function($router) {
    Route::post('/pins', [PinsController::class, 'getPins']);
    Route::post('/deletePin', [PinsController::class, 'deletePin']);
});

Route::group(['middleware' => 'api', 'prefix' => 'limits'], function($router) {
    Route::post('/limits', [LimitsController::class, 'getLimits']);
    Route::post('/updateLimit', [LimitsController::class, 'updateLimit']);
});


Route::get('error', function() {
    return response()->json(['error' => 'Invalid Token'], 401);
})->name('login');