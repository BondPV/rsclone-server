# rsclone-server

## Setup and Running

- Use `node 18.x` or higher.
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
      currency: string,
    } 
  ```

  * **Success Response:**

    * **Code:** 201 Created <br />
      **Content:** 
      ```json
        { "message": "User successfully registered" }
      ```
  * **Error Response:**

    * **Code:** 403 Forbidden <br />
      **Content:** 
      ```json
        { "message": "Registration error" }
      ```

  </details>

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
        {
          "token": "jwt token",
          "user": {
            "username",
            "email",
            "currency",
            "avatar",
            "phoneNumber"
          }
        }
      ```
  * **Error Response:**

    * **Code:** 403	Forbidden <br />
      **Content:** 
      ```json
        { "message": "Login error" }
      ```

  </details>

* ### *Update User*
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
        email?: string;
        currency?: string;
        avatar?: string;
        phoneNumber?: number | null;
    } 
  ```

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      {
        "user": {
            "username",
            "email",
            "currency",
            "avatar",
            "phoneNumber"
        },
        "message": "Successfully updated"
      }
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

## **Expense**

* ### *Creat Expense*
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

    * **Code:** 201 Created <br />
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

    * **Code:** 400 Bad Request <br />

  </details>

* ### *Update Expense*
  Updating expense parametrs.
  <details>

  * **Method** `PATCH`

  * **URL** `/api/expense/:id`

  * **Headers:** 
    * `"Content-Type": "aplication/json"`
    * `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: 
  ```typescript 
    {
      date?: Date,
      account?: string,
      category?: string,
      expense?: number,
      currency?: string,
      comment?: string,
    }
  ```

  * **Success Response:**

    * **Code:** 200 Ok <br />
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

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

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

* ### *Get Expense*
  Get one expense by Id.
  <details>

  * **Method** `GET`

  * **URL** `/api/expense/:id`

  * **Headers:**: None

  * **Data Params**: None

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      {
        "date": "2023-03-23T18:25:43.511Z",
        "account": "cash",
        "category": "food",
        "expense": 100,
        "currency": "RUB",
        "comment": "supermarket",
        "userId": "63dddea9bc46ae6546fcf52b",
        "_id": "63dde034bc46ae6546fcf533",
      }
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

* ### *Get Expenses* 
  Get all user expenses.
  <details>

  * **Method** `GET`

  * **URL** `/api/expense`

  * **Headers:**: `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: None

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      [
        { "expense-1" },
        { "expense-n" }
      ]
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

## **Income**

* ### *Creat Income*
  Creates a new money income
  <details>

  * **Method** `POST`

  * **URL** `/api/income`

  * **Headers:** 
    * `"Content-Type": "aplication/json"`
    * `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: 
  ```typescript 
    {
      date: Date,
      account: string,
      income: number,
      currency: string,
      comment?: string,
    }
  ```

  * **Success Response:**

    * **Code:** 201 Created <br />
      **Content:** 
      ```json
        {
          "date": "2023-01-23T18:25:43.511Z",
          "account": "cash",
          "income": 100,
          "currency": "RUB",
          "comment": "",
          "userId": "63de2f91f7216c0c8cb4f290",
          "_id": "63de3fdbdafedd703299ad96",
        }
      ```
  * **Error Response:**

    * **Code:** 400 Bad Request <br />

  </details>

* ### *Update Income*
  Updating income parametrs.
  <details>

  * **Method** `PATCH`

  * **URL** `/api/income/:id`

  * **Headers:** 
    * `"Content-Type": "aplication/json"`
    * `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: 
  ```typescript 
    {
      date?: Date,
      account?: string,
      income?: number,
      currency?: string,
      comment?: string,
    }
  ```

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      {
        "_id": "63de3fdbdafedd703299ad96",
        "date": "2023-01-23T18:25:43.511Z",
        "account": "cash",
        "income": 100,
        "currency": "RUB",
        "comment": "",
        "userId": "63de2f91f7216c0c8cb4f290",
      }
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

* ### *Delete Income*
  Delete one income by Id.
  <details>

  * **Method** `DELETE`

  * **URL** `/api/income/:id`

  * **Headers:**: `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: None

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      {
        "response": "Income deleted successfully"
      }
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

* ### *Get Income*
  Get one income by Id.
  <details>

  * **Method** `GET`

  * **URL** `/api/income/:id`

  * **Headers:**: None

  * **Data Params**: None

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      {
        "_id": "63de3fdbdafedd703299ad96",
        "date": "2023-01-23T18:25:43.511Z",
        "account": "cash",
        "income": 100,
        "currency": "RUB",
        "comment": "",
        "userId": "63de2f91f7216c0c8cb4f290",
        "__v": 0
      }
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>

* ### *Get Incomes* 
  Get all user incomes.
  <details>

  * **Method** `GET`

  * **URL** `/api/income`

  * **Headers:**: `"Authorization": "Bearer <-YOU TOKEN->"`

  * **Data Params**: None

  * **Success Response:**

    * **Code:** 200 Ok <br />
      **Content:** 
      ```json
      [
        { "income-1" },
        { "income-n" }
      ]
      ```
  * **Error Response:**

    * **Code:** 404 Not found

      or

    * **Code:** 400 Bad Request

  </details>
