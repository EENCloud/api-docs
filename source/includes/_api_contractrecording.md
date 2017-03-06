# Contract Recording

<!--TODO: This file is not included in the index.md. Figure out if we should expose these publicly or not -->
<!--===================================================================-->
## Overview

This service is used to start/stop recordings for our contract recording system.

<!--
<!--===================================================================-->
## Start Recording

> Request

```shell

PAYLOAD='{"service_entity":[SERVICE_ENTITY] \
"no_video_reason":[NO_VIDEO_REASON], \
"is_video":[IS_VIDEO],\
"is_sync":[IS_SYNC], \
"device_id":[DEVICE_ID],\
"recording_key:[RECORDING_KEY], \
"agent_first_name":[AGENT_FIRST_NAME], \
"agent_last_name":[AGENT_LAST_NAME], \
"manager_first_name":[MANAGER_FIRST_NAME], \
"manager_last_name":[MANAGER_LAST_NAME], \
"customer_first_name":[CUSTOMER_FIRST_NAME], \
"customer_last_name":[CUSTOMER_LAST_NAME], \
"second_customer_first_name":[SECOND_CUSTOMER_FIRST_NAME], \
"second_customer_last_name":[SECOND_CUSTOMER_LAST_NAME] \
}'

curl --cookie "auth_key=[AUTH_KEY]" -X POST -H "content-type: application/json" https://login.eagleeyenetworks.com/g/action/recordnow -d $PAYLOAD

```
> Response

Used to turn on recording for 1 camera, all cameras, or all cameras in a specific layout. As well as store associated metadata with the start of the recording. This endpoint should not be used for normal camera operation. After calling this function, all affected cameras will have their 'operating_hours' schedules removed, 'camera_on' is set to 1 (on), and 'video_capture_mode' is set to 'always'.

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/action/recordnow`

Property            | Type        | Required   | Description  
----------          | ----------- | ---------- | ----------  
device_id      	    | string      | false      | ID of the camera to record. If this parameter and the 'layout_id' parameter are omitted, all cameras with write access available to the requesting user will be used.
layout_id     	    | string      | false      | ID of the layout whose cameras will be set to record. All cameras in the layout will be affected. If this parameter and the 'device_id' parameter are omitted, all cameras with write access available to the requesting user will be used.
recording_key       | string      | false      | A key used to tag this recording. Can be used to retrieve this recording info later using the GET 'recording' service.
is_video            | bool        | false      | If set to true then only data for the recording will be saved. This will not activate a camera or save any video.
agent_first_name    | string      | false      | The first name of the user initiating the recording.
agent_last_name     | string      | false      | The last name of the user initiating the recording.
manager_first_name  | string      | false      | The first name of a supervisor to the user initiating a recording.
manager_last_name   | string      | false      | The last name of a supervisor to the user initiating a recording. 
customer_first_name | string      | false      | The first name of the customer/client being recorded.
customer_last_name  | string      | false      | The last name of the customer/client being recorded.
second_customer_first_name | string      | false      | The first name of a second customer/client being recorded.
second_customer_last_name  | string      | false      | The last name of a second customer/client being recorded.
service_entity      | string      | false      | An arbitrary string that can be used to identify and associate a contract recording with a specific location. 
no_video_reason     | string      | false      | The reason the customer/client has given for not wishing to be recorded.
is_sync             | bool        | false      | If set to true then the request will block until the camera has started recording video. 

### Error Status Codes - <!--TODO: Check archiver for extra status codes-->

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeded synchronously.
202	| Request was successfully submitted asynchronously. 
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

<!--===================================================================-->
## Stop Recording

> Request

```shell

curl --cookie "auth_key=[AUTH_KEY]" -X POST -H "content-type: application/json" https://login.eagleeyenetworks.com/g/action/recordoff -d '{"is_sync":[IS_SYNC], "device_id":[DEVICE_ID], "layout_id":[LAYOUT_ID]}'

```

Used to turn off recording for 1 camera, all cameras, or all cameras in a specific layout. As well as store associated metadata with the end of the recording. This endpoint should not be used for normal camera operation. After calling this function, all affected cameras will have their 'operating_hours' schedules removed, 'camera_on' is set to 0 (off), and 'video_capture_mode' is set back to 'event' (the default).

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/action/recordoff`

Parameter       | Data Type   | Required   | Description  
---------       | ----------- | ---------  | -----------
device_id     	| string      | false       | ID of the camera to turn off recording for. If this parameter and the 'layout_id' parameter are omitted, all cameras with write access available to the requesting user will be used.
layout_id    	| string      | false       | ID of the layout whose cameras will have recording turned off. All cameras in the layout will be affected. If this parameter and the 'device_id' parameter are omitted, all cameras with write access available to the requesting user will be used.
is_sync         | bool        | false      | If set to true then the request will block until the camera has finished recording video. 

### Error Status Codes - <!-- TODO: Check archiver for extra status codes -->

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeded synchronously.
202	| Request was successfully submitted asynchronously. 
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
-->
<!--===================================================================-->
## Get Recording Object

> Request TODO

```shell
```

> Json Response TODO

```json
```

Returns recording object by recording_key.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/recording`

Parameter       	| Data Type   	| Description
---------       	| ----------- 	| -----------
**recording_key**   | string      	| Recording Key

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

<!--===================================================================-->
## Update Recording Object

> Request TODO

```shell
```

> Json Response TODO

```json
```

Update a Recording

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/recording`

Parameter       	| Data Type   	| Description
---------       	| ----------- 	| -----------
**recording_key**   | string      	| Unique identifier (within an account) of a recording
meta 				| object 		| Meta data. This is meant to be a generic object that can store any data that is needed, so the properties are not predefined.

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
