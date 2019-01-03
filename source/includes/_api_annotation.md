# Annotation

<!--===================================================================-->
## Overview
<!--===================================================================-->

The Annotation service allows to push data (including HTML elements) into the <a class="definition" onclick="openModal('DOT-Event')">Event</a> stream to add additional information about a camera/video. Annotations are associated with a <a class="definition" onclick="openModal('DOT-Device')">Device</a> and a <a class="definition" onclick="openModal('DOT-Timestamp')">Timestamp</a>

<aside class="notice">Annotations are subject to normal retention logic and as such will be discarded when the annotated time has exceeded retention</aside>

<!--===================================================================-->
## Annotation Model
<!--===================================================================-->

> Annotation Model

```json
[
    [
        "3f06b432-41f9-11e7-aaf2-1c1b0daef2f5",
        "20180526095347.742",
        2,
        {
            "data": "{\"info\":\"Annotation1\";}"
            "_hb": [
                [
                    "20180526095350.742",
                    {
                        "field1": "Heartbeat",
                        "field2": "for",
                        "field3": "cafedead"
                    }
                ],
                [...],
                [...]
            ]
        }
    ],
    [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "20180526095435.831",
        11,
        {
            "info": "Annotation by cafedead"
            "_end": "20180526095440.831"
        }
    ],
    [...]
]
```

### Annotation (Attributes)

Array Index | Attribute    | Data Type | Description                                                                                               | Editable    | Required
----------- | ---------    | --------- | -----------                                                                                               |:-----------:| --------
**0**       | **uuid**     | string    | Unique identifier for the annotation assigned to it during creation                                       | **&cross;** | **<sub><form action="#get-annotation"><button>GET</button></form></sub>**
  1         | timestamp    | string    | Time of the annotation creation in EEN Timestamp format: YYYYMMDDHHMMSS.NNN                               | **&cross;** |
**2**       | **ns**       | int       | Namespace *grouping* assigned to the annotation (in the EEN structure namespaces can describe a specific category of annotations) <br><br>**Note:** Can only be defined during Create Annotation                                                                                                                | **&check;** | **<sub><form action="#create-annotation"><button>PUT</button></form></sub>** <br>**<sub><form action="#update-annotation"><button>POST</button></form></sub>**
**3**       | **\<data\>** | json      | Content of the annotation                                                                                 | **&check;** | **<sub><form action="#create-annotation"><button>PUT</button></form></sub>** <br>**<sub><form action="#update-annotation"><button>POST</button></form></sub>**

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

<!--===================================================================-->
## Get Annotation
<!--===================================================================-->

Returns an Annotation object by ID/UUID

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/get -d "id=[DEVICE_ID]" -d "uuid=[UUID1],[UUID2],[UUID3]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/get`

Parameter     | Data Type     | Description                                                                                                                  | Required    |
---------     | ---------     | -----------                                                                                                                  |:-----------:|
**id**        | string        | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation is associated with                   | **&check;** |
**uuid**      | array[string] | Array of comma-separated annotation UUIDs to return                                                                          | **&check;** |

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Create Annotation
<!--===================================================================-->

Create an Annotation for a device with a specific timestamp and data describing it

<aside class="notice">Annotations can only be created from within the account, where the device resides for which the annotation is being created</aside>

> Request

```shell
curl -X PUT "https://login.eagleeyenetworks.com/annt/set?c=[DEVICE_ID]&ts=[TIMESTAMP]&ns=[NAMESPACE]" -d '{"[KEY_NAME]": "[ANNOTATION_DATA]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/annt/set`

Parameter     | Data Type | Description                                                                                                                      | Required    |
---------     | --------- | -----------                                                                                                                      |:-----------:|
**c**         | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation should be associated with                | **&check;** |
**\<data\>**  | json      | Json object representing the data to be used as the annotation content (can include HTML elements)                               | **&check;** |
ts            | string    | Timestamp associated with the annotation (If left out the system will automatically provide a timestamp)                         | **&cross;** |
ns            | int       | The numerical namespace value assigned by Eagle Eye Networks                                                                     | **&cross;** |

