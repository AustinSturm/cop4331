<?php

namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;

use Auth;
 
class UserController extends Controller
{
 
    public function __construct()
    {
        $this->middleware('auth', ['only' => [
            'showContacts'
        ]]);
    }
 
    public function create(Request $request)
    {
        $this->validate($request, [
            'name'  => 'required',
            'email' => 'required|email', 
            'password'   => 'required',
        ]);

        $user = new User();

        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->password = $password = Hash::make($request['password']);

        $user->save();

        return response()->json(['status' => 'success']);
    }

    public function showContacts() {
        // Get current user
        $user = Auth::user();

        $contacts = $user->contacts;
        return response()->json($attendance);
    }

    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if( ! empty($user) && Hash::check($request->input('password'), $user->password))
        {
            $apikey = base64_encode(str_random(40));
            User::where('email', $request->input('email'))->update(['api_key' => "$apikey"]);;
            return response()->json(['status' => 'success','api_key' => $apikey]);
        }
        else
        {
            return response()->json(['status' => 'fail'],401);
        }
    }
}