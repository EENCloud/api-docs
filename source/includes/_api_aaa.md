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

<aside class="warning">Available only for branded accounts.</aside>

SSO allows a reseller to maintain account management and act as an identity provider to have their system proxy the authorization requests to Eagle Eye Network servers after users have logged into the identity providers system.
This is done through the standard SAML V2.0 (Security Assertion Markup Language)

<aside class="notice">This functionality requires a feature flag, if you want to enable it ask support.</aside>

### Authenticate request
Request authentication from an Identity Provider Service. (Service provider initiated SSO)

#### HTTP Request
`GET https://<branded_sub_domain>.eagleeyenetworks.com/g/aaa/sso/SAML2/SSO`

Parameter          | Data Type | Description                                                                                                                    | Is required
------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ | -----------
identity_provider  | string    | Name of the account's branded subdomain, which is linked with Identity Provider settings                                       | true
is_recycle_session | boolean   | If true and the user is already logged in, redirect the user to its account. Without authenticating with the Identity Provider | false
RelayState         | string    | URL the Service Provider should redirect to after successful sign-on                                                           | false
account_id         | string    | Account id, which holds Identity Provider settings                                                                             | false

After the successful creation of SAML AuthnRequest, redirection to the Identity Provider is going to be made.  
If a user is authenticated in the Identity Provider Service redirection to the Service Provider ACS (Assertion Consumer Service) is going to be made.

<aside class="notice">This functionality requires a feature flag, if you want to enable it ask support.</aside>

### ACS (Assertion Consumer Service)

> Decoded SAML response example

```xml
<saml2p:Response 
    Destination="https://branded_subsomain.eagleeyenetworks.com/g/aaa/sso/SAML2/Authenticate" 
    ID="id8972425978818166328589959" 
    IssueInstant="2019-11-05T16:53:17.411Z" 
    Version="2.0" 
    xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema">
    ...
    <saml2:Assertion 
        ID="id89724259788888402047455941" 
        IssueInstant="2019-11-05T16:53:17.411Z" 
        Version="2.0" 
        xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" 
        xmlns:xs="http://www.w3.org/2001/XMLSchema">
        <saml2:Issuer 
            Format="urn:oasis:names:tc:SAML:2.0:nameid-format:entity" 
            xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">exk1huy3reR4Fs9gL357
        </saml2:Issuer>
        <ds:Signature 
            xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:SignedInfo>
                <ds:CanonicalizationMethod 
                    Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
                <ds:SignatureMethod 
                    Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>
                <ds:Reference 
                    URI="#id89724259788888402047455941">
                    <ds:Transforms>...<ds:DigestMethod 
                        Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
                    <ds:DigestValue>...</ds:DigestValue>
                </ds:Reference>
            </ds:SignedInfo>
            <ds:SignatureValue>...</ds:SignatureValue>
            <ds:KeyInfo>
                <ds:X509Data>
                    <ds:X509Certificate>...</ds:X509Certificate>
                </ds:X509Data>
            </ds:KeyInfo>
        </ds:Signature>
        <saml2:Subject 
            xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
            <saml2:NameID 
                Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">orion@belt.com
            </saml2:NameID>
            <saml2:SubjectConfirmation 
                Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
                <saml2:SubjectConfirmationData 
                    NotOnOrAfter="2019-11-05T16:58:17.411Z" 
                    Recipient="https://branded_subsomain.eagleeyenetworks.com/g/aaa/sso/SAML2/Authenticate"/>
            </saml2:SubjectConfirmation>
        </saml2:Subject>
        <saml2:Conditions 
            NotBefore="2019-11-05T16:48:17.411Z" 
            NotOnOrAfter="2019-11-05T16:58:17.411Z" 
            xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
        </saml2:Conditions>
        <saml2:AuthnStatement 
            AuthnInstant="2019-11-05T16:53:17.411Z" 
            SessionIndex="id1572972797411.929762837" 
            xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
            <saml2:AuthnContext>
                <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:X509</saml2:AuthnContextClassRef>
            </saml2:AuthnContext>
        </saml2:AuthnStatement>
        <saml2:AttributeStatement 
            xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
            <saml2:Attribute 
                Name="firstName" 
                NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue 
                    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                    xsi:type="xs:string">Orion
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute 
                Name="lastName" 
                NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue 
                    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                    xsi:type="xs:string">Belt
                </saml2:AttributeValue>
            </saml2:Attribute>
            <saml2:Attribute 
                Name="access" 
                NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                <saml2:AttributeValue 
                    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
                </saml2:AttributeValue>
            </saml2:Attribute>
        </saml2:AttributeStatement>
    </saml2:Assertion>
</saml2p:Response>
```
(Identity provider initiated SSO)

#### HTTP Request
`POST https://<branded_sub_domain>.eagleeyenetworks.com/g/aaa/sso/SAML2/Authenticate`

Parameter    | Data Type | Description                                                             | Is required
------------ | --------- | ----------------------------------------------------------------------- | -----------
SAMLResponse | string    | Encoded (base64) SAML2 Response message ([see details](#suported-saml-elements)) | true
RelayState   | string    | URL the Service Provider should redirect to after successful sign-on    | false

HTTP Status Code | Description
---------------- | -----------
302 | Relaying SSO authentication
400 | Unexpected or non-identifiable arguments are supplied
403 | SSO is disabled for this Account
501 | SSO not active for this Account

#### Suported SAML elements
- **NameID**: The element which holds user email.  
- **Issuer**: Identity Provider identifier to match SAML response with an appropriate account.  
- **Conditions**:  Additional conditions on the use of the assertion can be provided inside this element. Currently supported: `NotBefore` and `NotOnOrAfter`.

#### Attribute Statement

Supported Attributes Names | Data Type | Description
-------------------------- | --------- | -----------
firstName                  | string    | User's first name
lastName                   | string    | USer's last name

SAML Signature               | Requirements      | Description
---------------------------- | ------------      | -----------
Signature Algorithm          | RSA-SHA1          | The signing algorithm used to digitally sign the SAML assertion and response
Digest Algorithm             | SHA1              | The digest algorithm used to digitally sign the SAML assertion and response
Authentication context class | X.509 Certificate | Authentication restriction

### Single Log Out

#### HTTP Request
`GET https://login.eagleeyenetworks.com/g/aaa/sso/SAML2/LogOut`

Parameter         | Data Type | Description                                                                              | Is required
----------------- | --------- | ---------------------------------------------------------------------------------------- | -----------
identity_provider | string    | Name of the account's branded subdomain, which is linked with Identity Provider settings | true

<aside class="warning">Deprecated, please use the above instead.</aside>

This is done through the standard SAML2 (Security Assertion Markup Language) and as such the identity provider will setup their account with a **brand_saml_publickey_ret** and **brand_saml_namedid_path**

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
