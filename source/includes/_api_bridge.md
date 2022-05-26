# Bridge

<!--===================================================================-->
## Overview
<!--===================================================================-->

The <a class="definition" onclick="openModal('DOT-Bridge')">Bridge</a> is a product of Eagle Eye that is deployed at the customer location and communicates with industry standard cameras. It converts the cameras to be compatible with the <a class="definition" onclick="openModal('DOT-EEVB')">EEVB</a> and record <a class="definition" onclick="openModal('DOT-Asset')">Assets</a>. The Bridge is configured and controlled via a cloud-based user interface (has no built-in user interface). The Bridge may serve local assets directly to local clients. The Bridge will also store assets until they are transferred to the EEVB. The Bridge can be configured via DHCP or have a static IP address

<!--===================================================================-->
## Bridge Model
<!--===================================================================-->

> Bridge Model

```json
{
    "id": "1002d096",
    "name": "Kitchen Bridge",
    "utcOffset": -18000,
    "timezone": "US/Central",
    "guid": "835b391f-6554-4e0a-902d-e989b3b46dba",
    "permissions": "A@FIMLNSUTZcgfhmpsruwz",
    "tags": [],
    "bridges": null,
    "camera_settings_status_code": 200,
    "camera_settings": "{}",
    "settings": {
        "local_display_layout_ids": [
            "default"
        ],
        "bridge": null
    },
    "camera_info_status_code": 200,
    "camera_info": {
        "ssn": "EEN-BR305-15721",
        "esn": "1002d096",
        "class": "bridge",
        "run_mode": "normal",
        "no_video": 1,
        "camera_property_model": "305%2Faa",
        "camera_property_make": "een",
        "model": "305%2Faa",
        "make": "een",
        "uuid": "835b391f-6554-4e0a-902d-e989b3b46dba",
        "service": "ATTD",
        "status": "1179649",
        "status_hex": "00120001",
        "ipaddr": "192.168.8.100",
        "proxy": "secondary",
        "camera_state_version": 1,
        "tagmap_status_state": 2,
        "version": "0.3.38",
        "camera_property_version": "0.3.38",
        "register_id": 4224224322,
        "camera_retention_asset": 1209600000,
        "camera_newest": "20180704112818.435",
        "camera_oldest": "20180627000000.000",
        "camera_retention_etag": 1209600000,
        "now": "20180704120834.922",
        "camera_property_analog": false,
        "camera_retention_interval": 1209600000,
        "camera_now": "20180704120834.448",
        "camera_abs_newest": "20180704112818.435",
        "camera_abs_oldest": "20180620000000.000",
        "camera_valid_ts": "20180627000000.000"
    },
    "camera_parameters_status_code": 200,
    "camera_parameters": {
        "active_settings": {
            "pos_interface_enable": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "bandwidth_auto_measure": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "display_layouts": {
                "d": {},
                "v": {}
            },
            "rtp_streaming": {
                "min": [
                    "udp",
                    "tcp"
                ],
                "d": "tcp",
                "v": "tcp"
            },
            "esn_logs": {
                "d": {},
                "v": {}
            },
            "preview_aggregate_bandwidth": {
                "max": 10000000000,
                "min": 0,
                "d": 0,
                "v": 100000
            },
            "health_report_disable": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "uuid_logs": {
                "d": {},
                "v": {}
            },
            "analog_channel_map": {
                "d": {},
                "v": {}
            },
            "retention_days": {
                "max": 10000,
                "min": 0,
                "d": 14,
                "v": 14
            },
            "bridge_retention_days": {
                "max": 100000,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "stream_stats": {
                "d": "none",
                "v": "none"
            },
            "display_default_enabled": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "purge_non_retention_days": {
                "max": true,
                "min": false,
                "d": false,
                "v": false
            },
            "http_local_enable": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "encryption_type": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "bandwidth_recover": {
                "max": 10000000000,
                "min": 100000,
                "d": 5000000,
                "v": 5000000
            },
            "upnp_enable": {
                "max": 1,
                "min": -1,
                "d": 0,
                "v": 0
            },
            "bandwidth_upload": {
                "max": 10000000000,
                "min": 100000,
                "d": 1000000,
                "v": 1033591.7312661498
            },
            "interface_info": {
                "d": {},
                "v": {
                    "eth1": {
                        "type": "ethernet",
                        "state": 10,
                        "carrier": true,
                        "speed": 1000,
                        "settings": {}
                    },
                    "eth0": {
                        "type": "ethernet",
                        "state": 100,
                        "carrier": true,
                        "speed": 100,
                        "settings": {}
                    }
                }
            },
            "uplink_bw_bps": {
                "max": 10000000000,
                "min": 1000,
                "d": 1000000,
                "v": 3445305.7708871663
            },
            "uplink_measured_bw_bps": {
                "max": 10000000000,
                "min": 0,
                "d": 0,
                "v": 3445305.7708871663
            },
            "config_feature_local": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "local_display_enable": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "local_audio_device": {
                "d": "none",
                "v": "none"
            },
            "stream_stats_present_only": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "uuid_base_log": {
                "max": 4294967295,
                "min": 0,
                "d": 256,
                "v": 256
            },
            "applications": {
                "d": {
                    "eenivi": {
                        "version": 3,
                        "features": {
                            "tamper": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            },
                            "object": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            },
                            "intrusion": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            },
                            "linecross": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            }
                        },
                        "settings": {
                            "name": "eenivi",
                            "stream": "metadata"
                        }
                    }
                },
                "v": {
                    "eenivi": {
                        "version": 3,
                        "features": {
                            "tamper": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            },
                            "object": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            },
                            "intrusion": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            },
                            "linecross": {
                                "minh": 200,
                                "version": 1,
                                "minw": 300,
                                "cpu": 0.1,
                                "minrate": 4
                            }
                        },
                        "settings": {
                            "name": "eenivi",
                            "stream": "metadata"
                        }
                    }
                }
            },
            "bandwidth_demand": {
                "max": 10000000000,
                "min": 100000,
                "d": 10000000,
                "v": 10000000
            },
            "preview_aggregate_default_bandwidth": {
                "max": 10000000000,
                "min": 0,
                "d": 0,
                "v": 100000
            },
            "pos_device_config": {
                "d": {},
                "v": {}
            },
            "audio_status": {
                "d": {},
                "v": {}
            },
            "uplink_shaping_ratio": {
                "max": 1,
                "min": 0,
                "d": 0.3,
                "v": 0.3
            },
            "max_disk_usage": {
                "max": 0.98,
                "min": 0.05,
                "d": 0.8,
                "v": 0.8
            },
            "min_bw_settings": {
                "d": {
                    "log_disable": 1,
                    "bandwidth_auto_measure": 0,
                    "bandwidth_background": 0,
                    "bandwidth_upload": 0
                },
                "v": {
                    "log_disable": 1,
                    "bandwidth_auto_measure": 0,
                    "bandwidth_background": 0,
                    "bandwidth_upload": 0
                }
            },
            "bandwidth_background": {
                "max": 10000000000,
                "min": -1000,
                "d": 100000,
                "v": 1033591.7312661498
            },
            "pos_device_status": {
                "d": {},
                "v": {}
            },
            "monitor_class": {
                "min": [
                    "critical",
                    "prod",
                    "friend",
                    "beta",
                    "dev",
                    "ignore"
                ],
                "d": "prod",
                "v": "prod"
            },
            "min_bandwidth_mode": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "retention_priority": {
                "max": 10000,
                "min": 1,
                "d": 100,
                "v": 100
            },
            "log_disable": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "esn_base_log": {
                "max": 4294967295,
                "min": 0,
                "d": 16782719,
                "v": 16782719
            },
            "video_standard": {
                "min": [
                    "ntsc",
                    "pal"
                ],
                "d": "ntsc",
                "v": "ntsc"
            }
        },
        "active_filters": [
            "user_user",
            "bridge_filter",
            "bridge_aggregate"
        ],
        "user_settings": {
            "versions": {},
            "settings": {},
            "filters": {
                "bridge_filter": {
                    "priority": 50,
                    "persistent": true,
                    "name": "bridge_filter",
                    "settings": {
                        "bandwidth_background": 1033591.7312661498,
                        "audio_status": {},
                        "bandwidth_upload": 1033591.7312661498,
                        "interface_info": {
                            "eth1": {
                                "type": "ethernet",
                                "state": 10,
                                "carrier": true,
                                "speed": 1000,
                                "settings": {}
                            },
                            "eth0": {
                                "type": "ethernet",
                                "state": 100,
                                "carrier": true,
                                "speed": 100,
                                "settings": {}
                            }
                        },
                        "uplink_bw_bps": 3445305.7708871663,
                        "uplink_measured_bw_bps": 3445305.7708871663
                    }
                }
            },
            "schedules": {
                "bandwidth_background": {
                    "priority": 1,
                    "start": {
                        "seconds": 0,
                        "hours": 8,
                        "months": "*",
                        "minutes": 0,
                        "wdays": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7
                        ]
                    },
                    "end": {
                        "seconds": 0,
                        "hours": 17,
                        "months": "*",
                        "minutes": 30,
                        "wdays": [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7
                        ]
                    },
                    "when": "work",
                    "settings": {
                        "bandwidth_background": "100000"
                    }
                }
            }
        }
    }
}
```

