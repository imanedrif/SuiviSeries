<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    use HasFactory;

    protected $fillable = [
        'tmdb_series_id',
        'title',
        'image',
        'overview',
    ];
    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }
    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }
}
