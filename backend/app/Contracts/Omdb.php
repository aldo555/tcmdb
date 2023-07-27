<?php

namespace App\Contracts;

interface Omdb
{
    public function searchByImdbId(string $imdbId): ?array;
    public function searchByTitle(string $imdbId, string $page): ?array;
}
