<?php

namespace App\Services;

use App\Contracts\Omdb;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class OmdbService implements Omdb
{
    private $apiBaseUrl;

    public function __construct() {
        $this->apiBaseUrl = config('omdb.base_url') . config('omdb.api_key');
    }

    public function searchByImdbId(string $imdbId): ?array
    {
        $response = Http::get($this->apiBaseUrl . '&i=' . $imdbId . '&plot=full');

        if (!$response->successful()) {
            return null;
        }

        $data = $response->json();

        if ($data['Response'] === 'False') {
            return null;
        }

        return [
            'title' => $data['Title'],
            'releasedYear' => Str::endsWith($data['Year'], ['–', '-']) ? $data['Year'] . 'Ongoing' : $data['Year'],
            'imdbId' => $data['imdbID'],
            'poster' => $data['Poster'],
            'released' => $data['Released'] != 'N/A' ? \Carbon\Carbon::parse($data['Released'])->format('Y-m-d') : null,
            'rated' => $data['Rated'],
            'runtime' => $data['Runtime'],
            'genre' => $data['Genre'],
            'director' => $data['Director'],
            'writer' => $data['Writer'],
            'plot' => $data['Plot'],
            'language' => $data['Language'],
            'country' => $data['Country'],
            'awards' => $data['Awards'],
            'actors' => explode(',', $data['Actors']),
            'ratings' => $data['Ratings'],
            'imdbRating' => $data['imdbRating'],
            'imdbVotes' => $data['imdbVotes'],
            'type' => $data['Type'],
            'totalSeasons' => $data['Type'] === 'series' ? $data['totalSeasons'] : null,
        ];
    }

    public function searchByTitle(string $searchQuery, string $page): ?array
    {
        $response = Http::get($this->apiBaseUrl . '&s=' . $searchQuery . '&page=' . $page);

        if (!$response->successful()) {
            return null;
        }

        $data = $response->json();

        if ($data['Response'] === 'False') {
            return null;
        }

        $normalizedResults = collect($data['Search'])->map(function (array $record) {
            return [
                'title' => $record['Title'],
                'poster' => $record['Poster'],
                'type' => $record['Type'],
                'releasedYear' => Str::endsWith($record['Year'], ['–', '-']) ? $record['Year'] . 'Ongoing' : $record['Year'],
                'imdbId' => $record['imdbID']
            ];
        });

        return [
            'results' => $normalizedResults,
            'totalResults' => $data['totalResults']
        ];
    }
}
