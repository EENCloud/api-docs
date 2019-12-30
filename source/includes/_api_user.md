# User

<!--===================================================================-->
## Overview
<!--===================================================================-->

The <a class="definition" onclick="openModal('DOT-User')">User</a> service allows managing Users to a degree outlined by the permission level

<!--===================================================================-->
## User Model
<!--===================================================================-->

> User Model

```json
{
    "id": "ca0e1cf2",
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
    "user_pin": 342141,
    "is_user_admin": 1,
    "is_layout_admin": 1,
    "is_user_create_layout": 1,
    "is_edit_map": 1,
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

### User (Attributes)

Parameter                            | Data Type            | Description                                                                          | Editable    | Required
---------                            | ---------            | -----------                                                                          |:-----------:| --------
**id**                               | string               | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a> automatically generated and assigned during creation                                                                                                                                    | **&cross;** | **<sub><form action="#update-user"><button>POST</button></form></sub>** <br>**<sub><form action="#delete-user"><button>DELETE</button></form></sub>**
**first_name**                       | string               | First name of the user                                                               | **&check;** | **<sub><form action="#create-user"><button>PUT</button></form></sub>**
**last_name**                        | string               | Last name of the user                                                                | **&check;** | **<sub><form action="#create-user"><button>PUT</button></form></sub>**
**email**                            | string               | Email address of the user (must contain only ASCII characters) <br><br> For TFA: address to which messages containing TFA code will be delivered                                                                                                                             | **&check;** | **<sub><form action="#create-user"><button>PUT</button></form></sub>**
uid                                  | string               | Identifier of the user <small>**(INTERNAL USE ONLY)**</small>                        | **&cross;** |
phone                                | string               | Phone number                                                                         | **&check;** |
mobile_phone                         | string               | Mobile phone number                                                                  | **&check;** |
street                               | array[string]        | Array of strings containing street addresses [`'address line 1'`, `'address line 2'`] | **&check;** |
city                                 | string               | City                                                                                 | **&check;** |
state                                | string               | State/province                                                                       | **&check;** |
country                              | string               | Two letter country code                                                              | **&check;** |
postal_code                          | string               | Zip/postal code                                                                      | **&check;** |
owner_account_id                     | string               | Unique identifier of the account that the user belongs to                            | **&cross;** |
active_account_id                    | string               | Unique identifier of the user's active account. When switching to a sub-account the `'active_account_id'` of that user in their session becomes the unique identifier of the sub-account that was switched into                                                              | **&cross;** |
user_pin                             | string               | Six digit string that signifies a support pin                                        | **&check;** |
is_staff                             | int                  | Indicates whether the user is a staff member (1) or not (0) <small>**(INTERNAL USE ONLY)**</small>                                                                                                                                    | **&check;** |
is_superuser                         | int                  | Indicates whether the user is a superuser (1) or not (0). Only superusers can set this <small>**(INTERNAL USE ONLY)**</small>                                                                                                                                    | **&check;** |
is_account_superuser                 | int                  | Indicates whether the user is an account superuser (1) or not (0)                    | **&check;** |
is_active                            | int                  | Indicates whether the user is active (1) or not (0)                                  | **&check;** |
is_pending                           | int                  | Indicates whether the user is pending (1) or not (0)                                 | **&cross;** |
is_master                            | int                  | Indicates whether the user is in a master account (1) or not (0)                     | **&cross;** |
is_user_admin                        | int                  | This is for backwards compatibility <small>**(DEPRECATED)**</small>                  | **&check;** |
is_layout_admin                      | int                  | Indicates whether the user is a layout administrator (1) or not (0)                  | **&check;** |
is_user_create_layout                | int                  | Indicates whether the user can create layouts (1) or not (0)                         | **&check;** |
is_edit_map                          | int                  | Indicates whether the user can add and edit floors, lines and shapes on the map(1), or not(0). | **&check;** |
is_live_video                        | int                  | Indicates whether the user is authorized to access live video (1) or not (0)         | **&check;** |
is_device_admin                      | int                  | This is for backwards compatibility <small>**(DEPRECATED)**</small>                  | **&check;** |
is_export_video                      | int                  | Indicates whether the user is authorized to export video (1) or not (0)              | **&check;** |
is_recorded_video                    | int                  | Indicates whether the user is authorized to view recorded video (1) or not (0)       | **&check;** |
is_edit_cameras                      | int                  | Indicates whether the user is authorized to edit cameras (1) or not (0)              | **&check;** |
is_edit_all_users                    | int                  | Indicates whether the user is authorized to manage users who are not administrators in the master account (1) or not (0)                                                                                                                                                | **&check;** |
is_edit_account                      | int                  | Indicates whether the user is authorized to edit account settings (1) or not (0)     | **&check;** |
is_system_notifications_disabled     | int                  | It reflects whether the account the user belongs to has system notifications disabled (1) or not (0). If true, then the user will not be able to receive any system alert notifications for the cameras in their account                                                   | **&check;** |
is_edit_ptz_stations                 | int                  | Indicates whether the user is authorized to edit PTZ stations (1) or not (0)         | **&check;** |
is_view_preview_video                | int                  | Indicates whether the user is authorized to view preview images from cameras (1) or not (0)                                                                                                                                                | **&check;** |
is_edit_camera_on_off                | int                  | Indicates whether the user is authorized to turn cameras on and off (1) or not (0)   | **&check;** |
is_edit_camera_less_billing          | int                  | Indicates whether the user is authorized to edit all camera settings except retention and full video resolution (1) or not (0)                                                                                                                                                | **&check;** |
is_edit_all_and_add                  | int                  | Indicates whether the user is authorized to add/edit/delete bridges and cameras (1) or not (0)                                                                                                                                                | **&check;** |
is_edit_sharing                      | int                  | Indicates whether the user is authorized to view/edit *Sharing* and *Responders* tabs under account settings (1) or not (0)                                                                                                                                                | **&check;** |
is_mobile_branded                    | int                  | Used by mobile devices                                                               | **&cross;** |
is_edit_admin_users                  | int                  | Indicates whether the user is authorized to manage all users in sub-account (1) or not (0)                                                                                                                                                | **&check;** |
is_view_contract                     | int                  | Indicates whether the user is authorized to view contracts and replay them (1) or not | **&check;** |
is_ptz_live                          | int                  | Indicates whether the user is authorized to control pan, tilt, zoom and recall stations while viewing preview or live video of PTZ cameras (1) or not (0)                                                                                                        | **&check;** |
is_view_audit_trail                  | int                  | Indicates whether the user is authorized to view the audit trail feature (1) or not (0)                                                                                                                                                | **&cross;** |
is_edit_users                        | int                  | Indicates whether the user is authorized to manage users who are not administrators in a sub-account (1) or not (0)                                                                                                                                            | **&check;** |
is_edit_motion_areas                 | int                  | Indicates whether the user is authorized to view and edit the *Motion* tab under camera settings (1) or not (0)                                                                                                                                                | **&check;** |
is_two_factor_authentication_enabled | int                  | Indicates whether [Two-Factor Authentication](#1-authenticate) is enabled for the user (1) or not (0)                                                                                                                                                | **&check;** |
user_authenticated_clients           | array[string]        | Array of strings containing trusted client devices that have been used for successful authorization of this user in the past (See [Authorized Devices](#authorized-devices))                                                                                   | **&check;** |
account_utc_offset                   | int                  | Signed integer offset in seconds of the timezone from UTC. This is the `'utc_offset'` value from the user's associated account model                                                                                                                           | **&cross;** |
account_work_days                    | string               | The `'work_days'` value from the user's associated account model. Indicates which day is a work day                                                                                                                                                | **&cross;** |
account_work_hours                   | array[string]        | The `'work_hours'` value from the user's associated account model. Indicates work hours for the account                                                                                                                                            | **&cross;** |
language                             | string               | Language code. The API currently only supports languages listsed in the `Create User` section as display languages for the GUI. It accepts any valid language code as input, but it will show English text for the unsupported languages                                      | **&check;** |
inactive_session_timeout             | int                  | Maximum time period in seconds without activity before web session expires. Defined in the settings of the account which the user belongs to                                                                                                                                | **&cross;** |
utc_offset                           | int                  | Signed integer offset in seconds of the timezone from UTC. Automatically generated based on the timezone field                                                                                                                                              | **&cross;** |
timezone                             | string               | Timezone of the user. Defaults to `'US/Pacific'` <br><br>Possible values: <br>`'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'`, `'UTC'`, ...                                                                 | **&check;** |
last_login                           | string               | EEN timestamp of the last login by the user. Format: YYYYMMDDHHMMSS.NNN              | **&cross;** |
alternate_email                      | string               | Alternate email address                                                              | **&check;** |
sms_phone                            | string               | For Two Factor Authentication: the phone number to which text messages (SMS) containing TFA code will be delivered                                                                                                                                          | **&check;** |
is_sms_include_picture               | int                  | DEPRECATED   |  |
[json](#user-json)                   | string               | Miscellaneous settings of the user as a Json-formatted string                        | **&check;** |
camera_access                        | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>] | Array of arrays, defined on a per device basis (Only superusers or account superusers can edit this field). Each sub-array contains two elements. The first field is the device unique identifier and the second field is a string of 1 or more characters indicating permissions of the user <br><br>Example: <br>[`'1005f2ed'`,`'RWS'`] = user can view, change and delete this device <br><br>Permissions include: <br>`'R'` - user has access to view images and video for this camera <br>`'W'` - user can modify and delete this camera <br>`'S'` - user can share this camera in a group share                                                                                                        | **&check;** |
layouts                              | array[string]        | Array of strings each representing a layout unique identifier the user has access to | **&cross;** |
is_notify_enable                     | int                  | Indicates whether notifications are enabled for the user (1) or not (0)              | **&check;** |
notify_period                        | array[string]        | Time periods during which the user will receive alert notifications. Each element of the array contains three fields separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user will not receive any alert notifications <br><br>All times are expressed in local time and use a 24 hour clock formatted as HHMM              | **&check;** |
notify_rule                          | array[string]        | Alert notification rules. Each rule contains three fields separated by dashes in the form of: `'<alert_label>-<notification_method>-<delay>'` <br><br>`'<alert_label>'` - name defined by the user <br>`'<notification_method>'` - either `'email'`, or `'gui'` <br>`'<delay>'` - amount of time in minutes between notifications                                                                                  | **&check;** |
is_branded                           | int                  | Indicates whether the user is associated with an account that currently has branding enabled (1) or not (0)                                                                                                                                                | **&cross;** |
active_brand_subdomain               | string               | If the user is associated with an account that has branding enabled, this will have that brand's subdomain if one exists                                                                                                                                             | **&cross;** |
account_map_lines                    | json                 | Automatically retrieved from the user's current account setting `'map_lines'`        | **&cross;** |
access_period                        | array[string]        | Contains the time periods during which the user has access to the account. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user has no time restrictions for access to the account. All times are expressed in local time and use a 24 hour clock formatted as HHMM                                                                                                                                               | **&check;** |
is_terms_noncompliant                | int                  | Indicates whether the terms of service have been accepted by the user (0) or not (1) | **&cross;** |

### User - json

Parameter             | Data Type | Description
---------             | --------- | -----------
[een](#user-json-een) | string    | EEN Object containing miscellaneous user settings

### User - json - een

Parameter               | Data Type  | Description
---------               | ---------  | -----------
show_AMPM               | boolean    | Indicates whether times should be shown with AM/PM (True) or not (False)
milliseconds_display    | boolean    | Indicates whether times should be shown with milliseconds (True) or not (False)
layout_rotation_seconds | int        | If set, indicates how long to wait between layout changes during auto-rotation. If not set or set to 0, then no auto-rotation will occur
motion_boxes            | boolean    | Indicates whether motion boxes should be shown (True) or not (False)
notify_levels           | array[int] | Array of integers indicating what level of notification should be set for the user <br><br>Notify level: <br>1 - `'Low'` - low alert notification setting <br>2 - `'High'` - high alert notification setting <br>3 - `'System'` - not a user-defined notification setting (encompasses camera status changes: online/offline/off/internet offline/...) <br><br>When creating motion alerts for a camera, `'High'` or `'Low'` can be assigned to the motion box trigger. When a camera changes status, any user who has chosen to receive `'System'` alert notifications will get notified of the camera status changes in their account. When an event triggers a motion alert within a motion box set to `'High'`, all users with notify levels `'High'` will be notified of the occurrence
permissions             | json       | This is for backwards compatibility <small>**(DEPRECATED)**</small>
employee_id             | string     | Identifier which a user with the necessary permissions can set for other users
layouts                 | json       | Json-formatted data keyed by the account unique identifier, where each value is an array of globally unique identifiers of layouts in the account, ordered by how the user wants to see them in their graphical user interface

<!--===================================================================-->
## Permissions
<!--===================================================================-->

### User Types

  - **<a class="definition" onclick="openModal('DOT-Superuser')">Superuser</a>** <small>**(INTERNAL USE ONLY)**</small>
  - **Staff** <small>**(INTERNAL USE ONLY)**</small>
  - **<a class="definition" onclick="openModal('DOT-Account-Superuser')">Account Superuser</a>**
  - **Regular User**

**Account superuser**

The account superuser has a full set of permissions. This user can manage all users in their account and sub-account

<aside class="notice">An indicator of the administrator status is the flag 'is_account_superuser'</aside>

**Regular user**

After being created the regular user has several default permissions : `'is_live_video'`, `'is_recorded_video'`, `'is_export_video'`

### List of Permissions

Required Parameter          | Description
------------------          | -----------
is_superuser                | <small>**(INTERNAL USE ONLY)**</small>
is_staff                    | <small>**(INTERNAL USE ONLY)**</small>
is_account_superuser        | Highest permission level possible for a user. All permissions are enabled (including the view permission)
is_edit_account             | View and edit all account settings (including categories: Control, Days, Security, Camera, Alerts, Notifications, Privacy, Sharing, Responders, and Retention). Ability to create new sub-accounts and access any sub-accounts created
is_edit_camera_on_off       | Ability to turn cameras on and off. If this is the only camera permission granted all others are hidden
is_edit_cameras             | Allows editing all camera settings (does not allow adding or deleting cameras). View previews is enabled automatically with this permission
is_edit_motion_areas        | Enables the *Motion* tab under camera settings. View previews and view recorded video is enabled automatically with this permission
is_edit_ptz_stations        | Enables the *PTZ* tab under camera settings. Set PTZ mode and add/edit/delete stations. View previews is enabled automatically with this permission
is_edit_sharing             | Enables the *Sharing* and *Responders* tabs under Account Settings (This setting is not required if `'is_edit_account'` is enabled)
is_edit_users               | Enables the management of non-administrator users in a sub-account (add/delete/modify users). Gives the ability to grant access to cameras and layouts
is_export_video             | Enables to download preview and full resolution video. View previews is enabled automatically with this permission
is_edit_all_and_add         | Enables the management of bridges and cameras (add/edit/delete). Refers to devices only. View previews is enabled automatically with this permission
is_edit_camera_less_billing | Allows editing all camera settings except retention and full video resolution (no ability to add/delete). View Previews is enabled automatically with this permission
is_layout_admin             | Enables the management of layouts (any user can create/edit/delete their own layouts. User layouts are always visible to admin users)
is_user_create_layout       | Enables creation of layouts.
is_edit_map                 | Ability to add and edit floors, lines and shapes on the map.
is_live_video               | Allows viewing full resolution video live from cameras. View previews is enabled automatically with this permission
is_ptz_live                 | Enables the control over pan, tilt, zoom and recall stations while viewing preview or live video of PTZ cameras. View previews is enabled automatically with this permission
is_recorded_video           | View history browser and archived video from cameras. View previews is enabled automatically with this permission
is_view_preview_video       | Enables the preview of images from cameras
is_edit_admin_users         | Enables the management of all users in a sub-account (add/delete/modify all users including administrators. Only available to Master Users). Also allows to create new sub-accounts and access any sub-accounts created. (Only available to Master Users.)
is_edit_all_users           | Enables the management of master users who are not administrators (add/delete/modify master account users) <br><br>Ability to grant access to sub-accounts. No user permissions are granted in sub-accounts. Only available to master account users
is_device_admin             | This is for backwards compatibility <small>**(DEPRECATED)**</small>
is_user_admin               | This is for backwards compatibility <small>**(DEPRECATED)**</small>


### User Permission Matrix

The table below shows which user management actions a user can execute depending on the account they belong to and which permission flags they have enabled

<table style="margin-top:30px;">
  <tr>
    <td style="background-color:transparent;" rowspan="3" colspan="3" ></td>
    <th colspan="4" style="text-align:center; border:solid 1px;background-color:#F3F7FA;">Who I am</td>
  </tr>
  <tr>
    <th colspan="2" style="text-align:center;border:solid 1px;background-color:#F3F7FA;">In Master Account</td>
    <th colspan="2" style="text-align:center;border:solid 1px;background-color:#F3F7FA;">In Child Account</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Account Superuser (ASU)</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Regular User (RU)</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Account Superuser (ASU)</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Regular User (RU)</td>
  </tr>
  <tr>
    <th style="vertical-align:middle; border:solid 1px;background-color:#F3F7FA;" rowspan="12">What I can do</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In own account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_all_users == True</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_users == True</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In parent account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td colspan="2" rowspan="3" style="background-color:#EAF2F6;text-align:center;border:solid 1px;vertical-align:middle;">Master Accounts have no parents</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In child account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_admin_users == True</td>
    <td rowspan="3" colspan="2" style="background-color:#EAF2F6;text-align:center;border:solid 1px;vertical-align:middle;">Child accounts have no children</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">Get, Create, Update, Delete when is_edit_users==True or is_edit_admin_users==True</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">yes when is_edit_admin_users == True</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;" rowspan="3">In sibling account</td>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To ASU</td>
    <td rowspan="3" colspan="2" style="background-color:#EAF2F6;text-align:center;border:solid 1px;vertical-align:middle;">Master Accounts have no siblings</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">To RU</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">nothing</td>
  </tr>
  <tr>
    <th style="text-align:center;border:solid 1px;background-color:#F3F7FA;vertical-align:middle;">Get list of users</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
    <td style="border:solid 1px;background-color:#F9FBFC;">no</td>
  </tr>
</table>

### TFA Enforcing

The following entities can edit the Two-Factor Authentication settings for an account:

  - The **Superuser** is able to force TFA for:
    - Any <a class="definition" onclick="openModal('DOT-Sub-Account')">Sub-Account</a> from within the <a class="definition" onclick="openModal('DOT-Master-Account')">Master Account</a>
    - The Sub-Account they have currently switched into
  - The **Account Superuser** is able to force TFA for:
    - The Sub Account in which they have been granted administrator permissions

<!--===================================================================-->
## Get User
<!--===================================================================-->

Returns a User object by ID

<aside class="notice">If no unique identifier is passed in the request, then the response will return data of the current user</aside>

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/user -d "id=[USER_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/user`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a> | false

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No user matching the unique identifier was found


