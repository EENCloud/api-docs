# Account

<!--===================================================================-->
## Overview
<!--===================================================================-->

The <a class="definition" onclick="openModal('DOT-Account')">Account</a> service allows managing Accounts by superusers and account superusers

<!--===================================================================-->
## Account Model
<!--===================================================================-->

> Account Model

```json
{
    "is_master_video_disabled_allowed": 1,
    "is_inactive": 0,
    "is_suspended": 0,
    "brand_name": null,
    "alert_mode": [
        "default",
        "Weekend"
    ],
    "is_master_video_disabled": 0,
    "contact_state": null,
    "first_responders": [
        [
            "mark@responders.com",
            "Mark",
            "O'Malley",
            "Responders",
            "Fake Account"
        ],
        [
            "jeff@noaccount.com",
            "Jeff",
            "O'Unverified",
            "Unverified Organization",
            "No Account"
        ],
        [...]
    ],
    "responder_cameras": [
      "12345678",
      "1010fake"
    ],
    "contact_first_name": "Willem",
    "is_disable_all_settings": 0,
    "timezone": "US/Pacific",
    "id": "11111111",
    "contact_country": "US",
    "is_system_notifications_disabled": 0,
    "camera_shares": [
        [
            "12345678",
            "joe@em.com,His account",
            "joe2@dd.com,That account"
        ],
        [...]
    ],
    "camera_share_perms": {
        "12345678": {
            "joe@em.com,His account": [
                "edit_motion_areas",
                "ptz_live",
                "edit_ptz_stations"
            ],
            "joe2@dd.com,That account": [
                "ptz_live"
            ]
        },
        "<camera_id>": {...}
    },
    "owner_account_id": "1010101b",
    "product_edition": null,
    "cc_info": [
        {
            "city": "",
            "name": "",
            "default": "",
            "street1": "",
            "street2": "",
            "number": "",
            "state": "",
            "tag": "",
            "postal_code": "",
            "expire": "",
            "country": "US",
            "type": ""
        }
    ],
    "brand_saml_publickey_cert": null,
    "brand_support_email": null,
    "is_billing_disabled": 0,
    "is_advanced_disabled": 0,
    "inactive_session_timeout": 720,
    "brand_logo_large": null,
    "brand_corp_url": null,
    "responder_active": true,
    "contact_street": [],
    "is_system_notification_images_enabled": 1,
    "is_custom_brand_allowed": 0,
    "holiday": [
        "20180101",
        "20180527",
        "20180704",
        "20180902",
        "20181128",
        "20181225"
    ],
    "is_rtsp_cameras_enabled": 0,
    "brand_saml_nameid_path": null,
    "is_contract_recording": 0,
    "utc_offset": -28800,
    "session_duration": 480,
    "is_custom_brand": 0,
    "contact_postal_code": null,
    "brand_logo_small": null,
    "is_active": 1,
    "work_days": "1111111",
    "is_add_delete_disabled": 0,
    "is_master": 0,
    "contact_email": "support@eagleeyenetworks.com",
    "brand_support_phone": null,
    "map_lines": null,
    "contact_mobile_phone": null,
    "work_hours": [
        "0800",
        "1730"
    ],
    "login_attempt_limit": null,
    "default_cluster": "c000",
    "customer_id": "1234",
    "name": "Account Name",
    "contact_city": null,
    "default_camera_passwords": "pwordpword",
    "contact_phone": null,
    "access_restriction": [
        "enable_mobile"
    ],
    "active_alert_mode": "default",
    "allowable_ip_address_range": [],
    "contact_last_name": "Dafoe",
    "contact_utc_offset": null,
    "camera_quantity": null,
    "brand_subdomain": "c000",
    "password_management_rules": {
        "allowed_minimum_length": 10,
        "allowed_maximum_length": 64,
        "days_to_expire": 0,
        "exclude_username": 0,
        "minimum_length": 10,
        "maximum_length": 126,
        "required_numeric_char": 0,
        "required_special_char": 0,
        "reuse_number_limit": 0,
        "reuse_time_limit": 0
    }
}
```

### Account (Attributes)

