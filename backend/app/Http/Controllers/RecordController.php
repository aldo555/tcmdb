<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Rating;
use App\Models\Record;
use App\Contracts\Omdb;
use App\Http\Requests\StoreRecordRequest;
use App\Http\Requests\SearchRecordRequest;
use Illuminate\Http\Response;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response {
        $movies = Record::select([
            'id',
            'imdbId',
            'title',
            'poster',
            'type',
            'releasedYear',
            'plot',
            'genre',
            'rated',
            'runtime',
            'imdbRating'
        ])->where('type', 'movie')->latest()->limit(4)->get();

        $series = Record::select([
            'id',
            'imdbId',
            'title',
            'poster',
            'type',
            'releasedYear',
            'plot',
            'genre',
            'rated',
            'runtime',
            'imdbRating'
        ])->where('type', 'series')->latest()->limit(4)->get();



        return response([
            'movies' => $movies,
            'series' => $series,
            'stats' => [
                [
                    'name' => 'Number of records',
                    'value' => Record::count()
                ],
                [
                    'name' => 'Number of movies',
                    'value' => Record::where('type', 'movie')->count()
                ],
                [
                    'name' => 'Number of series',
                    'value' => Record::where('type', 'series')->count()
                ],
                [
                    'name' => 'Number of actors',
                    'value' => Actor::count()
                ],
            ]
        ]);
    }

    /**
     * Search through all records
     */
    public function globalSearch(string $searchQuery): Response {
        $records = Record::where('title', 'LIKE', '%' . $searchQuery . '%')
            ->orWhereHas('actors', function ($query) use ($searchQuery) {
                $query->where('name', 'LIKE', '%' . $searchQuery . '%');
            })
            ->paginate(8);

        return response([
            'records' => $records
        ], 200);
    }

    /**
     * Query the OMDb API by title for resource creation.
     */
    public function search(SearchRecordRequest $request, Omdb $omdb): Response {
        $records = $omdb->searchByTitle($request->input('title'), $request->input('page'));

        if (!$records) {
            return response([
                'message' => 'No records found.',
            ], 404);
        }

        return response([
            'message' => $records['totalResults'] . ' results found.',
            'results' => $records['results'],
            'totalResults' => $records['totalResults'],
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRecordRequest $request, Omdb $omdb): Response {
        $data = $omdb->searchByImdbId($request->input('imdbId'));

        if (!$data) {
            return response([
                'message' => 'The record could not be created.'
            ], 400);
        }

        $record = Record::create(collect($data)->except(['actors', 'ratings'])->toArray());

        foreach($data['actors'] as $actor) {
            $actor = Actor::firstOrCreate([
                'name' => $actor
            ]);

            $record->actors()->attach($actor->id);
        }

        foreach($data['ratings'] as $rating) {
            $rating = Rating::create([
                'source' => $rating['Source'],
                'value' => $rating['Value'],
                'record_id' => $record->id
            ]);
        }

        return response([
            'message' => 'Record created successfully.'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $record = Record::with(['ratings', 'actors'])->where('imdbId', $id)->first();

        if (!$record) {
            return response([
                'message' => 'The record was not found.'
            ], 404);
        }

        return response([
            'record' => $record
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(string $id, Omdb $omdb): Response {
        $record = Record::find($id);

        if (!$record) {
            return response([
                'message' => 'The record was not found.'
            ], 404);
        }

        $data = $omdb->searchByImdbId($record->imdbId);

        if (!$data) {
            return response([
                'message' => 'The record could not be updated.'
            ], 400);
        }

        $record->update(collect($data)->except(['actors', 'ratings'])->toArray());

        $record->actors()->detach();

        foreach($data['actors'] as $actor) {
            $actor = Actor::firstOrCreate([
                'name' => $actor
            ]);

            $record->actors()->attach($actor->id);
        }

        $record->ratings()->delete();

        foreach($data['ratings'] as $rating) {
            $rating = Rating::create([
                'source' => $rating['Source'],
                'value' => $rating['Value'],
                'record_id' => $record->id
            ]);
        }

        $record->load(['actors', 'ratings']);

        return response([
            'message' => 'Record updated successfully.',
            'record' => $record
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response {
        $record = Record::find($id);

        if (!$record) {
            return response([
                'message' => 'The record was not found.'
            ], 404);
        }

        $record->delete();

        return response([
            'message' => 'Record deleted successfully.'
        ], 201);
    }
}
