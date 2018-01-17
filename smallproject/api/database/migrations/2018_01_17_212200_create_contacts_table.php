<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->increments('ContactID');
            $table->string('contact_name');
            $table->string('contact_address');
            $table->string('contact_city');
            $table->string('contact_state');
            $table->string('contact_zip_code');
            $table->string('contact_home_phone');
            $table->string('contact_work_phone');
            $table->string('contact_primary_email');
            $table->string('contact_secondary_email');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('UserID')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
