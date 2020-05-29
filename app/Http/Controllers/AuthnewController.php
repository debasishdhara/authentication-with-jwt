<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\User;

class AuthnewController extends Controller
{
    
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['api-login','login','register']]);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = JWTAuth::attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        //['error' => 'Unauthorized'], 401
        return response()->json([
            "serverResponse" => [
                "code" => 401,
                "message" => "Unauthorized User",
                "isSuccess" => false
            ]
            ]);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        try {

                    if (! $user = JWTAuth::parseToken()->authenticate()) {
                        //['user_not_found'], 404
                            return response()->json([
                                "serverResponse" => [
                                    "code" => 404,
                                    "message" => "User Not Found",
                                    "isSuccess" => false
                                ]
                                ]);
                    }

            } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                // ['token_expired'], 
                    return response()->json([
                        "serverResponse" => [
                            "code" => $e->getStatusCode(),
                            "message" => "User Token Expired",
                            "isSuccess" => false
                        ]
                        ]);

            } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                    //['token_invalid'], $e->getStatusCode()
                    return response()->json([
                        "serverResponse" => [
                            "code" => $e->getStatusCode(),
                            "message" => "Token Invalid",
                            "isSuccess" => false
                        ]
                        ]);

            } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                    // ['token_absent'], $e->getStatusCode()
                    return response()->json([
                        "serverResponse" => [
                            "code" => $e->getStatusCode(),
                            "message" => "Token Not Found",
                            "isSuccess" => false
                        ]
                        ]);

            }

            $userdetails= User::with('roles')->find($user->id);
            //compact('userdetails')
            return response()->json([
                "serverResponse" => [
                    "code" => 200,
                    "message" => "User Details Fetched Successfully",
                    "isSuccess" => true
                ],
                "result" => [
                    "user_details" =>new UserResource($userdetails)
                ]
            ]);
        
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();
//['message' => 'Successfully logged out']
        return response()->json([
            "serverResponse" => [
                "code" => 200,
                "message" => "Successfully logged out",
                "isSuccess" => true
            ]
            ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(JWTAuth::refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $userdetails= User::with('roles')->find(Auth::user()->id);
        return response()->json([
            "serverResponse" => [
                "code" => 200,
                "message" => "User Details Fetched Successfully",
                "isSuccess" => true
            ],
            "result" => [
                'access_token' => $token,
                'token_type' => 'bearer',
                "user_details" =>new UserResource($userdetails),
                'expires_in' => JWTAuth::factory()->getTTL() * 1
            ]
        ]);
    }

    public function register(Request $request)
    {
            $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
                return response()->json([
                    "serverResponse" => [
                        "code" => 201,
                        "message" => $validator->errors(),
                        "isSuccess" => false
                    ]]);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'phone' => $request->get('phone'),
            'password' => Hash::make($request->get('password')),
        ]);
        $user->roles()->sync([2]);
        $token = JWTAuth::fromUser($user);
        $userdetails= User::with('roles')->find($user->id);
//compact('user','token'),201
        return response()->json([
            "serverResponse" => [
                "code" => 200,
                "message" => "User Created Successfully",
                "isSuccess" => true
            ],
            "result" => [
                'access_token' => $token,
                'token_type' => 'bearer',
                "user_details" => new UserResource($userdetails),
                'expires_in' => JWTAuth::factory()->getTTL() * 1
            ]
        ]);
    }
}
