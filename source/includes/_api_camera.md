# Camera

<!--===================================================================-->
## Overview

A Camera is a logical representation of a physical camera device. They are associated with a Bridge device.

<!--===================================================================-->
## Camera Model

> Camera Model

```json
{
    "id": "1000f60d",
    "name": "Kitchen",
    "utcOffset": -18000,
    "timezone": "US/Central",
    "guid": "c6d11f36-9e63-11e1-a5b0-00408cdf9191",
    "permissions": "swr",
    "tags": [
        "austin",
        "kitchen"
    ],
    "bridges": {
        "100a9af6": "ATTD"
    },
    "settings": {
        "username": "onvif",
        "password": "securityCameraz",
        "bridge": "100a9af6",
        "roi_names": {},
        "alert_notifications": {},
        "alert_modes": {},
        "alert_levels": {},
        "notes": "",
        "longitude": -97.740714999999994,
        "latitude": 30.269064,
        "street_address": "717-799 Brazos Street, Austin, TX 78701, USA",
        "azimuth": 257.47226999999998,
        "range": 17.983694,
        "floor": 16,
        "share_email": "mcazares+videotest@eagleeyenetworks.com",
        "retention_days": 30,
        "cloud_retention_days": 30
    },
    "camera_info_status_code": 200,
    "camera_info": {
        "bridge": "bf5ce89d-8dbb-4eed-a2a8-60971e6d447e",
        "camera_state_version": 0,
        "intf": "Camera LAN",
        "camera_retention": 2592000000,
        "tagmap_status_state": 2,
        "camera_newest": "20141006190516.702",
        "camera_oldest": "20140906000000.000",
        "connect": "STRM",
        "uuid": "c6d11f36-9e63-11e1-a5b0-00408cdf9191",
        "service": "ATTD",
        "make": "AXIS",
        "ipaddr": "*169.254.12.141,10.143.236.65",
        "ts": "20141006182806.570",
        "version": "5.40.9.2",
        "admin_password": null,
        "esn": "1000f60d",
        "status": "1966143",
        "admin_user": null,
        "register_id": 0,
        "mac": "00:40:8C:DF:91:91",
        "proxy": "secondary",
        "bridgeid": "100a9af6",
        "now": "20141006210729.065",
        "class": "camera",
        "status_hex": "001e003f",
        "camera_now": "20141006210729.688",
        "camera_abs_newest": "20141006190516.702",
        "camera_abs_oldest": "20140906000000.000",
        "model": "AXIS M1054",
        "camtype": "ONVIF"
    },
    "camera_parameters_status_code": 200,
    "camera_parameters": {
        "active_settings": {
            "bandwidth_background": {
                "max": 10000000000.0,
                "min": -1000.0,
                "d": 0.0,
                "v": 0.0
            },
            "preview_jcmp_enable": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "bandwidth_recover": {
                "max": 10000000000.0,
                "min": 0.0,
                "d": 0.0,
                "v": 0.0
            },
            "video_transmit_mode": {
                "min": [
                    "always",
                    "event",
                    "background",
                    "on demand"
                ],
                "d": "background",
                "v": "background"
            },
            "preview_noise_limit_default": {
                "max": 16,
                "min": 2,
                "d": 16,
                "v": 16
            },
            "video_resolution": {
                "min": [
                    "cif",
                    "std",
                    "high"
                ],
                "d": "high",
                "v": "high"
            },
            "retention_days": {
                "max": 10000,
                "min": 1,
                "d": 14,
                "v": 30
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
            "motion_edge_expand_ratio": {
                "max": 0.98999999999999999,
                "min": 0.001,
                "d": 0.10000000000000001,
                "v": 0.10000000000000001
            },
            "preview_resolution": {
                "min": [
                    "cif",
                    "std",
                    "high"
                ],
                "d": "cif",
                "v": "std"
            },
            "display_features": {
                "max": 255,
                "min": 0,
                "d": 255,
                "v": 255
            },
            "motion_event_holdoff_ms": {
                "max": 1000,
                "min": 0,
                "d": 300,
                "v": 300
            },
            "retention_max_bytes": {
                "max": 1000000000000.0,
                "min": 0,
                "d": 0.0,
                "v": 0.0
            },
            "active_rois": {
                "d": {},
                "v": {}
            },
            "video_config": {
                "d": {
                    "preview_profile": "een_prvw",
                    "video_profile": "een_video",
                    "preview_quality_settings": {
                        "high": {
                            "h": 720,
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 1600,
                                    "fps": 4
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 1000,
                                    "fps": 4
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 800,
                                    "fps": 4
                                }
                            },
                            "w": 1280
                        },
                        "std": {
                            "h": "360",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 500,
                                    "fps": 4
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 350,
                                    "fps": 4
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 250,
                                    "fps": 4
                                }
                            },
                            "w": 640
                        },
                        "cif": {
                            "h": "180",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 200,
                                    "fps": 4
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 150,
                                    "fps": 4
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 100,
                                    "fps": 4
                                }
                            },
                            "w": 320
                        }
                    },
                    "video_quality_settings": {
                        "high": {
                            "h": 720,
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 2000,
                                    "fps": 30
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 1000,
                                    "fps": 15
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 500,
                                    "fps": 10
                                }
                            },
                            "w": 1280
                        },
                        "std": {
                            "h": "360",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 600,
                                    "fps": 30
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 400,
                                    "fps": 15
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 200,
                                    "fps": 10
                                }
                            },
                            "w": 640
                        },
                        "cif": {
                            "h": "180",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 300,
                                    "fps": 30
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 140,
                                    "fps": 15
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 70,
                                    "fps": 10
                                }
                            },
                            "w": 320
                        }
                    }
                },
                "v": {
                    "preview_profile": "een_prvw",
                    "video_profile": "een_video",
                    "preview_quality_settings": {
                        "high": {
                            "h": 720,
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 1600,
                                    "fps": 4
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 1000,
                                    "fps": 4
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 800,
                                    "fps": 4
                                }
                            },
                            "w": 1280
                        },
                        "std": {
                            "h": "360",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 500,
                                    "fps": 4
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 350,
                                    "fps": 4
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 250,
                                    "fps": 4
                                }
                            },
                            "w": 640
                        },
                        "cif": {
                            "h": "180",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 200,
                                    "fps": 4
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 150,
                                    "fps": 4
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 100,
                                    "fps": 4
                                }
                            },
                            "w": 320
                        }
                    },
                    "video_quality_settings": {
                        "high": {
                            "h": 720,
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 2000,
                                    "fps": 30
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 1000,
                                    "fps": 15
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 500,
                                    "fps": 10
                                }
                            },
                            "w": 1280
                        },
                        "std": {
                            "h": "360",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 600,
                                    "fps": 30
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 400,
                                    "fps": 15
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 200,
                                    "fps": 10
                                }
                            },
                            "w": 640
                        },
                        "cif": {
                            "h": "180",
                            "quality": {
                                "high": {
                                    "q": 80,
                                    "kbps": 300,
                                    "fps": 30
                                },
                                "med": {
                                    "q": 60,
                                    "kbps": 140,
                                    "fps": 15
                                },
                                "low": {
                                    "q": 40,
                                    "kbps": 70,
                                    "fps": 10
                                }
                            },
                            "w": 320
                        }
                    }
                }
            },
            "video_capture_mode": {
                "min": [
                    "always",
                    "event"
                ],
                "d": "event",
                "v": "event"
            },
            "motion_noise_filter": {
                "max": 1.0,
                "min": 0.0,
                "d": 0.69999999999999996,
                "v": 0.69999999999999996
            },
            "motion_event_holdon_ms": {
                "max": 1000,
                "min": 0,
                "d": 300,
                "v": 300
            },
            "preview_realtime_bandwidth": {
                "max": 100000000.0,
                "min": 8000.0,
                "d": 50000.0,
                "v": 400000.0
            },
            "motion_snap_size_ratio": {
                "max": 0.98999999999999999,
                "min": 0.0001,
                "d": 0.001,
                "v": 0.001
            },
            "preview_history_depth_ms": {
                "max": 32000,
                "min": 1000,
                "d": 4000,
                "v": 4000
            },
            "encryption_type": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "event_postroll_ms": {
                "max": 5000,
                "min": 0,
                "d": 1000,
                "v": 1000
            },
            "alerts": {
                "d": {},
                "v": {}
            },
            "preview_interval_ms": {
                "max": 16000,
                "min": 250,
                "d": 1000,
                "v": 1000
            },
            "motion_snap_age_threshold_ms": {
                "max": 2000,
                "min": 100,
                "d": 200,
                "v": 200
            },
            "preview_key_frame_hold_ms": {
                "max": 3600000,
                "min": 30000,
                "d": 1800000,
                "v": 1800000
            },
            "display_width": {
                "max": 64000,
                "min": 80,
                "d": 320,
                "v": 320
            },
            "preview_min_gop_ms": {
                "max": 180000,
                "min": 1000,
                "d": 4000,
                "v": 4000
            },
            "preview_first_frame_delta_target": {
                "max": 0.98999999999999999,
                "min": 0.01,
                "d": 0.25,
                "v": 0.25
            },
            "motion_logmask": {
                "max": 7,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "preview_log_mask": {
                "max": 15,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "local_retention_days": {
                "max": -1,
                "min": -1,
                "d": -1,
                "v": -1
            },
            "preview_noise_limit_min": {
                "max": 16,
                "min": 2,
                "d": 3,
                "v": 3
            },
            "motion_hold_interval": {
                "max": 120.0,
                "min": 0.0,
                "d": 5.0,
                "v": 5.0
            },
            "stream_stats_present_only": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "active_alerts": {
                "d": {},
                "v": {}
            },
            "motion_weights": {
                "max": 64,
                "length": 8,
                "min": 1,
                "d": [
                    8,
                    4,
                    2,
                    1,
                    1,
                    1,
                    1,
                    1
                ],
                "v": [
                    "8",
                    "4",
                    "2",
                    "1",
                    "1",
                    "1",
                    "1",
                    "1"
                ]
            },
            "preview_min_limit_change_ms": {
                "max": 500000,
                "min": 2000,
                "d": 10000,
                "v": 10000
            },
            "preview_transmit_mode": {
                "min": [
                    "always",
                    "event",
                    "background",
                    "on demand"
                ],
                "d": "always",
                "v": "always"
            },
            "bandwidth_demand": {
                "max": 10000000000.0,
                "min": 0.0,
                "d": 0.0,
                "v": 0.0
            },
            "audio_enable": {
                "d": false,
                "v": true
            },
            "video_bandwidth_factor": {
                "max": 64,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "shaping_mode": {
                "max": 127,
                "min": 0,
                "d": 31,
                "v": 31
            },
            "display_name": {
                "d": "none",
                "v": "none"
            },
            "display_height": {
                "max": 64000,
                "min": 80,
                "d": 180,
                "v": 180
            },
            "preview_compress_keyframes": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "motion_snap_push_min_delay_ms": {
                "max": 5000,
                "min": 1000,
                "d": 2000,
                "v": 2000
            },
            "motion_size_ratio": {
                "max": 0.98999999999999999,
                "min": 0.0001,
                "d": 0.001,
                "v": 0.001
            },
            "video_quality": {
                "min": [
                    "low",
                    "med",
                    "high"
                ],
                "d": "med",
                "v": "med"
            },
            "video_source_flip": {
                "d": false,
                "v": false
            },
            "motion_sensitivity": {
                "max": 1.0,
                "min": 0.0,
                "d": 0.80000000000000004,
                "v": 0.80000000000000004
            },
            "motion_size_metric_active": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "camera_on": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "motion_snap_excellent_hold_ms": {
                "max": 5000,
                "min": 100,
                "d": 1000,
                "v": 1000
            },
            "cloud_retention_days": {
                "max": 365,
                "min": 1,
                "d": 14,
                "v": 30
            },
            "video_source_bounds": {
                "max": [
                    1440,
                    900,
                    1440,
                    900
                ],
                "min": [
                    0,
                    0,
                    0,
                    0
                ],
                "d": [
                    0,
                    0,
                    1440,
                    900
                ],
                "v": [
                    0,
                    0,
                    1440,
                    900
                ]
            },
            "rois": {
                "d": {},
                "v": {}
            },
            "preview_max_gop_ms": {
                "max": 180000,
                "min": 5000,
                "d": 30000,
                "v": 30000
            },
            "retention_priority": {
                "max": 10000,
                "min": 1,
                "d": 100,
                "v": 100
            },
            "preview_noise_change_threshold": {
                "max": 64,
                "min": 1,
                "d": 2,
                "v": 2
            },
            "preview_quality": {
                "min": [
                    "low",
                    "med",
                    "high"
                ],
                "d": "med",
                "v": "med"
            },
            "motion_expand_ratio": {
                "max": 0.98999999999999999,
                "min": 0.001,
                "d": 0.10000000000000001,
                "v": 0.10000000000000001
            },
            "motion_boxes_metric_active": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "event_preroll_ms": {
                "max": 5000,
                "min": 0,
                "d": 1000,
                "v": 1000
            },
            "preview_queue_ms": {
                "max": 20000,
                "min": 1000,
                "d": 10000,
                "v": 10000
            }
        },
        "active_filters": [
            "user_user"
        ],
        "user_settings": {
            "versions": {},
            "settings": {
                "preview_realtime_bandwidth": 400000,
                "retention_days": 30,
                "cloud_retention_days": 30,
                "preview_resolution": "std",
                "audio_enable": true,
                "motion_weights": [
                    "8",
                    "4",
                    "2",
                    "1",
                    "1",
                    "1",
                    "1",
                    "1"
                ]
            },
            "schedules": {}
        }
    }
}
```

