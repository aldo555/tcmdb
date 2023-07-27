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
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('releasedYear', 15);
            $table->string('imdbId');
            $table->string('poster');
            $table->date('released')->nullable();
            $table->string('rated', 10)->nullable();
            $table->string('runtime', 10)->nullable();
            $table->string('genre')->nullable();
            $table->string('director')->nullable();
            $table->string('writer')->nullable();
            $table->text('plot')->nullable();
            $table->string('language')->nullable();
            $table->string('country')->nullable();
            $table->string('awards')->nullable();
            $table->string('imdbRating', 3)->nullable();
            $table->string('imdbVotes', 10)->nullable();
            $table->string('type', 10)->nullable();
            $table->tinyInteger('totalSeasons')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
