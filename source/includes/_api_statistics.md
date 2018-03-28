# Statistics

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service allows to retrieve statistics about a specific account or all sub-accounts (if for a master account)

Obtains the sum of the following data:

- Sub-accounts
- Users
- Cameras
- Bridges
- Online users
- Online cameras

<!--===================================================================-->
## Total number of sub accounts
<!--===================================================================-->

Used to get the number of all sub-accounts for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/sub_accounts -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/sub_accounts`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned. If it is not present, information will be returned about the account which the user belongs to  | false

> Json Response

```json
{
    "account_total": 6
}
```

### HTTP Response (Json Attributes)

Parameter     | Data Type  | Description
---------     | ---------  | -----------
account_total | int        | Total number of sub accounts (defaults to 0 for sub-accounts)


### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found
200 | Request succeeded

<!--===================================================================-->
## Total number of users
<!--===================================================================-->

Used to get the number of all users for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/users -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/users`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned. If it is not present, information will be returned about the account which the user belongs to  | false

> Json Response

```json
{
    "user_total": 26
}
```

### HTTP Response (Json Attributes)

Parameter  | Data Type  | Description
---------  | ---------  | -----------
user_total | int        | Total number of users


### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found
200 | Request succeeded

<!--===================================================================-->
## Total number of cameras
<!--===================================================================-->

Used to get the number of all cameras for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/cameras -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/cameras`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned. If it is not present, information will be returned about the account which the user belongs to  | false

> Json Response

```json
{
    "camera_total": 8
}
```

### HTTP Response (Json Attributes)

Parameter    | Data Type  | Description
---------    | ---------  | -----------
camera_total | int        | Total number of cameras


### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found
200 | Request succeeded

<!--===================================================================-->
## Total number of bridges
<!--===================================================================-->

Used to get the number of all bridges for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/bridges -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/bridges`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned. If it is not present, information will be returned about the account which the user belongs to  | false

> Json Response

```json
{
    "bridge_total": 1
}
```

### HTTP Response (Json Attributes)

Parameter    | Data Type  | Description
---------    | ---------  | -----------
bridge_total | int        | Total number of bridges


### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found
200 | Request succeeded

<!--===================================================================-->
## Total number of online users
<!--===================================================================-->

Used to get the number of all online users for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/online_users -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/online_users`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned. If it is not present, information will be returned about the account which the user belongs to  | false

> Json Response

```json
{
    "online_user_total": 6
}
```

### HTTP Response (Json Attributes)

Parameter         | Data Type  | Description
---------         | ---------  | -----------
online_user_total | int        | Total number of online users


### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found
200 | Request succeeded

<!--===================================================================-->
## Total number of online cameras
<!--===================================================================-->

Used to get the number of all online cameras for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/camera_online_total -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]:" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/camera_online_total`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned. If it is not present, information will be returned about the account which the user belongs to  | false

> Json Response

```json
{
    "camera_online_total": 5
}
```

### HTTP Response (Json Attributes)

Parameter           | Data Type  | Description
---------           | ---------  | -----------
camera_online_total | int        | Total number of online cameras


### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found
200 | Request succeeded
