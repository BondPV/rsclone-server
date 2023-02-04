# rsclone-server

## Setup and Running

- Use `node 16.x` or higher.
- Install dependencies: `$ npm install`.
- Start server: `$ npm run dev`.
- Now you can send requests to the address: `http://localhost:3005/`

## Usage

## **User**

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
        { "message": "Registration error" }
      ```

  </details>
<br>

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
        { "message": "Login error" }
      ```

  </details>
<br>

* ### *UpdateUser*
  Updating user settings.
  <details>

  * **Method** `PATCH`

  * **URL** `/api/user/`

  * **Headers:** 
    * `"Content-Type": "aplication/json"`
    * `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: 
  ```typescript 
    {
      username?: string;
      avatar?: string;
      language?: string;
      phoneNumber?: number;
    } 
  ```

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      {
        "_id": "63dd3ecab0785798e9d18c75",
        "email": "test1@clone.com",
        "username": "test",
        "password": "encoded password",
        "avatar": "img url",
        "language": "RU",
        "phoneNumber": "89001000000"
      }
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

## **Expense**

* ### *CreatExpense*
  Creates a new expense
  <details>

  * **Method** `POST`

  * **URL** `/api/expense`

  * **Headers:** 
    * `"Content-Type": "aplication/json"`
    * `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: 
  ```typescript 
    {
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
          "_id": "63dde034bc46ae6546fcf533",
        }
      ```
  * **Error Response:**

    * **Code:** 400	Bad Request <br />

  </details>
<br />

* ### *Delete Expense*
  Delete one expense by Id.
  <details>

  * **Method** `DELETE`

  * **URL** `/api/expense/:id`

  * **Headers:**: `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: None

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      {
        "response": "Expense deleted successfully"
      }
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>
<br />