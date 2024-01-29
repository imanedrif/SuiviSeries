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
        Schema::table('episode_regarde', function (Blueprint $table) {
            // Temporarily drop foreign keys
            $table->dropForeign(['user_id']);
            $table->dropForeign(['episode_id']);

            // Drop the unique constraint
            $table->dropUnique(['user_id', 'episode_id']);

            // Re-add the foreign keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('episode_id')->references('id')->on('episodes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('episode_regarde', function (Blueprint $table) {
            Schema::table('episode_regarde', function (Blueprint $table) {
                // Re-add the unique constraint for rollback purposes
                $table->unique(['user_id', 'episode_id']);
            });
        });
    }
};
