# AAA

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service enables the creation of new Independent Accounts and provides the means to recover them. If you are creating <a class="definition" onclick="openModal('DOT-Sub-Account')">Sub-Accounts</a> tied to your current <a class="definition" onclick="openModal('DOT-Account')">Account</a> refer to the [Account](#account) section

<!--===================================================================-->
<!-- ## Create Account -->
<h2 id=create-account-h2>Create Account</h2>
<!--===================================================================-->

Create a new account and the superuser for the account. As a part of the creation process, the service sends a confirmation email containing a link (with <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> and activation token), which the user must click to activate the account (cannot be used until it is activated)

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/create_account -d "email=[EMAIL]" -d "password=[PASSWORD]" -H "Authentication: [API_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/create_account`

Parameter            | Data Type | Description | Is Required
---------            | --------- | ----------- | -----------
**email**            | string    | Email address | true
**password**         | string    | Password | true
name                 | string    | Account name
realm                | string    | Realm (defaults to current user's realm)
first_name           | string    | User first name
last_name            | string    | User last name
timezone             | string    | Timezone name (defaults to `'US/Pacific'`)
is_api_access_needed | boolean   | Grant API access to this new account

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Account has been created and a confirmation email has been sent to the provided email address
400	| Unexpected or non-identifiable arguments are supplied
406	| Realm is invalid due to not being a root realm
409	| Email address has already been registered for the specified realm

<!--===================================================================-->
## Validate Account
<!--===================================================================-->

Verify the email address supplied when the account is created. When successful, the account is set to active and a user session is created. User will not be required to login again

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/validate_account -d "id=[ID]" -d "token=[TOKEN]" -H "Authentication: [API_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/validate_account`

Parameter | Data Type   | Description | Is Required
--------- | ---------   | ----------- | -----------
**id**    | string      | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> | true
**token** | string      | Account validation token | true

> Json Response

```json
{
    "user_id": "ca103fea"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
user_id   | string    | Unique identifier for validated user

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | User has been authorized for access to the realm
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
406	| Information supplied could not be verified
409	| Account has already been activated
412	| User is disabled
460	| Account is inactive

<!--===================================================================-->
## 1. Forgot Password
<!--===================================================================-->

Password recovery is a multi-step process:

  1. Forgot Password requests a reset email to be sent to the email address of a registered user
  2. Check Password Reset Token verifies whether the reset token is valid (This step is optional but is provided to allow for a friendlier user experience)
  3. Reset Password allows the user to change the password (This step directly verifies whether the supplied token is a valid reset token). The result is that a user session is created for the user

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/forgot_password -d "email=[EMAIL]" -H "Authentication: [API_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/forgot_password`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**email** | string    | Email address | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | A reset email has been sent to the supplied email address. This status will be provided even if the email address was not found. This prevents attacks to discover user accounts
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
406	| Information supplied could not be verified
412	| User is disabled
460	| Account is inactive
461	| Account is pending
462	| User is pending

<!--===================================================================-->
## 2. Check Password Reset Token
<!--===================================================================-->

This is step two of the password recover/reset process. It verifies that the supplied token is a valid reset token

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/check_pw_reset_token -d "token=[TOKEN]" -H "Authentication: [API_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/check_pw_reset_token`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**token** | string    | Password reset token provided in email | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Token is valid
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
406	| Token not valid or not found
412	| User is disabled
460	| Account is inactive
461	| Account is pending

<!--===================================================================-->
## 3. Reset Password
<!--===================================================================-->

This is step three of the password recover/reset process. It both verifies that the supplied token is a valid reset token and then, if valid resets the password associated with the token to the newly supplied password. Upon completion, a user login session is created

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/reset_password -d "password=[PASSWORD]" -d "token=[TOKEN]" -H "Authentication: [API_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/reset_password`

Parameter                      | Data Type | Description | Is Required
---------                      | --------- | ----------- | -----------
**token**                      | string    | Password reset token provided in email | true
**password**                   | string    | New password (alphanumeric, min 10 characters) | true
accepted_terms_of_service_urls | string    | New terms of service acceptance url

> Json Response

```json
{
    "user_id": "ca0e1cf2"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
user_id   | string    | Unique identifier for validated user

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | User has been authorized for access to the realm
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
406	| Token not valid or not found
412	| User is disabled
460	| Account is inactive
461	| Account is pending

### Validation of the new password against Account's password rules

> Response Json object with failed requirements for the new password:

```json
{
    "status_code": 400,
    "message": "New password does not meet all of the requirements.",
    "data": {
        "failed_requirements": {
            "same_password": {
              "description": "New password cannot be the same as the old one."
            },
            "length": {
                "description": "Password length must be between 12 and 126 characters long.",
                "required_value": {
                    "minimum_length": 12,
                    "maximum_length": 126
                }
            },
            "reuse": {
                "description": "Previous passwords cannot be reused."
            },
            "required_special_char": {
                "description": "New password needs to contain at least one symbol."
            },
            "required_numeric_char": {
                "description": "New password needs to contain at least one number."
            },
            "exclude_username": {
                "description": "New password should not contain the username."
            },
        }
    },
    "reason": "InvalidPassword"
}
```

If a new password fails against some of the Account's password requirements, HTTP response with status code 400 and JSON object will be returned.

Most password management settings require feature flag, if you want to enable it ask support.

More details on Password management rules can be found [here](#account-password_management_rules).


<!--===================================================================-->
## Resend Registration Email
<!--===================================================================-->

For users who have registered for an account, but never confirmed the registration. This will allow the registration confirmation email to be re-sent

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/resend_registration_email -d "email=[EMAIL]" -H "Authentication: [API_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/resend_registration_email`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**email** | string    | Email address of the account contact for a pending account | true
realm     | string    | Realm (defaults to current user's realm)

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Account was located and verified to be in the pending state. A registration email has been recreated and sent to the provided email address
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404	| Account with this email address and realm could not be found
409	| Account is already active (not pending)
412	| User is disabled
460	| Account is inactive

<!--===================================================================-->
## Resend User Verification Email
<!--===================================================================-->

For users who have had a user account created, but never confirmed their user account. This will allow the user confirmation email to be re-sent

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/resend_user_verification_email -d "email=[EMAIL]" -H "Authentication: [API_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/resend_user_verification_email`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**email** | string    | Email address of the new user | true
realm     | string    | Realm (defaults to current user's realm)

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | User was located and verified to be in the pending state. A verification email has been recreated and sent to the provided email address
400	| Unexpected or non-identifiable arguments are supplied
402	| Account is suspended
404	| User with this email address and realm could not be found
409	| User is already active (not pending)
412	| User is disabled
460	| Account is inactive
461	| Account is pending

<!--===================================================================-->
## Change Password
<!--===================================================================-->

This allows a user to change their password directly while authenticated and also allows super users to change the password of the users they manage:

  - While changing the own password, the current password needs to be provided as well (User ID should be omitted)
  - While changing the password of one of the managed users only the new password is required (aside from the managed user's ID)

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/change_password -d "password=[PASSWORD]" -d "current_password=[CURRENT_PASSWORD]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/change_password`

Parameter        | Data Type | Description | Is Required
---------        | --------- | ----------- | -----------
**password**     | string    | New password (alphanumeric, min 10 characters) | true
id               | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a> of the user having their password changed (Defaults to the ID of the authenticated user). If empty or equal to authenticated user, then `'current_password'` becomes required
current_password | string    | Current password of the user. If `'id'` argument is empty or equal to the authenticated user's ID, then this is required

> Json Response

```json
{
    "id": "ca02c000"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a> of the user having their password changed

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | User password was changed successfully
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
404	| User with the `'id'` provided cannot be found
406	| The `'current_password'` provided does not match the password of the authenticated user

<!--===================================================================-->
## Switch Account
<!--===================================================================-->

Allows a user to 'log in' to another account which the they have access to (see [Get List of Accounts](#get-list-of-accounts)). Most commonly this would be needed for a master account user accessing their sub-accounts. Only applicable to accounts from the [Account](#account) model

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/switch_account -d "account_id=[ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/switch_account`

Parameter  | Data Type | Description
---------  | --------- | -----------
account_id | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> of the account to login to. Defaults to the account which the user belongs to

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Account context switch successful
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
404	| Account with the `'account_id'` provided cannot be found

<!--===================================================================-->
## Single Sign On
<!--===================================================================-->

<aside class="success">This service is currently under development and not yet functional</aside>

SSO allows a reseller to maintain account management and act as an identity provider to have their system proxy the authorization requests to Eagle Eye Network servers after users have logged into the identity providers system

This is done through the standard SAML (Security Assertion Markup Language) and as such the identity provider will setup their account with a **brand_saml_publickey_ret** and **brand_saml_namedid_path**

  - The **brand_saml_publickey_cert** is a x509 certificate that contains a public key with which Eagle Eye Networks can validate that an SSO message is valid and verify that it has not been altered.  The format of this certificate is PEM (ascii encoded base 64 surrounded by lines containing **'-----BEGIN CERTIFICATE——‘** and **'——END CERTIFICATE——'**

  - The **brand_saml_namedid_path** is the xml xpath to the node that contains the email address of the user being logged in

Once the identity provider's account has been registered for SSO, then the identity provider can validate their users and then make a single sign on request with the users email address and the return link
This 64 bit encrypted message will be extracted from the header to be decoded and verified using the saml public key
Then using the saml named ID path, the user's email will be extracted and an `'auth_key'` will be provided for that user

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/sso -H "Authentication: [API_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/sso`

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Account context switch successful
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
404	| Account with the `'account_id'` provided cannot be found


<!--===================================================================-->
## Check Authentication is valid
<!--===================================================================-->

This call allows you to check if the current authentication is still valid.  This is helpful to use before making subsequent calls using existing authentication.

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/aaa/isauth -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -v
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/aaa/isauth`

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | User authentication is valid
401 | Unauthorized due to invalid session cookie


<!--===================================================================-->
## Logout
<!--===================================================================-->

Log out user and invalidate HTTP session cookie

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/logout -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/aaa/logout`

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
204 | User has been logged out
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
