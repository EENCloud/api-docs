# Search

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service enables the Search across various types of data

<aside class="success">Currently only supports recordings and annotations, but support for other types of data is coming soon</aside>

<!--===================================================================-->
## Search Model
<!--===================================================================-->

> Search Model TODO

```json
```

### Search (Attributes)

<details hidden>
Parameter | Data Type | Description
--------- | --------- | -----------
<p hidden>???</p> | <p hidden>???</p> | <p hidden>???</p>
</details>


<!--===================================================================-->
## Search Recordings
<!--===================================================================-->

Returns an array of recording objects that match a search value

> Request

```shell
curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/g/search/recordings -d "value=[SEARCH_VALUE]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

### HTTP Request

`TODO`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**value** | string    | Value to search for | true

> Json Response TODO

```json
```

### HTTP Response (Array Attributes)

Parameter                   | Data Type     | Description
---------                   | ---------     | -----------
\_key                       | string        | Unique identifier (within the user's account) of the recording
current_recording_timestamp | string        | Timestamp of when the current recording (if any) was started
recording_%s_start          | RecordingInfo | Object of info about the recording start event, where `'%s'` is the timestamp it started. Could be N number of these
recording_%s_stop           | RecordingInfo | Object of info about the recording stop event, where `'%s'` is the timestamp it started. Must have a matching `'recording_%s_start'` event. Could be N number of these
recording_%s_meta           | object        | Object of info about the recording, where `'%s'` is the timestamp it started. Must have a matching `'recording_%s_start'` event

### RecordingInfo Json Attributes

Parameter   | Data Type     | Description
---------   | ---------     | -----------
timestamp   | string        | Timestamp of when the recording was started
layout_id   | boolean       | ID of a layout the recording was started for
camera_ids  | array[string] | Array of camera IDs which had recording started for
layout_name | string        | Name of layout at the time the recording started
user_id     | string        | ID of the user who started/stopped the recording

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Search Annotations
<!--===================================================================-->

Returns array of annotation objects that match a search value

> Request TODO

```shell
```

### HTTP Request

`GET https://[active_brand_subdomain].eagleeyenetworks.com/g/search/recordings`

Parameter           | Data Type | Description | Is Required
---------           | --------- | ----------- | -----------
**value**           | string    | Value to search for | true
**start_timestamp** | string    | Start timestamp used to limit search results | true
end_timestamp       | string    | End timestamp used to limit search results (defaults to *now*)

> Json Response TODO

```json
```

<details hidden>
### HTTP Response (Array Attributes)

Parameter | Data Type     | Description
--------- | ---------     | -----------
<p hidden>???</p> | array[object] | <p hidden>???</p>
</details>


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges

