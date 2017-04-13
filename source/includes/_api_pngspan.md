# Png Span

<!--===================================================================-->
## Overview

This service offers native PNG span rendering to support metric visualization. For spans, the image is filled with the foreground color where the specified span is active, and with the background where it is inactive. At least one pixel will be filled for a span, independent of scale, though the span may overlap others. For etags, one pixel is filled for each active event, but as with spans the pixel may overlap others.

### Response Headers

content-location: resource actually rendered. absolute start/end ts and either table/etag depending on whether an index was used

### Discussion

The pngspan is a very efficient mechanism for visualizing where metrics and spans are active. PNG are extremely compact - a day of spans will be a few hundred bytes. The user is expected to scale the image vertically as needed.

Tile the PNGs for fast, infinite scrolling. Render a width/timespan that represents a rational chunk of the current screen - say 4 hours in a day view. Fill the screen with tiles, fetch offscreen at the same size in preparation to scroll. Change origin of each entity to accomplish fast smooth scrolling. Fetch successive offscreen buffers as they come on screen.

Hit detection (for rollover) can be done in a browser by rendering opaque colors and reading pixels values from a one pixel high offscreen image. If an active pixel is detected, fetch the window of events around the timestamp estimate (since the pixel resolution is usually much less than the ms resolution needed for a timestamp), and use the response to determine what metric/span to display (ie the closest one…).

### PNG Types

<!--- TODO: Convert this int a table? -->

<!--- TODO: Document event type, document purge_types, video_types -->

PNG images can be retrieved for supporting metric visualization. PNG types include

  * annt
	* namespace - limits annt select to only entries within ns list
	* uuid - limits annt selection to only entries within uuid list
  * etag
  * event
  * purge
	* fflags=LOST - filter for only purges the lost data (within retention window)
	* purge\_types
  * setting
	* table=onoff - "camera\_on" setting, the inverse of which represents camera "off"
  * span
	* table=video - video recording on
		* fflags=STREAM - filter for only streaming video
		* video_types
	* table=motion - motion detected (overall)
		* fflags=ALERTS - filter for only motion that triggered alert
	* table=roim - roi motion detected
		* fflags=ALERTS - filter for only roim that triggered alert
		* flname=roiid, flval=roiid value
	* table=stream - bridge is streaming from camera, the inverse of which represents camera "offline"
	* table=register - camera is registered with the cloud, the inverse of which represents "internet offline"
	* table=video - video recording on
		* fflags=STREAM - filter for only streaming video
	* table=motion - motion detected (overall)
		* fflags=ALERTS - filter for only motion that triggered alert
	* table=roim - roi motion detected
		* fflags=ALERTS - filter for only roim that triggered alert
		* flname=roiid, flval=roiid value
	* table=stream - bridge is streaming from camera, the inverse of which represents camera "offline"
	* table=register - camera is registered with the cloud, the inverse of which represents "internet offline"

<!--===================================================================-->
## Get Png Span

> Request

```shell
curl -G https://login.eagleeyenetworks.com/pngspan/span.png -d "start_timestamp=[START_TIMESTAMP]&end_timestamp=[END_TIMESTAMP]&width=[WIDTH]&id=[CAMERA_ID]&foreground_color=[FOREGROUND_COLOR]&background_color=[BACKGROUND_COLOR]&table=[TABLE]&A=[AUTH_KEY]"
```

> Response

```shell
PNG content (binary)
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/pngspan/{png_type}.png`

<!--- TODO: Is Required should be Required for - follow Joey's style -->

Parameter          		| Data Type     | Description   | Is Required
---------          		| -----------   | -----------   | -----------
**start\_timestamp**		| string        | Start Timestamp in EEN format: [YYYYMMDDHHMMSS.NNN](#een-timestamp) | ✓
**end\_timestamp**  		| string        | End Timestamp in EEN format: [YYYYMMDDHHMMSS.NNN](#een-timestamp) | ✓
**width**         		| int        	| Width in pixels of resulting PNG. Must be an integer greater than 0. | ✓
**id**         			| string        | Camera Id | ✓
**foreground\_color**    | string        | Color of foreground (active). If both fg and bg have 0 for alpha, assumed fully opaque (0xff). 32bit ARGB color. | ✓
**background\_color**    | string        | Color of background (inactive). 32bit ARGB color. | ✓
table    				| string, enum  | If provided, specifies name of table to be rendered. Required for type 'span' and 'event'. <br><br>enum: stream, onoff, video, register
etag    				| string        | Indentifies etag to be rendered, using the 4 character string identifier ('4CC'). Will utilize matching event tables where possible. Ignored for type 'span' and 'event'.
flval    				| string        | Identified value of the filter field from the starting etag. Only applicable for type 'span'.
flname					| string 	| Name of field within span start etag to match to flval. Interesting fields are roiid in roim table and videoid for video. Only applicable for type 'span'.
flflags    				| string        | Limits span rendering to spans with the flag asserted. ALERTS is asserted for roim and motion spans when an alert is active.
namespace    				| list[int]     | Comma-separated list of namespaces. Only applicable for type 'annt'.
uuid    				| list[uuid]    | Comma-separated list of UUIDs. Only applicable for type 'annt'.
video\_types   				| string        | List of chars indicating filter for video spans. a - always video, s - streaming video, e - event video, A - all video (default). Only applicable for video spans.
purge\_types   				| string        | List of chars indicating purge filter. a - always only, v - video only, A - all, L - data lost. Only applicable for type 'purge'.
invert   				| boolean       | Reverse set and clear logic.  As events are rendered "expansive" (that is a single event will always result in at least 1 pixel in foreground color) invert will reverse this, preserving "not there" over "there".

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
401 | Unauthorized due to invalid session
404 | Not found if camera, etag or table cannot be found
408 | Required arguments are missing or invalid
500 | Problem occurred during data processing or rendering