<!--===================================================================-->
## Create User
<!--===================================================================-->

Create a new User. After being created the user is in the pending state (`'is_pending=1'`, `'is_active=0'`). The user creation email will be sent to the email address passed in the request. Then the user will be able to enter a password (In this step they may need to accept [Terms of Service](#terms-of-service)). After this operation the user will be active (`'is_pending=0'`, `'is_active=1'`)

> Request

```shell
curl -X PUT https://login.eagleeyenetworks.com/g/user -d '{"first_name": "[FIRST_NAME]", "last_name": "[LAST_NAME]", "email": "[EMAIL]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/user`

Parameter             | Data Type | Description | Is Required
---------             | --------- | ----------- | -----------
**first_name**        | string    | The first name of the user | true
**last_name**         | string    | The last name of the user | true
**email**             | string    | The email address of the user | true
sms_phone             | string    | Phone number to be used for SMS notifications | false
is_user_create_layout | int       | Indicates whether the user can create layouts (1) or not (0) | false
is_edit_map           | int       | Indicates whether the user can add and edit floors, lines and shapes on the map(1), or not(0). | false
language              | string    | The language of the user in the `ISO-639` format. Used for the welcome email message. If not specified, the language of the logged in user will be used, or, if unavailable - `en-us`.             | false


Language code | Language
------------- | --------
en-us         | English
ja-jp         | #日本語
de-de         | Deutsch
es-es         | Español
fr-fr         | Français
it-it         | Italiano
nl-nl         | Nederlands
pl-pl         | Polski
tr-tr         | Türkçe

<aside class="notice">When TFA authentication is used and authorization code delivery via SMS is set, the user's `'sms_phone'` number must be defined</aside>

> Json Response

```json
{
    "id": "ca0ffa8c"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
409	| The email address is currently already in use


<!--===================================================================-->
## Update User
<!--===================================================================-->

Update User information

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/user -d '{"id": "[USER_ID]", "first_name": "[FIRST_NAME]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/user`

Parameter                   | Data Type     | Description                                                                                                      | Is Required
---------                   | ---------     | -----------                                                                                                      | -----------
**id**                      | string        | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a> generated during creation | true
first_name                  | string        | First name of the user
last_name                   | string        | Last name of the user
email                       | string        | Email address of the user (email must only contain ASCII characters)
uid                         | string        | Identifier of the user. Only superusers can set this <small>**(INTERNAL USE ONLY)**</small>
phone                       | string        | Phone number
mobile_phone                | string        | Mobile phone number
street                      | array[string] | Array of strings containing street addresses [`'address line 1'`, `'address line 2'`]
city                        | string        | City
state                       | string        | State/province
country                     | string        | Two letter country code
postal_code                 | string        | Zip/postal code
user_pin                    | string        | Six digit string that signifies a support pin
is_staff                    | int           | Indicates whether the user is a staff member (1) or not (0). Only superusers can set this <small>**(INTERNAL USE ONLY)**</small>
is_superuser                | int           | Indicates whether the user is a superuser (1) or not (0). Only superusers can set this <small>**(INTERNAL USE ONLY)**</small>
is_account_superuser        | int           | Indicates whether the user is an account superuser (1) or not (0). Only superusers and account superusers can set this
is_layout_admin             | int           | Indicates whether the user is a layout administrator (1) or not (0)
is_user_create_layout       | int           | Indicates whether the user can create layouts (1) or not (0)
is_edit_map                 | int           | Indicates whether the user can add and edit floors, lines and shapes on the map(1), or not(0).
is_device_admin             | int           | This is for backwards compatibility <small>**(DEPRECATED)**</small>
is_user_admin               | int           | This is for backwards compatibility <small>**(DEPRECATED)**</small>
is_live_video               | int           | Indicates whether the user is authorized to access live video (1) or not (0)
is_export_video             | int           | Indicates whether the user is authorized to export video (1) or not (0)
is_recorded_video           | int           | Indicates whether the user is authorized to view recorded video (1) or not (0)
is_edit_cameras             | int           | Indicates whether the user is authorized to edit cameras (1) or not (0)
is_edit_all_users           | int           | Indicates whether the user is authorized to manage users who are not administrators in master account (1) or not (0)
is_edit_account             | int           | Indicates whether the user is authorized to edit account settings (1) or not (0)
is_edit_ptz_stations        | int           | Indicates whether the user is authorized to edit PTZ stations (1) or not (0)
is_view_preview_video       | int           | Indicates whether the user is authorized to view preview images from cameras (1) or not (0)
is_edit_camera_on_off       | int           | Indicates whether the user is authorized to turn cameras on and off (1) or not (0)
is_edit_camera_less_billing | int           | Indicates whether the user is authorized to edit all camera settings except retention and full video resolution (1) or not (0)
is_edit_all_and_add         | int           | Indicates whether the user is authorized to add/edit/delete bridges and cameras (1) or not (0)
is_edit_sharing             | int           | Indicates whether the user is authorized to view/edit *Sharing* and *Responders* tabs under account settings (1) or not (0)
is_edit_admin_users         | int           | Indicates whether the user is authorized to manage all users in sub-account (1) or not (0)
is_view_contract            | int           | Indicates whether the user is authorized to view contracts and replay them (1) or not (0)
is_ptz_live                 | int           | Indicates whether the user is authorized to control pan, tilt, zoom and recall stations while viewing preview or live video of PTZ cameras (1) or not (0)
is_edit_users               | int           | Indicates whether the user is authorized to manage users who are not administrators in a sub-account (1) or not (0)
is_edit_motion_areas        | int           | Indicates whether the user is authorized to view and edit the *Motion* tab under camera settings (1) or not (0)
language                    | string        | Language code. The API currently only supports languages listsed in the `Create User` section as display languages for the GUI. It accepts any valid language code as input, but it will show English text for the unsupported languages
timezone                    | string        | Timezone of the user. Defaults to `'US/Pacific'` <br><br>Possible values: <br>`'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'`, `'UTC'`, ...
alternate_email             | string        | Alternate email address
sms_phone                   | string        | Phone number to be used for Two Factor authentication code delivery when SMS method is selected
is_sms_include_picture      | int           | DEPRECATED
[json](#user-json)          | string        | Miscellaneous settings of the user as a Json-formatted string
camera_access               | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>] | Array of arrays, defined on a per device basis (Only superusers or account superusers can edit this field). The first field is the command `'M'` - modify or `'D'` - delete (clears all permissions, no arguments follow the camera ID in the request), the second field is the device unique identifier and the third field is a string of 1 or more characters indicating permissions of the user <br><br>Example: <br>[`'M'`,`'1005f2ed'`,`'RWS'`] = user can view, change and delete this device <br>[`'D'`,`'1005f2ed'`] = clears user permissions for the device <br><br>Permissions include: <br>`'R'` - user has access to view images and video for this camera <br>`'W'` - user can modify and delete this camera <br>`'S'` - user can share this camera in a group share
is_notify_enable            | int           | Indicates whether notifications are enabled for the user (1) or not (0)
notify_period               | array[string] | Time periods during which the user will receive alert notifications. Each element of the array contains three fields separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user will not receive any alert notifications <br><br>All times are expressed in local time and use a 24 hour clock formatted as HHMM
notify_rule                 | array[string] | Alert notification rules. Each rule contains three fields separated by dashes in the form of: `'<alert_label>-<notification_method>-<delay>'` <br><br>`'<alert_label>'` - name defined by the user <br>`'<notification_method>'` - either `'email'`, or `'gui'` <br>`'<delay>'` - amount of time in minutes between notifications
access_period               | array[string] | Contains the time periods during which the user has access to the account. Each element of the array contains three field separated by dashes. The first field is the day of the week where Monday is 0. The second element is the start time. The third element is the end time. If empty, user has no time restrictions for access to the account. All times are expressed in local time and use a 24 hour clock formatted as HHMM

<aside class="warning">If previously set, 'camera_access' can only be modified via command 'M' after clearing the permissions using command 'D'</aside>

> Json Response

```json
{
    "id": "ca0ffa8c"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No user matching the unique identifier was found


<!--===================================================================-->
## Delete User
<!--===================================================================-->

Delete a User

> Request

```shell
curl -X DELETE https://login.eagleeyenetworks.com/g/user -d "id=[USER_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/user`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a> | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No user matching the unique identifier was found


<!--===================================================================-->
## Get List of Users
<!--===================================================================-->

Returns array of arrays with each sub-array representing a User available to the current User

> Request

```shell
curl --request GET https://login.eagleeyenetworks.com/g/user/list -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
email     | string    | Email address of the user. The returned array will contain only the user which this email address is assigned to (empty if the user does not exist) <br><br>The search scope for a master account will be extended to all sub-accounts | false

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/user/list`

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
        "20180929154619.000",
        { 
            "weekly_newsletter": 0
        }
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
        "20180716205645.000",
        { 
            "weekly_newsletter": 1
        }
    ],
    [...],
    [...],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute          | Data Type     | Description
---------   | ------------------ | ---------     | -----------
0           | id                 | string        | <a class="definition" onclick="openModal('DOT-User-ID')">User ID</a>
1           | first_name         | string        | First name of the user
2           | last_name          | string        | Last name of the user
3           | email              | string        | Email address of the user
4           | permissions        | array[string] | Array of strings representing user permissions
5           | last_login         | string        | EEN timestamp of the last login by the user. Format: YYYYMMDDHHMMSS.NNN
6           | weekly_newsletter  | string        | Json-formatted string representing the weekly newsletter subscription defined in the following way: <br><br>1 - subscribed to the weekly newsletter<br>0 - not subscribed to the weekly newsletter

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

