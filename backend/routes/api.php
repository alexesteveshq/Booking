<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\BookingController;
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

Route::get('/apartment', [ApartmentController::class, 'list']);
Route::get('/booking', [BookingController::class, 'list']);
Route::get('/feature', [FeatureController::class, 'list']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('/booking', [BookingController::class, 'create']);
    Route::post('/apartment', [ApartmentController::class, 'create'])->middleware('role');
    Route::post('/booking/update', [BookingController::class, 'update'])->middleware('role');
});
