<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UsermovieResource extends JsonResource
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
            'images' => Storage::disk(env('FILESYSTEM_DRIVER', ''))->exists($this->movie_poster) ? asset(Storage::disk(env('FILESYSTEM_DRIVER', ''))->url($this->movie_poster)) : asset('images/no-image.png'),
            'movie_description' => $this->movie_description
        ];
    }
}