> Json Response

```json
{
    "uuid": "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
    "cameraid": "1000f60d",
    "ts": "20180526095435.831",
    "ns": 11
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
uuid      | string    | Unique identifier of the annotation
cameraid  | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation has been associated with
ts        | string    | Timestamp associated with the annotation
ns        | string    | Namespace associated with the annotation

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Update Annotation
<!--===================================================================-->

Update an Annotation for a device with a particular timestamp. Simple modifications (`'type=mod'`) require to pass the original `'timestamp'` from when the Annotation was created. Zero to N `'heartbeats'` (`'type=hb'`) can also be applied to describe changes over time for the Annotation

The Annotation can be ended at any given time by specifying an end event (`'type=end'`), which closes the Annotation and allows to attach additional information. Each Annotation event is assumed to last for 10 seconds in the absence of a heartbeat extending it (After a heartbeat, it is assumed to last for another 10 seconds)

> Request

```shell
curl -X POST "https://login.eagleeyenetworks.com/annt/set?u=[UUID];c=[DEVICE_ID];ns=[NAMESPACE];ts=[TIMESTAMP]" -d '{"[KEY_NAME]": "[ANNOTATION_DATA]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/annt/set`

Parameter     | Data Type    | Description                                                                                                                   | Required    |
---------     | ---------    | -----------                                                                                                                   |:-----------:|
**u**         | string       | Unique identifier (UUID) of the annotation being updated returned during Create Annotation                                    | **&check;** |
**c**         | string       | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> associated with the annotation being updated         | **&check;** |
**ts**        | string       | Timestamp associated with the annotation when originally created in EEN format: YYYYMMDDHHMMSS.NNN                            | **&check;** |
**ns**        | int          | The numerical namespace value assigned by Eagle Eye Networks (can be omitted for heartbeat events `'type=hb'`)                | **&check;** |
**\<data\>**  | json         | Json object representing the data to be used as the annotation content (can include HTML elements)                            | **&check;** |
type          | string, enum | The type of annotation update to make (defaults to `'mod'`): <br><br>`'mod'` - simple modification of the annotation <br>`'hb'` - indicates a heartbeat event, adding information on parameters that have changed and extending duration <br>`'end'` - indicates the end of the event and updates the annotation if changes have been specified, no `'hb'` with a later timestamp will be accepted <br><br>enum: mod, hb, end                                                                                 | **&cross;** |

> Json Response

```json
{
    "uuid": "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
    "cameraid": "1000f60d",
    "ts": "20180526095435.831",
    "ns": 11
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
uuid      | string    | Unique identifier of the annotation
cameraid  | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation has been updated for
ts        | string    | Timestamp associated with the annotation
ns        | string    | Namespace associated with the annotation

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Next Annotation
<!--===================================================================-->

Returns an object populated by Annotation events occurring *around* the defined timestamp by searching for the next event in the indicated direction (across create, update, hb, end events)

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/next -d "id=[DEVICE_ID]" -d "start_timestamp=[START_TIMESTAMP]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/next`

Parameter               | Data Type | Description                                                                                                                                                                                                                               | Required    |
----------------------- | --------- | -----------                                                                                                                                                                                                                               |:-----------:|
**id**                  | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation is associated with                                                                                                                                | **&check;** |
**start_timestamp**     | string    | Timestamp as a point in time to get annotation event(s) after in EEN format: YYYYMMDDHHMMSS.NNN                                                                                                                                           | **&check;** |
end_timestamp           | string    | Timestamp as optional limiter for the searched annotation event(s) in EEN format: YYYYMMDDHHMMSS.NNN (defaults to *now*). Matches events with identical start timestamps as the specified `'end_timestamp'`                               | **&cross;** |
namespace               | string    | Namespace(s) as optional comma-separated limiter for the searched annotation event(s). Excludes all except for the specified namespace(s) by excluding results in both categories: `'new'` and `'active'` (defaults to *include all*)     | **&cross;** |
uuid                    | string    | Unique identifier(s) as optional comma-separated limiter for the searched annotation event(s). Includes all except for the specified UUID(s) by excluding results from the `'new'` category (defaults to *include all*)                   | **&cross;** |
flat                    | string    | Flatten the search results to merge heartbeats into the main annotation level and produce one consistent prolonged searchable event. No value is required <br><br>Example: `'flat='`                                                      | **&cross;** |

