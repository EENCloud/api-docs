# Authentication

<!--===================================================================-->
## Overview
<!--===================================================================-->

Gaining access to the Eagle Eye API is a two-stage process. <a class="definition" onclick="openModal('DOT-Client')">Clients</a> first present their credentials and Realm to obtain a single-use *Authentication Token*. This single use token is valid for a predefined duration or until it has been used. Once the Authentication Token is obtained the Client must utilize it in an Authorize service call to obtain a session ID (via the `'auth_key'` cookie) that provides access to resources. This two-phase approach allows Clients to authenticate and operate in multiple domains. The first step is done using Authenticate. The second step is done using Authorize. Note that the Authenticate call must be done over a HTTPS connection

In addition to the Simple Authentication described above, a more *secure* Authentication method known as **Two-Factor Authentication** (**TFA**) may be used. TFA is a method of confirming the user's identity by utilizing a combination of two different components. The first component is a user's password and the second is a one-time TFA code delivered to the user via another communication channel - email or a text message sent to the user's mobile phone

Whether Simple or Two-Factor Authentication is used for a particular user's login is determined by this user's settings in the system. Note, however, that an <a class="definition" onclick="openModal('DOT-Account-Superuser')">Account Superuser</a> may enforce all users in a particular <a class="definition" onclick="openModal('DOT-Account')">Account</a> to use TFA

If TFA is enforced, the Authorize call will expect the TFA code to be passed in addition to the token obtained from the Authenticate call

There are several methods to use the `'auth_key'` cookie (obtained from the Authorize call) to authenticate subsequent API calls:

  - The first is to simply pass the `'auth_key'` *cookie* with all API requests
  - The second is to take the value of the `'auth_key'` cookie and pass it in the request as the `'A'` *parameter* <br><small>(The `'A=[AUTH_KEY]'` parameter can be used with any method (*GET*, *PUT*, *POST*, *DELETE*))</small>

The order of precedence for session ID retrieval is as follows:

  1. `'A'` parameter in the query string of any method (*GET*, *PUT*, *POST*, *DELETE*)
  2. `'A'` parameter in the *POST* data
  3. `'A'` parameter in the request body (e.g. *PUT*)
  4. `'auth_key'` cookie

**Note:** HTTP response status codes are listed throughout the document in order of precedence with the *request successfully completed* codes at the very end - meaning amongst the *negative result codes* the last one listed is the one that will be returned if none of the preceding codes' conditions are met

<!--===================================================================-->
## 1. Authenticate
<!--===================================================================-->

Login is a two-step process when using Simple Authentication and a three-step process using TFA

### Simple Authentication

  1. Authenticate with username and password
  2. Authorize with the token returned by Authenticate

### Two-Factor Authentication

  1. Authenticate
  2. Instruct the system to send the TFA code
  3. Authorize with the token received from ***1.*** and the TFA code received from ***2.***

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/authenticate -d '{"username": "[USERNAME]", "password": "[PASSWORD]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]:"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/authenticate`

Parameter    | Data Type | Description                                                                                                                        | Is Required
---------    | --------- | -----------                                                                                                                        | -----------
**username** | string    | The username defined by the user (email address)                                                                                   | true
**password** | string    | The password defined by the user (alphanumeric, min 10 characters)                                                                 | true

> Json Response (Simple Authentication)

```json
{
    "token": "MiDUwMQqwP1JsfKqbqT1DQ8hJFHEOZfROEUtBvnuqv0ICxvcOybkS1n9/awjrJ9YKijb60GqdUDPP8TW4o8Ei8iI8OXC/dj74KC2cLMxJ2vs/hmYPfbW8OpCwf0k683a2LfIbjcC3Uy/SmDpOsxVdPMTXQEGJHXD3ItmAvoQ5MOoRKfHBNOu7OJBWQjPUjeP0fkHSrx8JgAHSqT5SwRM0mLysFmiFHF0h7/5Apt81dDhZwLBDwwSrl+kTqgn+wnw6rJ432liESdK+yp3Qefk1wAtytoTJkkBE2srqsHJdW4ryVYKk9SKA62Cz7pO3VUaD8Yxx9Ff2Os9ez6TdfBmqg=="
}
```

> Json Response (Two-Factor Authentication)

```json
{
    "token": "MiDUwMQqwP1JsfKqbqT1DQ8hJFHEOZfROEUtBvnuqv0ICxvcOybkS1n9/awjrJ9YKijb60GqdUDPP8TW4o8Ei8iI8OXC/dj74KC2cLMxJ2vs/hmYPfbW8OpCwf0k683a2LfIbjcC3Uy/SmDpOsxVdPMTXQEGJHXD3ItmAvoQ5MOoRKfHBNOu7OJBWQjPUjeP0fkHSrx8JgAHSqT5SwRM0mLysFmiFHF0h7/5Apt81dDhZwLBDwwSrl+kTqgn+wnw6rJ432liESdK+yp3Qefk1wAtytoTJkkBE2srqsHJdW4ryVYKk9SKA62Cz7pO3VUaD8Yxx9Ff2Os9ez6TdfBmqg==",
    "two_factor_authentication_code": {
        "sms": "*** *** 779",
        "email": "***********@gmail.com"
    }
}
```

### HTTP Response (Json Attributes)

Parameters                     | Data Type | Description
----------                     | --------- | -----------
token                          | string    | Token to be used in Authorize
two_factor_authentication_code | json      | Defines which method can be used for TFA code delivery: <br>`'sms'` - scrubbed user's SMS number <br>`'email'` - scrubbed user's email address <br><br>(present only if TFA is enabled, displays partial information about the defined email address or phone number)

***NOTE 1:***

Token expiration:

  - *30 seconds* for Simple Authentication
  - *15 minutes* for TFA

***NOTE 2:***

For TFA, the system uses the parameter `'sms_phone'` from the [User Model](#user-model)
<br>If SMS-based authentication is to be used, that parameter must be specified at the user's creation time (See [Create User](#create-user))
<br>If user's parameter `'sms_phone'` has not been set, the value of the `'sms'` key will be `'No sms phone found'`

***NOTE 3:***

The TFA-related user's data (i.e. SMS phone or email), once set at the time of user's account creation, can only be modified by that user alone. Any such modification will also be TFA authenticated. Account superuser cannot change this data for security reasons

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Invalid credentials supplied
402	| Account is suspended
460	| Account is inactive
461	| Account is pending
412\*	| User is disabled
462	| User is pending (This will be thrown before 401 if the username is valid and account is active)
200	| User has been authenticated (Body contains Json-formatted result)

\*Code 412 is also returned if TFA is used and the user's account has been locked due to more than 3 failed attempts to authorize with a TFA code

<!-- TODO: Verify whether the list above is complete -->

<!--===================================================================-->
## 2. Send TFA Code (<small>only if using TFA</small>)
<!--===================================================================-->

This step is only to be executed when TFA is used for the user log in (i.e. if the Authenticate call returned `'two_factor_authentication_code'` key in response). Otherwise proceed to *Step 3: Authorize*

> Request (Two-Factor Authentication)

```shell
curl -D - -X POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate -d '{"token": "[TOKEN]", "two_factor_authentication_type": "[TFA_TYPE]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]:"
```

<!-- TODO: Verify the above TFA curl request -->

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate`

Parameter | Data Type | Description                                                                                                                            | Is Required
--------- | --------- | -----------                                                                                                                            | -----------
**token** | string    | Token received in *Step 1*                                                                                                             | true
**two_factor_authentication_type** | string    | TFA type: <br>`'sms'` - TFA code will be sent via SMS <br>`'email'` - TFA code will be sent via email         | true

### HTTP Response

This API call does not return data in response

***NOTE 1:***

TFA code expiration is *15 minutes*

### Response Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
412	| Unable to send TFA code with the TFA type selected
415	| Specified TFA type not supported
200	| Request succeeded (TFA code has been sent to the user)

<!--===================================================================-->
## 3. Authorize
<!--===================================================================-->

Authorize is the final step of the login process performed by utilizing the token from Authenticate and (if TFA is enabled) the TFA code delivered to the user by SMS or email. A successful Authorize call returns an authorized user object and sets the `'auth_key'` cookie. For all subsequent API calls either the *cookie* can be set or the value of it can be sent as the `'A'` *parameter*. When TFA is used, this call will also set the `'tfa_key'` cookie (See [Authorized devices](#authorized-devices) for more details)

API calls can initially be done against `'https://login.eagleeyenetworks.com'` (The host url), but after the authorization response is returned, API calls should then use the **branded subdomain**. At this stage the branded host url will become `'https://[active_brand_subdomain].eagleeyenetworks.com'`, where the `'active_brand_subdomain'` field is returned in the authorization response

Following the authorization in the example on the right, the host url should be changed to for example: `'https://c001.eagleyenetworks.com'`

Each account will consistently have the same *branded subdomain* and as such will not change throughout the life of the session. Caching the subdomain is safe as long as the client software validates against `'the active_brand_subdomain'` after authorization. Using the *branded subdomain* is important for speed and robustness

> Request (Simple Authentication)

```shell
curl -D - -X POST https://login.eagleeyenetworks.com/g/aaa/authorize -d '{"token": "[TOKEN]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]:"
```

> Request (Two-Factor Authentication)

```shell
curl -D - -X POST https://login.eagleeyenetworks.com/g/aaa/authorize -d '{"token": "[TOKEN]", "two_factor_authentication_code": "[TFA_CODE]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]:"
```

<!-- TODO: Verify the above TFA curl requests -->

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/authorize`

Parameter | Data Type | Description                                                                                                                            | Is Required
--------- | --------- | -----------                                                                                                                            | -----------
**token** | string    | Token received in *Authenticate*                                                                                                       | true
two_factor_authentication_code | string    | 4 decimal digits <br>Used only for TFA (Not during Simple Authentication)

***NOTE 1:***

More than 3 failed attempts to Authorize with TFA code will lock the user's account. It then can only be unlocked by Eagle Eye's technical support staff
When the user's account has been locked the user is notified of this fact by email

> Json Response

```json
{
    "id": "ca0e1cf2",
    "user_id": "ca0e1cf2",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@nodomain.com",
    "owner_account_id": "00004206",
    "active_account_id": "00004206",
    "uid": "",
    "is_superuser": 0,
    "is_account_superuser": 1,
    "is_staff": 0,
    "is_active": 1,
    "is_pending": 0,
    "is_master": 1,
    "is_user_admin": 1,
    "is_layout_admin": 1,
    "is_edit_map": 0,
    "is_live_video": 1,
    "is_export_video": 1,
    "is_recorded_video": 1,
    "is_view_preview_video": 1,
    "is_edit_admin_users": 1,
    "is_edit_all_users": 1,
    "is_edit_users": 1,
    "is_edit_account": 1,
    "is_device_admin": 1,
    "is_edit_cameras": 1,
    "is_edit_camera_on_off": 1,
    "is_edit_camera_less_billing": 1,
    "is_edit_ptz_stations": 1,
    "is_edit_all_and_add": 1,
    "is_edit_motion_areas": 1,
    "is_edit_sharing": 1,
    "is_ptz_live": 1,
    "is_mobile_branded": 0,
    "is_view_contract": 1,
    "is_view_audit_trail": 1,
    "is_two_factor_authentication_enabled": 0,
    "user_authenticated_clients": null,
    "account_utc_offset": -25200,
    "account_work_days": "1111100",
    "account_work_hours": [
        "0900",
        "1700"
    ],
    "language": "en-us",
    "inactive_session_timeout": 15,
    "street": [
        "address line 1",
        "address line 2"
    ],
    "city": "New York",
    "state": "Alaska",
    "country": "US",
    "postal_code": "9980-999",
    "phone": "111111111",
    "mobile_phone": "000000000",
    "utc_offset": -25200,
    "timezone": "US/Pacific",
    "last_login": "20181006173752.672",
    "alternate_email": "alternate.email@nodomain.com",
    "sms_phone": "222111222",
    "json": "{\"een\":{\"notify_levels\":[], \"permissions\":{}}}",
    "camera_access": [
        [
            "1005f2ed",
            "r"
        ],
        [
            "100bd708",
            "r"
        ],
        [...]
    ],
    "layouts": [
        "217f0fd4-450f-11e4-a983-ca8312ea370c"
    ],
    "is_notify_enable": 1,
    "notify_period": [
        "0-0000-2359",
        "1-0000-2359",
        "2-0000-2359",
        "3-0000-2359",
        "4-0000-2359",
        "5-0000-2359",
        "6-0000-2359"
    ],
    "notify_rule": [
        "one-email-0"
    ],
    "is_branded": 1,
    "active_brand_subdomain": "c001",
    "account_map_lines": null,
    "access_period": [
        "0-0000-2359",
        "1-0000-2359",
        "2-0000-2359",
        "3-0000-2359",
        "4-0000-2359",
        "5-0000-2359",
        "6-0000-2359"
    ],
    "user_log_level": 0,
    "saved_filters": [],
    "temp_account_access": [],
    "is_terms_noncompliant": 1,
    "is_system_notifications_disabled": 0
}
```

### HTTP Response (Json Attributes)

When successful, this API call returns Json data structure following the [User Model](#user-model) with the additional `'user_id'` field, which is present during Authorize and is identical to `'id'`

### Error Status Codes

**When using Simple Authentication**

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Invalid token supplied
200	| User has been authorized for access to the realm

**When using TFA**

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Invalid token supplied, missing TFA code or attempting to authorize with expired TFA code
406	| Invalid TFA supplied or invalid TFA and invalid token supplied
429	| This user's account has been locked due to more than 3 failed attempts to Authorize
200	| User has been authorized for access to the realm

<!--===================================================================-->
## Forced vs. Optional TFA
<!--===================================================================-->

Depending whether the account to which the user belongs enforces TFA or not, the user may be able to select Simple Authentication for their future <a class="definition" onclick="openModal('DOT-User-Login')">Logins</a> rather than TFA

In order to find out whether the account enforces TFA examine the `'is_two_factor_authentication_forced'` flag in the account record returned by the [Get Account](#get-account) API Call. This flag can be set or cleared by the account superuser with the [Update Account](#update-account) API call

If the account TFA flag is set as follows `'is_two_factor_authentication_forced=0'`, the user is allowed switch to Simple Authentication. That is achieved by clearing `'is_two_factor_authentication_enabled=1'` flag in the user record. This action can only be done by the user themselves (not by an account superuser)

Update of any TFA-related field in the user record is performed through a dedicated TFA update endpoint: `'/g/aaa/two_factor_authenticate/update'`

<!--===================================================================-->
## TFA Update
<!--===================================================================-->

Data present in the user record that affects the TFA is security-sensitive and therefore may only be altered using a dedicated endpoint, whose operation is itself TFA protected. This data includes three fields in the user model:

Field         | Description | Remarks                                                                                                                          | Is Required
-----         | ----------- | -------                                                                                                                          | -----------
**sms_phone** | Phone number to which text messages (SMS) containing TFA code will be delivered | Can only be changed when using SMS for TFA code delivery <br>Code will be delivered to the new phone number                                                                                                                                        | true
**email**     | E-mail address to which messages containing TFA code will be delivered | Can only be changed when using email for TFA code delivery <br> Code will be delivered to the new email address                                                                                                                                              | true
**is_two_factor_authentication_enabled** | 1 - required to authenticate via TFA <br>0 - authenticate via Simple Authentication | Can be updated with either SMS or email delivery of TFA code                                                                                                                                                       | true

<aside class="notice">The fields above can only be changed one at a time</aside>

### TFA Update is a two-step process:

### 1. Request Update

This step initiates the TFA data update process

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate/update`

Parameter                          | Data Type | Description                                                                                                   | Is Required
---------                          | --------- | -----------                                                                                                   | -----------
**two_factor_authentication_type** | string    | Defines which method to use for TFA code delivery to verify this update request: <br>`'sms'` - TFA code will be sent via SMS <br>`'email'` - TFA code will be sent via email                                                                                                                | true
**password**                       | string    | The user's password                                                                                           | true
**update_json**                    | json      | Json structure containing the name of the updated field and its new value <br><br>(Only one field can be updated at a time) <br><br>Example: <br>`{`<br>&nbsp;&nbsp;&nbsp;&nbsp;`'sms_phone'`: `'+123456789'`<br>`}`                                                                          | true

### HTTP Response

This API call returns no data

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied (i.e. update of `'sms_phone'` is requested with `'two_factor_authentication_type'` set to `'email'` or vice versa)
401	| Invalid credentials supplied
415	| Invalid TFA code delivery method supplied in `'two_factor_authentication_type'`
200	| Request succeeded (Proceed to verification)

### 2. Verify update request with TFA

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/two_factor_authenticate/verify`

Parameter                          | Data Type | Description                                                                                                   | Is Required
---------                          | --------- | -----------                                                                                                   | -----------
**two_factor_authentication_code** | string    | The 4-digit code received via SMS or email                                                                    | true

### HTTP Response

This API call returns no data

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
406	| Invalid TFA code supplied
200	| Request succeeded

<!--===================================================================-->
## Authorized Devices
<!--===================================================================-->

In order to make the log-in process as convenient as possible for the user, the system will allow Simple Authentication on devices previously used by that user for a successful TFA-based log in

Upon a successful TFA-based log in, the **Authorize** API call sets a cookie `'tfa_key'` in the browser. Subsequent execution of the **Authenticate** API Call with the correct username and password will initiate the Simple Authentication process, which can be differentiated from TFA by absence of the `'two_factor_authentication_code'` field in the response of Authenticate. In this scenario the **Send TFA Code** API call can be skipped and the Authorize API call can be executed directly as via the non-TFA-enabled login

***NOTE 1:***

The same `'tfa_key'` value may be applied for multiple users, who have successfully authorized in the past from the particular device

***NOTE 2:***

The list of authorized devices for any user is stored in the field `'user_authenticated_clients'` in the user record (See [User Model](#user-model))
