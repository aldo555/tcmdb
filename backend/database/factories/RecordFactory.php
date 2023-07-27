<?php

namespace Database\Factories;

use App\Models\Record;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecordFactory extends Factory
{
    protected $model = Record::class;

    public function definition()
    {
        return [
            'imdbId' => $this->faker->unique()->randomNumber(),
            'title' => $this->faker->name(),
            'poster' => $this->faker->imageUrl(),
            'type' => $this->faker->randomElement(['movie', 'series']),
            'releasedYear' => $this->faker->year(),
            'plot' => $this->faker->paragraph(),
            'genre' => $this->faker->randomElement(['action', 'comedy', 'drama', 'horror', 'romance']),
            'rated' => $this->faker->randomElement(['G', 'PG', 'PG-13', 'R', 'NC-17']),
            'runtime' => $this->faker->randomNumber(),
            'imdbRating' => $this->faker->randomDigit(),
        ];
    }
}
