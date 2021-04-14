# Images and Video

<!--===================================================================-->
## Overview
<!--===================================================================-->

<a class="definition" onclick="openModal('DOT-Asset')">Asset</a> services provide access to Media Assets - previews and video in appropriate formats. Asset services are used in conjunction with list transactions to enumerate and identify Assets. All assets are tagged with and can be identified by the EEN Timestamp

### EEN Timestamp

Type          | Meaning
----          | -------
**EEN Timestamp** | **Format:**&nbsp;&nbsp;YYYYMMDDhhmmss.xxx <small>(string)</small> <br>**System:**&nbsp;Coordinated Universal Time (UTC) <br><small>Synchronized time zone: Greenwich Mean Time (GMT)</small> <br><br>**Example:**&nbsp;*Jan 2, 2018 08:30:20.00* == *20180102083020.000*

### Assets Identifiers

  - **<a class="definition" onclick="openModal('DOT-Timestamp')">Timestamp</a>:** Eagle Eye timestamps have the format YYYYMMDDhhmmss.xxx and are always specified in GMT time. In most contexts special tokens can also be used to specify relative times - `'now'` is the current time (a value starting with + or - is an offset from the current time, +/- offsets from `'now'` are valid in milliseconds)
  - **<a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a>:** Cameras are identified by a 8 character hexadecimal string, representing a unique 32 bit ID associated with a specific camera (Camera ID are not necessarily linked to specific hardware devices to allow device upgrade and replacement without disruption of history storage)
  - **Format:** Images are always returned as **JPEG** images. Video can currently be returned as either **FLV** format (playback in browsers via Flash) or **MP4** (download and export format)

### Retrieve Image

