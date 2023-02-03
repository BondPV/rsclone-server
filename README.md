# rsclone-server

## Setup and Running

- Use `node 16.x` or higher.
- Install dependencies: `$ npm install`.
- Start server: `$ npm dev`.
- Now you can send requests to the address: `http://localhost:3005/`

## Usage

## **User**

***
* ### *Registration*
  Creates a new user.
  <details>

  * **Method** `POST`

  * **URL** `/api/user/register`

  * **Headers:** `"Content-Type": "aplication/json"`

  * **Data Params**: 
  ```typescript 
    {
      email: string;
      username: string;
      password: string;
    } 
  ```

  * **Success Response:**

    * **Code:** 201	Created <br />
      **Content:** 
      ```json
        { "message": "User successfully registered" }
      ```
  * **Error Response:**

    * **Code:** 403	Forbidden <br />
      **Content:** 
      ```json
        { "message": "Registration error" } or { "message": "A user with {email} already exists" }
      ```

  </details>

***
* ### *Authenticate (Login)*
  Login user.
  <details>

  * **Method** `POST`

  * **URL** `/api/user/login`

  * **Headers:** `"Content-Type": "aplication/json"`

  * **Data Params**: 
  ```typescript 
    {
      email: string;
      password: string;
    } 
  ```

  * **Success Response:**

    * **Code:** 200	Ok <br />
      **Content:** 
      ```json
        { "jwt token" }
      ```
  * **Error Response:**

    * **Code:** 403	Forbidden <br />
      **Content:** 
      ```json
        { "message": "Registration error" } or { "message": "Email {email} not found" } or { "message": "Invalid password, please try again!" }
      ```

  </details>

## **Expense**

***
* ### *Create*
  Creates a new expense
  <details>

  * **Method** `POST`

  * **URL** `/api/expense`

  * **Headers:** `"Content-Type": "aplication/json"`

  * **Data Params**: 
  ```typescript 
    {
      expenseId: string,
      date: Date,
      account: string,
      category: string,
      expense: number,
      currency: string,
      comment?: string,
    }
  ```

  * **Success Response:**

    * **Code:** 201	Created <br />
      **Content:** 
      ```json
        {
          "date": "2023-02-23T18:25:43.511Z",
          "account": "cash",
          "category": "food",
          "expense": 100,
          "currency": "RUB",
          "comment": "supermarket Ashan",
          "userId": "63db54fe7332880adf6fef95",
        }
      ```
  * **Error Response:**

    * **Code:** 400	Bad Request <br />

  </details>
