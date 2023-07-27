<?php

use App\Http\Controllers\RecordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('records/search', [RecordController::class, 'search'])->middleware(['auth:sanctum']);
Route::get('records/global-search/{query}', [RecordController::class, 'globalSearch'])->middleware(['auth:sanctum']);
Route::resource('records', RecordController::class)->middleware(['auth:sanctum'])->except([
    'create', 'edit'
]);;
