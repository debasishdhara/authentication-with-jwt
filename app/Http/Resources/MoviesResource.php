<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MoviesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'movie_name' => $this->movie_name,
            'images' => Storage::disk(env('FILESYSTEM_DRIVER', 'public'))->exists($this->movie_poster) ? Storage::disk(env('FILESYSTEM_DRIVER', 'public'))->url($this->movie_poster) : asset('images/no-image.png'),
            'movie_description' => $this->movie_description
        ];
    }
}
