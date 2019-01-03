# Terms of Service

<!--===================================================================-->
## Overview
<!--===================================================================-->

The following API endpoints facilitate presenting and accepting the Terms of Service. By default, Eagle Eye Networks uses independent Terms of Service which will be presented through [Get Terms of Service for User](#get-terms-of-service-for-user). On the other hand resellers can use their own Terms of Service (instead of default ones) through [Create Terms of Service for Account](#create-terms-of-service-for-account). Switch between these two options can only be made by Eagle Eye Networks engineering staff.

Resellers can assign their own terms at the Master Account Level or give each <a class="definition" onclick="openModal('DOT-Sub-Account')">Sub-Account</a> custom terms at the Sub-Account Level

The basic workflow is as follows:

  1. Resellers create their own terms with the [Create Terms of Service for Account](#create-terms-of-service-for-account)
  2. <a class="definition" onclick="openModal('DOT-Client')">Client</a> UI will display terms if not accepted from a [Get Terms of Service for User](#get-terms-of-service-for-user)
  3. <a class="definition" onclick="openModal('DOT-Client')">Client</a> UI will accept the terms from a [Accept Terms of Service for User](#accept-terms-of-service-for-user)

<!--===================================================================-->
## Get Terms of Service for User
<!--===================================================================-->

This service allows to push important Terms of Service. The client software must call GET to see whether the user needs to agree to any new Terms of Service

If the user has a `'is_compliant=0'`, the client software should popup a message box containing the Terms of Service
<br>(It is preferred to have this as a single combined message box)

If the user agrees to the terms, a PUT call should be placed containing an array of all the Terms of Service

<aside class="notice">A past due user is subject to suspension of services and may not be allowed to login</aside>

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/user/terms -d "id=[USER_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/user/terms`

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a>

> Json Response

```json
[
    [
        "cafe81f5",
        "Terms_and_Conditions",
        "/een-terms-of-service/00013377/Terms_and_Conditions~2~20180523094504.txt",
        "2",
        0
    ],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute    | Data Type | Description
----------- | ---------    | --------- | -----------
0           | user_id      | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a> of the user requesting the notice
1           | title        | string    | Title of the term of service
2           | url          | string    | URL of a file with the text of the terms of service
3           | version      | string    | Version string for the title of the terms of service
4           | is_compliant | int       | If `0`, the user needs to accept the terms of service

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
406	| Information supplied could not be verified
402	| Account is suspended
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Accept Terms of Service for User
<!--===================================================================-->

This service is used to record Acceptance of the Terms of Service

<aside class="notice">Account superusers will not be able to accept for other people</aside>

> Request

```shell
curl -X PUT https://login.eagleeyenetworks.com/g/user/terms -d '{"urls": ["/een-terms-of-service/[USER_ID]/Test_Terms_of_Service~1~20180523100004.txt", "/een-terms-of-service/[USER_ID]/EEN_Terms_of_Service~1.2~20180626191610.txt"]}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/user/terms`

Parameter | Data Type     | Description | Is Required
--------- | ---------     | ----------- | -----------
**urls**  | array[string] | Array of urls to be accepted | true

> Json Response

```json
{
    "id": "cafe81f5"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404	| Notice title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Get Terms of Service for Account
<!--===================================================================-->

Returns the Terms of Service for an account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/terms -d "id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/terms`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> | true

> Json Response

```json
[
    [
        "00013377",
        "UNIT_TEST_SUB_ACCOUNT",
        "Test_Terms_of_Service2",
        "2",
        1,
        0,
        "20180523094136",
        "/een-terms-of-service/00013377/Terms_and_Conditions~2~20170523094136.txt",
        "active"
    ],
    [
        "00013377",
        "UNIT_TEST_SUB_ACCOUNT",
        "Test_Terms_of_Service",
        "1",
        1,
        1,
        "20180222115243",
        "/een-terms-of-service/00013377/Terms_and_Conditions~1~20170222115243.txt",
        "retired"
    ],
    [
        "00013377",
        "UNIT_TEST_SUB_ACCOUNT",
        "Test_Terms_of_Service",
        "2",
        0,
        1,
        "20180523094504",
        "/een-terms-of-service/00013377/Terms_and_Conditions~2~20170523094504.txt",
        "active"
    ],
    [
        "00000001",
        "UNIT_TEST_SUB_ACCOUNT",
        "EEN_Terms_of_Service",
        "1.2",
        1,
        1,
        "20180426191610",
        "/een-terms-of-service/00000001/Terms_and_Conditions~1.2~20170523094504.txt",
        "active"
    ],
    [...],
    [...],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute         | Data Type | Description
----------- | ---------         | --------- | -----------
0           | account_id        | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> of the account requesting the notice
1           | account_name      | string    | Name of the account requesting this notice
2           | title             | string    | Title of the notice
3           | version           | string    | Version number for the notice title, a larger version number will retire other versions
4           | is_admin_required | int       | Whether administrators have to accept (1) or not (0)
5           | is_user_required  | int       | Whether users have to accept (1) or not (0)
6           | timestamp         | string    | Date of the term of service
7           | url               | string    | URL of the file containing the text for the notice
8           | status            | string    | Status of the term of service (`'active'`, `'retired'`)

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
406	| Information supplied could not be verified
402	| Account is suspended
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Create Terms of Service for Account
<!--===================================================================-->

Master accounts (Resellers) may require their own Terms of Service. This service allows to submit the text of customized Terms of Service

New terms can be submitted with a PUT command. GET can be done to verify the state of the terms. PUT will retire Terms of Service of the same title and account

<aside class="notice">Only master accounts can create an account's Terms of Service</aside>

Notices can be stored in the sub-account or the parent account of the user

Resellers are limited to 5 Terms of Service titles and each title will only have one active version

> Request

```shell
curl -X PUT https://login.eagleeyenetworks.com/g/account/terms -d '{"is_admin_required": 1, "is_user_required": 1, "title": "[TERMS_TITLE]", "text": "[TERMS_TEXT]", "version": "[TERMS_VERSION]", "id": "[ACCOUNT_ID]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/account/terms`

Parameter         | Data Type | Description                                          | Required    | Default                  | Limitation
---------         | --------- | -----------                                          |:-----------:| -------                  | ----------
**text**          | string    | Text of the term of service to accept                | **&check;** |                          | Use single LF character for line break
id                | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> | **&cross;** | requester's account
title             | string    | Title of the term of service to accept               | **&cross;** | 'Terms and Conditions'   | 32 bytes of alpha numeric characters
version           | string    | Version of the title, which should be unique         | **&cross;** | auto incrementing number | 32 bytes of alpha numeric characters
is_admin_required | int       | Whether administrators have to accept (1) or not (0) | **&cross;** | not updating
is_user_required  | int       | Whether users have to accept (1) or not (0)          | **&cross;** | not updating
timestamp         | string    | Date the term of service goes into effect            | **&cross;** | *now*

> Json Response

```json
{
    "status": "active",
    "is_admin_required": 1,
    "is_user_required": 1,
    "title": "Test_Terms_of_Service",
    "url": "/een-terms-of-service/00013377/Test_Terms_of_Service~1~20180523100004.txt",
    "timestamp": "20180523100004",
    "version": "1",
    "user": "cafe81f5",
    "account_id": "00013377"
}
```

### HTTP Response (Json Attributes)

Parameter         | Data Type | Description
---------         | --------- | -----------
title             | string    | Title of the notice
version           | string    | Version number for the notice title, a larger version number will retire other versions
is_admin_required | int       | Whether administrators have to accept (1) or not (0)
is_user_required  | int       | Whether users have to accept (1) or not (0)
timestamp         | string    | Date of the term of service
url               | string    | URL of the file containing the text for the notice
status            | string    | Status of the term of service (`'active'`, `'retired'`)

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404	| Terms Title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Update Terms of Service for Account
<!--===================================================================-->

Update an account's Terms of Service

<aside class="notice">Only master accounts can update an account's Terms of Service</aside>

Users are not required to accept terms of the same version again, to force users to accept again use a PUT request

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/account/terms -d '{"is_admin_required": 0, "is_user_required": 1, "title": "[TERMS_TITLE]", "text": "[TERMS_TEXT]", "version": "[TERMS_VERSION]", "id": "[ACCOUNT_ID]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/account/terms`

Parameter         | Data Type | Description                                          | Required    | Default                  | Limitation
---------         | --------- | -----------                                          |:-----------:| -------                  | ----------
text              | string    | Text of the term of service to accept                | **&cross;** |                          |  use single LF character for line break
id                | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> | **&cross;** | requester's account
title             | string    | Title of the term of service to accept               | **&cross;** | 'Terms and Conditions'   | 32 bytes of alpha numeric characters
version           | string    | Version of the title, which should be unique         | **&cross;** | auto incrementing number | 32 bytes of alpha numeric characters
is_admin_required | int       | Whether administrators have to accept (1) or not (0) | **&cross;** | not updating
is_user_required  | int       | Whether users have to accept (1) or not (0)          | **&cross;** | not updating
timestamp         | string    | Date the term of service goes into effect            | **&cross;** | *now*

> Json Response

```json
{
    "status": "active",
    "is_admin_required": 0,
    "is_user_required": 1,
    "title": "Test_Terms_of_Service",
    "url": "/een-terms-of-service/00013377/Test_Terms_of_Service~1~20180523100004.txt",
    "timestamp": "20180523100004",
    "version": "2",
    "user": "cafe81f5",
    "account_id": "00013377"
}
```

### HTTP Response (Json Attributes)

Parameter         | Data Type | Description
---------         | --------- | -----------
title             | string    | Title of the notice
version           | string    | Version number for the notice title, a larger version number will retire other versions
is_admin_required | int       | Whether administrators have to accept (1) or not (0)
is_user_required  | int       | Whether users have to accept (1) or not (0)
timestamp         | string    | Date of the term of service
url               | string    | URL of the file containing the text for the notice
status            | string    | Status of the term of service (`'active'`, `'retired'`)



<!--TODO: Investigate whether the curl request and response are correct (why "version" is an unexpected argument)-->

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404	| Notice title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Delete Terms of Service for Account
<!--===================================================================-->

Delete an account’s Terms of Service

<aside class="notice">Only master accounts can delete an account's Terms of Service</aside>

> Request

```shell
curl -X DELETE https://login.eagleeyenetworks.com/g/account/terms -d "id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/account/terms`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> | true
title     | string    | Title of the term of service

> Json Response

```json
{
    "00013377": {
        "EEN_Terms_of_Service": {
            "1.2": "20180626193818.274"
        },
        "Test_Terms_of_Service": {
            "2": "20180626193626.502"
        }
    }
}
```



<!--TODO: Investigate the curl request and response-->

### HTTP Response (Json Attributes)'

Parameter          | Data Type | Description
---------          | --------- | -----------
account_id         | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> of the account requesting the removal
account_name       | string    | Name of the account requesting the removal
title              | string    | Title of the term of service
version            | string    | Version number for the term title
is_admin_required  | int       | Whether administrators have to accept (1) or not (0)
is_user_required   | int       | Whether users have to accept (1) or not (0)
timestamp          | string    | Date of the term of service
url                | string    | URL of the file containing the text for the term of service
status             | string    | This field is no longer being used <small>**(DEPRECATED)**</small>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404	| Notice title was not found
406	| Information supplied could not be verified
460	| Account is inactive
409	| Account has already been activated
412	| User is disabled
200	| User has been authorized for access to the realm
