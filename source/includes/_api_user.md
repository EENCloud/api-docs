# User

<!--===================================================================-->
## Overview
If a user isn't requesting their own user record, these apis requires SuperUser or AccountSuperUser (if accounts match) permissions. If no id is passed in the request, then it will attempt to get the data for the user that is authenticated and making the call.

<!--===================================================================-->
## User Model

> User Model

```json
{
    "id": "ca0e1cf2",
    "first_name": null,
    "last_name": "",
    "email": "john.doe@fakeemail.com",
    "owner_account_id": "00004206",
    "active_account_id": "00004206",
    "uid": " ",
    "is_superuser": 0,
    "is_account_superuser": 1,
    "is_staff": 0,
    "is_active": 1,
    "is_pending": 0,
    "is_master": 0,
    "is_user_admin": 1,
    "is_layout_admin": 1,
    "is_live_video": 1,
    "is_device_admin": 1,
    "is_export_video": 1,
    "is_recorded_video": 1,
    "street": [],
    "city": null,
    "state": null,
    "country": "US",
    "postal_code": null,
    "phone": null,
    "mobile_phone": null,
    "utc_offset": -25200,
    "timezone": "US/Pacific",
    "last_login": "20141006173752.672",
    "alternate_email": null,
    "sms_phone": null,
    "is_sms_include_picture": 0,
    "json": "{}",
    "camera_access": [
        [
            "1005f2ed",
            "r"
        ],
        [
            "100bd708",
            "r"
        ]
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
    "active_brand_subdomain": "login",
    "account_map_lines": null,
    "access_period": [],
    "is_terms_noncompliant": 1
}
```

### User Attributes
<table class="model user">
    <thead>
        <tr>
            <th class="key">Parameter</th>
            <th class="type">Data Type</th>
            <th class="desc">Description</th>
            <th class="edit">Editable</th>
            <th class="required">Required</th>
        </tr>
    </thead>
    <tbody>
        <tr class="">
            <td class="key">id</td>
            <td class="type">string</td>
            <td class="desc">Unique identifier for the user</td>
            <td class="edit"></td>
            <td class="required"></td>
        </tr>
        <tr class="editable">
            <td class="key">alternate_email</td>
            <td class="type">string</td>
            <td class="desc">Alternate email address</td>
            <td class="edit"></td>
            <td class="required"></td>
        </tr>
        <tr class="editable">
            <td class="key">first_name</td>
            <td class="type">string</td>
            <td class="desc">First name of the user</td>
            <td class="edit"></td>
            <td class="required"></td>
        </tr>
    </tbody>
</table>


Parameter               | Data Type     | Description | Editable | Required By
---------               | -----------   | ----------- | -------- | -----------
id                      | string        | Unique identifier for Authorized User | * | 
first_name              | string        | First name of Authorized User
last_name               | string        | Last name of Authorized User
email                   | string        | Email of Authorized User (* this email must only contain ASCII characters)
owner_account_id        | string        | Unique identifier of user's Account
uid                     | string        | UID
is_superuser            | int           | Is the user a Super User
is_account_superuser    | int           | Is the user an Account Super User
is_staff                | int           | Is the user a Staff User
is_active               | int           | Is the user Active
is_pending              | int           | Is the user a Pending user
is_master               | int           | Is the user in a Master Account
is_user_admin           | int           | Is the user a User Admin
is_layout_admin         | int           | Is the user a Layout Admin
is_live_video           | int           | Is the user authorized to access Live Video
is_device_admin         | int           | Is the user a Device Admin
is_export_video         | int           | Is the user authorized to Export Video
is_recorded_video       | int           | Is the user authorized to view Recorded Video
street                  | array[string] | Street Address as array [address line 1, address line 2, ...])
city                    | string        | City
state                   | string        | State
country                 | string        | Country
postal_code             | string        | Postal Code
phone                   | string        | Phone number
mobile_phone            | string        | Mobile phone number
utc_offset              | int           | Timezone offset from UTC in seconds (signed integer)
timezone                | string        | Timezone
last_login              | string        | Last time the user logged in, in EEN timestamp format: YYYYMMDDHHMMSS.NNN

