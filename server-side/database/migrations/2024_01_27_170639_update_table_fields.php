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
        Schema::table('series', function (Blueprint $table) {
            DB::statement('ALTER TABLE series CHANGE title name VARCHAR(255)');
            DB::statement('ALTER TABLE series CHANGE image poster_path VARCHAR(255)');
            DB::statement('ALTER TABLE series CHANGE overview description TEXT');
            DB::statement('ALTER TABLE series CHANGE tmdb_series_id tmdb_id INT(11)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('series', function (Blueprint $table) {
            DB::statement('ALTER TABLE series CHANGE name title VARCHAR(255)');
            DB::statement('ALTER TABLE series CHANGE poster_path image VARCHAR(255)');
            DB::statement('ALTER TABLE series CHANGE description overview TEXT');
            DB::statement('ALTER TABLE series CHANGE tmdb_id tmdb_series_id INT(11)');
        });
    }
};
