<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    use HasFactory;

    protected $fillable = [
        'tmdb_series_id',
        'name',
        'poster_path',
        'overview',
        'first_air_date',

        'vote_average',
    ];
    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favoris');
    }
    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }
}