sms_phone               | string        | SMS phone number
is_sms_include_picture  | int           | Include picture in sms notifications
json                    | [UserJson](#userjson-attributes) | Misc settings for the user as a JSON string
camera_access           | array[string] | List of devices (IDs) the user has access to
layouts                 | array[string] | List of layouts (IDs) the user has access to
is_notify_enable        | int           | Is notifications enabled for the User
notify_period           | array[string] | List of notification time periods, in the form: D-HHMM-HHMM
notify_rule             | array[string] | List of notification rules, in the form: id-type-delay (e.g. one-email-0)
is_branded              | int           | Is the user associated with an account that currently has branding enabled
is_terms_noncompliant   | int           | True if user has not accepted terms of service
alternate_email         | string        | Alternate email address
account_map_lines       | ???           | 
access_period           | ???           | 
active_brand_subdomain  | string        | If the user is associated with an account that has brandinge enabled, this will have that brand's subdomain if one exists
active_account_id       | string        | Unique identifier of user's active Account

### UserJson Attributes

Parameter   | Data Type     | Description
---------   | -----------   | -----------
een         | [UserJsonEen](#userjsoneen-attributes)   | EEN Object

### UserJsonEen Attributes

Parameter               | Data Type     | Description
---------               | -----------   | -----------
show_AMPM               | boolean       | Show times with AM/PM
milliseconds_display    | boolean       | Show time with milliseconds
layout_rotation_seconds | int           | If set, indicates how long to wait between layout changes during auto-rotation. If not set or set to 0, then no auto-rotation will occur.
motion_boxes            | boolean       | Determines if motion boxes should be shown
notify_levels           | array[int]    | 


<!--===================================================================-->
## Get User

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/user -d "A=[AUTH_KEY]"

or

curl --cookie "auth_key=[AUTH_KEY]" -G https://login.eagleeyenetworks.com/g/user -d id=[USER_ID]
```

Returns user object by ID. Not passing an ID will return the current authorized user.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/user`

Parameter | Data Type   | Description | Is Required
--------- | ----------- | ----------- | -----------
id        | string      | User Id     | false

<!--===================================================================-->
## Create User

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/user -d '{"first_name": "[FIRST_NAME]", "last_name": "[LAST_NAME]", "email": "[EMAIL]"}'
```

> Json Response

```json
{
    "id": "ca0ffa8c"
}
```

Creates a new User

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/user`

Parameter         | Data Type   | Description   
---------         | ----------- | -----------   
**first_name**    | string      | First Name    
**last_name**     | string      | Last Name     
**email**         | string      | Email Address 

<!--
Parameter         | Data Type   | Description   | Is Required
---------         | ----------- | -----------   | -----------
**first_name**    | string      | First Name    | true
**last_name**     | string      | Last Name     | true
**email**         | string      | Email Address | true
phone             | string      | Phone Number |
mobile_phone      | string      | Mobile Phone Number |
uid               | string      | An identifier of the user. Only Super Users can set this. |
owner_account_id  | string      | ID of owner account. Defaults to account of the user creating it. Must be an account the user has access to. For SuperUsers, it can be any account, for Account SuperUsers, it can be theirs or a child account. |
street        | string  | Street Address |
city          | string  | City |
state         | string  | State |
country       | string  | Country |
postal_code   | string  | Postal Code |
json          | string  | JSON formatted data representing various user settings. |
is_staff              | int     | 1 or 0 indicating the user has Staff permission. Only Super Users can set this. | 
is_superuser          | int     | 1 or 0 indicating the user has Super User permission. Only Super Users can set this. |
is_account_superuser  | int     | 1 or 0 indicating the user as Account Super User permission. Only Super Users and Account Super Users can set this. |
is_layout_admin       | int     | 1 or 0 indicating whether the user is a layout admin or not. |
is_device_admin       | int     | 1 or 0 indicating whether the user is a device admin or not. |
camera_access         | array   | Array of arrays, one per device for which the uer has permissions. Each sub array contains two elements. The first field is a device id, and the second field is a string of 1 or more chacterse indicating permissions for the user, for example: [‘cafedead’,’RWS’] = user can view, change, delete this device. [‘cafe0001’,’RW’] = user can view this layout and change this device. Permissions include: 'R' - user has access to view images and video for this camera. 'A' - user is an admin for this camera. 'S' - user can share this camera in a group share. Only superusers or account_superusers can edit this field. |
sms_phone             | string  | Phone number to be used for SMS messaging. |
is_sms_include_picture| int     | 1 or 0. If 1, use MMS messaging to include a picture w with alert messages sent to the sms_phone number. |
alternate_email       | string  | Email address to be used for alert notifications. |
timezone              | string  | User timezone. Defaults to US/Pacific. |
access_period         | array   | Contains the time periods during which the user has access to the account. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user has no time restrictions for access to the account. All times are expressed in local time and use a 24 hour clock formatted as HHMM. |
notify_period         | array   | Contains the time periods during which the user will receive alert notifications.. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user will not receive any alert notifications. All times are expressed in local time and use a 24 hour clock formatted as HHMM. |
is_notify_enable      | int     | 1 or 0. If 1, user will receive alert notifications as specified in notify_period. |
notify_rule           | array   | Contains alert notification rules Each rule contains three fields separated by dashes And takes the form: Alert_Label-Notification_Method-Delay. Alert_Label: a name defined by the user. Notification_Method: Valid values: email, sms, gui. Delay: the amount of time, in minutes between between notifications. |
-->



### Response Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
id              | string      | Unique identifier for the user

<!--===================================================================-->
## Update User

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/user -d '{"id": "[USER_ID]", "first_name": "[FIRST_NAME]"}'
```

> Json Response

```json
{
    "id": "ca0ffa8c"
}
```

Updates a user

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/user`

Parameter               | Data Type     | Description   | Is Required
---------               | -----------   | -----------   | -----------
**id**                  | string        | User Id       | true
first_name              | string        | First Name
last_name               | string        | Last Name
email                   | string        | Email Address
phone                   | string        | Phone Number
mobile_phone            | string        | Mobile Phone Number
uid                     | string        | An identifier of the user. Only Super Users can set this.
owner_account_id        | string        | ID of owner account. Defaults to account of the user creating it. Must be an account the user has access to. For SuperUsers, it can be any account, for Account SuperUsers, it can be theirs or a child account.
street                  | string        | Street Address
city                    | string        | City
state                   | string        | State
country                 | string        | Country
postal_code             | string        | Postal Code
json                    | [UserJson](#userjson-attributes) | JSON formatted data representing various user settings.
is_staff                | int           | 1 or 0 indicating the user has Staff permission. Only Super Users can set this.
is_superuser            | int           | 1 or 0 indicating the user has Super User permission. Only Super Users can set this.
is_account_superuser    | int           | 1 or 0 indicating the user as Account Super User permission. Only Super Users and Account Super Users can set this.
is_layout_admin         | int           | 1 or 0 indicating whether the user is a layout admin or not.
is_device_admin         | int           | 1 or 0 indicating whether the user is a device admin or not.
camera_access           | array         | Array of arrays, one per device for which the uer has permissions. Each sub array contains two elements. The first field is a device id, and the second field is a string of 1 or more chacterse indicating permissions for the user, for example: [‘cafedead’,’RWS’] = user can view, change, delete this device. [‘cafe0001’,’RW’] = user can view this layout and change this device. Permissions include: 'R' - user has access to view images and video for this camera. 'A' - user is an admin for this camera. 'S' - user can share this camera in a group share. Only superusers or account_superusers can edit this field.
sms_phone               | string        | Phone number to be used for SMS messaging.
is_sms_include_picture  | int           | 1 or 0. If 1, use MMS messaging to include a picture w with alert messages sent to the sms_phone number.
alternate_email         | string        | Email address to be used for alert notifications.
timezone                | string        | User timezone. Defaults to US/Pacific.
access_period           | array         | Contains the time periods during which the user has access to the account. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user has no time restrictions for access to the account. All times are expressed in local time and use a 24 hour clock formatted as HHMM.
notify_period           | array         | Contains the time periods during which the user will receive alert notifications.. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user will not receive any alert notifications. All times are expressed in local time and use a 24 hour clock formatted as HHMM.
is_notify_enable        | int           | 1 or 0. If 1, user will receive alert notifications as specified in notify_period.
notify_rule             | array         | Contains alert notification rules Each rule contains three fields separated by dashes And takes the form: Alert_Label-Notification_Method-Delay. Alert_Label: a name defined by the user. Notification_Method: Valid values: email, sms, gui. Delay: the amount of time, in minutes between between notifications.

### Response Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
id              | string      | Unique identifier for the user

<!--===================================================================-->
## Delete User

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X DELETE -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/user -d "id=[USER_ID]" -G
```

Deletes a user

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/user`

Parameter     | Data Type   | Description
---------     | ----------- | -----------
**id**        | string      | User Id

<!--===================================================================-->
## Get List of Users

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request GET https://login.eagleeyenetworks.com/g/user/list
```

> Json Response

```json
[
    [
        "ca0555c7",
        "Katherine",
        "Xiao",
        "katherine.xiao@fakeemail.com",
        [
            "export_video",
            "recorded_video",
            "live_video",
            "device_admin",
            "layout_admin",
            "account_superuser",
            "user_admin",
            "active"
        ],
        "20140929154619.000"
    ],
    [
        "ca00783b",
        "George",
        "Adams",
        "george.adams@fakeemail.com",
        [
            "export_video",
            "recorded_video",
            "live_video",
            "active"
        ],
        "20140716205645.000"
    ],
    [...],
    [...],
    [...]
]
```

Returns array of arrays, with each sub-array representing a user available to the current user. Please note that the ListUser model definition below has property keys, but that's only for reference purposes since it's actually just a standard array.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/user/list`

### User Array Attributes

Array Index     | Attribute   | Data Type       | Description
---------       | ----------- | -----------     | -----------
0               | id          | string          | Unique identifier for the user
1               | first_name  | string          | First Name of the user
2               | last_name   | string          | Last Name of the user
3               | email       | string          | Email address of the user
4               | permissions | array[string]   | List of permissions the user has
5               | last_login  | string          | Last time the user logged in, in EEN timestamp format: YYYYMMDDHHMMSS.NNN