### Camera Attributes

Parameter                     | Data Type         | Description
---------                     | ---------------   | -----------
id                            | string            | Unique identifier for the Device
name                          | string            | Name of the device
utcOffset                     | int               | Signed UTC offset in seconds of the timezone from UTC, where this device is installed.
timezone                      | string            | Supported timezones: If this is a bridge, defaults to the Account timezone. If this is a camera, defaults to the camers’s Bridge timezone. Otherwise defaults to US/Pacific. <br><br>enum: US/Alaska, US/Arizona, US/Central, US/Pacific, US/Eastern, US/Mountain, US/Hawaii, UTC
guid                          | string            | guid or other physical identifier of device
permissions                   | string            | String of one or more characters. Each character defines a permission. Permissions include: 'R' - user has access to view images and video for this camera. 'A' - user is an admin for this camera. 'S' - user can share this camera in a group share. Note: All cameras in a group must have the ‘S’ permission or the group cannot be shared
tags                          | array[string]     | Array of strings, which each string representing a "tag"
bridges                       | object            | Object with keys being Bridge IDs, and values being the service status of the camera on that bridge
settings                      | [MiscSettings](#miscsettings-attributes)    | Misc settings
camera_parameters             | [CameraSettings](#camerasettings-attributes)            | Also referred to as "Camera Settings". If camera settings cannot be retrieved for whatever reason, then this will be empty and ``camera_parameters_status_code`` will be 404.
camera_parameters_status_code | int               | 200 if camera_parameters was retrieved. 404 if camera_parameters were unable to be retrieved.
camera_info                   | [CameraInfo](#camerainfo-attributes)  | Camera related info
camera_info_status_code       | int               | 200 if camera_info was retrieved. 404 if camera_info was unable to be retrieved.

### MiscSettings Attributes

Parameter           | Data Type                         | Description
---------           | ---------------                   | -----------
username            | string                            | Username to login to camera. Only applies to Cameras.
password            | string                            | Password to login to camera. Only applies to Cameras.
bridge              | string                            | Device ID of bridge to attach camera to. Only applies to Cameras. Required for PUT for Cameras.
guid                | string                            | GUID of physical device. Only applies to Cameras. Required for PUT for Cameras.
roi_names           | object                            | ROI name strings keyed by ROI ID.
alert_notifications | object                            | Arrays of User IDs keyed by ROI ID.
alert_modes         | object                            | Arrays of Alert Modes keyed by ROI ID.
alert_levels        | object                            | Arrays of Alert Levels keyed by ROI ID.
notes               | string                            | Notes
latitude            | float                             | Latitude of the cameras location.
longitude           | float                             | Longitude of the cameras location.
street_address      | string                            | Street Address of the cameras location.
azimuth             | float                             | Direction that the center of the camera faces. Values from 0.0-360.0 North=0.0.
range               | int                               | Effective distance the camera can 'see' in feet.
floor               | int                               | The floor of the building given that it is multiple stories.
share_email         | string                            | Comma delimited list of emails to share this device with
local_retention_days| int                              | Local retention days
cloud_retention_days| int                              | Cloud retention days
bridge_retention_days| int                             | Bridge retention days (same as ``local_retention_days``)


### CameraInfo Attributes

Parameter           | Data Type         | Description
---------           | ---------------   | -----------
bridge              | string            | GUID of bridge the camera is attached to
camera_retention    | int               | Retention period in milliseconds
camera_newest       | string            | Timestamp of newest event available, as [EENTimestamp](#een-types)
camera_oldest       | string            | Timestamp of oldest event available, as [EENTimestamp](#een-types)
camera_info_version | int               | Camera info version
connect             | string            | Camera connect status
camera_min_time     | string            | Minimum timestamp available, as [EENTimestamp](#een-types)
uuid                | string            | UUID string
service             | string            | Service status
make                | string            | Make of the device
ipaddr              | string            | IP Addresses assigned to the device, comma delimited, with the one in use prefixed by an asterisk *
ts                  | string            | [EENTimestamp](#een-types)
version             | string            | Firmware version
status              | string            | [Camera status bitmask](#status-bitmask)
mac                 | string            | MAC address
proxy               | string            | Proxy
bridgeid            | string            | Device of bridge this device is attached to
now                 | string            | Current timestamp, as [EENTimestamp](#een-types)
class               | string            | Camera, or Bridge, etc.
camera_now          | string            | Camera's current timestamp, as [EENTimestamp](#een-types)
camera_abs_newest   | string            | Timestamp of newest event available, as [EENTimestamp](#een-types)
camera_abs_oldest   | string            | Timestamp of oldest event available, as [EENTimestamp](#een-types)
model               | string            | Device model
esn                 | string            | ESN id
admin_user          | string            | Web Username
admin_password      | string            | Web Password


### CameraSettings Attributes
Parameter   | Data Type         | Description
---------   | ---------------   | -----------
active_settings | [CameraSettingsActive](#camerasettingsactive-attributes) | Object containing active settings
active_filters | array[string] | filters currently being applied. List is in priority order, that is earlier entries will override later entries in the list. Each entry is a string with format of one of ``schedule_<name>``, ``user_user``, ``trigger_<name>``
user_settings | Object | Object with keys ``versions``, [settings](#camerasettingsactive-attributes), ``schedules``. ``settings`` just has the values, and not the full object model used by ``active_settings``.

<!-- TODO: document schedules (and their "time" object) from user_settings above. -->

### CameraSettingsActive Attributes

The camera setting system is based on an inheritance model. User settings are “overlayed” on top of default settings for a device. By removing the user settings, the camera setting will automatically go back to the default value provided and maintained by Eagle Eye for the camera.
Each camera setting attribute is an object with the following attributes:

  * “v”: the current value of the setting, as influenced by filters on top of base settings
  * “max”: the maximum allowed value
  * “min”: the minimum allowed value.
    * Note: max and min are applicable for numeric fields. for set fields (e.g. preview_resolution) the min field will contain an array of the valid values
  * “d”: the default value of the setting, also defining the expected type for the field

<!-- TODO: add rest of camera settings below. -->

Parameter   | Data Type         | Description
---------   | ---------------   | -----------
active_rois | object | indicates which rois are currently active, with keys being ROI names and value being Boolean true/false
audio_enable | boolean | indicates whether audio is enabled (true) or not (false)
camera_on | integer | indicates whether camera is turned on (1) or off (0)
motion_sensitivity | float | value between 0 and 1 indicating how sensitive the motion detection is
motion_size_ratio | float | value between 0 and 1 indicating the size of objects to detect for motion
motion_boxes_metric_active | boolean | indicates whether motion boxes are enabled (1) or not (0)
preview_realtime_bandwidth | float | indicates the max bandwidth of real-time preview image transmission
preview_transmit_mode | string | indicates when preview images are transmitted to the cloud
preview_interval_ms | integer | indicates how many milliseconds between preview images
preview_resolution | string | indicates the resolution of the preview images. When displaying the options for this setting, you must use the data from "video_config.v.preview_quality_settings.<preview_resolution>" ("w" and "h") to show what this resolution string translates to for display purposes.
preview_quality | string | indicates the quality of the preview images
retention_days | integer | indicates how many days worth of data should be retained in the cloud
rois | object | ROI objects, keyed by an ROI string "ID", with each value an object defined as [CameraROIs](#camerarois-attributes)
video_transmit_mode | string | indicates when video is transmitted to the cloud
video_capture_mode | string | indicates when video will being recorded
video_bandwidth_factor | integer | indicates the bit rate of the video. When displaying options for this setting, you must use the data from "video_config.v.video_quality_settings.<video_resolution>.quality.<video_quality>.kbps" to show what this setting translates to for display purposes.
video_resolution | string | indicates the resolution of the video. When displaying the options for this setting, you must use the data from "video_config.v.video_quality_settings.<video_resolution>" ("w" and "h") to show what this resolution string translates to.
video_quality | string | indicates the quality of the video
video_config | object | READ-ONLY object defining all the preview/video configuration parameters for each available resolution. Helps give useful information for display purposes of the "preview_resolution", "video_resolution", and "video_bandwidth_factor" settings/options.


### CameraROIs Attributes

Parameter | Data Type | Description
--------- | --------- | -----------
verts | array[array] | [[x,y],...], polygon vertices in order. Coordinates will be scaled so 0-1.0 is full screen for x and y, with 0,0 being top left corner. Edges can’t cross or bad things will happen.
motion_noise_filter | float | for main screen. If < 0.001 will not be applied
motion_sensitivity | float | for main screen. If < 0.001 will not be applied
motion_hold_interval | float | for main screen. If < 0.001 will not be applied
priority | float | (bigger wins), control settings overlay. Defaults to 0.0
motion_threshold | float | percentage of the screen to be occluded by motion within this ROI to create an ROI event. Defaults to motion_size_ratio from main screen.
name | string | used for the display name of the ROI in a GUI. Not to be confused with the "name" of the ROI as the key of this ROI object.
ignore_motion | integer | indicates whether motion will be ignored (1) or not (0) for this ROI. Used as a GUI abstraction to indicate we want to set motion_sensitivity to ".001" and motion_noise_filter to ".99"
roiid | integer | id to attach to the ROI event. If 0, or not present, events will not be created, which will also prevent roi based alerts.
hold_off_ms | integer | milliseconds of constant motion before an event is created, defaults to motion_event_holdoff_ms
hold_on_ms | integer | milliseconds of idle before stopping an ROI motion event. Defaults to motion_event_holdon_ms from main settings.


<!--===================================================================-->
## Get Camera

> Request

```shell
curl -G https://login.eagleeyenetworks.com/g/device -d "A=[AUTH_KEY]&id=[CAMERA_ID]"
```

<!-- TODO: check this API for correctness and reformat to new style. -->

Returns camera object by id

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device`

Parameter     | Data Type   | Description
---------     | ----------- | ----------- 
**id**        | string      | Camera Id

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Add Camera to Bridge

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X PUT -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d '{"name":"[NAME]","timezone":[TIMEZONE],"settings":{"bridge":"[BRIDGE_ID]","guid":"[CAMERA_GUID]","username":"","password":""}}'
```

> Json Response

```json
{
  "id": "100c339a"
}
```

<!-- TODO: check this API for correctness and reformat to new style. -->

Adds an Unattached Camera to the Bridge

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/device`

Parameter     | Data Type     | Description | Is Required
---------     | -----------   | ----------- | -----------
**name**      | string        | Camera Name | true
**settings**  | [DeviceSettings](#devicesettings-attributes)          | Misc Settings | true
timezone      | string        | If unspecified, this will default to the camera’s Bridge timezone
tags          | array[string] | Array of strings, which each string representing a "tag"

### Response Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
id              | string      | Unique identifier for the device

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | No device matching the ConnectID or GUID was found
409 | ConnectID or GUID is currently already in use by an account
410 | Communication cannot be made to attach the camera to the bridge
415 | Device associated with the given GUID is unsupported

<!--===================================================================-->
## Update Camera

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X POST -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d '{"id": "[CAMERA_ID], "name": "[NAME]"}'
```

> Json Response

```json
{
  "id": "100c339a"
}
```

<!-- TODO: check this API for correctness and reformat to new style. -->

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/device`

Parameter                 | Data Type     | Description   | Is Required
---------                 | -----------   | -----------   | -----------
**id**                    | string        | Camera Id     | true
name                      | string        | Camera Name
timezone                  | strings       | If unspecified, this will default to the camera’s Bridge timezone
tags                      | array[string] | Array of strings, which each string representing a "tag"
settings                  | json          | Misc Settings
camera_parameters_add     | json          | JSON object of camera parameters/settings to add/update
camera_parameters_delete  | json          | JSON object of camera parameters/settings to delete

### Response Json Attributes

Parameter       | Data Type   | Description
---------       | ----------- | -----------
id              | string      | Unique identifier for the device

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Device matching the ID was not found
463 | Unable to communicate with the camera to add/delete camera settings, contact support

<!--===================================================================-->
## Delete Camera

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" -X DELETE -v -H "Authentication: [API_KEY]:" -H "content-type: application/json" https://login.eagleeyenetworks.com/g/device -d "id=[CAMERA_ID]" -G
```

<!-- TODO: check this API for correctness and reformat to new style. -->

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/device`

Parameter     | Data Type   | Description
---------     | ----------- | -----------
**id**        | string      | Camera Id

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
404 | Device matching the ID was not found
463 | Unable to communicate with the camera or bridge, contact support

<!--===================================================================-->
## Get List of Cameras

> Request

```shell
curl --cookie "auth_key=[AUTH_KEY]" --request GET https://login.eagleeyenetworks.com/g/device/list
```

> Json Response

```json
[
    [
        "00004206",
        "100d88a8",
        "Main",
        "bridge",
        [
            [
                "100f2fa1",
                "ATTD"
            ],
            [
                "100c339a",
                "ATTD"
            ]
        ],
        "ATTD",
        "swr",
        [],
        "bceb04ec-8b24-4aee-a09a-8479d856e81c",
        "EEN-BR300-08480",
        1048576,
        "US/Pacific",
        -25200,
        1,
        "",
        0,
        "Greater Good",
        false,
        null,
        null,
        [
            null,
            null,
            null,
            null,
            null,
            null
        ]
    ],
    [
        "00004206",
        "100c339a",
        "New Camera 1",
        "camera",
        [
            [
                "100d88a8",
                "ATTD"
            ]
        ],
        "ATTD",
        "swr",
        [],
        "1e574020-4e33-11e3-9b40-2504532f70b4",
        "4242325013460008",
        1441847,
        "US/Pacific",
        -25200,
        0,
        "*10.143.14.254",
        0,
        "Greater Good",
        false,
        null,
        null,
        [
            null,
            null,
            null,
            null,
            null,
            null
        ]
    ],
    [...],
    [...],
    [...]
]
```

<!-- TODO: check this API for correctness and reformat to new style. -->

Returns array of arrays, with each sub-array representing a device available to the user. The 'service_status' attribute either be set to 'ATTD' or 'IGND'. If the service_status is 'ATTD', the camera is attached to a bridge. If the service_status is 'IGND', the camera is unattached from any bridge and is available to be attached. Please note that the ListDevice model definition below has property keys, but that's only for reference purposes since it's actually just a standard array.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device/list`

Parameter | Data Type   | Description 
--------- | ----------- | -----------           
e         | string      | Camera Id             
n         | string      | Camera Name           
t         | string      | Device Type           
s         | string      | Device Service Status

### Response: Camera Model

Array Index | Attribute           | Data Type             | Description 
---------   | -----------         | -----------           | -----------           
0           | account_id          | string                | Unique identifier for the Device's Account
1           | id                  | string                | Unique identifier for the Device
2           | name                | string                | Name of the device
3           | type                | string, enum          | Type of device <br><br>enum: camera, bridge
4           | bridges             | array[array[string]]  | This is an array of string arrays, each string array represents a bridge that can see the camera. The first element of the string array is the bridge ESN. The second element is the status.
5           | service_status      | string, enum          | Device service status. ATTD = camera is attached to a bridge. IGND = camera is unattached from all bridges and is available to be attached to a bridge. <br><br>enum: ATTD, IGND
6           | permissions         | string                | String of zero or more characters. Each character defines a permission that the current user has for the device. Permissions include: 'R' - user can view this device. 'W' - user can modify and delete this device. 'S' - user can share this device.
7           | tags                | array[string]         | Tags
8           | guid                | string                | GUID
9           | serial_number       | string                | Serial number
10          | [device_status](#status-bitmask) | int                   | Device status bit mask
11          | timezone            | string                | Timezone
12          | timezone_utc_offset | int                   | Timezone UTC offset as signed integer in seconds, such as “-25200”, which translates to -7 hours from UTC.
13          | is_unsupported      | int                   | Indicates the camera is NOT supported (1) or IS supported (0)
14          | ip_address          | string                | IP Address of device
15          | is_shared           | int                   | Indicates the camera is shared (1) or not (0)
16          | owner_account_name  | string                | Name of the account that owns the device. This only applies to shared cameras, since they will be owned by a different account.
17          | is_upnp             | boolean               | Indicates whether the camera is a UPNP device. Note that this property is different then all the other 'is_*' properties in the API, which normally are integers (0 or 1). Currently this property only applies to cameras that haven’t yet been attached to the account, in which they could have been detected via ONVIF or UPNP.
18          | video_input         | string                | For analog cameras only, this indicates the video input channel of the camera.
19          | video_status        | string                | For analog cameras only, this indicates the video status of the camera.

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges
