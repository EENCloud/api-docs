# Png Span

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service offers native <a class="definition" onclick="openModal('DOT-PNG-Span')">PNG Span</a> rendering to support metric visualization. For spans the image is filled with the foreground color, where the specified span is active and with the background, where it is inactive. At least one pixel will be filled for a span independent of scale (the span may overlap others). For etags one pixel is filled for each active <a class="definition" onclick="openModal('DOT-Event')">Event</a>, but the pixel may overlap others

### Response Headers

`'content-location'`: resource actually rendered, absolute start/end ts and either table/etag depending on whether an index was used

### Use Cases

The PNG span is a very efficient mechanism for visualizing where metrics and spans are active. Scale the image vertically as needed. PNG are extremely compact - a day of spans will be a few hundred bytes

The following description provides a typical use model:

  - Tile the PNGs for fast, infinite scrolling. Render a width/timespan that represents a rational chunk of the current screen (i.e. 4h in a day view)
    - Fill the screen with tiles, fetch offscreen at the same size in preparation to scroll
    - Change origin of each entity to accomplish fast smooth scrolling
    - Fetch successive offscreen buffers as they come on screen
  - Hit detection (for rollover) can be done in a browser by rendering opaque colors and reading pixels values from a one pixel high offscreen image
    - If an active pixel is detected, fetch the window of events around the timestamp estimate (since the pixel resolution is usually much less than the millisecond resolution needed for a timestamp) and use the response to determine what metric/span to display (i.e. the closest one)

### PNG Type List

  - `'setting'`
    - `'table=onoff'` - `'camera_on'` setting, the inverse of which represents camera *off*
  - `'purge'`
    - `'fflags=LOST'` - filter for only purges the lost data (within retention window)
  - `'span'`
    - `'table=video'` - video recording on
      - `'fflags=STREAM'` - filter for only streaming video
    - `'table=motion'` - motion detected (overall)
      - `'fflags=ALERTS'` - filter for only motion that triggered alert
    - `'table=roim'` - roi motion detected
      - `'fflags=ALERTS'` - filter for only roim that triggered alert
      - `'flname=roiid'` - `'flval=roiid'` value
    - `'table=stream'` - bridge is streaming from camera, the inverse of which represents camera *offline*
    - `'table=register'` - camera is registered with the cloud, the inverse of which represents *internet offline*

<!--===================================================================-->
## Get Png Span
<!--===================================================================-->

PNG images can be retrieved for supporting metric visualization

### PNG Types

  - `'span'`
  - `'etag'`
  - `'event'`
  - `'setting'`
  - `'purge'`

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/pngspan/etag.png -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -d "width=[WIDTH]" -d "id=[CAMERA_ID]" -d "foreground_color=[COLOR_CODE]" -d "background_color=[COLOR_CODE]" -d "etag=[FOUR_CC]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G -v
```

> <small>Provide the '<b>-O</b>' option at the end of the request for file output to the current directory</small>

> <small>Provide the '<b>-o "/\<file_path/\<filename\>\.\<extension\>"</b>' option to specify output filename, path and extension</small>


### HTTP Request

`GET https://login.eagleeyenetworks.com/pngspan/{pngspan_type}.png`

Parameter           | Data Type    | Description | Is Required
---------           | ---------    | ----------- | -----------
**id**              | string       | Camera ID   | true
**width**           | int          | Width in pixels of resulting PNG. Must be an integer greater than 0 | true
**start_timestamp** | string       | Start Timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
**end_timestamp**   | string       | End Timestamp in EEN format: YYYYMMDDHHMMSS.NNN | true
foreground_color    | string       | Color of foreground (active). If both foreground and background have 0 for alpha, assumed fully opaque (0xff) <br><br>Example (32 bit ARGB color): `'0xf0000000'`
background_color    | string       | Color of background (inactive) <br><br>Example (32 bit ARGB color): `'0xffffffff'`
table               | string, enum | If provided, specifies name of table to be rendered. Required for type `'span'` and `'event'` <br><br>enum: stream, onoff, video, register
etag                | string       | Identifies etag to be rendered, using the 4 character string identifier ([Four CC](#event-objects)). Will utilize matching event tables where possible. Ignored for type `'span'` and `'event'`
flval               | string       | Identified value of the filter field from the starting etag. Only applicable for type `'span'`
flname              | string       | Name of field within span start etag to match to flval. Interesting fields are roiid in roim table and videoid for video. Only applicable for type `'span'`
flflags             | string       | Limits span rendering to spans with the flag asserted. ALERTS is asserted for roim and motion spans when an alert is active

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session
404	| Not found if camera, etag or table cannot be found
500	| Problem occurred during data processing or rendering
200	| Request succeeded

<!-- TODO: Confirm a scenario where the error code is applicable: 408	| Required arguments are missing or invalid -->
