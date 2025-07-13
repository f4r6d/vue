<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/generate-pdf', [ReportController::class, 'generate'] );
Route::get('/download-pdf/{file}', [ReportController::class, 'download'] );

Route::get('/test', [ReportController::class, 'test']); // Example route for testing

