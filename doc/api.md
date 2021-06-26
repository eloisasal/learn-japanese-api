# Api layout

#### GET /users/

| Name                                                     | Method | Token    | Content-Type                   |
|:---------------------------------------------------------|:-------|:---------|:-------------------------------|
| Get a list of users and restaurants of your organization | GET    | required | application/json;charset=UTF-8 |

**Process:**  
1. Get the user list with assigned restaurants

**Path parameters:**  
- N/A

**Querystring:**  
- N/A

**Request body:**  
- N/A

**Response success:**

- サンプルオブジェクト

```JSON
{
    "data" : [
        {
            "id": 1,
            "email":"example@example.com"
        }
        ]
}
```

- Explanation

| JSON Key                | Type    | Size | Mandatory | Search | Note                | Format  |
|:------------------------|:--------|:-----|:----------|:-------|:--------------------|:--------|
| email                   | string  | N/A  | yes       | N/A    | user's email        | string  |

**Response failure:**

- N/A

- Explanation

| HTTP Status | Title                        |
|:------------|:-----------------------------|
| 400         | BadRequestException          |
| 403         | InfoNotAccessibleException   |
| 404         | UserNotFoundException        |
| 500         | InternalServerErrorException |

#### POST /users

| Name             | Method | Token    | Content-Type                   |
|:-----------------|:-------|:---------|:-------------------------------|
| Create user info | POST   | required | application/json;charset=UTF-8 |

**Process:**
1. Creates a user in same organization and links it to restaurants

**Path parameters:**  
- N/A

**Querystring:**  
- N/A

**Request body:**  

```JSON
{
    "data" : {
        "email":"example@example.com"
        ]
    }
}
```

- Explanation

| JSON Key                 | Type    | Size | Mandatory | Search | Note                | Format  |
|:-------------------------|:--------|:-----|:----------|:-------|:--------------------|:--------|
| email                    | string  | N/A  | yes       | N/A    | user's email        | string  |

**Response success:**
- N/A

**Response failure:**

- N/A

- Explanation

| HTTP Status | Title                        |
|:------------|:-----------------------------|
| 400         | BadRequestException          |
| 403         | ActionNotAllowedException    |
| 500         | InternalServerErrorException |

#### PUT /users/:userId

| Name             | Method | Token    | Content-Type                   |
|:-----------------|:-------|:---------|:-------------------------------|
| Update user info | PUT    | required | application/json;charset=UTF-8 |

**Process:**  
1. Deletes old restaurant relations for user
2. Writes the new ones. Updates email if necessary

**Path parameters:**  

| PathString Key | Type     | Size | Mandatory | Search | Note | Format |
|:---------------|:-------|:-------|:-----|:---------|:---------|:-------------|
| userId         | string | N/A    | yes  | 完全一致 | user ID  | UUID v4      |

**Querystring:**  
- N/A

**Request body:**  

```JSON
{
   "data" : {
        "email":"example@example.com"
        ]
    }
}
```

- Explanation

| JSON Key                 | Type    | Size | Mandatory | Search | Note                | Format  |
|:-------------------------|:--------|:-----|:----------|:-------|:--------------------|:--------|
| email                    | string  | N/A  | yes       | N/A    | user's email        | string  |

**Response success:**
- N/A

**Response failure:**

- N/A

- Explanation

| HTTP Status | Title                        |
|:------------|:-----------------------------|
| 400         | BadRequestException          |
| 403         | ActionNotAllowedException    |
| 500         | InternalServerErrorException |

#### DELETE /users/:userId

| Name             | Method | Token    | Content-Type                   |
|:-----------------|:-------|:---------|:-------------------------------|
| Delete user info | DELETE | required | application/json;charset=UTF-8 |

**Process:**  
1. Delete user from database

**Path parameters:**  

| PathString Key | Type     | Size | Mandatory | Search | Note | Format |
|:---------------|:-------|:-------|:-----|:---------|:---------|:-------------|
| userId         | string | N/A    | yes  | 完全一致 | user ID  | UUID v4      |

**Response success:**
- N/A

**Response failure:**

- N/A

- Explanation

| HTTP Status | Title                        |
|:------------|:-----------------------------|
| 400         | BadRequestException          |
| 403         | ActionNotAllowedException    |
| 404         | UserNotFoundException        |
| 500         | InternalServerErrorException |

