# Action

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service defines several macro actions that can be attached to <a class="definition" onclick="openModal('DOT-Device')">Devices</a>. These are convenience functions. The same functionality provided herein can also be accomplished via individual setting calls. Most actions can be scheduled to occur now or at some point in the future

Given the macro nature and the number of devices and operations that may occur, as long as the arguments are correct, the service will return success status code regardless of the result on each individual device. The application should monitor the vent stream to determine success or failure of the action on a device to device basis

<!--===================================================================-->
## Turn All Cameras On
<!--===================================================================-->

Used to turn on all cameras in the user’s account. User must be an account superuser. Has no effect on body worn cameras.

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/action/allon -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/action/allon`

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Turn All Cameras Off
<!--===================================================================-->

Used to turn off all cameras in the user’s account. User must be an account superuser. Has no effect on body worn cameras.

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/action/alloff -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/action/alloff`

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Recording On
<!--===================================================================-->

Used to turn on recording for cameras in a specific layout. The result of this to the affected cameras will be that all `'operating_hours'` schedules are removed, `'camera_on'` is set to 1 (on) and `'video_capture_mode'` is set to `'always'`. The layout object will have it's recording_key set to the value specified in the request. Has no effect on unmanaged cameras (bodycam, mobile cam, analog, etc.).

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/action/recordnow -H "Authentication: [API_KEY]" -H "Content-Type: application/json" --cookie "auth_key=[AUTH_KEY]" -d '{"recording_key":"[RECORDING_KEY]", "layout_id":"[LAYOUT_ID]"}'
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/action/recordnow`

Parameter     | Data Type | Description
---------     | --------- | -----------
layout_id     | string    | ID of the layout for which cameras will be set to record. All cameras in the layout will be affected.
recording_key | string    | A key used to tag this recording. Can be used to retrieve this recording info later using the GET `'recording'` service

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Recording Off
<!--===================================================================-->

Used to turn off recording for cameras in a specific layout. The result of this to the affected cameras will be that all `'operating_hours'` schedules are removed, `'camera_on'` is set to 0 (off) and `'video_capture_mode'` is set back to `'event'` (default). The layout will have it's recording_key nulled out.

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/action/recordoff -H "Authentication: [API_KEY]" -H "Content-Type: application/json" --cookie "auth_key=[AUTH_KEY]" -d '{"layout_id":"[LAYOUT_ID]"}'
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/action/recordoff`

Parameter | Data Type | Description
--------- | --------- | -----------
layout_id | string    | ID of the layout for which cameras will have recording turned off. All cameras in the layout will be affected.

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

