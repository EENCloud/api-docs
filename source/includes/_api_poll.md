# Poll

<!--===================================================================-->
## Overview

The poll service provides a mechanism for an application to receive intial state and change notifications of events from the Eagle Eye service. These entities are grouped by resource. There are five main resources:

  * thumb - Thumbnail resource. Provides a timestamp for a thumbnail image. One can use the timestamp to grab the actual thumbnail image.
  * pre - Preview resource. Provides a timestamp for a preview image. One can use the timestamp to grab the actual preview image.
  * video - Video resource. Provides a start and end timestamp of a video event.
  * event - Event resource. Provides full event information.
  * [status](#status-bitmask) - A bitmask flag defining the state of a bridge or a camera.

Events come from lots of sources:

  * Devices or Cameras (camera alerts, start and stop recording, etc.)
  * System Events (maintenance, server changes)
  * Account Events (other user changes, account alerts, layout changes).
  * Analytic and API events (ANNT events)

Events reflect the current state in the system, and a new event is generated when something changes.  Almost every aspect of the system can be tracked via events  - motion in front of a camera, camera on/offline, camera turned on/off, downloads complete, cameras added or deleted  etc.  Resources provide summaries of common events, but through the "event" resource any activity can be monitored.

This service will continually be extended. Any UI should not care about stuff that it does not understand. 

Poll supports two protocals - http and websocket.  Both provide the same basic functionality - a json request describes the events of interest, the server provides a json response with initial state for the requested  events, and updates when any change. Websocket is a much more efficient model, and should be used where ever possible.

HTTP Poll implements a  stateful request model via successive HTTP requests. The initial request is a POST with a JSON body describing the events of interest, which receive a JSON response containing state of all the requested objects and a token.  Subsequent GET requests include the token, and the server will respond when any event of interest changes (or when the request times out).  The session is maintained server side as long as the client continues to request with the token. To change the entries in the subscription a new session is initiated with a new POST. 

Websocket poll has a somewhat more flexible model.  The websocket connection implements the session logic. JSON formatted messages from the client modify the state of the session.  As new events are added to the session, their initial state is pushed from the server, and subsequent messages are pushed on any event change. There are two websocket interfaces ws_poll (deprecated) and ws_poll2.  The older ws_poll interface mirrors the statefull symantics of the http interface - all events specified in a subscription will be update in the initial response. The ws_poll2 interface can spread the response over many messages. This results in ws_poll2 being much more responsive on initial start up.  ws_poll2 also allows deletion of events from the session, and will maintain the subscription even if some event is not available.

Each resource type has a specific object format in response:

Type        | Response          | Notes
---------   | -----------       | -----------     
video       | [startts, endts]  | List of start, end Timestamps for video segment. Updates at start and per key frame received until end.
thumb       | thumbts           | Timestamp of latest thumbnail image
pre         | prets             | Timestamp of latest preview image
[status](#status-bitmask) | bitmask           | A numerical bitmask defining the status. Bit position defines status. The meaning of each bit is defined in the table below.
event       | object            | Events are a key value pair, where the key is the four CC of the event, and event structure are the actual meta data for that specific event. Available events are shown in the table below.

## Status Bitmask

HEX Value | Status
--------- | ----------
0x000001  | Camera Online **(DEPRECATED)**
0x000002  | Stream Attached (Camera Communicating With Bridge) **(DEPRECATED)**
0x000004  | Camera On (User Setting) **(DEPRECATED)**
0x000008  | Camera Recording **(DEPRECATED)**
0x000010  | Camera Sending Previews
0x000020  | Camera Located (Bridge has found the camera)
0x000040  | Camera Not Supported
0x000080  | Camera Configuration in Process (Bridge Configuring Camera)
0x000100  | Camera Needs ONVIF Password
0x000200  | Camera Available But Not Yet Attached
0x000400  | *Internal Status*
0x000800  | Camera Error
0x001000  | *Internal Status*
0x002000  | *Internal Status*
0x004000  | *Reserved*
0x008000  | *Reserved*
0x010000  | Invalid State (Unknown State)
0x020000  | Camera On (User Setting)
0x040000  | Camera Streaming Video
0x080000  | Camera Recording
0x100000  | Camera Online

This status bit mask is used to determine what the high-level/overall camera status is, using the following logic:

IF "Camera On" (bit 17)==0 THEN "Off" (orange forbidden icon)
<br>ELSE IF "Registered" (bit 20)==0 THEN "Internet Offline" (red exclamation icon)
<br>ELSE IF "Streaming" (bit 18)==1 THEN "Online" (green check icon)
<br>ELSE IF "Password" (bit 8)==1 THEN "Password Needed" (effectively "Offline") (red padlock icon)
<br>ELSE "Offline" (red X icon)

Recording status uses the following logic:

IF "Recording" (bit 19) THEN Recording (green circle icon)

IF "Invalid" (bit 16)==1 THEN no status change (use whatever status bits were set previously)

## Event Objects

fourcc | name
-----|-------
AABT | ETagCameraArchiverAbort
ABRT | ETagCameraAbort
AEAC | ETagAccountEventAccountCreate
AEAD | ETagAccountEventAccountDelete
AEAH | ETagAccountEventAccountChange
AECC | ETagAccountEventUserConfigChange
AEDA | ETagAlertDevice
AEDC | ETagAccountEventDeviceCreate
AEDD | ETagAccountEventDeviceDelete
AEDH | ETagAccountEventDeviceChange
AEDN | ETagAlertNotification
AEDO | ETagAccountEventDownload
AEEC | ETagAccountEventLayoutCreate
AEED | ETagAccountEventLayoutDelete
AEEL | ETagAccountEventLayoutChange
AELD | ETagAccountEventLiveDisplay
AELI | ETagAccountEventLogIn
AELO | ETagAccountEventLogOut
AEPT | ETagAccountEventPTZ
AEUC | ETagAccountEventUserCreate
AEUD | ETagAccountEventUserDelete
ALME | ETagAlertMotionEnd
ALMS | ETagAlertMotionStart
ALRE | ETagAlertRoiMotionEnd
ALRS | ETagAlertRoiMotionStart
ANNT | ETagAnnotate
BBOO | ETagBridgeBoot
BBWS | ETagBridgeBWSample
BUBW | ETagUploadBandwidth
CBWS | ETagCameraBWSample
CCCF | ETagCurlFail
CCLC | ETagCloudConnect
CCLD | ETagCloudDisconnect
CDLT | ETagCameraDataLost
CECF | ETagCameraFound
CECL | ETagCameraLost
COBC | ETagCameraBounce
COFF | ETagCameraOff
CONN | ETagCameraOn
CPRG | ETagCameraPurge
CSAT | ETagCameraStreamAttach
CSAU | ETagCameraStreamAttachUnique
CSDT | ETagCameraStreamDetach
CSDU | ETagCameraStreamDetachUnique
CSST | ETagStreamStats
CSSU | ETagStreamStatsUnique
CSTC | ETagCameraSettingsChange
CSTS | ETagCameraSettings
CZDC | ETagCameraSettingsDeltaZ
CZTC | ETagCameraSettingsChangeZ
CZTS | ETagCameraSettingsZ
EAEE | ETagEventAlwaysEnd
EAES | ETagEventAlwaysStart
ECOF | ETagStatusCameraOffline
ECON | ETagStatusCameraOnline
EMEE | ETagEventMotionEnd
EMES | ETagEventMotionStart
EMEU | ETagEventMotionUpdate
ENEE | ETagEventAppEnd
ENES | ETagEventAppStart
ENEU | ETagEventAppUpdate
EPEE | ETagEventPTZEnd
EPES | ETagEventPTZStart
ESEE | ETagEventStreamEnd
ESES | ETagEventStreamStart
EVVS | ETagEventVideoSwap
ITFU | ETagInterfaceUpdate
MRBX | ETagMotionBoxes
MRSZ | ETagMotionSizeReport
NOOP | ETagNOOP
NVPT | ETagNameValueTable
PRFB | ETagPreviewBacking
PRFR | ETagPreviewFrame
PRFU | ETagPreviewUploaded
PRSE | ETagPreviewStreamEnd
PRSS | ETagPreviewStreamStart
PRSU | ETagPreviewStreamUpdate
PRTH | ETagThumbFrame
PTZS | ETagPTZStatus
RCHB | ETagStatusRegisterCameraHeartbeat
RCOF | ETagStatusRegisterCameraOffline
RCON | ETagStatusRegisterCameraOnline
ROME | ETagRoiMotionEnd
ROMS | ETagRoiMotionStart
ROMU | ETagRoiMotionUpdate
SBWS | ETagStreamBWSample
SCRN | ETagScreen
SSTE | ETagStreamerStatusEvent
VREE | ETagVideoEnd
VRES | ETagVideoStart
VRKF | ETagVideoKeyFrame
VRSU | ETagVideoStatusUpdate

<!--===================================================================-->
## Initialize Poll

> Request Json

```json
{
    "cameras": {
        "100e1e23": {
            "resource": [
                "pre",
                "thumb",
                "status",
                "event"
            ],
            "event": [
            	"MRBX"
            ]
        },
        "10097d15": {
            "resource": [
                "pre",
                "thumb",
                "status",
                "event"
            ],
            "event": [
            	"MRBX"
            ]
        },
        "<camera_id>": {...},
        "<camera_id>": {...},
        "<camera_id>": {...}
    }
}
```
Subscribe to poll service, which is required for GET /poll.
Response headers: set_cookie: ee-poll-ses=xxxxxx


### HTTP Request

`POST https://login.eagleeyenetworks.com/poll`

Parameter       | Data Type   | Description
---------       | ----------- | -----------
cameras 		| [PostPollCameras](#postpollcameras-attributes) | Cameras

### PostPollCameras Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
<camera_id> 	| [PostPollCamera](#postpollcamera-attributes) | camera_id holding the data structure for the camera
* Note This json attribute contains as many PostPollCamera json objects as the user desires. The key for each PostPollCamera is the camera_id.

### PostPollCamera Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
resource 		| array[string, enum] | enum: pre, thumb, status, event
event 			| array[string, enum] | enum: [event objects](#event-objects)

> Json Response

```json
{
    "cameras": {
        "100e1e23": {
            "status": 1441847
        },
        "10097d15": {
            "status": 1441847
        },
        "<camera_id>": {...},
        "<camera_id>": {...},
        "<camera_id>": {...}
    },
    "token": "ooe0eoEAMNsF"
}
```
<!---TODO Ask TOM about this-->

### Response Json Attributes

Parameter       | Data Type   	| Description
---------       | ----------- 	| -----------
cameras         | [PostPollResponseCameras](#postpollresponsecameras-json-attributes) | Objects keyed by camera id
token 			| string 		| Token to be used for subsequent GET /poll requests

### PostPollResponseCameras Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
<camera_id> 	| [PostPollResponseCamera](#postpollresponsecamera-json-attributes) | PostPollResponse keyed on camera_id

### PostPollResponseCamera Json Attributes

Parameter       | Data Type   	| Description
---------       | ----------- 	| -----------
status          | string 		| A bitmask flag defining the state of a bridge or a camera. [More Info](#status-bitmask)
event 			| [PostPollResponseCameraEvents](#postpollresponsecameraevents-json-attributes) |  Object of events keyed by event id

### PostPollResponseCameraEvents Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
<event_id> 	| [PostPollResponseCameraEvent](#postpollresponsecameraevent-json-attributes) | PostPollResponseCameraEvent keyed on event_id

### PostPollResponseCameraEvent Json Attributes

Parameter       | Data Type   	| Description
---------       | ------------- | -----------
timestamp 		| string 		| Timestamp in EEN format: YYYYMMDDHHMMSS.NNN
cameraid 		| string 		| internal unique identifier

<!--===================================================================-->
## Polling

Used to receive updates on real-time changes. This API call requires a valid 'ee-poll-ses' cookie from POST /poll.

### HTTP Request

`GET https://login.eagleeyenetworks.com/poll`

> Json Response

```json
{
    "cameras": {
        "100e1e23": {
            "pre": "20141121165011.233",
            "event": {
                "MRBX": {
                    "timestamp": "20141121165011.499",
                    "cameraid": "100c299e",
                    "boxes": [
                        {
                            "x": 24575,
                            "y": 29126,
                            "w": 4095,
                            "h": 5825
                        }
                    ]
                },
                "PRFU": {
                    "timestamp": "20141121165011.233",
                    "cameraid": "100c299e",
                    "file_offset": 26311872,
                    "frame_size": 7838
                },
                "PRFR": {
                    "timestamp": "20141121165011.233",
                    "cameraid": "100c299e",
                    "previewid": 1416585600,
                    "file_offset": 26311872,
                    "frame_size": 7830
                }
            }
        },
        "10097d15": {
            "pre": "20141121165011.281",
            "event": {
                "PRFU": {
                    "timestamp": "20141121165011.281",
                    "cameraid": "1002a2a4",
                    "file_offset": 6126297,
                    "frame_size": 4014
                },
                "PRFR": {
                    "timestamp": "20141121165011.281",
                    "cameraid": "1002a2a4",
                    "previewid": 1416585600,
                    "file_offset": 6126297,
                    "frame_size": 4006
                }
            }
        }
    }
}
```

### Response Json Attributes

Parameter       | Data Type   	| Description
---------       | ----------- 	| -----------
cameras         | [GetPollResponseCameras](#getpollresponsecameras-json-attributes) | Objects keyed by camera id

### GetPollResponseCameras Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
<camera_id> 	| [GetPollResponseCamera](#getpollresponsecamera-json-attributes) | GetPollResponseCamera keyed on camera_id

### GetPollResponseCamera Json Attributes

Parameter       | Data Type   	| Description
---------       | ----------- 	| -----------
pre          	| string 		| Timestamp in EEN format: YYYYMMDDHHMMSS.NNN
event 			| [GetPollResponseCameraEvents](#getpollresponsecameraevents-json-attributes) |  Object of events keyed by event id

### GetPollResponseCameraEvents Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
<event_id> 	| [GetPollResponseCameraEvent](#getpollresponsecameraevent-json-attributes) | GetPollResponseCameraEvent keyed on event_id

### GetPollResponseCameraEvent Json Attributes

Parameter       | Data Type   	| Description
---------       | ------------- | -----------
timestamp 		| string 		| Timestamp in EEN format: YYYYMMDDHHMMSS.NNN
cameraid 		| string 		| internal unique identifier

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

## WebSocket Interface

`https://login.eagleeyenetworks.com/ws_poll?id=<esn>`

Parameter       | Data Type   	| Description
---------       | ------------- | -----------
id 		| esn(string) 		| esn hint for infrastructure, pick any cameraid

### HTTP Status Codes

HTTP Status Code    | Notes
------------------- | ----------- 
101 | (switch to websocket - invisible)
404 | Not Found (esn is invalid)
502 | Resource not available 
503 | Resource not available (internal only)

### Overview
The websocket interface is a subscription model over a websocket session.  Clients issue a JSON requests, which add resources to the session.  If a request encounters an error, an overall error response is returned and the session is closed.


>Websocket JSON Request Message Format

```json
{
    "cameras": {
        "<esn>": {
            "resource": [ "list of resource types" ],
            "event": [ "list of 4CC strings for event resource" ]
        }
    }
}
```

>Websocket JSON Respsonse Message Format

```json
{
    "response_code": 0,
    "response_message": "OK",
    "data": " object responses per response type above"
}
```


### Websocket Response Codes
Status Code    | Reason
------------------- | ----------- 
0 | OK
200 | OK
400 | malformed request
401 | permission denied (one or more esns are invalid)
503 | system not ready


## WebSocket2 Interface

`https://login.eagleeyenetworks.com/api/v2/System/<esn>/Events`

Parameter       | Data Type   	| Description
---------       | ------------- | -----------
id 		| esn(string) 		| esn hint for infrastructure, pick any cameraid


### HTTP Status Codes

HTTP Status Code    | Notes
------------------- | ----------- 
101 | (switch to websocket - invisible)
404 | Not Found (esn is invalid)
502 | Resource not available 
503 | Resource not available (internal only)

### Overview
The Websocket2 interface is an API compatible redesign of websocket poll.  The primary change is "camera" entities are moved to independent interactions over the websocket, and will respond on their own (so all cameras may not respond at the same time) and can fail independently.  Initial start up is significantly faster in most cases (as all resolution of cameras is done in parallel) and the session remains intact if there is an issue with an individual camera or request.

The change requires a new response concept. An entity can receive an "error" resource, which describes a entity specific error, without cancelling the entire session. The specific entity will be removed from the session, but all others willremain.


### Websocket2 Entities

Entity Name | Notes
------------| ------
cameras | subscription to an esn denoted entity (account, bridge, user, camera)
keys | subscription to a dhash namespace
drop | remove cameras or keys from session

The cameras entity is a carry over from websocket poll. It identifies  a named entity in the system with events of interest.

> Websocket 2 Camera Request Format

```json
{
    "cameras": {
        "<esn>": {
            "resource": [ "list of resource types" ],
            "event": [ "list of 4CC strings for event resource" ]
        }
    }
}
```

The keys entity is a subscription to a named JSON object maintained by the EEN Infrastructure.

Key Operation | Notes
--------| --------
subscribe | add subscription to the key, current value is returned, follow changes
once | get current key value, then drop subscription
drop | identical to drop command below

> Websocket 2 Key Request Format

```json
{
    "keys": {
        "<dname key>": {
            "op": "<operation>"
        }
    }
}
```

The drop entity indicates a subscribed resource should be removed from the session.

Drop Resource | Arguments | Notes
------------| ------------
cameras | array of esns to remove | 
keys | array of keys to remove |

> Websocket 2 Drop Request Format

```json
{
    "drop": {
        "keys": [ "array of key names to drop" ],
        "cameras": [ "array of camera esns to drop" ]
    }
}
```



### Websocket2 Status Codes

Status Code    | Reason
------------------- | ----------- 
200 | OK
400 | malformed request
401 | permission denied (invalid esn)

### Websocket2 Error Status Codes

Status Code    | Reason
------------------- | ----------- 
400 | malformed request
404 | not found
401 | permission denied (invalid esn)
410 | dropped

> Websocket2 Normal Response Example

```json
{   
    "status_code": 200, 
    "message": "OK", 
    "data": { 
        "100b0547": { 
            "event": { 
                "VREE": { 
                    "timestamp": "20161128063213.516", 
                    "cameraid": "100b0547", 
                    "videoid": -229238211, 
                    "videosize": 162300, 
                    "format": 2, 
                    "status": 31 
                } 
            } 
        } 
    } 
}
```

> Websocket2 Entity Error Response Example

```json
{ 
    "status_code": 200, 
    "message": "OK", 
    "data": { 
        "09999999": { 
            "error": [ 
                { 
                    "status_code": 404, 
                    "message": "resolve invalid" } 
            ] 
        } 
    } 
}
```

> Websocket2 Request Error Response Example

```json
{ 
    "status_code": 400, 
    "message": "JSON request must be a JSON object", 
    "data": { } 
}
```

> Websocket2 Drop Request Example

```json
{ 
    "drop": { 
        "cameras": [ "100b0547"] 
    }
}

```

> Websocket2 Drop Response Example

```json
{ 
    "status_code": 200, 
    "message": "OK", 
    "data": { 
        "100b0547": { 
            "error": [ 
                { 
                    "status_code": 410, 
                    "message": "dropped" 
                } 
            ] 
        } 
    } 
}
```