> Json Response

```json
{
    "ts": "20180526095435.831",
    "new": [
        [
            "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
            "20180526095435.831",
            11,
            {
                "info": "Annotation by cafedead"
                "_end": "20180526095440.831"
            }
        ],
        [...],
        [...]
    ],
    "active": [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "<uuid>",
        "<uuid>"
    ]
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type         | Description
--------- | ---------         | -----------
ts        | string            | Closest matching timestamp to the requested (to get annotations after) in EEN format: YYYYMMDDHHMMSS.NNN
new       | array[array[obj]] | Array of arrays with each returned element being an annotation object with Json-formatted data <br>(See [Annotation Model](#annotation-model) for the returned annotation array structure)
active    | array[string]     | Array of all annotation UUIDs active around the specified `'st'` (or within the defined time window)

<aside class="notice">If the search criteria has not been matched by any events, the return will be <i>null</i></aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Previous Annotation
<!--===================================================================-->

Returns an object populated by Annotation events occurring *around* the defined timestamp by searching for the previous event in the indicated direction (across create, update, hb, end events)

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/prev -d "id=[DEVICE_ID]" -d "end_timestamp=[END_TIMESTAMP]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/prev`

Parameter           | Data Type | Description                                                                                                                                                                                                                               | Required    |
------------------- | --------- | -----------                                                                                                                                                                                                                               |:-----------:|
**id**              | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation is associated with                                                                                                                                | **&check;** |
**end_timestamp**   | string    | Timestamp as a point in time to get annotation event(s) before in EEN format: YYYYMMDDHHMMSS.NNN                                                                                                                                          | **&check;** |
start_timestamp     | string    | Timestamp as optional limiter for the searched annotation event(s) in EEN format: YYYYMMDDHHMMSS.NNN (defaults to maximum retention). Matches events with identical start timestamps as the specified `'start_timestamp'`                 | **&cross;** |
namespace           | string    | Namespace(s) as optional comma-separated limiter for the searched annotation event(s). Excludes all except for the specified namespace(s) by excluding results in both categories: `'new'` and `'active'` (defaults to *include all*)     | **&cross;** |
uuid                | string    | Unique identifier(s) as optional comma-separated limiter for the searched annotation event(s). Includes all except for the specified UUID(s) by excluding results from the `'new'` category (defaults to *include all*)                   | **&cross;** |
flat                | string    | Flatten the search results to merge heartbeats into the main annotation level and produce one consistent prolonged searchable event. No value is required <br><br>Example: `'flat='`                                                      | **&cross;** |

> Json Response

```json
{
    "ts": "20180526095435.831",
    "new": [
        [
            "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
            "20180526095435.831",
            11,
            {
                "info": "Annotation by cafedead"
                "_end": "20180526095440.831"
            }
        ],
        [...],
        [...]
    ],
    "active": [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "<uuid>",
        "<uuid>"
    ]
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type         | Description
--------- | ---------         | -----------
ts        | string            | Closest matching timestamp to the requested (to get annotations before) in EEN format: YYYYMMDDHHMMSS.NNN
new       | array[array[obj]] | Array of arrays with each returned element being an annotation object with Json-formatted data <br>(See [Annotation Model](#annotation-model) for the returned annotation array structure)
active    | array[string]     | Array of all annotation UUIDs active around the specified `'et'` (or within the defined time window)

<aside class="notice">If the search criteria has not been matched by any events, the return will be <i>null</i></aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Window of Annotations
<!--===================================================================-->

Return an object populated by active annotation events as a point in time (optionally including annotations that have recently ended). The result can be filtered (across create, update, hb, end events) by passing UUIDs to be excluded from the list. By specifying `'start_timestamp'` the result will include any documents ended between `'start_timestamp'` and `'end_timestamp'` (specifying `'start_timestamp'` does not change the search interval)

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/window  -d "id=[DEVICE_ID]" -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/window`

