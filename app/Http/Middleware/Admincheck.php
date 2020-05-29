<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Admincheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            if(!(Auth::user()->roles->pluck('type')->contains('ADMIN')))
            {
                if ($request->wantsJson()) {
                    return response()->json([
                        "serverResponse" => [
                            "code" => 200,
                            "message" => "Permission Denied",
                            "isSuccess" => false
                        ]
                        ]);
                }else{
                    return redirect('/permissiondenie');
                }
            }
        }
        return $next($request);
    }
}
