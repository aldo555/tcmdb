<?php

namespace Tests\Unit;

use App\Models\Record;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class RecordControllerTest extends TestCase
{
    use RefreshDatabase;

    public function index_returns_a_list_of_records()
    {
        $records = factory(Record::class, 2)->create();

        $response = $this->get('/api/records');

        $response->assertOk();
        $response->assertJsonCount(2, 'records');
    }

    public function globalSearch_returns_a_list_of_records_matching_the_search_query()
    {
        $record1 = factory(Record::class)->create(['title' => 'The Shawshank Redemption']);
        $record2 = factory(Record::class)->create(['title' => 'The Godfather']);

        $response = $this->get('/api/records/search?q=shawshank');

        $response->assertOk();
        $response->assertJsonCount(1, 'records');
        $response->assertJsonPath('records.0.title', 'The Shawshank Redemption');
    }

    public function search_returns_a_list_of_records_from_the_OMDb_API()
    {
        $omdbResponse = Http::get('https://www.omdbapi.com/?s=the+shawshank+redemption');

        $this->mock(Omdb::class)->shouldReceive('searchByTitle')->andReturn($omdbResponse);

        $response = $this->get('/api/records/search?q=the+shawshank+redemption');

        $response->assertOk();
        $response->assertJsonCount(1, 'results');
        $response->assertJsonPath('results.0.title', 'The Shawshank Redemption');
    }

    public function store_creates_a_new_record()
    {
        $data = [
            'imdbId' => 'tt0117560',
        ];

        $response = $this->post('/api/records', $data);

        $response->assertOk();
        $response->assertJson(['message' => 'Record created successfully.']);

        $record = Record::where('imdbId', $data['imdbId'])->first();

        $this->assertNotNull($record);
    }

    public function show_returns_a_record_by_id()
    {
        $record = factory(Record::class)->create();

        $response = $this->get('/api/records/' . $record->id);

        $response->assertOk();
        $response->assertJson(['record' => $record]);
    }

    public function update_updates_a_record()
    {
        $record = factory(Record::class)->create();
        $data = [
            'title' => 'The Shawshank Redemption (updated)',
        ];

        $response = $this->put('/api/records/' . $record->id, $data);

        $response->assertOk();
        $response->assertJson(['message' => 'Record updated successfully.']);

        $record = Record::where('id', $record->id)->first();

        $this->assertEquals($data['title'], $record->title);
    }

    public function destroy_deletes_a_record()
    {
        $record = factory(Record::class)->create();

        $response = $this->delete('/api/records/' . $record->id);

        $response->assertOk();
        $response->assertJson(['message' => 'Record deleted successfully.']);

        $record = Record::where('id', $record->id)->first();

        $this->assertNull($record);
    }
}
