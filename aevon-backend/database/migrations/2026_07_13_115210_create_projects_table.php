<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->json('description');
            $table->string('slug')->unique();
            $table->string('cover_image')->nullable();
            $table->json('gallery')->nullable();
            $table->json('technologies')->nullable();
            $table->string('live_demo_url')->nullable();
            $table->string('github_url')->nullable();
            $table->json('case_study')->nullable();
            $table->string('client_name')->nullable();
            $table->date('completion_date')->nullable();
            $table->string('project_type')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->json('performance_metrics')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
