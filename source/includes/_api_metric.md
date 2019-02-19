# Metric

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service defines Metrics that can be queried from the system

<!--===================================================================-->
<!-- ## Bridge Bandwidth -->
<h2 id=bridge-bandwidth-h2>Bridge Bandwidth</h2>
<!--===================================================================-->

Used to query the <a class="definition" onclick="openModal('DOT-Bridge')">Bridge</a> Bandwidth usage for a particular device

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/metric/bridgebandwidth -d "id=[BRIDGE_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/metric/bridgebandwidth`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
**id**          | string       | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a> | true
start_timestamp | string       | Start timestamp of query in EEN format: YYYYMMDDHHMMSS.NNN (defaults to 7 days ago)
end_timestamp   | string       | End timestamp of query in EEN format: YYYYMMDDHHMMSS.NNN (defaults to *now*)
group_by        | string, enum | Hour or day indicating how the results should be grouped <br><br>enum: day, hour, minute

> Json Response

```json
{
    "core": [
        [
            "20181002170000.000",
            711610368,
            673860608,
            21533380,
            10299,
            10064282,
            9903
        ],
        [
            "20181002180000.000",
            711610368,
            673802922.666667,
            139693604,
            16579176,
            30849223,
            70446106
        ],
        [
            "20181009170000.000",
            711610368,
            674052608,
            20663486,
            8637204,
            18879693,
            19383808
        ],
        [...],
        [...],
        [...]
    ],
    "bandwidth": [
        [
            "20181002180000.000",
            253117.370892
        ],
        [
            "20181002220000.000",
            240255.523535
        ],
        [
            "20181009150000.000",
            232692.093023
        ],
        [...],
        [...],
        [...]
    ],
    "storage": [
        [
            "20181002170000.000",
            21523477
        ],
        [
            "20181002180000.000",
            69247498
        ],
        [
            "20181009170000.000",
            1279678
        ],
        [...],
        [...],
        [...]
    ]
}
```

### HTTP Response (Json Attributes)

Parameter                     | Data Type  | Description
---------                     | ---------  | -----------
[core](#bridge-core)          | array[obj] | Array of core metrics
[bandwith](#bridge-bandwidth) | array[obj] | Array of bandwidth metrics
[storage](#bridge-storage)    | array[obj] | Array of storage metrics

### Bridge - core

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Average kilobytes on disk
2         | float     | Average days on disk
3         | float     | Bytes stored
4         | float     | Bytes shaped
5         | float     | Bytes streamed
6         | float     | Bytes freed

### Bridge - bandwidth

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Bytes per second

### Bridge - storage

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Bytes difference

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Metrics not found


<!--===================================================================-->
## Camera Bandwidth
<!--===================================================================-->

Used to query the <a class="definition" onclick="openModal('DOT-Camera')">Camera</a> Bandwidth usage for a particular device

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/metric/camerabandwidth -d "id=[CAMERA_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/metric/camerabandwidth`

Parameter       | Data Type    | Description | Is Required
---------       | ---------    | ----------- | -----------
**id**          | string       | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true
start_timestamp | string       | Start timestamp of query in EEN format: YYYYMMDDHHMMSS.NNN (defaults to 7 days ago)
end_timestamp   | string       | End timestamp of query in EEN format: YYYYMMDDHHMMSS.NNN (defaults to *now*)
group_by        | string, enum | Hour or day indicating how the results should be grouped <br><br>enum: day, hour, minute
motion_interval | int          | Motion interval used for motion activity metric in milliseconds (defaults to 15000)
metrics         | string, enum | String delimited list used to filter which metrics get returned. Setting this parameter to `'core,motion'` will return data only for core and motion <br><br>enum: core, packets, motion

> Json Response

```json
{
    "core": [
        [
            "20181002190000.000",
            0,
            0,
            215910545,
            76733036,
            32049659,
            52716510
        ],
        [
            "20181002200000.000",
            0,
            0,
            252051927,
            164214711,
            36128066,
            223484133
        ],
        [
            "20181009190000.000",
            0,
            0,
            41425890,
            10373660,
            5029677,
            78599812
        ],
        [...],
        [...],
        [...]
    ],
    "packets": [
        [
            "20181002190000.000",
            0.00183
        ],
        [
            "20181002200000.000",
            0.001844
        ],
        [
            "20181009190000.000",
            0
        ],
        [...],
        [...],
        [...]
    ],
    "motion": []
}
```

### HTTP Response (Json Attributes)

Parameter                  | Data Type  | Description
---------                  | ---------  | -----------
[core](#camera-core)       | array[obj] | Array of core metrics
[packets](#camera-packets) | array[obj] | Array of packet metrics
[motion](#camera-motion)   | array[obj] | Array of motion metrics

### Camera - core

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Average kilobytes on disk
2         | float     | Average days on disk
3         | float     | Bytes stored
4         | float     | Bytes shaped
5         | float     | Bytes streamed
6         | float     | Bytes freed

### Camera - packets

Index     | Data Type | Description
-----     | --------- | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | float     | Packet loss percentage (decimal)

### Camera - motion

Index     | Data Type | Description
-----     | --------  | -----------
0         | string    | EEN Timestamp: YYYYMMDDHHMMSS.NNN
1         | int       | Motion activity value

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Metrics not found