Parameter            | Data Type | Description                                                                                                                                                                                                                              | Required    |
-------------------- | --------- | -----------                                                                                                                                                                                                                              |:-----------:|
**id**               | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the event is associated with                                                                                                                                    | **&check;** |
**end_timestamp**    | string    | End timestamp of query in EEN format: YYYYMMDDHHMMSS.NNN                                                                                                                                                                                 | **&check;** |
start_timestamp      | string    | Timestamp as optional limiter for the searched annotation event(s) in EEN format: YYYYMMDDHHMMSS.NNN (defaults to maximum retention). Matches events with identical start timestamps as the specified `'start_timestamp'`                | **&cross;** |
namespace            | string    | Namespace(s) as optional comma-separated limiter for the searched annotation event(s). Excludes all except for the specified namespace(s) by excluding results in both categories: `'new'` and `'active'` (defaults to *include all*)    | **&cross;** |
uuid                 | string    | Unique identifier(s) as optional comma-separated limiter for the searched annotation event(s). Includes all except for the specified UUID(s) by excluding results from the `'new'` category (defaults to *include all*)                  | **&cross;** |
flat                 | string    | Flatten the search results to merge heartbeats into the main annotation level and produce one consistent prolonged searchable event. No value is required <br><br>Example: `'flat='`                                                     | **&cross;** |

<aside class="notice">If the search criteria has not been matched by any events, the return will be a Json object with an empty array in 'new' and 'active'</aside>

<aside class="warning">Adding the parameter 'flat' currently removes the heartbeat annotation level altogether, leaving only the original annotation preserved</aside>

> Json Response

```json
{
    "ts": "20180526095435.831",
    "new": [
        [
            "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
            "20180526095435.831",
            11,
            {
                "info": "Annotation by cafedead"
                "_end": "20180526095440.831"
            }
        ],
        [...],
        [...]
    ],
    "active": [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "<uuid>",
        "<uuid>"
    ]
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type         | Description
--------- | ---------         | -----------
ts        | string            | Closest matching timestamp to the requested (to get annotations for) in EEN format: YYYYMMDDHHMMSS.NNN
new       | array[array[obj]] | Array of arrays with each returned element being an annotation object with Json-formatted data <br>(See [Annotation Model](#annotation-model) for the returned annotation array structure)
active    | array[string]     | Array of all annotation UUIDs returned based on the specified criteria

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Get List of Annotations
<!--===================================================================-->

Returns an array of Annotations by count or time range

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/annt/list -d "id=[DEVICE_ID]" -d "start_timestamp=[START_TIMESTAMP]" -d "end_timestamp=[END_TIMESTAMP]" -H 'Content-type: application/json' -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/annt/list`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**id**              | string        | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation should be associated with      | **&check;** |
**start_timestamp** | string        | Start timestamp of the annotations to return                                                                           | **&check;** |
**end_timestamp**   | string        | End timestamp of the annotations to return                                                                             | **&check;** |
count               | int           | N number of annotations to return (can be used to replace the `'end_timestamp'`, in which case will return the first N number of annotations after `'start_timestamp'`)                                                                                                                                         | **&cross;** |
uuid                | array[string] | Array of comma-separated UUIDs to list                                                                                 | **&cross;** |
namespace           | array[int]    | Array of 1 to N comma-separated namespaces to list                                                                     | **&cross;** |
exclusive           | boolean       | Whether to exclude annotations that are active during, but have not started within the specified span (1) or not (0)   | **&cross;** |
jsonp               | string        | JSONP (JSON with padding) is a convention used to invoke cross-domain scripts by generating script tags in the current request data. The result is returned wrapped in a specified callback function                                                                                                            | **&cross;** |

