<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UsermovieResource;
use Carbon\Carbon;
use App\Movie;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function showMovie(){
        $movies = Movie::all();
        return response()->json([
            "serverResponse" => [
                "code" => 200,
                "message" => "Movies Fetched Successfully",
                "isSuccess" => true
            ],
            "result" => [
                "movies" => UsermovieResource::collection($movies)
            ]
            ]);
    }
}
