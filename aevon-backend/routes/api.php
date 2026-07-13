<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TechnologyController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\CareerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);
Route::apiResource('services', ServiceController::class)->only(['index', 'show']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::apiResource('technologies', TechnologyController::class)->only(['index', 'show']);
Route::apiResource('testimonials', TestimonialController::class)->only(['index', 'show']);
Route::apiResource('team-members', TeamMemberController::class)->only(['index', 'show']);
Route::apiResource('articles', ArticleController::class)->only(['index', 'show']);
Route::apiResource('faqs', FaqController::class)->only(['index', 'show']);
Route::apiResource('careers', CareerController::class)->only(['index', 'show']);