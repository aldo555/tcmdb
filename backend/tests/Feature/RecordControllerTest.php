<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Record;
use Illuminate\Support\Facades\Http;
use Database\Factories\RecordFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RecordControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_index_returns_a_list_of_records(): void
    {
        Record::factory(2)->create(['type' => 'movie']);

        $response = $this->actingAs($this->user, 'sanctum')->get('/api/records');

        $response->assertOk();
        $response->assertJsonCount(2, 'movies');
    }

    public function test_globalSearch_returns_a_list_of_records_matching_the_search_query(): void
    {
        Record::factory()->create(['title' => 'The Shawshank Redemption']);
        Record::factory()->create(['title' => 'The Godfather']);

        $response = $this->actingAs($this->user, 'sanctum')->get('/api/records/global-search/shawshank');

        $response->assertOk();
        $response->assertJsonCount(1, 'records.data');
        $response->assertJsonPath('records.data.0.title', 'The Shawshank Redemption');
    }

    public function test_search_returns_a_list_of_records_from_the_OMDb_API(): void
    {
        $omdbResponse = Http::get('https://www.omdbapi.com/?s=the+shawshank+redemption&page=1');

        $this->mock(Omdb::class)->shouldReceive('searchByTitle')->andReturn($omdbResponse);

        $response = $this->actingAs($this->user, 'sanctum')->get('/api/records/search?title=the+shawshank+redemption&page=1');

        $response->assertOk();
    }

    public function test_store_creates_a_new_record(): void
    {
        $data = [
            'imdbId' => 'tt0117560',
        ];

        $response = $this->actingAs($this->user, 'sanctum')->post('/api/records', $data);

        $response->assertStatus(201);

        $record = Record::where('imdbId', $data['imdbId'])->first();

        $this->assertNotNull($record);
    }

    public function test_show_returns_a_record_by_id(): void
    {
        $record = Record::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')->get('/api/records/' . $record->imdbId);

        $response->assertOk();
        $response->assertJsonPath('record.imdbID', $record->imdbID);
    }



    public function test_destroy_deletes_a_record(): void
    {
        $record = Record::factory()->create();

        $response = $this->actingAs($this->user, 'sanctum')->delete('/api/records/' . $record->id);

        $response->assertStatus(201);

        $record = Record::where('id', $record->id)->first();

        $this->assertNull($record);
    }
}