### Bridge (Attributes)

Parameter                     | Data Type     | Description                                                                                        | Editable    | Required
---------                     | ---------     | -----------                                                                                        |:-----------:| --------
**id**                        | string        | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a> automatically generated and assigned while adding the device to the <a class="definition" onclick="openModal('DOT-EEVB')">EEVB</a>                                                                                 | **&cross;** | **<sub><form action="#get-bridge"><button>GET</button></form></sub>** <br>**<sub><form action="#update-bridge"><button>POST</button></form></sub>** <br>**<sub><form action="#delete-bridge"><button>DELETE</button></form></sub>**
**name**                      | string        | Name of the bridge                                                                                 | **&check;** | **<sub><form action="#add-bridge-to-eevb"><button>PUT</button></form></sub>**
[settings](#bridge-settings)  | json          | Json object of basic settings (location, etc.)                                                     | **&check;** |
camera_settings_status_code   | int           | Indicates whether it was possible to retrieve the device settings (200) or not (404) <small>**(DEPRECATED)**</small> | **&cross;** |
camera_settings               | string        | Miscellaneous device settings <small>**(DEPRECATED)**</small>                                      | **&cross;** |
utcOffset                     | int           | Signed UTC offset in seconds of the set `'timezone'`                                               | **&cross;** |
timezone                      | string        | Indicates the timezone of where the device is installed (defaults to the account timezone) <br><br>Example: `'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'` or `'UTC'`                                                    | **&check;** |
guid                          | string        | The GUID (Globally Unique Identifier) is an immutable device identifier assigned to a device during the production process                                                                                                                                            | **&cross;** |
permissions                   | string        | String of characters each defining a permission level of the current user                          | **&cross;** |
tags                          | array[string] | Array of strings each representing a tag name                                                      | **&check;** |
[bridges](#camera-bridges)    | json          | Json object of bridges (<a class="definition" onclick="openModal('DOT-ESN')">ESNs</a>) this device is seen by <small>**(APPLIES ONLY TO CAMERAS)**</small>  | **&cross;** |
camera_parameters_status_code | int           | Indicates whether it was possible to retrieve parameters of the device (200) or not (404)          | **&cross;** |
camera_parameters             | json          | Json object of bridge parameters. If bridge parameters cannot be retrieved for whatever reason (example: communication with the bridge has been lost), this will be empty and camera_parameters_status_code will be 404                                                                   | **&check;** |
camera_info_status_code       | int           | Indicates whether it was possible to retrieve information about the device (200) or not (404)      | **&cross;** |
[camera_info](#bridge-camera_info) | json          | Json object of basic bridge information. If bridge information cannot be retrieved for whatever reason (example: communication with the bridge has been lost), this will be empty and camera_info_status_code will be 404                                                              | **&cross;** |

### Bridge - settings

Parameter                     | Data Type     | Description
---------                     | ---------     | -----------
latitude                      | float         | Latitude of the bridge location
longitude                     | float         | Longitude of the bridge location
street_address                | string        | Street address of the bridge location
site_name                     | string        | User-defined bridge location name
floor                         | int           | The floor of the building given that it is a multi-storey
retention_days                | int           | Total amount of days the bridge should store data. Data exceeding this threshold will gradually be deleted
local_retention_days          | int           | Total amount of days the bridge should store data locally. Normally data is not being stored and the value is set to `'-1'`, meaning the bridge should directly upload any and all data during the specified times. Data exceeding this threshold will gradually be deleted
local_display_layout_ids      | array[string] | An array of available layouts on a local display
analog_inputs_ignored         | array[string] | An array of numbers of analog inputs which the user wants to ignore

<aside class="success">The listed settings are most common examples because the model differs from device to device</aside>

<aside class="notice">local_retention_days and cloud_retention_days are unpurposed in CMVR mode</aside>

### Bridge - camera_info

Parameter           | Data Type | Description
---------           | --------- | -----------
ssn                 | string    | <p hidden>???</p>Serial Number of the device
esn                 | string    | Electronic Serial Number of the device
class               | string    | Camera or bridge, etc.
run_mode            | string    | <p hidden>???</p>Run mode of the device
no_video            | int       | <p hidden>???</p>Whether the device is delivering video locally (0) or not (1)
model               | string    | Model of the device
make                | string    | Make of the device
uuid                | string    | UUID uniquely identifying the device
service             | string    | Device service status. For bridges this field will always be `'ATTD'` for regular functionality
[status](#overall-status) | string    | Decimal status of the device
[status_hex](#status-bitmask) | string    | Status bitmask
ipaddr              | string    | IP addresses assigned to the device (comma-delimited) with the one in use prefixed by an asterisk (\*)
proxy               | string    | Proxy
camera_state_version | int       | <p hidden>???</p>Bridge state version
tagmap_status_state | int       | <p hidden>???</p>Tag map status state
admin_user          | string    | Web username
admin_password      | string    | Web password
subclass            | string    | Firmware/driver type of the device
version             | string    | Firmware/driver version of the device
register_id         | int       | <p hidden>???</p>Bridge register ID
camera_retention    | int       | Retention period in milliseconds
camera_retention_etag | int       | <p hidden>???</p>Retention period in milliseconds
camera_retention_asset | int       | <p hidden>???</p>Retention period in milliseconds
camera_retention_interval | int       | <p hidden>???</p>Retention interval in milliseconds
camera_newest       | string    | Timestamp of newest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_oldest       | string    | Timestamp of oldest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
now                 | string    | Current timestamp in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
ts                  | string    | <p hidden>???</p>Timestamp in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_property_analog | boolean   | <p hidden>???</p>Whether there are devices connected via analog input (1) or not (0)
camera_info_version | int       | <p hidden>???</p>Device info version
camera_min_time     | string    | <p hidden>???</p>Minimum timestamp available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_now          | string    | <p hidden>???</p>Device's current timestamp in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_abs_newest   | string    | <p hidden>???</p>Timestamp of newest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_abs_oldest   | string    | <p hidden>???</p>Timestamp of oldest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_property_model | string    | <small>Model of the device <br>**(DEPRECATED)**</small>
camera_property_make | string    | <small>Make of the device <br>**(DEPRECATED)**</small>
camera_property_version | string    | <small>Driver version of the device <br>**(DEPRECATED)**</small>
camera_valid_ts     | string    | <small>Timestamp of oldest event available <br>**(DEPRECATED)**</small>
r_model             | string    | <small>Model of the device <br>**(DEPRECATED)**</small>
r_make              | string    | <small>Make of the device <br>**(DEPRECATED)**</small>
r_version           | string    | <small>Firmware/driver version of the device <br>**(DEPRECATED)**</small>

<!--TODO: Verify descriptions for the full bridge model attributes table-->

<!--===================================================================-->
## Get Bridge
<!--===================================================================-->

Returns a Bridge object by ID

> Request

```shell
curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/g/device -d "id=[BRIDGE_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

### HTTP Request

`GET https://[active_brand_subdomain].eagleeyenetworks.com/g/device`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a> | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No device matching the Connect ID or GUID has been found


<!--===================================================================-->
## Add Bridge to <a class="definition" onclick="openModal('DOT-EEVB')">EEVB</a>
<!--===================================================================-->

Adds a Bridge to the Eagle Eye Video Bank

> Request

```shell
curl -X PUT https://[active_brand_subdomain].eagleeyenetworks.com/g/device -d '{"name":"[NAME]","connectID":[CONNECT_ID]}' -H "content-type: application/json"-H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

### HTTP Request

`PUT https://[active_brand_subdomain].eagleeyenetworks.com/g/device`

Parameter     | Data Type | Description | Is Required
---------     | --------- | ----------- | -----------
**name**      | string    | Bridge name | true
**connectID** | string    | <a class="definition" onclick="openModal('DOT-Connect-ID')">Connect ID</a> is the code delivered with a bridge and assigned to it (All non-alphanumeric characters will be stripped) | true

> Json Response

```json
{
    "id": "100d88a8"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| No device matching the Connect ID or GUID was found
409	| Connect ID or GUID is currently already in use by an account
410	| Communication cannot be made to attach the camera to the bridge
415	| Device associated with the given GUID is unsupported
423 | The resource that is being accessed is locked


<!--===================================================================-->
## Update Bridge
<!--===================================================================-->

Update Bridge information

> Request

```shell
curl -X POST https://[active_brand_subdomain].eagleeyenetworks.com/g/device -d '{"id": "[BRIDGE_ID], "name": "[NAME]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

### HTTP Request

`POST https://[active_brand_subdomain].eagleeyenetworks.com/g/device`

Parameter                | Data Type     | Description | Is Required
---------                | ---------     | ----------- | -----------
**id**                   | string        | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a> | true
name                     | string        | Bridge name
timezone                 | string        | Indicates the timezone of where the device is installed (defaults to the account timezone) <br><br>Example: `'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'` or `'UTC'`
tags                     | array[string] | Array of strings each representing a tag name
[settings](#bridge-settings) | json          | Json object of basic settings (location, etc.)
camera_parameters_add    | json          | Json object of camera settings to add/update
camera_parameters_delete | json          | Json object of camera settings to delete

> Json Response

```json
{
    "id": "100d88a8"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Device matching the ID was not found
463	| Unable to communicate with the camera to add/delete camera settings, contact support


<!--===================================================================-->
## Delete Bridge
<!--===================================================================-->

Delete a Bridge from the Eagle Eye Video Bank

> Request

```shell
curl -X DELETE https://[active_brand_subdomain].eagleeyenetworks.com/g/device -d "id=[BRIDGE_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

### HTTP Request

`DELETE https://[active_brand_subdomain].eagleeyenetworks.com/g/device`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a> | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
404	| Device matching the ID was not found
463	| Unable to communicate with the camera or bridge, contact support


<!--===================================================================-->
## Get List of Bridges
<!--===================================================================-->

Returns array of arrays with each sub-array representing a Bridge available to the user

> Request

```shell
curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/g/device/list -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

### HTTP Request

`GET https://[active_brand_subdomain].eagleeyenetworks.com/g/device/list`

Parameter | Data Type | Description
--------- | --------- | -----------
e         | string    | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a>
n         | string    | Bridge name
t         | string    | Device type
s         | string    | Device service status

> Json Response

```json
[
    [
        "00014750",
        "1000f60d",
        "Kitchen Camera",
        "camera",
        [
            [
                "1002d096",
                "ATTD"
            ]
        ],
        "ATTD",
        "A@FIMLNSUTZcgfhmpsruwz",
        [],
        "c6d11f36-9e63-11e1-a5b0-00408cdf9191",
        "20180224143453844",
        1441847,
        "US/Central",
        -18000,
        0,
        "*10.143.55.140",
        0,
        "Panucci's Account",
        false,
        null,
        null,
        [
            null,
            null,
            null,
            null,
            "",
            null,
            ""
        ],
        null,
        null,
        0,
        [],
        0,
        {}
    ],
    [
        "00014750",
        "1002d096",
        "Kitchen Bridge",
        "bridge",
        [
            [
                "10053bf6",
                "ATTD"
            ]
        ],
        "ATTD",
        "A@FIMLNSUTZcgfhmpsruwz",
        [],
        "835b391f-6554-4e0a-902d-e989b3b46dba",
        "EEN-BR305-15721",
        1179649,
        "US/Central",
        -18000,
        0,
        "192.168.8.100",
        0,
        "Panucci's Account",
        false,
        null,
        null,
        [
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ],
        null,
        null,
        0,
        [],
        0,
        {}
    ],
    [...],
    [...],
    [...]
]
```

### HTTP Response (Array Attributes)

Array Index | Attribute           | Data Type            | Description
----------- | ---------           | ---------            | -----------
0           | account_id          | string               | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> of the device’s account
1           | id                  | string               | <a class="definition" onclick="openModal('DOT-Bridge-ID')">Bridge ID</a>
2           | name                | string               | Device name
3           | type                | string, enum         | Device type <br><br>enum: bridge, camera, mobile_camera, multiview_camera, mca_camera
4           | cameras             | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>] | This is an array of string arrays, each array representing a camera that is attached to the bridge. The first element of the array is the camera <a class="definition" onclick="openModal('DOT-ESN')">ESN</a>. The second element is the service status
5           | service_status      | string, enum         | Device service status: <br>`'ATTD'` - camera is attached to a bridge <br>`'IGND'` - camera is unattached from all bridges and is available to be attached to a bridge <br>`'IDLE'` - camera will register but will not operate (unregistered bridges) <br>`'ERSE'` - one shot, all camera data will be erased <br><br>For bridges this field is always `'ATTD'` <br><br>enum: ATTD, IGND, IDLE, ERSE
6           | permissions         | string               | String of zero or more characters each defining a permission level (of the current user)
7           | tags                | array[string]        | Array of strings each representing a tag name
8           | guid                | string               | The GUID (Globally Unique Identifier) is an immutable device identifier assigned to a device during the production process
9           | serial_number       | string               | Serial number of the device
10          | [device_status](#status-bitmask) | int                  | The device status bitmask
11          | timezone            | string               | Indicates the timezone of where the device is installed (defaults to the account timezone) <br><br>Example: `'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'` or `'UTC'`
12          | timezone_utc_offset | int                  | The signed integer offset in seconds of a timezone from UTC
13          | is_unsupported      | int                  | Indicates whether the device is NOT supported (1) or is supported (0)
14          | ip_address          | string               | IP address assigned to the device
15          | is_shared           | int                  | Indicates whether the device is shared (1) or not (0) <small>**(APPLIES ONLY TO CAMERAS)**</small>
16          | owner_account_name  | string               | Name of the account that owns the device
17          | is_upnp             | boolean              | Indicates whether the device is a UPNP device (1) or not (0) <small>**(APPLIES ONLY TO CAMERAS THAT HAVEN’T YET BEEN ATTACHED TO THE ACCOUNT, IN WHICH THEY COULD HAVE BEEN DETECTED VIA ONVIF OR UPNP)**</small>
18          | video_input         | string               | Indicates the video input channel of the camera <small>**(APPLIES TO ANALOG CAMERAS)**</small>
19          | video_status        | string               | Indicates the video status of the camera: <small>**(APPLIES TO ANALOG CAMERAS)**</small> <br>`'0x00000000'` - signal ok <br>`'0x00000102'` - no signal
20          | location            | array                | Location of the device specified in the following way: <br><br>`[` <br>&nbsp;&nbsp;&nbsp;&nbsp;`latitude(float),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`longitude(float),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`azimuth(float/null for bridge),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`range(int/null for bridge),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`street address(string),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`floor(int),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`location name(string)` <br>`]` <br><br>Note: If any field is not set, the value is null
21          | parent_camera_id    | string               | Parent camera ID
22          | child_camera_view   | string               | Child camera view
23          | is_hidden           | int                  | GUI control to not show device
24          | ignored_inputs      | array[string]        | Array of analog port numbers which should be ignored by the bridge
25          | responder_camera    | int                  | Indicates whether the camera is a first responder camera (1) or not (0)

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

