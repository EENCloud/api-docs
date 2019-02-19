# Poll

<!--===================================================================-->
## Overview
<!--===================================================================-->

The Poll service provides a mechanism for an application to receive <a class="definition" onclick="openModal('DOT-Alert-Notification')">Notifications</a> of <a class="definition" onclick="openModal('DOT-Event')">Events</a> or spans from Eagle Eye Networks. These entities are grouped by resource

<aside class="success">This service will continually be extended</aside>

### Resources

  - pre - Timestamp for a preview image. The timestamp can later be used to retrieve the actual preview image
  - thumb - Timestamp for a thumbnail image. The timestamp can later be used to retrieve the actual thumbnail image
  - video - Start and end timestamp of a video event
  - [status](#status-bitmask) - Bitmask defining the state of a bridge or a camera
  - [event](#event-objects) - Full event information

Poll is a stateful request for updates any time a matching event occurs within the service. The initial Poll request is a POST (Default GET with [WebSocket](#websocket-polling)) with a Json-formatted body indicating the resources to track. Resources that are video, pre and thumbnail automatically register the API caller to their respective events. However, resource type `'event'` requires the API caller to tell the API what events to listen for

Each object consists of an ID element and a list of resource types to be monitored. The POST transaction receives and immediately responds with a Json-formatted body indicating the current timestamp for all requested resources. The response also includes a cookie, which can be used to track changes to the indicated resources via GET transaction

### Event Sources

  - <a class="definition" onclick="openModal('DOT-Device')">Device</a> - camera alerts, start and stop recording, etc.
  - System - maintenance, server changes, etc.
  - <a class="definition" onclick="openModal('DOT-Account')">Account</a> - other user changes, account alerts, layout changes, etc.

Camera and device events include: on, off, online, offline, currently recording, currently sensing motion, start/stop schedule event, being controlled with PTZ, etc.

<!--===================================================================-->
## Event Objects
<!--===================================================================-->

> Event Objects

```json
{
    "status_code": 200,
    "message": "OK",
    "data": {
        "100e1e23": {
            "event": {
                "PRSS": {
                    "status": 31,
                    "format": 1,
                    "frame_delay": 1000,
                    "timestamp": "20180425100000.000",
                    "cameraid": "10087ff5",
                    "flags": 0,
                    "duration": 3600000,
                    "previewid": 1493114470
                }
            }
        },
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    }
}
```

<aside class="notice">Each event type is returned with the EEN formatted timestamp: YYYYMMDDhhmmss.xxx</aside>

**Note:** <a class="definition" onclick="openModal('DOT-Event')">Event</a> object descriptions marked with '&#9702;' can be expanded for additional information on the event

Four&nbsp;CC | Description                                                     | Returned parameters
------------ | -----------                                                     | -------------------
VRES	| Video record start event                                               | cameraid, videoid, format, status
VREE	| Video record end event                                                 | cameraid, videoid, videosize, format, status
VRKF	| Video record key frame event                                           | cameraid, videoid, file_offset, format
EAES	| <details><summary>Always record video start event&nbsp;&#9702;</summary><p><br>Background "always" record video event has started</br></p></details> | cameraid, videoid, eventid
EAEE	| <details><summary>Always record video end event&nbsp;&#9702;</summary><p><br>Background "always" record video event has ended</br></p></details> | cameraid, eventid
AEDO	| Video download event                                                   | cameraid, status, source_userid, source_accountid, resource_type, deviceid, endtime
EVVS	| <details><summary>Video swap event&nbsp;&#9702;</summary><p><br>The event spans across two different video IDs: `'eventid'` and `'videoid'` (new swapped-in ID)</br></p></details> | cameraid, videoid, eventid
PRTH	| Thumbnail event                                                        | cameraid, previewid, eventid, file_offset, frame_size
PRFR	| <details><summary>Preview event&nbsp;&#9702;</summary><p><br>indicates a preview frame has been recorded</br></p></details> | cameraid, previewid, file_offset, frame_size
PRFB	| Preview backing event                                                  | cameraid, previewid, file_offset, frame_size
EMES	| Motion start event                                                     | cameraid, videoid, eventid
EMEE	| Motion end event                                                       | cameraid, eventid
EMEU	| <details><summary>Motion update event&nbsp;&#9702;</summary><p><br>Heartbeat for a motion event <br>(10 sec interval)</br></p></details> | cameraid, videoid, eventid
MRBX	| <details><summary>Motion box event&nbsp;&#9702;</summary><p><br>Motion has occurred in the indicated region (coordinates are from top right corner in fraction of 0xffff)</br></p></details> | cameraid
MRSZ	| <details><summary>Motion size reports event&nbsp;&#9702;</summary><p><br>Indicates the amount of motion on screen and for each active ROI (in ratio over 0xffff as percentage of screen) <br><br>Flag is `'0x1'` - motion greater than defined threshold (region is *in motion*)</br></p></details> | cameraid, flags, motion
ALMS	| <details><summary>Motion alert start event&nbsp;&#9702;</summary><p><br>Motion event has occurred (related to the indicated alert)</br></p></details> | cameraid, eventid, alertid, alertmotionid
ALME	| <details><summary>Motion alert end event&nbsp;&#9702;</summary><p><br>Motion event has ended (related to the indicated alert)</br></p></details> | cameraid, alertmotionid
ROMS	| <details><summary>ROI motion start event&nbsp;&#9702;</summary><p><br>Region of interest motion start event</br></p></details> | cameraid, roiid, videoid, eventid
ROME	| <details><summary>ROI motion end event&nbsp;&#9702;</summary><p><br>Region of interest motion end event</br></p></details> | cameraid, eventid
ROMU	| <details><summary>ROI motion update event&nbsp;&#9702;</summary><p><br>Heartbeat for a ROI motion event</br></p></details> | cameraid, roiid, videoid, eventid
ALRS	| <details><summary>ROI alert start event&nbsp;&#9702;</summary><p><br>ROI motion event linked to alert has started</br></p></details> | cameraid, eventid, alertid, alertroiid
ALRE	| <details><summary>ROI alert end event&nbsp;&#9702;</summary><p><br>ROI motion event linked to alert has ended</br></p></details> | cameraid, alertroiid
AEDA	| Device alert event                                                     | cameraid, status, deviceid, source_userid, source_accountid, values
AEDN	| Device alert notification event                                        | cameraid, status, target_deviceid, triggerid, starttime, endtime, target_userid, json
AEDC	| <details><summary>Create device event&nbsp;&#9702;</summary><p><br>`'cameraid'` understood as <a class="definition" onclick="openModal('DOT-ESN')">ESN</a>. It can represent an account, bridge, camera or user</br></p></details> | cameraid, status, deviceid, source_userid, source_accountid
AEDD	| <details><summary>Delete device event&nbsp;&#9702;</summary><p><br>`'cameraid'` understood as <a class="definition" onclick="openModal('DOT-ESN')">ESN</a>. It can represent an account, bridge, camera or user</br></p></details> | cameraid, status, deviceid, source_userid, source_accountid
AEDH	| <details><summary>Device change event&nbsp;&#9702;</summary><p><br>`'cameraid'` understood as <a class="definition" onclick="openModal('DOT-ESN')">ESN</a>. It can represent an account, bridge, camera or user</br></p></details> | cameraid, status, deviceid, source_userid, source_accountid, values
ESES	| <details><summary>Stream start event&nbsp;&#9702;</summary><p><br>User-requested stream event has started</br></p></details> | cameraid, videoid, eventid
ESEE	| <details><summary>Stream end event&nbsp;&#9702;</summary><p><br>User-requested stream event has ended</br></p></details> | cameraid, eventid
SBWS	| <details><summary>Stream bw sample event&nbsp;&#9702;</summary><p><br>If enabled, the last N seconds of bandwidth from the camera</br></p></details> | cameraid, bw10, bw60, bw300, streamtype
SBW0  | <details><summary>Stream bw sample 0 event&nbsp;&#9702;</summary><p><br>Samples of camera bandwidth for stream 0 <br><br>`'PREV'` - base bandwidth preview channel+thumbs (all frames at selected rate/quality, no compression)</br></p></details> | cameraid, bw10, bw60, bw300
SBW1  | <details><summary>Stream bw sample 1 event&nbsp;&#9702;</summary><p><br>Samples of camera bandwidth for stream 1 <br><br>`'PSND'` - bandwidth of what *should be sent* <br>`'VIDC'` - video captured bandwidth (video and audio together)</br></p></details> | cameraid, bw10, bw60, bw300
SBW2  | <details><summary>Stream bw sample 2 event&nbsp;&#9702;</summary><p><br>Samples of camera bandwidth for stream 2 <br><br>`'VIDE'` - base bandwidth of the video stream (not motion filtered)</br></p></details> | cameraid, bw10, bw60, bw300
SBW3  | <details><summary>Stream bw sample 3 event&nbsp;&#9702;</summary><p><br>Samples of camera bandwidth for stream 3 <br><br>`'AUDI'` - base bandwidth of the audio stream (not motion filtered)</br></p></details> | cameraid, bw10, bw60, bw300
SBW4  | <details><summary>Stream bw sample 4 event&nbsp;&#9702;</summary><p><br>Samples of camera bandwidth for stream 4 <br><br>`'VIDC'` - video captured bandwidth (video and audio together)</br></p></details> | cameraid, bw10, bw60, bw300
SSTE	| Streamer status event                                                  | cameraid, stype, event, seconds
CSAU	| <details><summary>Camera stream attach event&nbsp;&#9702;</summary><p><br>Camera has started streaming data to bridge (`'streamid'` is common with CSDU and CSSU)</br></p></details> | cameraid, streamid, stream_format, stream_type
CSDU	| <details><summary>Camera stream detach event&nbsp;&#9702;</summary><p><br>Camera has stopped streaming data to bridge</br></p></details> | cameraid, streamid, stream_format, stream_type
CSSU	| <details><summary>Camera stream stats event&nbsp;&#9702;</summary><p><br>Camera is sending stats for the stream between camera and bridge (Heartbeat for CSAU/CSDU)</br></p></details> | cameraid, streamtype, streamformat, total_expected, total_rcvd, delta_expected, delta_rcvd, interval, streamid
CECF	| <details><summary>Camera found event&nbsp;&#9702;</summary><p><br>Camera has been detected by the bridge</br></p></details> | cameraid, uuid, svc_state
CECL	| <details><summary>Camera lost event&nbsp;&#9702;</summary><p><br>Camera has stopped responding correctly after being found by the bridge</br></p></details> | cameraid
RCON	| Camera online event                                                    | cameraid, registerid
RCOF	| Camera offline event                                                   | cameraid, registerid
CONN	| Camera on event                                                        | cameraid
COFF	| Camera off event                                                       | cameraid
RCHB	| <details><summary>Camera heartbeat event&nbsp;&#9702;</summary><p><br>Heartbeat indicating a camera is still registered</br></p></details> | cameraid, registerid
ABRT	| <details><summary>Camera abort event&nbsp;&#9702;</summary><p><br>Bridge process restarted (abort all camera streams)</br></p></details> | cameraid, aborted
COBC	| <details><summary>Camera bounce event&nbsp;&#9702;</summary><p><br>Camera has camera has been forced to restart</br></p></details> | cameraid
CZTC	| <details><summary>Camera setting change event&nbsp;&#9702;</summary><p><br>Indicated camera setting has changed to the new value (data is zlib compressed)</br></p></details> | cameraid, userid, flags, command, change
CZTS	| <details><summary>Camera settings change event&nbsp;&#9702;</summary><p><br>Camera settings have been changed (data is zlib compressed)</br></p></details> | cameraid, sequence, settings
CZDC	| <details><summary>Camera settings change event&nbsp;&#9702;</summary><p><br>Camera settings have changed from old to new (data is zlib compressed)</br></p></details> | cameraid, userid, flags, command, change
CPRG	| <details><summary>Camera purge event&nbsp;&#9702;</summary><p><br>Camera has purged data due to storage limitations</br></p></details> | cameraid, day, bytes
CDLT	| <details><summary>Camera data lost event&nbsp;&#9702;</summary><p><br>Camera has deleted data within retention interval due to storage limitations</br></p></details> | cameraid, day, bytes
CBWS	| <details><summary>Camera bw sample event&nbsp;&#9702;</summary><p><br>Data amount a camera has captured/sent to the cloud</br></p></details> | cameraid, kbytesondisk, bytesstored, bytesshaped, bytesstreamed, bytesfreed, daysondisk
BBWS	| <details><summary>Bridge bw sample event&nbsp;&#9702;</summary><p><br>Stats regarding the amount of data all devices on this bridge have captured and sent to the cloud</br></p></details> | cameraid, kbytessize, kbytesavail, bytesstored, bytesshaped, bytesstreamed, bytesfreed
BBTW	| <details><summary>Bridge bw tagflow event&nbsp;&#9702;</summary><p><br>Stats regarding bandwidth between bridge and cloud</br></p></details> | cameraid, ip, bytes_sent, bytes_rcvd, active_write_us, paused_write_us
BUBW	| <details><summary>Upload bw sample event&nbsp;&#9702;</summary><p><br>Metric of data being periodically sent to the cloud to test bandwidth (`'bytessent'` in N millisec)</br></p></details> | cameraid, bytessent, millisecs
BBOO	| Bridge boot event                                                      | cameraid, booted
NOOP	| No operation event                                                     | cameraid
AEAC	| Create account event                                                   | cameraid, status, new_accountid, source_userid, source_accountid
AEAD	| Delete account event                                                   | cameraid, status, source_userid, source_accountid
AEAH	| Account change event                                                   | cameraid, status, source_userid, source_accountid, values
AELI	| Account log in event                                                   | cameraid, status, source_userid
AELO	| Account log out event                                                  | cameraid, status, source_userid
AEUC	| Create user event                                                      | cameraid, status, target_userid, source_userid, source_accountid
AEUD	| Delete user event                                                      | cameraid, status, target_userid, source_userid, source_accountid
AECC	| User setting change event                                              | cameraid, status, target_userid, source_userid, source_accountid, values
AEEC	| Create layout event                                                    | cameraid, status, source_userid, source_accountid, layoutid
AEED	| Delete layout event                                                    | cameraid, status, source_userid, source_accountid, layoutid
AEEL	| Layout change event                                                    | cameraid, status, source_userid, source_accountid, layoutid, values
CCCF	| <details><summary>Curl fail event&nbsp;&#9702;</summary><p><br>Failed communication between bridge and camera with indicated cURL error code</br></p></details> | cameraid, errcode
ANNT	| Annotation event                                                       | cameraid, ns, flags, uuid, seq, op, mpack
NVPT	| Name value table event                                                 | cameraid, ns, key_offset, op, mpack
ITFU	| Interface update event                                                 | cameraid, ip, flags, valid, mpack
SCRN	| Screen connect event                                                   | cameraid, ns, uuid, mpack
AELD	| Live display event                                                     | cameraid, status, source_userid, deviceid
CCLC	| <details><summary>Cloud connect event&nbsp;&#9702;</summary><p><br>Bridge connected to the cloud over indicated connection</br></p></details> | cameraid, src_ip, dest_ip, src_port, dest_port, ctype
CCLD	| <details><summary>Cloud disconnect event&nbsp;&#9702;</summary><p><br>Bridge lost connection to the cloud</br></p></details> | cameraid, src_ip, dest_ip, src_port, dest_port, ctype, reason, seconds
ENES	| App-specific event start                                               | cameraid, videoid, eventid, ns
ENEE	| App-specific event end                                                 | cameraid, eventid, ns
ENEU	| <details><summary>App-specific update event&nbsp;&#9702;</summary><p><br>Heartbeat for an application event <br>(10 sec interval)</br></p></details> | cameraid, videoid, eventid, ns
AEPT	| <details><summary>PTZ event&nbsp;&#9702;</summary><p><br>Pan tilt zoom event</br></p></details> | cameraid, status, source_userid, deviceid
EPES	| <details><summary>PTZ camera event start&nbsp;&#9702;</summary><p><br>PTZ camera move/change event has started</br></p></details> | cameraid, videoid, eventid
EPEE	| <details><summary>PTZ camera event end&nbsp;&#9702;</summary><p><br>PTZ camera move/change event has ended</br></p></details> | cameraid, eventid
PTZS	| <details><summary>PTZ status event&nbsp;&#9702;</summary><p><br>Snapshot of the PTZ state as point in time (For tracking PTZ during movement)</br></p></details> | cameraid, userid, flags, reason, pan_status, zoom_status, x, y, z
PRSS	| <small>Preview stream start event <br>**(INTERNAL USE ONLY)**</small>  | cameraid, previewid, frame_delay, duration, flags, format, status
PRSE	| <small>Preview stream end event <br>**(INTERNAL USE ONLY)**</small>    | cameraid, previewid, status
PRFU	| <small>Preview upload event <br>**(INTERNAL USE ONLY)**</small>        | cameraid, file_offset, frame_size
AABT	| <small>Camera archiver abort event <br>**(INTERNAL USE ONLY)**</small> | cameraid, aborted
ECON	| <small>Camera online event <br>**(DEPRECATED)**</small>                | cameraid
ECOF	| <small>Camera offline event <br>**(DEPRECATED)**</small>               | cameraid
CSTS	| <small>Camera settings change event <br>**(DEPRECATED)**</small>       | cameraid, sequence, settings
CSTC	| <small>Camera settings change event <br>**(DEPRECATED)**</small>       | cameraid, sequence, settings
CSAT	| <small>Camera stream attach event <br>**(DEPRECATED)**</small>         | cameraid, stream_format, stream_type
CSDT	| <small>Camera stream detach event <br>**(DEPRECATED)**</small>         | cameraid, stream_format, stream_type
CSST	| <small>Camera stream stats event <br>**(DEPRECATED)**</small>          | cameraid, streamtype, total_expected, total_rcvd, delta_expected, delta_rcvd, interval
PRSU	| <small>Preview stream update event <br>**(DEPRECATED)**</small>        | cameraid, previewid, status
VRSU	| <small>Video update event <br>**(DEPRECATED)**</small>                 | cameraid, videoid, format, status

<!-- TODO: Unhide and fill out the below table when the information gets delivered -->

<details hidden>
### Event Parameters

Parameter        | Description
---------        | -----------
aborted          | <p hidden>???</p>
active_write_us  | <p hidden>???</p>
alertid          | <p hidden>???</p>
alertmotionid    | <p hidden>???</p>
alertroiid       | <p hidden>???</p>
booted           | <p hidden>???</p>
bw10             | <p hidden>???</p>
bw60             | <p hidden>???</p>
bw300            | <p hidden>???</p>
bytes            | <p hidden>???</p>
bytes_rcvd       | <p hidden>???</p>
bytes_sent       | <p hidden>???</p>
bytesfreed       | <p hidden>???</p>
bytessent        | <p hidden>???</p>
bytesshaped      | <p hidden>???</p>
bytesstored      | <p hidden>???</p>
bytesstreamed    | <p hidden>???</p>
cameraid         | <p hidden>???</p>
change           | <p hidden>???</p>
command          | <p hidden>???</p>
ctype            | <p hidden>???</p>
day              | <p hidden>???</p>
daysondisk       | <p hidden>???</p>
delta_expected   | <p hidden>???</p>
delta_rcvd       | <p hidden>???</p>
dest_ip          | <p hidden>???</p>
dest_port        | <p hidden>???</p>
deviceid         | <p hidden>???</p>
duration         | <p hidden>???</p>
endtime          | <p hidden>???</p>
errcode          | <p hidden>???</p>
event            | <p hidden>???</p>
eventid          | <p hidden>???</p>
file_offset      | <p hidden>???</p>
flags            | <p hidden>???</p>
format           | <p hidden>???</p>
frame_delay      | <p hidden>???</p>
frame_size       | <p hidden>???</p>
interval         | <p hidden>???</p>
ip               | <p hidden>???</p>
kbytesavail      | <p hidden>???</p>
kbytesondisk     | <p hidden>???</p>
kbytessize       | <p hidden>???</p>
key_offset       | <p hidden>???</p>
layoutid         | <p hidden>???</p>
millisecs        | <p hidden>???</p>
motion           | <p hidden>???</p>
mpack            | <p hidden>???</p>
new_accountid    | <p hidden>???</p>
ns               | <p hidden>???</p>
op               | <p hidden>???</p>
pan_status       | <p hidden>???</p>
paused_write_us  | <p hidden>???</p>
previewid        | <p hidden>???</p>
reason           | <p hidden>???</p>
registerid       | <p hidden>???</p>
resource_type    | <p hidden>???</p>
roiid            | <p hidden>???</p>
seconds          | <p hidden>???</p>
seq              | <p hidden>???</p>
sequence         | <p hidden>???</p>
settings         | <p hidden>???</p>
source_accountid | <p hidden>???</p>
source_userid    | <p hidden>???</p>
src_ip           | <p hidden>???</p>
src_port         | <p hidden>???</p>
starttime        | <p hidden>???</p>
status           | <p hidden>???</p>
stream_format    | <p hidden>???</p>
stream_type      | <p hidden>???</p>
streamformat     | <p hidden>???</p>
streamid         | <p hidden>???</p>
streamtype       | <p hidden>???</p>
stype            | <p hidden>???</p>
target_deviceid  | <p hidden>???</p>
target_userid    | <p hidden>???</p>
total_expected   | <p hidden>???</p>
total_rcvd       | <p hidden>???</p>
triggerid        | <p hidden>???</p>
userid           | <p hidden>???</p>
uuid             | <p hidden>???</p>
valid            | <p hidden>???</p>
values           | <p hidden>???</p>
videoid          | <p hidden>???</p>
videosize        | <p hidden>???</p>
x                | <p hidden>???</p>
y                | <p hidden>???</p>
z                | <p hidden>???</p>
zoom_status      | <p hidden>???</p>
</details>

<!--===================================================================-->
## Status Bitmask
<!--===================================================================-->

This status Bitmask is used to determine what the high-level/overall device status is

HEX Value | Status
--------- | ------
0x100000  | Camera online
0x020000  | Camera on (user setting)
0x080000  | Camera recording
0x000010  | Camera sending previews
0x040000  | Camera streaming video
0x000020  | Camera located (bridge has found the camera)
0x000080  | Camera configuration in process (bridge configuring camera)
0x000100  | Camera needs ONVIF password
0x000200  | Camera available but not yet attached
0x000040  | Camera not supported
0x000800  | Camera error
0x010000  | Invalid state (unknown state)
0x000400  | *Internal status*
0x001000  | *Internal status*
0x002000  | *Internal status*
0x004000  | *Reserved*
0x008000  | *Reserved*
0x000001  | <small>Camera online <br>**(DEPRECATED)**</small>
0x000004  | <small>Camera on (user setting) <br>**(DEPRECATED)**</small>
0x000008  | <small>Camera recording <br>**(DEPRECATED)**</small>
0x000002  | <small>Stream attached (camera communicating with bridge) <br>**(DEPRECATED)**</small>

### Overall status

IF 0 THEN "No Change"
<br>ELSE IF "Camera On" (**bit 17**)==0 THEN "Off" (orange forbidden icon)
<br>ELSE IF "Registered" (**bit 20**)==0 THEN "Internet Offline" (red exclamation icon)
<br>ELSE IF "Streaming" (**bit 18**)==1 THEN "Online" (green check icon)
<br>ELSE IF "Password" (**bit 8**)==1 THEN "Password Needed" (effectively "Offline") (red padlock icon)
<br>ELSE "Offline" (red X icon)

### Recording status

IF "Recording" (**bit 19**) THEN Recording (green circle icon)
IF "Invalid" (**bit 16**)==1 THEN no status change (use whatever status bits were set previously)

<!--===================================================================-->
## Initialize Poll
<!--===================================================================-->

<aside class="notice">Subscribe to the poll service, which is required for GET /poll. Response: token=xxxxx / Response headers: set_cookie: ee-poll-ses/poll_id=xxxxx</aside>

Response includes 2 session cookies and a returned token (which are identical). Only one of the session cookies has to be provided to the GET /poll request

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/poll -d '{"cameras":{"[ID]":{"resource":["event","pre"],"event":["VREE","PRFR","CPRG"]}}}' -H 'Content-Type: application/json' -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -v
```

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
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    }
}
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/poll`

### Resource Types

Each resource type has a specific object format in response:

Type                      | Response         | Description
----                      | --------         | -----------
pre                       | prets            | Timestamp of latest preview image
thumb                     | thumbts          | Timestamp of latest thumbnail image
video                     | [startts, endts] | List of start and end timestamps for a video segment. Updates at start and per key frame received until end
[status](#status-bitmask) | bitmask          | A numerical bitmask defining the status. Bit position defines status
[event](#event-objects)   | object           | Events are a key value pair, where the key is the Four CC of the event and event structure is the actual meta data for that specific event

<aside class="notice">The cameras parameter is an entity, which can contain any object structure keyed by ID (camera, bridge or account <a class="definition" onclick="openModal('DOT-ESN')">ESN</a>)</aside>

Due to the progressing expansion of the event polling mechanic, the parameter `'cameras'` has undergone numerous changes and has been kept as such for backwards compatibility. It should be understood as device/account

Parameter | Data Type | Description
--------- | --------- | -----------
cameras   | json      | Json attribute keyed with the [\<object_id\>](#object-structure) (can contain multiple Json objects, even of different types)

### Object Structure

Parameter     | Data Type | Description
---------     | --------- | -----------
\<object_id\> | json      | Json attribute keyed with `'resource'` and/or `'event'`

The Json object allows to narrow down the polling scope by specifying which type of entity to poll for. The types include:

Parameter    | Data Type     | Description | Is Required
---------    | ---------     | ----------- | -----------
**resource** | array[string] | Array of one or more string containing which type of data should be retrieved from the provided device/account<br><br>enum: pre, thumb, video, status, event | true
event        | array[string] | Array of one or more string containing the event [Four CC](#event-objects) (if resource contains `'event'`, the array of events specified here will narrow down the scope of retrieved events)

<!--TODO: Find out why the video as a feasible resource has been excluded from the above table-->

<aside class="warning">The event parameter is required to have the event resource present when polling over HTTP (instead of WebSocket)</aside>

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
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    },
    "token": "ooe0eoEAMNsF"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
cameras   | json      | Json attribute keyed with the [\<object_id\>](#response-object-structure) (can contain multiple Json objects, even of different types)
token     | string    | Token to be used for subsequent GET /poll requests

### Response Object Structure

Parameter     | Data Type | Description
---------     | --------- | -----------
\<object_id\> | json      | Json attribute keyed with [resource](#poll) types. Retrieved values are the most recent entities for the specified resource

The amount of keys depends on the sent request inquiry (if the request entailed `'pre'` and `'video'`, then the retrieved data will only cover `'pre'` and `'video'` information)

If a specified event has not been triggered on the device/account, it will not be listed by the poll service (no error will be reported)

<aside class="warning">The status parameter takes precedence (if multiple) and all others will become suppressed when polling over HTTP POST /poll</aside>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Polling
<!--===================================================================-->

<aside class="notice">Used to receive updates on real-time changes. This API call requires a valid 'ee-poll-ses' cookie from POST /poll</aside>

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/poll -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY];ee-poll-ses=[TOKEN]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/poll`

> Json Response

```json
{
    "cameras": {
        "100e1e23": {
            "pre": "20181121165011.233",
            "event": {
                "MRBX": {
                    "timestamp": "20181121165011.499",
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
                    "timestamp": "20181121165011.233",
                    "cameraid": "100c299e",
                    "file_offset": 26311872,
                    "frame_size": 7838
                },
                "PRFR": {
                    "timestamp": "20181121165011.233",
                    "cameraid": "100c299e",
                    "previewid": 1416585600,
                    "file_offset": 26311872,
                    "frame_size": 7830
                }
            }
        },
        "10097d15": {
            "pre": "20181121165011.281",
            "event": {
                "PRFU": {
                    "timestamp": "20181121165011.281",
                    "cameraid": "1002a2a4",
                    "file_offset": 6126297,
                    "frame_size": 4014
                },
                "PRFR": {
                    "timestamp": "20181121165011.281",
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

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
cameras   | json      | Json attribute keyed with the \<object_id\> (can contain multiple Json objects, even of different types)

### Response Object Structure

Parameter     | Data Type | Description
---------     | --------- | -----------
\<object_id\> | json      | Json attribute keyed with [resource](#poll) types. Retrieved values are the most recent entities for the specified resource

The amount of keys depends on the sent POST request (if the request entailed `'pre'` and `'video'`, then the retrieved data will only cover `'pre'` and `'video'` information)

If a specified event has not been triggered on the device/account, it will not be listed by the poll service (no error will be reported)

The returned values are in accordance with the [returned resource types](#resource-types)

<aside class="warning">The status parameter will be omitted (if multiple), all others will be returned when polling over HTTP GET /poll</aside>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## WebSocket Polling
<!--===================================================================-->

WebSockets provide a persistent connection between a client and server. This uplink enables a two-way data stream over which chunked data can be sent and received as messages. This protocol provides a full-duplex communications channel over a single TCP connection, allowing the client to receive event-driven responses without having to poll the server for a reply (effectively decreasing data traffic)

<aside class="notice">The WebSocket similarity to the HTTP protocol is that its handshake is interpreted by HTTP servers as a HTTP 'upgrade request'</aside>

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
        "<object_id>": {...},
        "<object_id>": {...},
        "<object_id>": {...}
    }
}
```

### Client Handshake Request

`GET /api/v2/Device/00001007/Events HTTP/1.1`  
`Upgrade: websocket`  
`Connection: Upgrade`  
`Host: c000.eagleeyenetworks.com`  
`Origin: http://c000.eagleeyenetworks.com`  
`Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==`  
`Sec-WebSocket-Version: 13`  
`Cookie: auth_key=[AUTH_KEY]`

The WebSocket protocol has two parts:

  - Handshake (to establish the upgraded connection)
  - Data transfer

The handshake process has to be initiated from the client side via a standard HTTP request <br>(HTTP version must be 1.1 or greater and the method must be GET)

<table>
    <tr>
        <th colspan=7>The WebSocket request URL is composed in the following way:</th>
    </tr>
    <tr>
        <th style="text-align:center;">wss:&#47;&#47;</th>
        <th style="text-align:center;">c000.</th>
        <th style="text-align:center;">eagleeyenetworks.com</th>
        <th style="text-align:center;">&#47;api&#47;v2</th>
        <th style="text-align:center;">&#47;<a class="definition" onclick="openModal('DOT-Device')">Device</a></th>
        <th style="text-align:center;">&#47;00001007</th>
        <th style="text-align:center;">&#47;Events</th>
    </tr>
    <tr>
        <td style="text-align:center;">secure <br>websocket <br>protocol</td>
        <td style="text-align:center;">branded <br>subdomain</td>
        <td style="text-align:center;">server</td>
        <td style="text-align:center;">API version</td>
        <td style="text-align:center;">resource</td>
        <td style="text-align:center;">account ID</td>
        <td style="text-align:center;">'Events' suffix</td>
    </tr>
</table>

WebSocket URLs use the WS scheme or alternatively WSS for secure connections which is the equivalent of HTTPS

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**A**     | string    | Used to replace the `'auth_key'` cookie | false

### Server Handshake Response

`HTTP/1.1 101 Switching Protocols`  
`Server: openresty`  
`Date: Wed, 08 Mar 2018 14:01:06 GMT`  
`Connection: upgrade`  
`upgrade: websocket`  
`sec-websocket-accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`  
`set-cookie: ee-ws-poll-ses=kjxZXVrDyIkK`  
`x-een-lb-tried-proxies: 209.94.238.21:80`

The server reply completes the handshake. A successful server reply is followed by data transfer

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
101 | Switching protocols
400	| Header is not understood or has an incorrect value


### Data Exchange

The client communicates with the server after a successful handshake by sending an object as Json-formatted string. The *message* send is being triggered by the client by calling the appropriate WebSocket *send* function (the method depends on the client environment)

The client has to specify via Json what kind of data it is going to be polling and from which devices (See [Initialize Poll](#initialize-poll), [Resource Type](#poll), [Event Objects](#event-objects))

WebSocket is an event-driven API. When messages are received a message event is delivered to the the *onmessage* function, where the message is being received and parsed

The connection can be severed at any given time using the *close* function

<aside class="warning">A successful handshake can be established even with an incorrect data set in the Json-formatted string</aside>

WebSocket polling will additionally return *message* response error codes for each individual encountered problem based on the [Errors](#errors) section

### Message HTTP Status Codes

Status Code | Description
----------- | -----------
200 | OK
400	| Invalid resource
401	| Access denied
412	| Auth lost