Parameter                             | Data Type            | Description                                                                          | Editable    | Required
---------                             | ---------            | -----------                                                                          |:-----------:| --------
**id**                                | string               | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> automatically generated and assigned during creation                                                                                                                            | **&cross;** | **<sub><form action="#get-account"><button>GET</button></form></sub>** <br>**<sub><form action="#update-account"><button>POST</button></form></sub>** <br>**<sub><form action="#delete-account"><button>DELETE</button></form></sub>**
**name**                              | string               | Name of the account                                                                  | **&check;** | **<sub><form action="#create-account"><button>PUT</button></form></sub>**
**contact_first_name**                | string               | First name of primary contact for account                                            | **&check;** | **<sub><form action="#create-account"><button>PUT</button></form></sub>**
**contact_last_name**                 | string               | Last name of primary contact for account                                             | **&check;** | **<sub><form action="#create-account"><button>PUT</button></form></sub>**
contact_email                         | string               | Email of primary contact for account                                                 | **&check;** |
contact_street                        | array[string]        | Array of strings containing street addresses of the primary contact for account [`'address line 1'`, `'address line 2'`]                                                                                                                                 | **&check;** |
contact_city                          | string               | City of primary contact for account                                                  | **&check;** |
contact_state                         | string               | State/province of primary contact for account                                        | **&check;** |
contact_postal_code                   | string               | Zip/postal code of primary contact for account                                       | **&check;** |
contact_country                       | string               | Country code of primary contact for account                                          | **&check;** |
contact_phone                         | string               | Phone number of primary contact for account                                          | **&check;** |
contact_mobile_phone                  | string               | Mobile phone number of primary contact for account                                   | **&check;** |
owner_account_id                      | string               | ID of the parent account (defaults to the account of the creating user)              | **&cross;** |
timezone                              | string               | Timezone of the account (defaults to `'US/Pacific'`) <br><br>Possible values: <br>`'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'`, `'UTC'`, ...                                                  | **&check;** |
status                                | array[string]        | Account status. This can only be edited by superusers and account superusers from the parent/owner account <br><br>Possible values: <br>`'active'` - normal working state <br>`'inactive'` - logins are not allowed <br>`'suspended'` - effectively no longer operational <br>`'pending_validation'` - default state after account creation (before the user has validated the account)                                       | **&check;** |
utc_offset                            | int                  | Signed integer offset in seconds of the timezone from UTC. Automatically generated based on the timezone field                                                                                                                                               | **&cross;** |
access_restriction                    | array[string]        | Array of strings containing access restrictions <br><br>Possible values: <br>`'enable_mobile'` - has access to mobile clients <br>`'enable_ip_restrictions'` - if present and if `'allowable_ip_address_range'` has been specified, limits logins to the address ranges specified                                                                                                                                           | **&cross;** |
allowable_ip_address_range            | array[string]        | Each entry in the array specifies one address range. Entries use the `'/'` format. For example, to limit access to `'192.168.123.0-192.168.123.255'`, the entry would be `'192.168.123.0/24'`. If no entries are present, `'0.0.0.0/0'` is implied           | **&cross;** |
session_duration                      | int                  | Session duration in minutes. Session duration of 0 means *stay logged in forever*    | **&check;** |
holiday                               | array[string]        | Array of strings containing dates during which holidays are observed. Format for dates is YYYYMMDD                                                                                                                                            | **&check;** |
work_days                             | string               | String of length 7. Each position in the string corresponds to a day of the week. Monday is position 0, Tuesday is position 1, etc. Each character in the string can have a value of 1 or 0. 1 means that this day is a work day                            | **&check;** |
work_hours                            | array[string]        | Two entries. Each entry containing a time expressed in local time. The first entry in the array is the work day start time. The second entry in the array is the stop time. Times are represented using a 24 hour clock and are formatted as HHMM <br><br>Example: 8AM would be 0800 and 5PM would be 1700                                                                                                                               | **&check;** |
alert_mode                            | array[string]        | Array of strings containing possible alert modes as defined for this account. Accepts an array of any number of strings of varying length. This controls what values are able to be chosen for the `'active_alert_mode'` field                                   | **&check;** |
active_alert_mode                     | string               | A string chosen from values in the account `'alert_mode'` array. Must be blank or one of the values defined in the alert_mode array. This is used to determine when to send motion alert notifications (defined by camera settings in the device model). If a motion alert is defined with an alert mode from one of the strings in the account 'alert_mode' array, then the notifications triggered from that motion alert will only be sent when the account `'active_alert_mode'` is also set to that same alert mode string defined for that motion alert                                                      | **&check;** |
default_camera_passwords              | string               | Comma-delimited string of default camera passwords                                   | **&check;** |
camera_shares                         | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>] | Array of arrays with each sub-array representing a camera to be shared to 1 or more recipients. First position is camera ID. The next positions are populated by one or multiple recipients. All recipients are comma-separated string values of `'email,account'`, where the `'account'` can be omitted (will be automatically populated if the email address is registered to an account in the system) <br><br>Example: <br>`[`<br>&nbsp;&nbsp;&nbsp;&nbsp;`[` <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'12345678'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'joe@em.com,His account'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'joe2@dd.com,That account'`<br>&nbsp;&nbsp;&nbsp;&nbsp;`]`<br>`]` <br><br><small><b>*Note:*</b> *camera_shares* and *camera_share_perms* are co-dependent and need to be updated together</small>                                                   | **&check;** |
[camera_share_perms](#account-camera_share_perms-camera_id) | json                 | Json object keyed with camera IDs representing all recipients per camera and all permissions per recipient  <br><br>Example: <br>`'12345678'`: `{`<br>&nbsp;&nbsp;&nbsp;&nbsp;`'joe@em.com,His account'`: `[`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'edit_motion_areas'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'ptz_live'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'edit_ptz_stations'`<br>&nbsp;&nbsp;&nbsp;&nbsp;`]`<br>`}` <br><br><small><b>*Note:*</b> *camera_shares* and *camera_share_perms* are co-dependent and need to be updated together</small>                                                                                                             | **&check;** |
is_revoke_admins                      | int                  | Indicates whether to revoke all admin permissions for the users in the account (1) or not (0). This field doesn't save anything on the account itself. It will revoke admin privileges of any admins in the account                                           | **&check;** |
is_master                             | int                  | Indicates whether the account is a master account (1) or not (0)                     | **&cross;** |
is_active                             | int                  | Indicates whether the account is active (1) or not (0)                               | **&cross;** |
is_inactive                           | int                  | Indicates whether the account is inactive (1) or not (0)                             | **&check;** |
is_suspended                          | int                  | Indicates whether the account is suspended (1) or not (0)                            | **&check;** |
product_edition                       | string               | Product edition the account is using                                                 | **&cross;** |
camera_quantity                       | int                  | Total number of cameras the account is allowed to use                                | **&cross;** |
is_custom_brand_allowed               | int                  | Indicates whether the account is allowed to have branding (1) or not (0)             | **&check;** |
is_custom_brand                       | int                  | Indicates whether the account has branding enabled (1) or not (0)                    | **&check;** |
brand_logo_small                      | string               | Base64 encoded image for the branded small logo (PNG, 160x52, transparent background)| **&check;** |
brand_logo_large                      | string               | Base64 encoded image for the branded large logo (PNG, 460x184, white background)     | **&check;** |
brand_subdomain                       | string               | Sub domain for the branded url                                                       | **&check;** |
brand_corp_url                        | string               | Corporate website url                                                                | **&check;** |
brand_name                            | string               | Branded company name                                                                 | **&check;** |
brand_saml_publickey_cert             | string               | Public certificate which Eagle Eye Networks will use to decrypt the SAML for SSO     | **&check;** |
brand_saml_nameid_path                | string               | The path within the SAML xml to find the users email address                         | **&check;** |
is_without_initial_user               | string               | Indicates whether to create the new account without an initial user (1) or not (0) (defaults to 0) <br><br>An initial user with `'is_account_superuser=1'` will be created using the arguments `'contact_first_name/contact_last_name/contact_email'` specified upon account creation                                                                                                                                            | **&check;** |
customer_id                           | string               | Arbitrary ID assigned to a sub-account by a master account                           | **&check;** |
is_master_video_disabled_allowed      | int                  | Indicates whether a sub-account can block video access to reseller (1) or not (0)    | **&check;** |
is_master_video_disabled              | int                  | Indicates whether video access is blocked to reseller (1) or not (0)                 | **&check;** |
is_contract_recording                 | int                  | Indicates whether the account is of type contract_recording. Controls whether contract recording features are enabled for the users in this account on the front-end GUI (1) or not (0)                                                                                       | **&check;** |
is_advanced_disabled                  | int                  | Indicates whether the reseller has disabled advanced functionality (1) or not (0) If this is set for a sub-account, the users in the sub-account cannot change any settings related to bandwidth, billing (retention and resolution) and certain account settings. Master users switched in still can modify these things if their permissions allow it                                                                             | **&check;** |
is_billing_disabled                   | int                  | Indicates whether the reseller has disabled editing settings in a sub-account that affect billing (1) or not (0). This controls whether users can change camera resolution/retention, add/delete cameras, etc                                                    | **&check;** |
is_add_delete_disabled                | int                  | Indicates whether the reseller has disabled adding or deleting devices (1) or not (0)| **&check;** |
is_disable_all_settings               | int                  | Indicates whether the reseller has disabled all device and most account settings (1) or not (0). Does not affect editing users, layouts, or sharing                                                                                                           | **&check;** |
first_responders                      | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>] | Array of arrays with each sub-array representing an emergency responder. Accounts can identify a list of email accounts that will serve as emergency responders. Emergency responders get access to the identified `'responder_cameras'` during an emergency (triggered by setting `'responder_active'`). A responder is identified by their email, first name, last name, company and their account <br><br>Example: <br>`[`<br>&nbsp;&nbsp;&nbsp;&nbsp;`[` <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'mark@responders.com'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'Mark'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'O'Malley'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'Responders'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'Fake Account'`<br>&nbsp;&nbsp;&nbsp;&nbsp;`]`<br>`]`                                                                                                     | **&check;** |
responder_active                      | <p hidden>???</p>    | Indicates whether the responder cameras can be seen by the users defined under `'first_responders'`                                                                                                                                | **&check;** |
responder_cameras                     | array[string]        | Array of camera <a class="definition" onclick="openModal('DOT-ESN')">ESNs</a> that are shared to first responders                                                                                                                                          | **&check;** |
inactive_session_timeout              | int                  | Maximum time period in seconds without activity before web session expires           | **&check;** |
login_attempt_limit                   | int                  | Maximum incorrect login attempts before the user account access becomes locked       | **&check;** |
is_rtsp_cameras_enabled               | int                  | Indicates whether the account can have cameras attached over RTSP (instead of ONVIF) (1) or not (0)                                                                                                                                                 | **&check;** |
brand_support_phone                   | string               | Branded support phone number                                                         | **&check;** |
default_cluster                       | string               | Indicates the data center cluster the account is assigned to                         | **&check;** |
is_system_notification_images_enabled | int                  | Indicates whether email notifications about online/offlice status should contain images from those cameras (1) or not (0)                                                                                                                                      | **&check;** |
map_lines                             | json                 | This is used by the front end to overlay lines over a map of the cameras for the account | **&check;** |
is_two_factor_authentication_forced   | int                  | Indicates whether Two-Factor Authentication is forced for all users in the account (1) or not and users are able to choose between Simple Authentication and TFA (0)                                                                                            | **&check;** |
contact_utc_offset                    | int                  | This field is no longer being used <small>**(DEPRECATED)**</small>                   | **&check;** |
[password_management_rules](#account-password_management_rules)| json                 | JSON object representing settings for Users passwords.      | **&check;** (with feature flag)|
[idp_settings](#account-idp_settings) | json                 | JSON object representing Identity Provider settinngs.                                | **&check;** |

<aside class="notice">The 'status' flag can only be set for sub-accounts from the master account</aside>

### Account - camera_share_perms - \<camera_id\>

Parameter      | Data Type     | Description
---------      | ---------     | -----------
[\<recipient\>](#account-camera_share_perms-camera_id-share_recipients) | json          | Recipient object representing a recipient and their set of permissions for the specified camera <br><br>Example: <br>`'joe@em.com,His account'`: `[`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'edit_motion_areas'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'ptz_live'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'edit_ptz_stations'`<br>&nbsp;&nbsp;&nbsp;&nbsp;`]`

### Account - camera_share_perms - \<camera_id\> - \<share_recipients\>

Parameter      | Data Type     | Description
---------      | ---------     | -----------
\<permission\> | array[string] | Array of strings each representing a set of predefined recipient permissions <br><br>Permissions: <br>`'edit_motion_areas'` - user can edit camera motion areas <br>`'ptz_live'` - user can control pan, tilt and zoom for a PTZ camera, recall PTZ stations <br>`'edit_ptz_stations'` - user can edit PTZ stations and control PTZ cameras <br><br>Example: <br>`[`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'edit_motion_areas'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'ptz_live'`<br>`]`

<aside class="notice">Camera-related flags can only be modified or set from within the account housing the cameras and only for valid cameras</aside>

### Account - password_management_rules

Parameters of password_management_rules object.
On password change by default users are disallow to set previous password.

**Length requirements**

Parameter               | Data Type      | Description
---------               | ---------      | -----------
minimum_length          | int            | Minimum password length. This can be set if feature flag is On (Default value: 10)
maximum_length          | int            | Maximum password length. This is a constant value and it is equal to 126.
allowed_minimum_length  | int            | Bottom range of password minimum length. This is a constant value and it is equal to 10.
allowed_maximum_length  | int            | Upper range of password minimum length. This is a constant value and it is equal to 64.

<aside class="notice">Following settings require feature flag. Conntact support to enable.</aside>

**Character requirements**

Parameter               | Data Type      | Description
---------               | ---------      | -----------
required_numeric_char   | int enum [0,1] | At password reset, the user will be required to create a password with at least one numeric character.
required_special_char   | int enum [0,1] | At password reset, the user will be required to create a password with at least one special character.

**Reuse requirements**

Parameter               | Data Type      | Description
---------               | ---------      | -----------
reuse_number_limit      | int            | At password reset, the user will be required to create a password that was not previously used for the selected number of previous passwords of the given user.
reuse_time_limit        | int            | At password reset, the user will be required to create a password that was not previously used for the selected number of days.

**Other requirements**

Parameter               | Data Type      | Description
---------               | ---------      | -----------
days_to_expire          | int            | The user will be required to create a new password in the given number of days.
exclude_username        | int enum [0,1] | At password reset, the user will be required to create a password that does not contain a username of the given user.

### Account - idp_settings
Account's IdP (Identity Provider) settings.

<aside class="notice">Following settings require feature flag. Conntact support to enable.</aside>

JSON Property             | Data Type | Description
------------------------- | --------- | -----------
is_enabled                | boolean   | Predicate, has the account enabled Authentication with Identity Provider?
is_subaccount_idp_allowed | boolean   | Predicate, is the Authentication with Identity Provider allowed for sub-accounts? (Editable only at the level of the master account)
issuer                    | string    | Identity Provider identifier to match SAML response with an appropriate account.
sso_url                   | string    | Identity Provider URL to which send an Authentication request.

**Notes on IdP settings in the context of the accounts hierarchy**  
There are three possible mutually exclusive modes of IdP configuration:

1. **SSO is disabled for all accounts (master and its subs)**  
The standard login page is going to be loaded if an unauthenticated user requests EEN site.

2. **SSO enabled on the master account**  
All of the accounts (master and its subs) use the master account's IdP settings to SSO.  

3. **SSO allowed for the sub-accounts**  
Sub-accounts can have an individual set of settings for IdP to SSO. SSO to master account is disabled.

**SSO Modes expressed with a master account idp_settings values**

SSO Modes                        | `is_enabled` | `is_subaccount_idp_allowed`
---------                        | ------------ | ---------------------------
1. disabled for all              | `false`      | `false`
2. enabled for all               | `true`       | `false`
3. enabled only for sub-accounts | `false`      | `true`

<!--===================================================================-->
## Get Account
<!--===================================================================-->

Returns an Account object by ID

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account -d "id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Account not found with the supplied ID

<!--===================================================================-->
## Create Account
<!--===================================================================-->

Create a new Account

> Request

```shell
curl -X PUT https://login.eagleeyenetworks.com/g/account -d '{"name": "[NAME]", "contact_first_name": "[CONTACT_FIRST_NAME]", "contact_last_name": "[CONTACT_LAST_NAME]", "contact_email": "[CONTACT_EMAIL]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/account`

Parameter                             | Data Type     | Description                                                                                            | Is Required
---------                             | ---------     | -----------                                                                                            | -----------
**name**                              | string        | Name of the account                                                                                    | true
**contact_first_name**                | string        | First name of primary contact for account                                                              | true
**contact_last_name**                 | string        | Last name of primary contact for account                                                               | true
**contact_email**                     | string        | Email of primary contact for account                                                                   | true
contact_street                        | array[string] | Array of strings containing street addresses of the primary contact for account [`'address line 1'`, `'address line 2'`]
contact_city                          | string        | City of primary contact for account
contact_state                         | string        | State/province of primary contact for account
contact_postal_code                   | string        | Zip/postal code of primary contact for account
contact_country                       | string        | Country code of primary contact for account
owner_account_id                      | string        | ID of the parent account (defaults to the account of the creating user)
timezone                              | string        | Timezone of the account (defaults to `'US/Pacific'`) <br><br>Possible values: <br>`'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'`, `'UTC'`, ...
status                                | array[string] | Account status. This can only be edited by superusers and account superusers from the parent/owner account <br><br>Possible values: <br>`'active'` - normal working state <br>`'inactive'` - logins are not allowed <br>`'suspended'` - effectively no longer operational <br>`'pending_validation'` - default state after account creation (before the user has validated the account)
access_restriction                    | array[string] | Array of strings containing access restrictions <br><br>Possible values: <br>`'enable_mobile'` - has access to mobile clients <br>`'enable_ip_restrictions'` - if present and if `'allowable_ip_address_range'` has been specified, limits logins to the address ranges specified
allowable_ip_address_range            | array[string] | Each entry in the array specifies one address range. Entries use the `'/'` format. For example, to limit access to `'192.168.123.0-192.168.123.255'`, the entry would be `'192.168.123.0/24'`. If no entries are present, `'0.0.0.0/0'` is implied
session_duration                      | int           | Session duration in minutes. Session duration of 0 means *stay logged in forever*
holiday                               | array[string] | Array of strings containing dates during which holidays are observed. Format for dates is YYYYMMDD
work_days                             | array[string] | String of length 7. Each position in the string corresponds to a day of the week. Monday is position 0, Tuesday is position 1, etc. Each character in the string can have a value of 1 or 0. 1 means that this day is a work day
work_hours                            | array[string] | Two entries. Each entry containing a time expressed in local time. The first entry in the array is the work day start time. The second entry in the array is the stop time. Times are represented using a 24 hour clock and are formatted as HHMM <br><br>Example: 8AM would be 0800 and 5PM would be 1700
alert_mode                            | array[string] | Array of strings containing possible alert modes as defined for this account. Accepts an array of any number of strings of varying length. This controls what values are able to be chosen for the `'active_alert_mode field'`
active_alert_mode                     | string        | A string chosen from values in the account `'alert_mode'` array. Must be blank or one of the values defined in the alert_mode array. This is used to determine when to send motion alert notifications (defined by camera settings in the device model). If a motion alert is defined with an alert mode from one of the strings in the account 'alert_mode' array, then the notifications triggered from that motion alert will only be sent when the account `'active_alert_mode'` is also set to that same alert mode string defined for that motion alert
default_camera_passwords              | string        | Comma-delimited string of default camera passwords
is_without_initial_user               | int           | Indicates whether to create the new account without an initial user (1) or not (0) (defaults to 0) <br><br>An initial user with `'is_account_superuser=1'` will be created using the arguments `'contact_first_name/contact_last_name/contact_email'` specified upon account creation
is_initial_user_not_admin             | int           | Indicates whether the initial user is an admin (0) or not (1)
[password_management_rules](#account-password_management_rules)| json                 | JSON object representing settings for Users passwords.
[idp_settings](#account-idp_settings) | json          | JSON object representing Identity Provider settinngs.
> Json Response

```json
{
    "id": "1234abcd"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
409	| Another account with the supplied contact email address already exists


<!--===================================================================-->
## Update Account
<!--===================================================================-->

Update Account information

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/account -d '{"id": "[ACCOUNT_ID]", "contact_first_name": "[CONTACT_FIRST_NAME]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/account`

Parameter                             | Data Type            | Description                                                                                     | Is Required
---------                             | ---------            | -----------                                                                                     | -----------
**id**                                | string               | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> generated during creation | true
name                                  | string               | Name of the account
contact_first_name                    | string               | First name of primary contact for account
contact_last_name                     | string               | Last name of primary contact for account
contact_email                         | string               | Email of primary contact for account
contact_street                        | array[string]        | Array of strings containing street addresses of the primary contact for account [`'address line 1'`, `'address line 2'`]
contact_city                          | string               | City of primary contact for account
contact_state                         | string               | State/province of primary contact for account
contact_postal_code                   | string               | Zip/postal code of primary contact for account
contact_country                       | string               | Country code of primary contact for account
contact_phone                         | string               | Phone number of primary contact for account
contact_mobile_phone                  | string               | Mobile phone number of primary contact for account
timezone                              | string               | Timezone of the account (defaults to `'US/Pacific'`) <br><br>Possible values: <br>`'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'`, `'UTC'`, ...
status                                | array[string]        | Account status. This can only be edited by superusers and account superusers from the parent/owner account <br><br>Possible values: <br>`'active'` - normal working state <br>`'inactive'` - logins are not allowed <br>`'suspended'` - effectively no longer operational <br>`'pending_validation'` - default state after account creation (before the user has validated the account)
access_restriction                    | array[string]        | Array of strings containing access restrictions <br><br>Possible values: <br>`'enable_mobile'` - has access to mobile clients <br>`'enable_ip_restrictions'` - if present and if `'allowable_ip_address_range'` has been specified, limits logins to the address ranges specified
allowable_ip_address_range            | array[string]        | Each entry in the array specifies one address range. Entries use the `'/'` format. For example, to limit access to `'192.168.123.0-192.168.123.255'`, the entry would be `'192.168.123.0/24'`. If no entries are present, `'0.0.0.0/0'` is implied
session_duration                      | int                  | Session duration in minutes. Session duration of 0 means *stay logged in forever*
holiday                               | array[string]        | Array of strings containing dates during which holidays are observed. Format for dates is YYYYMMDD
work_days                             | array[string]        | String of length 7. Each position in the string corresponds to a day of the week. Monday is position 0, Tuesday is position 1, etc. Each character in the string can have a value of 1 or 0. 1 means that this day is a work day
work_hours                            | array[string]        | Two entries. Each entry containing a time expressed in local time. The first entry in the array is the work day start time. The second entry in the array is the stop time. Times are represented using a 24 hour clock and are formatted as HHMM <br><br>Example: 8AM would be 0800 and 5PM would be 1700
alert_mode                            | array[string]        | Array of strings containing possible alert modes as defined for this account. Accepts an array of any number of strings of varying length. This controls what values are able to be chosen for the `'active_alert_mode field'`
active_alert_mode                     | string               | A string chosen from values in the account `'alert_mode'` array. Must be blank or one of the values defined in the alert_mode array. This is used to determine when to send motion alert notifications (defined by camera settings in the device model). If a motion alert is defined with an alert mode from one of the strings in the account `'alert_mode'` array, then the notifications triggered from that motion alert will only be sent when the account `'active_alert_mode'` is also set to that same alert mode string defined for that motion alert
default_camera_passwords              | string               | Comma-delimited string of default camera passwords
camera_shares                         | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>] | Array of arrays with each sub-array representing a camera to be shared to 1 or more recipients. First position of the sub-array is action, with `'M'` for add/modify or `'D'` for delete. Second position is camera ID. The next positions are populated by one or multiple recipients. All recipients are comma-separated string values of `'email,account'`, where the `'account'` can be omitted (will be automatically populated if the email address is registered to an account in the system). Recipients are only present in the `'M'` action <br><br>Example: <br>`[`<br>&nbsp;&nbsp;&nbsp;&nbsp;`[` <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'M'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'12345678'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'joe@em.com,His account'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'joe2@dd.com,That account'`<br>&nbsp;&nbsp;&nbsp;&nbsp;`]`<br>`]` <br><br><small><b>*Note:*</b> *camera_shares* and *camera_share_perms* are co-dependent and need to be updated together</small>
[camera_share_perms](#account-camera_share_perms-camera_id) | json                 | Json object keyed with camera IDs representing all recipients per camera and all permissions per recipient  <br><br>Example: <br>`'12345678'`: `{`<br>&nbsp;&nbsp;&nbsp;&nbsp;`'joe@em.com,His account'`: `[`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'edit_motion_areas'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'ptz_live'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'edit_ptz_stations'`<br>&nbsp;&nbsp;&nbsp;&nbsp;`]`<br>`}` <br><br><small><b>*Note:*</b> *camera_shares* and *camera_share_perms* are co-dependent and need to be updated together</small>
is_revoke_admins                      | int                  | Indicates whether to revoke all admin permissions for the users in the account (1) or not (0). This field doesn't save anything on the account itself. It will revoke admin privileges of any admins in the account
is_custom_brand                       | int                  | Indicates whether the account has branding enabled (1) or not (0)
brand_logo_small                      | string               | Base64 encoded image for the branded small logo (PNG, 160x52, transparent background)
brand_logo_large                      | string               | Base64 encoded image for the branded large logo (PNG, 460x184, white background)
brand_subdomain                       | string               | Sub domain for the branded url
brand_corp_url                        | string               | Corporate website url
brand_name                            | string               | Branded company name
brand_saml_publickey_cert             | string               | Public certificate which Eagle Eye Networks will use to decrypt the SAML for SSO
brand_saml_nameid_path                | string               | The path within the SAML xml to find the users email address
is_master_video_disabled_allowed      | int                  | Indicates whether a sub-account can block video access to reseller (1) or not (0)
is_master_video_disabled              | int                  | Indicates whether video access is blocked to reseller (1) or not (0)
is_contract_recording                 | int                  | Indicates whether the account is of type contract_recording. Controls whether contract recording features are enabled for the users in this account on the front-end GUI (1) or not (0)
is_advanced_disabled                  | int                  | Indicates whether the reseller has disabled advanced functionality (1) or not (0). If this is set for a sub-account, the users in the sub-account cannot change any settings related to bandwidth, billing (retention and resolution) and certain account settings. Master users switched in still can modify these things if their permissions allow it
is_billing_disabled                   | int                  | Indicates whether the reseller has disabled editing settings in a sub-account that affect billing (1) or not (0). This controls whether users can change camera resolution/retention, add/delete cameras, etc
is_add_delete_disabled                | int                  | Indicates whether the reseller has disabled adding or deleting devices (1) or not (0)
is_disable_all_settings               | int                  | Indicates whether the reseller has disabled all device and most account settings (1) or not (0). Does not affect editing users, layouts, or sharing
first_responders                      | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>] | Array of arrays with each sub-array representing an emergency responder. Accounts can identify a list of email accounts that will serve as emergency responders. Emergency responders get access to the identified `'responder_cameras'` during an emergency (triggered by setting `'responder_active'`). A responder is identified by their email, first name, last name, company and their account <br><br>Example: <br>`[`<br>&nbsp;&nbsp;&nbsp;&nbsp;`[` <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'mark@responders.com'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'Mark'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'O'Malley'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'Responders'`,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`'Fake Account'`<br>&nbsp;&nbsp;&nbsp;&nbsp;`]`<br>`]`
responder_active                      | <p hidden>???</p>    | Indicates whether the responder cameras can be seen by the users defined under `'first_responders'`
responder_cameras                     | array[string]        | Array of camera <a class="definition" onclick="openModal('DOT-ESN')">ESNs</a> that are shared to first responders
inactive_session_timeout              | int                  | Maximum time period in seconds without activity before web session expires
login_attempt_limit                   | int                  | Maximum incorrect login attempts before the user account access becomes locked
is_rtsp_cameras_enabled               | int                  | Indicates whether the account can have cameras attached over RTSP (instead of ONVIF) (1) or not (0)
brand_support_phone                   | string               | Branded support phone number
default_cluster                       | string               | Indicates the data center cluster the account is assigned to
customer_id                           | string               | Arbitrary ID assigned to a sub-account by a master account
is_system_notification_images_enabled | int                  | Indicates whether email notifications about online/offlice status should contain images from those cameras (1) or not (0)
map_lines                             | json                 | This is used by the front end to overlay lines over a map of the cameras for the account
contact_utc_offset                    | int                  | This field is no longer being used <small>**(DEPRECATED)**</small>
[password_management_rules](#account-password_management_rules)| json                 | JSON object representing settings for Users passwords.
[idp_settings](#account-idp_settings) | json                 | JSON object representing Identity Provider settinngs.

<aside class="notice">Camera-related flags can only be modified or set from within the account housing the cameras and only for valid cameras</aside>

<aside class="notice">The 'status' flag can only be set for sub-accounts from the master account</aside>

> Json Response

```json
{
    "id": "1234abcd"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Account not found with the supplied ID

<!--===================================================================-->
## Delete Account
<!--===================================================================-->

Delete an Account

> Request

```shell
curl -X DELETE https://login.eagleeyenetworks.com/g/account -d "id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/account`

Parameter | Data Type | Description
--------- | --------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Delete succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Account not found with the supplied ID

<!--===================================================================-->
## Get List of Accounts
<!--===================================================================-->

Returns an array of arrays with each sub-array representing an Account available to the user

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/list -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/list`

> Json Response

```json
[
    [
        "00004206",
        "Greater God",
        0,
        0,
        1,
        0,
        0,
        1,
        null,
        0,
        0,
        0,
        0,
        0,
        0,
        "20180228234555.722",
        0,
        "Greater ID",
        0,
        {"is_sso_enabled":0, "timezone":"US/Central", "feature_flags":[]},
        "A@GFIMLNQSUTYZcedgfhmqpsutvz"
    ],
    [...],
    [...],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute              | Data Type | Description
----------- | ---------              | --------- | -----------
0           | id                     | string    | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a>
1           | name                   | string    | Name of the account
2           | camera_online_count    | int       | Number of cameras currently online in the account
3           | camera_count           | int       | Number of cameras currently in the account
4           | user_count             | int       | Number of users currently in the account
5           | is_suspended           | int       | Indicates whether the account is suspended (1) or not (0)
6           | is_inactive            | int       | Indicates whether the account is inactive (1) or not (0)
7           | is_active              | int       | Indicates whether the account is active (1) or not (0)
8           | product_edition        | string    | Product edition the account is using
9           | bridge_online_count    | int       | Number of online bridges owned by the account
10          | bridge_active_count    | int       | Number of active bridges owned by the account
11          | bridge_count           | int       | Number of bridges owned by the account
12          | camera_off_count       | int       | Number of account cameras that are currently offline
13          | camera_available_count | int       | Number of available cameras in the account
14          | is_account_active      | int       | Indicates the account is active (1) or not (0)
15          | last_login             | string    | EEN timestamp of the last login by this account
16          | average_retention_days | int       | The average number of retention days for the account
17          | customer_id            | string    | The customer ID assigned to this account
18          | unknown_camera_count   | int       | The camera count where the status was 'invalid' (i.e. *unknown*) from all <a class="definition" onclick="openModal('DOT-EE-Archiver')">Archivers</a> <br><br>When requesting details about an <a class="definition" onclick="openModal('DOT-ESN')">ESN</a> from an Archiver they sometimes return 'invalid'. The middleware handles asking each of the Archivers for an ESN and sends back the first result that is valid
19          | [json](#account-json)  | json      | Miscellaneous settings of the account as a Json structure
20          | permissions            | string    | String of characters each defining a permission level of the current user

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Account - json

Parameter             | Data Type | Description
---------             | --------- | -----------
[json](#account-json) | string    | Miscellaneous settings of the account as a Json-formatted string

### Account - json

Parameter               | Data Type         | Description
---------               | ---------         | -----------
is_sso_enabled          | boolean           | Indicates whether single sign-on is enabled (1) or not (0)
timezone                | string            | Timezone of the account
feature_flags           | array[string]     | Array of strings representing the additional activated features	

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

<!--===================================================================-->
## Account Statistics
<!--===================================================================-->

This service allows to retrieve Statistics about a specific <a class="definition" onclick="openModal('DOT-Account')">Account</a> or all <a class="definition" onclick="openModal('DOT-Sub-Account')">Sub-Accounts</a> (for a <a class="definition" onclick="openModal('DOT-Master-Account')">Master Account</a>)

Obtains the total amount of:

- [Sub-Accounts](#total-number-of-sub-accounts)
- [Users](#total-number-of-users)
- [Bridges](#total-number-of-bridges)
- [Cameras](#total-number-of-cameras)
- [Online Users](#total-number-of-online-users)
- [Online Cameras](#total-number-of-online-cameras)

Each statistics request extends the `/g/account` endpoint in the following way `/g/account/statistics/<type_of_statistic>`


### Total Number of Sub-Accounts
<!--===================================================================-->

Used to get the number of all sub-accounts for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/sub_accounts -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/sub_accounts`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned (defaults to the account of the user) | false

> Json Response

```json
{
    "account_total": 6
}
```

### HTTP Response (Json Attributes)

Parameter     | Data Type  | Description
---------     | ---------  | -----------
account_total | int        | Total number of sub-accounts (defaults to 0 for sub-accounts)


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found

### Total Number of Users
<!--===================================================================-->

Used to get the number of all users for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/users -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/users`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned (defaults to the account of the user) | false

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


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found

### Total Number of Bridges
<!--===================================================================-->

Used to get the number of all bridges for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/bridges -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/bridges`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned (defaults to the account of the user) | false

> Json Response

```json
{
    "bridge_total": 1
}
```

### Total Number of Cameras
<!--===================================================================-->

Used to get the number of all cameras for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/cameras -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/cameras`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned (defaults to the account of the user) | false

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


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found

### HTTP Response (Json Attributes)

Parameter    | Data Type  | Description
---------    | ---------  | -----------
bridge_total | int        | Total number of bridges


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found

### Total Number of Online Users
<!--===================================================================-->

Used to get the number of all online users for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/online_users -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/online_users`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned (defaults to the account of the user) | false

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


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found

### Total Number of Online Cameras
<!--===================================================================-->

Used to get the number of all online cameras for the specific account

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/account/statistics/online_cameras -d "account_id=[ACCOUNT_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/account/statistics/online_cameras`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
account_id      | string       | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> for which the statistics will be returned (defaults to the account of the user) | false

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


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Account not found

