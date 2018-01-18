<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->group(['prefix' => 'v1'], function($app)
{
    // main page
    $app->get('/', function(){
     return view('contact');
    });

    // User
    $app->post('/register','UserController@create');
    $app->post('/login','UserController@authenticate');
    $app->post('/user/contacts','UserController@showContacts');

    // Organizations
    $app->post('/contact/add', 'ContactController@create');
    $app->post('/contact/get/', 'ContactController@show');
    $app->post('/contact/destroy', 'ContactController@destroy');
});
