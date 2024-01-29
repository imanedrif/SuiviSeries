<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the existing unique constraint on 'tmdb_episode_id'
        Schema::table('episodes', function (Blueprint $table) {
            $table->dropUnique(['tmdb_episode_id']);
        });

        // Create a new composite unique index on 'tmdb_episode_id' and 'series_id'
        Schema::table('episodes', function (Blueprint $table) {
            $table->unique(['tmdb_episode_id', 'series_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the composite unique index
        Schema::table('episodes', function (Blueprint $table) {
            $table->dropUnique(['tmdb_episode_id', 'series_id']);
        });

        // Re-create the original unique index on 'tmdb_episode_id'
        Schema::table('episodes', function (Blueprint $table) {
            $table->unique('tmdb_episode_id');
        });
    }
};
