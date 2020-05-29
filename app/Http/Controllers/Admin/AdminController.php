<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Movie;

class AdminController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('admin');
    }


    public function createMovie(Request $request){
        
       
        $validator = Validator::make($request->all(), [
            'movie_name' => 'required|string',
            'movie_description' => 'required|string',
            'movie_poster' => 'required'
        ]);
        
            //dd($request->input('country_status'));
        if ($validator->fails()) {
            return response()->json([
                "serverResponse" => [
                    "code" => 201,
                    "message" => $validator->errors(),
                    "isSuccess" => false
                ]]);
        } else {
            DB::beginTransaction();
            try{
                // Commit To DB
                /**
                 * Company Details
                 */
                $movie_name=$request->input('movie_name');
                $movie_description=$request->input('movie_description');
                $movie_poster = $request->file('movie_poster')->storeAs(
                    'public/moives', time().'.jpg'
                );
                $moviedetails = new Movie();
                $moviedetails->movie_name=$movie_name;
                $moviedetails->movie_description=$movie_description;
                $moviedetails->movie_poster=$movie_poster;
                $moviedetails->save();
                
                DB::commit();
                return response()->json([
                    "serverResponse" => [
                        "code" => 200,
                        "message" => "Movie Created Successfully",
                        "isSuccess" => true
                    ]]);
            } catch (\Exception $exception) {
                DB::rollBack();
                return response()->json([
                    "serverResponse" => [
                        "code" => 201,
                        "message" => $exception->getMessage(),
                        "isSuccess" => false
                    ]]);
            }
        }
    }

    public function editMovie(Request $request){

    }

    public function deleteMovie(Request $request){

    }

    public function showMovielist(){

    }

}