<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    use HasFactory;

    protected $fillable = [
        'tmdb_episode_id',
        'series_id',
        'season'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'episode_regarde');
    }

    public function series()
    {
        return $this->belongsTo(Series::class);
    }
}
