<?php

namespace App\Models;

use App\Models\Actor;
use App\Models\Rating;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Record extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'releasedYear',
        'imdbId',
        'poster',
        'released',
        'rated',
        'runtime',
        'genre',
        'director',
        'writer',
        'plot',
        'language',
        'country',
        'awards',
        'imdbRating',
        'imdbVotes',
        'type',
        'totalSeasons',
    ];

    public function actors(): BelongsToMany {
        return $this->belongsToMany(Actor::class);
    }

    public function ratings(): HasMany {
        return $this->hasMany(Rating::class);
    }
}