> Json Response

```json
[
    [
        "3f06b432-41f9-11e7-aaf2-1c1b0daef2f5",
        "20180526095347.742",
        2,
        {
            "data": "{\"info\":\"Annotation1\";}"
            "_hb": [
                [
                    "20180526095350.742",
                    {
                        "field1": "Heartbeat",
                        "field2": "for",
                        "field3": "cafedead"
                    }
                ],
                [...],
                [...]
            ]
        }
    ],
    [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "20180526095435.831",
        11,
        {
            "info": "Annotation by cafedead"
            "_end": "20180526095440.831"
        }
    ],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute | Data Type | Description
----------- | --------- | --------- | -----------
0           | uuid      | string    | Unique identifier for the annotation assigned to it during creation
1           | timestamp | string    | Time of the annotation creation in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
2           | namespace | int       | Namespace *grouping* assigned to the annotation (in the EEN structure namespaces can describe a specific category of annotations)
3           | \<data\>  | json      | Content of the annotation

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded

<!--===================================================================-->
## Get List of Events
<!--===================================================================-->

Returns an array of Events by count or time range

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/annt/event/list -d "id=[DEVICE_ID]" -d "st=[START_TIMESTAMP]" -d "et=[END_TIMESTAMP]" -H 'Content-type: application/json' -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/annt/event/list`

Parameter           | Data Type     | Description                                                                                                            | Required    |
---------           | ---------     | -----------                                                                                                            |:-----------:|
**id**              | string        | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> the annotation should be associated with      | **&check;** |
**start_timestamp** | string        | Start timestamp of the annotations to return                                                                           | **&check;** |
**end_timestamp**   | string        | End timestamp of the annotations to return                                                                             | **&check;** |
count               | int           | N number of annotations to return (can be used to replace the `'end_timestamp'`, in which case will return the first N number of annotations after `'start_timestamp'`)                                                                                                                                         | **&cross;** |
uuid                | array[string] | Array of comma-separated UUIDs to list                                                                                 | **&cross;** |
namespace           | array[int]    | Array of 1 to N comma-separated namespaces to list                                                                     | **&cross;** |
exclusive           | boolean       | Whether to exclude annotations that are active during, but have not started within the specified span (1) or not (0)   | **&cross;** |
jsonp               | string        | JSONP (Json with padding) is a convention used to invoke cross-domain scripts by generating script tags in the current request data. The result is returned wrapped in a specified callback function                                                                                                            | **&cross;** |

> Json Response

```json
[
    [
        "3f06b432-41f9-11e7-aaf2-1c1b0daef2f5",
        "20180526095347.742",
        2,
        4,
        {
            "data": "{\"info\":\"Annotation1\";}"
            "_hb": [
                [
                    "20180526095350.742",
                    {
                        "field1": "Heartbeat",
                        "field2": "for",
                        "field3": "cafedead"
                    }
                ],
                [...],
                [...]
            ]
        }
    ],
    [
        "595e4b9c-41f9-11e7-aaf2-0d5g1hafj2z6",
        "20180526095435.831",
        11,
        5,
        {
            "info": "Annotation by cafedead"
            "_end": "20180526095440.831"
        }
    ],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute | Data Type | Description
----------- | --------- | --------- | -----------
0           | uuid      | string    | Unique identifier for the annotation assigned to it during creation
1           | timestamp | string    | Time of the annotation creation in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
2           | namespace | int       | Namespace *grouping* assigned to the annotation (in the EEN structure namespaces can describe a specific category of annotations)
3           | type      | int       | An additional array element is present in the event list, describing the event type <br><br>Event type: <br>1 - Create <br>2 - Update <br>3 - *Reserved* <br>4 - Heartbeat <br>5 - End
4           | \<data\>  | json      | Content of the annotation

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### Error Status Codes

HTTP Status Code | Description
---------------- | -----------
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
200	| Request succeeded