The image request model provides an efficient mechanism for accessing image sequences for several usage models. Image requests can be done directly using the next/after/prev virtual model. This returns images before or after specified timestamps. Alternatively, the timestamp and event information can be fetched through the [List](#get-list-of-images) interface (to get <a class="definition" onclick="openModal('DOT-Event')">Events</a> for history) and [Poll](#poll) interface to track new images as they become available in real-time. The following description provides typical usage models for various events:

  - **Low bandwidth video playback:** The preview stream is a sequential set of JPEG images. If played back in order, low resolution video is accomplished
    - The simplest implementation is to fetch `'next'` with a timestamp of `'now'` (i.e. `'/asset/next/image.jpeg?timestamp=now&id=12345678&asset_class=pre'`) - waiting for the subsequent image after the current time. Each time an image is returned, a new request should be made. If the downstream bandwidth is very low, the image fetch will automatically slow down (because delivery of image A happens after image B has been received, so the next call will fetch image C, skipping display of image B entirely). This approach works well for tracking a single image stream (Tip: the first request should be done as a `'prev'` request to make sure an image is displayed, before the sequential next requests). The downside of this model is it requires a dedicated socket for each image stream being played. Many browsers have a limited pool of open sockets
    - A more efficient mechanism for tracking multiple image streams is to use the [Poll](#poll) interface. It will provide the timestamp of the next image available for a set of camera, which can then be fetched via the /asset/asset call. Since the poll request supports multiple cameras in a single request, it requires only a single socket for any number of cameras. The client application should implement a *fair* algorithm across the returned timestamps to address low bandwidth situations (that is, make sure every image stream gets updated before you fetch a new image for the same stream). This algorithm will provide smooth frame rate degradation across any number of cameras, whether the performance bottleneck is client CPU or bandwidth. The best model for this is:
      - Receive update <a class="definition" onclick="openModal('DOT-Alert-Notification')">Notifications</a> for all cameras being tracked via a single sequential poll session
      - For each camera, keep track of the latest image notification, replacing the last one even if it has not been fetched yet
      - With a limited pool of *requests* do a fair rotation between all cameras, fetching only the most recent image for each and skipping the fetch if the image is already loading
  - **Random access image discovery:** The preview and thumb image streams can provide a visual navigation tool for accessing recorded video. The typical implementation requires a map from a timestamp to the *best* image for that timestamp. To implement this approach, the client should use the `'after'` and `'prev'` requests with the timestamp of the user playhead. Both calls provide header data for x-ee-timestamp, x-ee-next and x-ee-prev which identify the current and subsequent images in both directions when it can be easily determined. The usage paradigm for this should be:
    - On navigation event (large jump), determine the timestamp of the user playhead and do an `'/asset/prev'` call to get the appropriate image. Store the x-ee-timestamp, x-ee-next and x-ee-prev values for the image
    - As the user moves the playhead, if the time change is within the next/prev halfway bounds, no new request is required. When the user moves outside of the time range, do an image fetch with the new timestamp
  - **Thumbnail navigation:** The system provides a *thumbnail* image for each event which is intended to provide a small representation of the event. The easiest mechanism to get a thumbnail for an event is to do an `'/asset/after/image.jpeg?asset_class=thumb...'` image request with the starting timestamp of the event

### Image Formats

  - **JPEG:** Native format for the system. Images are always returned as JPEG images

### Retrieve List of Images

There are numerous different ways to get a list of images:

Get all preview images between April 1st and April 2nd<br>
`https://login.eagleeyenetworks.com/asset/list/image.jpeg?id=100676b2&start_timestamp=20180401000000.000&end_timestamp=20180402000000.000&asset_class=all`

Get 500 images before April 1st<br>
`https://login.eagleeyenetworks.com/asset/list/image.jpeg?id=100676b2&start_timestamp=20180401000000.000&count=-500&asset_class=all`

Get the next 500 images after April 1st<br>
`https://login.eagleeyenetworks.com/asset/list/image.jpeg?id=100676b2&start_timestamp=20180401000000.000&count=500&asset_class=all`

### Retrieve Video

Video is accessed via the `'play'` command. Video is captured in segments and is limited to 5 minutes per segment in storage. The video command will seamlessly rewrite headers within the video format to join segments as necessary to deliver the requested data span. However, we highly encourage developers to fetch only 5 minutes at a time to ensure that users aren't filling storage on their bridge needlessly

If the end time of the segment is in the future, the video will follow the data stream as it arrives, delivering live video streaming with minimal latency (if the camera is not streaming video, the video will stop (and start again) as video is captured, which is typically not what is desired). MP4 format cannot be live streamed

The keyword `'stream_<streamid>'` can be used for the starting timestamp. This forces the camera to capture video and stream it to the cloud live. The stream ID should be globally unique(ish) string - combination of a timestamp and user ID works well

The start timestamp must match the starting timestamp of a video if the video already exists. Subsegments of a video span can be specified by using the `'time_offset'` argument. For example assume a 5 minute video has been recorded from 12:30 to 12:35. The query `'?start_timestamp=20181120123000.000&end_timestamp=20181120123400.000&time_offset=180000&...'` will play one minute of video (timestamped at 12:33), 3 minutes into the video starting at 12:30, clipping off the last minute of the recorded segment

<aside class="notice">Time offsets and end timestamps can be set to any time, but the system will seek to the nearest key frame to start the video</aside>

<aside class="warning">Important note on performace</aside>

API calls can initially be done against `'https://login.eagleeyenetworks.com'` (The host url), but after the authorization response is returned, API calls should then use the **branded subdomain**. At this stage the branded host url will become `'https://[active_brand_subdomain].eagleeyenetworks.com'`, where the `'active_brand_subdomain'` field is returned in the authorization response

Each account will consistently have the same *branded subdomain* and as such will not change throughout the life of the session. Caching the subdomain is safe as long as the client software validates against `'the active_brand_subdomain'` after authorization. Using the *branded subdomain* is important for speed and robustness

### Video Formats

The video system is based on H264 video and AAC audio. These streams are encapsulated in different formats for compatibility with different playback modes

  - **FLV:** Native format for the system. Playable in any Flash player, VLC as well as other players
  - **MP4:** MPEG4 files have a very broad playback compatibility (in line with all the major video players), however *MP4 is NOT a streamable format*, so it is only used for download functionality and will return an error if the video is live
  - **RTSP:** The protocol is used for live-streaming. By this format you can get live stream of a camera.

<!-- Placed before "### Video Quality" after the last file format description
    <aside class="warning">While streaming any video format on the web other than FLV (system native format), you may initially get a 502 response</aside>

    This means that the video is currently being transcoded within our system and therefore couldn't be found. Assuming the data actually exists (check against the video list call), the video will eventually be ready for you to fetch in the desired format, but for the time being, you will have to wait and refetch until the requested video is ready -->

<!--===================================================================-->
## Get Image
<!--===================================================================-->

Get a JPEG image based on the specified timestamp. This will return binary image data in JPEG format

### Cache control headers to allow asset caching if not `'now'`-relative:

Header            | Data Type      | Description
------            | ---------      | -----------
x-ee-timestamp    | type-timestamp | Specifies asset type and timestamp of the provided image <br><br>Type: video, preview, thumb, event
x-ee-prev         | type-timestamp <br>*(or&nbsp;`'unknown'`)* | Specifies asset type of the previous image matching the class filter or `'unknown'` if the previous image was too complex to figure out
x-ee-next         | type-timestamp <br>*(or&nbsp;`'unknown'`)* | Specifies asset type of the following image matching the class filter or `'unknown'` if the following image was too complex to figure out
content-type      | `'image/jpeg'` | Specifies the content type
location          | `'/asset/asset/image.jpeg?timestamp=20180917213405.700&id=xxxxxxxx&asset_class=thumb'` | Identifies actual asset time of the image in response

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/asset/prev/image.jpeg -d "id=[CAMERA_ID]" -d "timestamp=[TIMESTAMP]" -d "asset_class=[ASSET_CLASS]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G -v
```

> <small>Provide the '<b>-O</b>' option at the end of the request for file output to the current directory</small>

> <small>Provide the '<b>-o "/\<file_path/\<filename\>\.\<extension\>"</b>' option to specify output filename, path and extension</small>

### HTTP Request

`GET https://login.eagleeyenetworks.com/asset/asset/image.jpeg`
<br> Get the image at the specified timestamp

`GET https://login.eagleeyenetworks.com/asset/prev/image.jpeg`
<br> Get the first image before the specified timestamp

`GET https://login.eagleeyenetworks.com/asset/next/image.jpeg`
<br> Get the first image after the specified timestamp. Used with `'timestamp=now'` will wait until the new image comes into existence and return it

`GET https://login.eagleeyenetworks.com/asset/after/image.jpeg`
<br> Get the first image after the specified timestamp. Used with `'timestamp=now'` will return 404 - Image not found

Parameter         | Data Type    | Description   | Is Required
---------         | ---------    | -----------   | -----------
**id**            | string       | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true
**timestamp**     | string       | Timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
**asset_class**   | string, enum | <a class="definition" onclick="openModal('DOT-Asset-Class')">Asset Class</a> of the image <br><br>enum: all, pre, thumb | true

> Response

```shell
JPEG<file_content>
```

### HTTP Response

The returned response is binary image data in JPEG format

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
301	| Asset has been moved to a different archiver
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Image not found


<!--===================================================================-->
## Get Video
<!--===================================================================-->

Get a video stream in FLV format based on the specified timestamps. Returns binary video data or video id.

> Request (flv)

```shell
curl -X GET https://login.eagleeyenetworks.com/asset/play/video.flv -d "id=[CAMERA_ID]" -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G -v
```

> Request (mp4)

```shell
curl -X GET https://login.eagleeyenetworks.com/asset/play/video.mp4 -d "id=[CAMERA_ID]" -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G -v
```

> <small>Provide the '<b>-O</b>' option at the end of the request for file output to the current directory (timestamps must coincide with existing video)</small>

> <small>Provide the '<b>-o "/\<file_path/\<filename\>\.\<extension\>"</b>' option to specify output filename, path and extension (timestamps must coincide with existing video)</small>


### HTTP Request

`GET https://login.eagleeyenetworks.com/asset/play/video.flv`
<br> Get video in the `.flv` format

`GET https://login.eagleeyenetworks.com/asset/play/video.mp4`
<br> Get video in the `.mp4` format

Parameter           | Data Type    | Description    | Is Required
---------           | ---------    | -----------    | -----------
**id**              | string       | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true
**start_timestamp** | string       | Start timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
**end_timestamp**   | string       | End timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true

> Response (flv)

```shell
FLV<file_content>
```

> Response (mp4)

```shell
MP4<file_content>
```

> Json Response (either)

```json
{
    "id": "79a8cbc0-7e2e-11e9-8523-0a580af402b2"
}
```


### HTTP Response

The returned response can be binary video data in FLV or MP4 format(depending on request) with status code 200. 

Alternatively, if you request a MP4 and it is not able to be transcoded immediately it will return a video id as JSON data with a status code of 201.  You can safely request the same video again.  if video is not immediately available, video id as JSON data with status code 202. This will continue until the video has been transcoded.  The next request for that video will result in a status code of 200 and the HTTP response will include the MP4 as binary data.

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
201 | Created, video download job has been created
202 | Pending, video download job is in progress
301	| Asset has been moved to a different archiver
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Camera not provisioned
404	| Camera get error
410	| Video is out of retention
502 | Bad Gateway.  We were unable to return the requested data.  Please try again.
503 | Internal Camera Tag Maps Error.  Please contact our support department.
504 | Gateway Timeout.  We were unable to return the requested data inside our time limit.  Please try again.


<!--===================================================================-->
## Get Live Stream (RTSP)
<!--===================================================================-->

This API will return live stream in RTSP format. Get a live stream video in RTSP format first needs to retrieve streams URL. To do that follow steps as below:

### HTTP Request
- `GET https://[active_brand_subdomain].eagleeyenetworks.com/api/v2/media/cameras/{camera_id}/streams?A={auth_key}`
<br>Get stream URLs. The streams have a new session id that is valid for 15 minutes. 

Parameter           | Data Type    | Description    | Is Required
---------           | ---------    | -----------    | -----------
**camera_id**              | string       | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera id</a> | true
**auth_key** | string       | User authentication key from login.eagleeyenetworks.com | true


- `GET rtsp://[active_brand_subdomain].eagleeyenetworks.com:554/api/v2/media/streams/[Session ID that generated by server]/rtsp`
<br> Get video in RTSP format. The stream URL retrieved by previous API call. Any player that support RTSP can play the stream.

> Response ( Stream URLs)

```json
{
	"status_code": 200,
	"message": "OK",
	"data": {
		"rtsp_over_http": "http://[active_brand_subdomain].eagleeyenetworks.com:31180/api/v2/media/streams/[Session ID that generated by server]/rtsp",
		"rtsp": "rtsp://[active_brand_subdomain].eagleeyenetworks.com:554/api/v2/media/streams/[Session ID that generated by server]/rtsp",
		"rtsps": "rtsps://[active_brand_subdomain].eagleeyenetworks.com:322/api/v2/media/streams/[Session ID that generated by server]/rtsp"
	}
}
```

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Request is not valid
401	| Unauthorized due to invalid session cookie
404	| Session not found
500 | Server internal error

### Play streams
These streams are valid for 15 minutes. You can use them to get a live stream on camera in RTSP format. Now you can use a player that support RTSP like `ffplay` to start live-streaming. For example: `ffplay [stream url]`
if you are going to use `rtsp_over_http` stream url, first you need do some setting in `VLC`. Please go to `Tools > Preferences > Input/Codecs > Demuxers > RTP/RTSP` in `VLC` and select option `Tunnel RTSP and RTP over HTTP` and set `HTTP tunnel port` as `31180`.
Now use `RTSP` stream url one to start live-streaming in `VLC`. In this case `VLC` will create an HTTP tunnel to send RTSP commands.


<!--===================================================================-->
## Prefetch Video
<!--===================================================================-->

<aside class="warning">This API call is currently being updated and may change.  Please reach out to api_support@een.com with any problems.</aside>

<aside class="notice">
  <p>
    This API calls must use the **branded subdomain**. The branded host url will become `'https://[active_brand_subdomain].eagleeyenetworks.com'`, where the `'active_brand_subdomain'` field is returned in the authorization response
  </p>
  <p>
    Each account will consistently have the same *branded subdomain* and as such will not change throughout the life of the session. Caching the subdomain is safe as long as the client software validates against `'the active_brand_subdomain'` after authorization. Using the *branded subdomain* is required for this endpoint.
  </p>
</aside>

This API call will ensure the video is in the cloud. If the video is not in the cloud it will do a background upload request to the bridge to acquire the video into the cloud. A webhook provided with the call will be triggered when the upload is successful or an error has occurred. The webhook will be triggered as a POST with Json-formatted data.

In the event the video was successfully retrieve by the cloud, the `success_hook` will be called.  If there was a failure, the optional `failure_hook` will be called.  The request will try to retrieve the video for 24 hours before giving up and calling `failure_hook`.

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/asset/cloud/video.flv -d "id=[CAMERA_ID]" -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -d "success_hook=[WEBHOOK_URL]" -d "failure_hook=[WEBHOOK_URL]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/asset/cloud/video.flv`

Parameter           | Data Type | Description   | Is Required
---------           | --------- | -----------   | -----------
**id**              | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true
**start_timestamp** | string    | Start timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
**end_timestamp**   | string    | End timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
**success_hook**     | string    | The webhook url (must be urlencoded) to trigger if reqeust was successful | true
**failure_hook**     | string    | The webhook url (must be urlencoded) to trigger if request failed| false
**webhook_url**      | string    | Depricated, please use success_hook instead | false

> Webhook Json POST Response

```json
{
    "data": [
    {
      "uuid": "<UUID>",
      "ui_message": "Notifying webhooks.",
      "arguments": {
        "end_timestamp": "<EETIMESTAMP>", 
        "failure_hook": "<URL>", 
        "id": "<ID>", 
        "start_timestamp": "<EETIMESTAMP>", 
        "success_hook": "<URL>"
      }
    }
  ]

}
```


### Status Codes

HTTP Status Code | Description
---------------- | -----------
201 | Request has been created and webhook will be triggered upon completion or error
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges

<!--===================================================================-->
## Get List of Images
<!--===================================================================-->

Get a list of objects, where each object contains the type of event delivering the image and timestamp

<aside class="notice">When formatting the request, either the 'end_timestamp' or 'count' parameter is required</aside>

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/asset/list/image -d "id=[CAMERA_ID]" -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -d "asset_class=[ASSET_CLASS]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/asset/list/image`

Parameter           | Data Type    | Description   | Is Required
---------           | ---------    | -----------   | -----------
**id**              | string       | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true
**start_timestamp** | string       | Start timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
**end_timestamp**   | string       | End timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
**asset_class**     | string, enum | <a class="definition" onclick="openModal('DOT-Asset-Class')">Asset Class</a> of the image <br><br>enum: all, pre, thumb | true
count               | int          | Used instead or with an `'end_timestamp'` argument. If used with an `'end_timestamp'` argument, the count is a limit on the number of entries to return, starting at the starting timestamp. If used without the `'end_timestamp'` argument, returns N entries. Support negative value, which returns N entries before, sorted in reverse order - example -5 return 5 events previous to the specified time

> Json Response

```json
[
    {
        "t":"PRFR",
        "s":"20181001000000.045"
    },
    {
        "t":"PRFR",
        "s":"20181001000001.045"
    },
    {
        "t":"PRFR",
        "s":"20181001000002.064"
    },
    {
        "t":"PRFR",
        "s":"20181001000003.064"
    },
    {
        "t":"PRFR",
        "s":"20181001000004.064"
    },
    {...}
]
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
t         | string    | Type of the requested event denoted by the object's [Four CC](#event-objects)
s         | string    | Timestamp of the image in EEN format: YYYYMMDDHHMMSS.NNN

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
301	| Asset has been moved to a different archiver
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Get List of Videos
<!--===================================================================-->

Get a list of objects, where each object contains the ID, start and end timestamp of a single video clip

<aside class="notice">When formatting the request, either the `'end_timestamp'` or `'count'` parameter is required</aside>

If the option `'options=coalesce'` has been added, the videos with overlapping start and end timestamps with the previous or next video will be merged into one single video (one single object)

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/asset/list/video -d "id=[CAMERA_ID]" -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -d "options=coalesce" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/asset/list/video`

Parameter           | Data Type    | Description   | Is Required
---------           | ---------    | -----------   | -----------
**id**              | string       | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true
**start_timestamp** | string       | Start timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
end_timestamp       | string       | End timestamp in EEN format: YYYYMMDDHHMMSS.NNN
count               | int          | Used instead of or with an `'end_timestamp'` argument. If used with an `'end_timestamp'` argument, the count is a limit on the number of entries to return, starting at the starting timestamp. If used without the `'end_timestamp'` argument, returns N entries. Supports negative values, which return N entries before sorted in reverse order (i.e. `'-5'` will return 5 events prior to the specified time)
options             | string, enum | Additional modifier options <br><br>enum: coalesce <small>(coalesces spans together if the start or end timestamp of either object overlaps with another, otherwise returns the same output)</small>

> Json Response

```json
[
    {
        "s":"20181001000016.768",
        "e":"20181001000100.758",
        "id":4177006339
    },
    {
        "s":"20181001000220.825",
        "e":"20181001000242.774",
        "id":4177006850
    },
    {
        "s":"20181001000256.811",
        "e":"20181001000320.869",
        "id":4177006866
    },
    {
        "s":"20181001000354.761",
        "e":"20181001000422.812",
        "id":4177006912
    },
    {
        "s":"20181001000526.821",
        "e":"20181001000632.829",
        "id":4177007014
    },
    {...}
]
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
s         | string    | Start timestamp of the image in EEN format: YYYYMMDDHHMMSS.NNN
e         | string    | End timestamp of the image in EEN format: YYYYMMDDHHMMSS.NNN
id        | int       | Unique identifier of the video

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
301	| Asset has been moved to a different archiver
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

