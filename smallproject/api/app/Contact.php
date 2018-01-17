<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //
    protected $primaryKey = 'ContactID';
    protected $fillable = ['contact_name', 'contact_address', 'contact_city', 'contact_state', 'contact_zip_code', 'contact_primary_email', 'contact_secondary_email', 'contact_home_phone', 'contact_work_email'];

}