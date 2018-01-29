# cop4331
For Leineckers COP4331 projects

## Locally setting up API - Linux or Mac

1. Install PHP and MySQL locally - If you set a mysql root password, go to *api/.env* and set **DB_PASSWORD** to your mysql root password2. Create a local database named *smallproject*
3. Go to the api folder and run the command `php artisan migrate`
4. In the api folder run `./start` and a php server on **localhost:3000** will serve the api.
5. Open browser, and go to localhost:3000

## Version 1 API Endpoints

**Accessing live endpoints** - To access a live endpoint use the following url: ```http://<ip_address>/v1/<endpoint>```

| Endpoint         | Method | Return Value | Description |
|------------------|--------|--------------|------------ |
| /register        |  POST  |  JSON Text   | Register a new user |
| /login           |  POST  |  JSON Text   | Logs a new user into the app|
| /user/contacts   |  POST  |  JSON Text   | Gives a list of a logged in users contacts|
| /contact/add     |  POST  |  JSON Text   | Adds a contact to a users contact list|
| /contact/get     |  POST  |  JSON Text   | Retrieves a specific contact from the users contact list |
| /contact/destroy |  POST  |  JSON Text   | Removes a contact from a users contact list|

### **/register**
---
**Required POST Request Body Arguments**:

|Argument|Necessity|Description|
|-----|-|------------------------------------------------------|
|*name*|Required|A string representation of the registering user's name|
|*email*|Required| A string representation of the registering user's email|
|*password*| Required |A string representation of the registering user's encrypted password|

**Returns** a ```{status: success}``` message upon succesful user input, and a ```{status: failure}``` message otherwise.

### **/login**
---
**Required POST Request Body Arguments**:

|Argument|Necessity|Description|
|-----|-|------------------------------------------------------|
|*email*|Required| A string representation of a user's email|
|*password*| Required |A string representation of a user's encrypted password|

**Returns** a ```{status: success, api_key: "api_key"}``` JSON response upon succesful user input, and a ```{status: failure}``` JSON response otherwise.

### **/user/contacts**
---
**Required POST Request Body Arguments**:

|Argument|Necessity|Description|
|-----|-|------------------------------------------------------|
|*api_key*|Required|The API Key of the user retrieving contacts|

**Returns** a JSON representation of a user's contacts upon succesful input, and a ```{status: unauthorized}``` JSON response if a valid API Key is not present.

### **/contact/add**
---
**Required POST Request Body Arguments**:

|Argument|Necessity|Description|
|-----|-|------------------------------------------------------|
|*api_key*|Required|The API Key of the user searching for a contact|
|*contact_name*|Required| A string representation of the new contact's name|
|*contact_address*| Required |A string representation of the new contact's address|
|*contact_city*|Required|A string representation of the new contact's city|
|*contact_state*|Required|A string representation of the new contact's state|
|*contact_zip_code*|Required|A string representation of the new contact's zip code|
|*contact_home_phone*|Required|A string representation of the new contact's home phone|
|*contact_cell_phone*|Optional|A string representation of the new contact's cell phone|
|*contact_work_phone*|Required|A string representation of the new contact's primary email|
|*contact_primary_email*|Required|A string representation of the new contact's primary email|
|*contact_secondary_email*|Optional|A string representation of the new contact's secondary email|

**Returns** a ```{status: success}``` message upon succesful user input, and a ```{status: failure}``` message otherwise.

### **/contact/get**
---
**Required POST Request Body Arguments**:

|Argument|Necessity|Description|
|-----|-|------------------------------------------------------|
|*api_key*|Required|A string representation of the registering user's name|
|*contact_name*|Required| A string representation of the registering user's email|

**Returns** a JSON representation of a user's contacts with a given ```contact_name``` and a ```{status: failure}``` message otherwise.

### **/contact/destroy**
---
**Required POST Request Body Arguments**:

|Argument|Necessity|Description|
|-----|-|------------------------------------------------------|
|*api_key*|Required|The API key of the user deleting a contact|
|*contact_id*|Required| An integer representation of the contact's id that is being deleted|

**Returns** a ```{status: success}``` message upon succesful deletion, and a ```{status: failure}``` message otherwise.
