<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use App\Contact;

use Auth;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth', ['only' => [
            'create',
            'show',
            'destroy'
        ]]);
    }

    public function create(Request $request)
    {
        $creator = Auth::user();

        $this->validate($request, [
            'contact_name'  => 'required'
        ]);

        $contact = new Contact();

        $contact->contact_name = $request['contact_name'];
        $contact->contact_address = $request['contact_address'];
        $contact->contact_city = $request['contact_city'];
        $contact->contact_state = $request['contact_state'];
        $contact->contact_zip_code = $request['contact_zip_code'];
        $contact->contact_home_phone = $request['contact_home_phone'];
        $contact->contact_work_phone = $request['contact_work_phone'];
        $contact->contact_primary_email = $request['contact_primary_email'];
        $contact->contact_secondary_email = $request['contact_secondary_email'];
        $contact->user_id = $creator->UserID;

        $contact->save();

        return response()->json(['status' => 'success']);
    }

    /**
    * Get the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */

    public function show(Request $request)
    {
        // returns an array with all results, which will always be one when searching ids
        $contact = Contact::where('ContactID', $request['ContactID'])->get();
        if( ! empty($contact))
        {
            return response()->json($contact);
        }
        else
        {
            return response()->json(['status' => 'fail']);
        }
    }

    public function destroy(Request $request)
    {
        //
        if(Contact::destroy($request['contact_id']))
        {
             return response()->json(['status' => 'success']);
        }

        return response()->json(['status' => 'fail']);
    }

}
