# Camera

<!--===================================================================-->
## Overview
<!--===================================================================-->

The <a class="definition" onclick="openModal('DOT-Device')">Device</a> service allows access to create new logical devices (<a class="definition" onclick="openModal('DOT-Camera')">Cameras</a> or <a class="definition" onclick="openModal('DOT-Bridge')">Bridges</a>) and establish a relationship between logical and <a class="definition" onclick="openModal('DOT-Physical-Camera')">physical devices</a>. The GET method is available to any user with Camera `'R'` (Read) permission. Methods POST, DELETE are available to account superusers and users with Camera `'W'` (Write) permissions for the indicated camera. PUT method is only available to account superusers

When adding a new Camera, the name and settings parameters are required. The settings parameter should contain the ID of the bridge and the GUID of the Camera

### Camera Settings Overview

The camera setting system is based on an inheritance model. User settings are *overlaid* on top of default settings for a device. By removing the user settings, the camera setting will automatically go back to the default value provided and maintained by Eagle Eye for the camera

Under the covers this works as follows:

  - There is a default setting, range and value for everything built into the code, guaranteeing there are always settings for any feature supported by the software. These values are defined when the feature is implemented in software
  - There is an optional *global* setting file that can/will be distributed during patches/updates that can override and extend default settings including changing valid ranges, etc. As with 1, this is a constant across all bridges that get the upgrade. It is tweaked for system policy changes like different upload bandwidth, default schedules, etc. which do not imply code changes
  - There is an optional per make/model/version file, part of the make/model/version driver deployment, that can add and adjust settings for anything above. This is used to optimize things like sensitivity or codec parameters while building the driver for the specific device and is released a camera driver is updated. This is also where camera specific features (audio availability) is announced
  - The first three get merged to produce the base settings for the the camera, which defines the value, min and max for every supported feature
  - User settings (things the user has consciously *taken control of*) are dynamically overlaid on the above settings inheritance to produce the active settings on the camera
  - Any scheduled or triggered changes are then overlaid on top create the running settings (so upload bandwidth can be changed in a schedule to something different from the users settings, which is also different from the system default and when the schedule is *removed* the bandwidth will go back to the user value

The implication of this is that if a user has not *pinned* a setting by changing/managing it, it will track any system or make/model/version release updates. That is, EEN can optimize operating parameters and they will automatically propagate unless the user has changed/pinned them. Further, the user should be *aware* of this, which works well with an open/closed control metaphor or a check box - any setting control that is open/checked is *manually* set by the user, whereas closed controls will track EEN system wide recommendations. Finally, it is expected that the *user* settings will be managed to be only the value specifically modified by users, not all settings

The set of all settings is potentially large and far more than most users will ever want or need to manage. A separate table will be maintained which lists the *normal* settings - settings most users may want to interact with. This is standard across all devices and contains a list of settings names that should be accessible to the user. This list should be *joined* with the list of all settings to result in a subset of controls to be displayed in basic mode. An advanced mode should make all settings available with primitive controls to set or delete a value

An implication of this model the *user settings* object is a generic object that is only lightly interpreted by the device. Settings that match a known names (i.e. are within the camera base or mmv settings) will be utilized, but all values will be stored and returned as part of the *user settings* field. This can be used to support user interface elements on a per camera basis with values the bridge/camera do not interpret

### Read Camera Settings (<small>GET device `'camera_settings'` property</small>)

When getting the camera settings, a Json string representing a Json object is returned containing:

  - `'active_settings'` - A set of named entities encapsulating all settings understood for this device. Each entity contains an object of:
    - `'v'` - the current value of the setting, as influenced by filters on top of base settings
    - `'max'` - the maximum allowed value
    - `'min'` - the minimum allowed value
    - `'d'` - the default value of the setting, also defining the expected type for the field
    - Note: max and min are applicable for numeric fields. for set fields (e.g. preview_resolution) the min field will contain an array of the valid values
    - Note: additional descriptive members may be added to this object over time, implementation must ignore fields they do not understand
  - `'active_filters'` - an array of filters currently being applied. List is in priority order, that is earlier entries will override later entries in the list. Each entry is a string with format of one of:
    - `'schedule_<name>'` - name replaced by schedule name
    - `'user_user'` - constant, indicating where user settings are applied
    - `'trigger_<name>'` - name replaced by the triggered name (i.e. `'night'`)
  - `'user_settings'` - an object with the following fields:
    - `'settings'`
      - A subset of the base settings, indicating items the user has specifically set
      - The user settings contain only the `'v'` of the setting and are bare objects (e.g. `'contrast=0.1'`)
      - Most setting are `'atomic'` entities updated at a single time. For value settings (brightness) this is obvious, but for complex settings (e.g. <a class="definition" onclick="openModal('DOT-Alert-Notification')">Alerts</a>) it is important the entire setting object is replaced with a new value
      - A few settings (currently `'alerts'`,`'rois'`,`'active_alerts'`,`'active_rois'`) are accumulation settings. A setting add transaction adds the new member to the set and a settings delete removes a member
    - `'schedules'` - A set of named fields as follows:
      - `'start'` - time object, indicating when the schedule is set to on. This is a transition point in time, not a description of the active time period. To have a schedule that runs during working hours - { `'start'`: { `'hours'`: `8`, `'wdays'`: `[1,2,3,4,5]`}, `'end'`: {`'hours'`: `17`, `'wdays'`: `[1,2,3,4,5]` }}
      - `'end'` - time object, indicating when the schedule is removed
      - `'priority'` - a floating point value defining the priority of the schedule. Lowest number wins. All user settings are applied with priority of 10.0, so schedule values with priority < 10 will override user settings, while value > 10 will not. It priority or two schedules is equal and their settings conflict,
      - `'settings'` - a object with members mirroring the settings above, indicating the new value for settings to use while the schedule is active. For accumulation settings, values will be added into the set when activated and removed when deactivated
    - time object is a object with the following named members, loosely patterned after crontab arguments. Each time the fields match the current time, the event is toggled
      - fields
          - seconds(0-59)(defaults to 0)
          - minutes (0-59) (defaults to 0)
          - hours (0-23) (defaults to 0)
          - mdays(1-31) (defaults to \*)
          - wdays(1-7) (1=Monday, 7=Sunday (defaults to nothing))
          - months(1-12) (defaults to \*)
      - each field can be
          - single integer
          - string `'*'` indicating all
          - list of integers
      - If both `'days'` fields are set, the action will be ran on the union

### Update Camera Settings (<small>POST device `'camera_settings_add'` argument</small>)

To update/set settings (i.e. override default setting value with a *user* setting), a Json string is sent representing a Json object containing:

  - `'settings'` - an optional object with members to be overlaid over base settings value. Values are bare (that is simply replacements for the `'v'` field of base)
  - `'schedules'` - an optional object with 1 or more members, each a schedule object per the get description. Note schedules with the same name will be replaced in the their entirety with the new value

### Delete Camera Settings (<small>POST device `'camera_settings_delete'` argument</small>)

To delete/unset settings (i.e. return to default setting value), a Json string is sent representing a Json object containing:

  - `'settings'` - an optional object with members to be removed from user settings. Values ignored
  - `'schedules'` - an optional object with 1 or more members, each a the name of a current schedule. Value of the members are ignored

### Camera Settings (<small>Currently Supported</small>)

Each camera make/model/version is different, thus not every setting is supported for some cameras, but here is list of core camera settings that are relevant to most applications:

  - `'active_rois'` - object indicating which rois are currently active (by `'<roiname>'`, see `'rois'` setting below)
  - `'audio_enable'` - boolean (true/false) indicating whether audio is enabled or not
  - `'camera_on'` - boolean integer (1/0) indicating whether camera is turned on/off respectively
  - `'motion_sensitivity'` - float between 0 and 1 indicating how sensitive the motion detection is
  - `'motion_size_ratio'` - float between 0 and 1 indicating the size of objects to detect for motion
  - `'motion_boxes_metric_active'` - boolean integer indicating whether motion boxes are enabled
  - `'preview_realtime_bandwidth'` - float indicating the max bandwidth of real-time preview image transmission
  - `'preview_transmit_mode'` - string indicating when preview images are transmitted to the cloud
  - `'preview_interval_ms'` - integer indicating how many milliseconds between preview images
  - `'preview_resolution'` - string indicating the resolution of the preview images. When displaying the options for this setting, you must use the data from `'video_config.v.preview_quality_settings.<preview_resolution>'` (`'w'` and `'h'`) to show what this resolution string translates to for display purposes
  - `'preview_quality'` - string indicating the quality of the preview images
  - `'retention_days'` - integer indicating how many days worth of data should be retained in the cloud
  - `'rois'` - extensible object, containing multiple ROI objects keyed by a `'<roiname>'`, with each ROI object supporting the following members:
      - `'verts'` - [[`'x'`,`'y'`], ...], polygon vertices in order. Coordinates will be scaled so `'0-1.0'` is full screen for `'x'` and `'y'`, with `'0,0'` being top left corner. Edges can’t cross or bad things will happen
      - `'motion_noise_filter'` - as for main screen. If < 0.001 will not be applied
      - `'motion_sensitivity'` - as for main screen. If < 0.001 will not be applied
      - `'motion_hold_interval'` - as for main screen. If < 0.001 will not be applied
      - `'priority'` - float (bigger wins), control settings overlay (defaults to 0.0)
      - `'motion_threshold'` - (float)percentage of the screen to be occluded by motion within this ROI to create an ROI event (defaults to motion_size_ratio from main screen)
      - `'name'` - string used for the display name of the ROI in a GUI. Not to be confused with the `'<roiname>'` as the key of this ROI object
      - `'ignore_motion'` - boolean integer (1/0) indicating whether motion will be ignored for this ROI. Used as a GUI abstraction to indicate we want to set `'motion_sensitivity'` to `'0.001'` and `'motion_noise_filter'` to `'0.99'`
      - `'roiid'` - (int)id to attach to the ROI event. If 0 or not present, events will not be created, which will also prevent ROI-based alerts
      - `'hold_off_ms'` - (int) ms of constant motion before an event is created, defaults to motion_event_holdoff_ms
      - `'hold_on_ms'` - (int) ms of idle before stopping an ROI motion event (defaults to motion_event_holdon_ms from main settings)
  - `'scene_type'` - string indicating the type of scene the camera is viewing
  - `'video_transmit_mode'` - string indicating when video is transmitted to the cloud
  - `'video_capture_mode'` - string indicating when video will being recorded
  - `'video_bandwidth_factor'` - integer indicating the bit rate of the video. When displaying options for this setting, you must use the data from `'video_config.v.video_quality_settings.<video_resolution>.quality.<video_quality>.kbps'` to show what this setting translates to for display purposes
  - `'video_resolution'` - string indicating the resolution of the video. When displaying the options for this setting, you must use the data from `'video_config.v.video_quality_settings.<video_resolution>'` (`'w'` and `'h'`) to show what this resolution string translates to
  - `'video_quality'` - string indicating the quality of the video
  - `'video_config'` - read-only object defining all the preview/video configuration parameters for each available resolution. Helps give useful information for display purposes of the `'preview_resolution'`, `'video_resolution'` and `'video_bandwidth_factor'` settings/options

### Regions of Interest (<small>ROIs</small>)

ROIs will be defined by simple polygons - sequences of x,y coordinates that form a closed object, edge crosses are illegal and will have bizarre results. Each ROI will describe a portion of the screen. ROIs can overlap and priority (higher wins) determines what sensitivity settings to use. For overlapping ROIs, all will get motion block detection and can trigger ROI motion spans

ROIs can:

  - Adjust DCT sensitivity and detection properties (ignore stuff in an area, track stuff aggressively in an area)
  - Cause specific events
  - Characterize an object for later alert/event processing (dwell, transitions counting)
  - Turn on certain detectors within a region

ROIs within settings will be `'rois'`: { `'<roiname>'`: { `'roiid'`: `1437974150`, `'name'`: `'Rusty Region'`, ... }. ROIs are enabled and disabled by `'active_rois'`: { `'<roiname>'`: `true`, ... } to allow ROIs to easily be turned on and off to support schedules and ROI based alerts. To remove an active ROI delete it with the same arguments

Like the alert logic, `'rois'` and `'active_rois'` are accumulation settings - adding an object adds it to the holding object instead of replacing the entire object like most settings. Similarly, deleting an object removes it from the parent object, but leaves the parent in place. Both also automatically trigger updates to the active <a class="definition" onclick="openModal('DOT-ESN')">ESN</a> data streams

ROIs can produce events and force video recording on activity within them. These events are distinct from motion events (whole screen events). Each ROI event has a simple snapshot algorithm the grabs a snapshot immediately, as opposed to the optimized object tracking for motion events. Since ROIs are presumed to be smaller, this should result in good summary images

ROI [events](#event-objects) are reported by the ROMS and ROME etags:

ROMS

  - cameraid <small>(guint32)</small> - ID of the device this event was reported by
  - eventid <small>(guint32)</small> - ID unique to this event
  - roiid <small>(guint32)</small> - ROI ID from the ROI definition
  - videoid <small>(guint32)</small> - ID of the associated video

ROME

  - cameraid <small>(guint32)</small> - ID of the device this event was reported by
  - eventid <small>(guint32)</small> - ID unique to this event

<!--===================================================================-->
## Camera Model
<!--===================================================================-->

> Camera Model

```json
{
    "id": "1000f60d",
    "name": "Kitchen Camera",
    "utcOffset": -18000,
    "timezone": "US/Central",
    "guid": "c6d11f36-9e63-11e1-a5b0-00408cdf9191",
    "permissions": "A@FIMLNSUTZcgfhmpsruwz",
    "tags": [
        "austin",
        "kitchen"
    ],
    "bridges": {
        "100a9af6": "ATTD"
    },
    "camera_settings_status_code": 200,
    "camera_settings": "{}",
    "settings": {
        "username": "onvif",
        "password": "securityCameraz",
        "bridge": "100a9af6",
        "alert_modes": {},
        "alert_levels": {},
        "alert_notifications": {},
        "longitude": -97.740715,
        "latitude": 30.269064,
        "street_address": "717-799 Brazos Street, Austin, TX 78701, USA",
        "site_name": "Panucci's Pizza",
        "floor": 0,
        "alert_throttle_types": {},
        "alert_throttle_seconds": {},
        "alert_throttle_hour_limits": {},
        "retention_days": 14,
        "local_retention_days": -1,
        "preview_only_cloud_retention": 0,
        "cloud_retention_days": 14,
        "roi_names": {},
        "range": null,
        "azimuth": null,
        "audio_clone_targets": [],
        "notes": "Previously used for laser eye surgery. Records pizzas as squares"
    },
    "camera_info_status_code": 200,
    "camera_info": {
        "esn": "1000f60d",
        "class": "camera",
        "camtype": "ONVIF",
        "camera_property_model": "EN-CDUM-005a",
        "camera_property_make": "Eagle Eye Networks",
        "r_model": "EN-CDUM-005a",
        "r_make": "Eagle Eye Networks",
        "model": "EN-CDUM-005a",
        "make": "Eagle Eye Networks",
        "uuid": "c6d11f36-9e63-11e1-a5b0-00408cdf9191",
        "bridgeid": "100a9af6",
        "bridge": "835b391f-6554-4e0a-902d-e989b3b46dba",
        "service": "ATTD",
        "connect": "STRM",
        "status": "1441831",
        "status_hex": "00160027",
        "intf": "Camera LAN",
        "mac": "00:1C:27:09:B1:98",
        "ipaddr": "*10.143.55.140",
        "proxy": "secondary",
        "camera_state_version": 1,
        "tagmap_status_state": 2,
        "admin_user": "admin",
        "admin_password": "admin",
        "subclass": "camdriver.onvif.GenericOnvifDriver",
        "r_version": "v2.0.0801.1002.88.1.33.1.45",
        "version": "v2.0.0801.1002.88.1.33.1.45",
        "camera_property_version": "v2.0.0801.1002.88.1.33.1.45",
        "register_id": 2242242234,
        "camera_retention_asset": 1209600000,
        "camera_newest": "20180704065509.359",
        "camera_oldest": "20180627000000.000",
        "camera_retention_etag": 1209600000,
        "now": "20180704090822.975",
        "ts": "20180704085738.391",
        "camera_property_analog": false,
        "camera_retention_interval": 1209600000,
        "camera_now": "20180704090823.543",
        "camera_abs_newest": "20180704040237.058",
        "camera_abs_oldest": "20180620000000.000",
        "camera_valid_ts": "20180627000000.000"
    },
    "camera_parameters_status_code": 200,
    "camera_parameters": {
        "active_settings": {
            "video_confirm_stream_bw": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "bridge_retention_days": {
                "max": 100000,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "metadata_enable": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "motion_event_holdon_ms": {
                "max": 10000,
                "min": 0,
                "d": 300,
                "v": 300
            },
            "display_name": {
                "d": "none",
                "v": "none"
            },
            "encryption_type": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "event_postroll_ms": {
                "max": 60000,
                "min": 0,
                "d": 1000,
                "v": 1000
            },
            "bandwidth_recover": {
                "max": 10000000000,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "metadata_config": {
                "d": {},
                "v": {}
            },
            "preview_min_limit_change_ms": {
                "max": 500000,
                "min": 2000,
                "d": 10000,
                "v": 10000
            },
            "bandwidth_demand": {
                "max": 10000000000,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "display_height": {
                "max": 64000,
                "min": 80,
                "d": 180,
                "v": 180
            },
            "motion_sensitivity": {
                "max": 1,
                "min": 0,
                "d": 0.8,
                "v": 0.8
            },
            "video_bitrate": {
                "max": 12000,
                "min": 100,
                "d": 100,
                "v": 100
            },
            "motion_snap_excellent_hold_ms": {
                "max": 5000,
                "min": 100,
                "d": 1000,
                "v": 1000
            },
            "preview_noise_change_threshold": {
                "max": 64,
                "min": 1,
                "d": 2,
                "v": 2
            },
            "display_features": {
                "max": 255,
                "min": 0,
                "d": 255,
                "v": 255
            },
            "event_preroll_ms": {
                "max": 120000,
                "min": 0,
                "d": 1000,
                "v": 1000
            },
            "preview_jcmp_enable": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "preview_first_frame_delta_target": {
                "max": 0.99,
                "min": 0.01,
                "d": 0.25,
                "v": 0.25
            },
            "audio_clone_targets": {
                "d": [],
                "v": []
            },
            "preview_resolution": {
                "min": [
                    "cif",
                    "std"
                ],
                "d": "cif",
                "v": "cif"
            },
            "motion_event_holdoff_ms": {
                "max": 10000,
                "min": 0,
                "d": 500,
                "v": 500
            },
            "active_rois": {
                "d": {},
                "v": {}
            },
            "video_capture_mode": {
                "min": [
                    "always",
                    "event"
                ],
                "d": "event",
                "v": "event"
            },
            "motion_size_ratio": {
                "max": 0.99,
                "min": 0.0001,
                "d": 0.001,
                "v": 0.001
            },
            "preview_interval_ms": {
                "max": 16000,
                "min": 250,
                "d": 1000,
                "v": 1000
            },
            "local_retention_days": {
                "max": -1,
                "min": -1,
                "d": -1,
                "v": -1
            },
            "preview_frame_interval_min": {
                "max": 16000,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "display_width": {
                "max": 64000,
                "min": 80,
                "d": 320,
                "v": 320
            },
            "preview_log_mask": {
                "max": 15,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "motion_snap_age_threshold_ms": {
                "max": 2000,
                "min": 100,
                "d": 200,
                "v": 200
            },
            "preview_noise_limit_min": {
                "max": 16,
                "min": 2,
                "d": 3,
                "v": 3
            },
            "display_size": {
                "max": 3,
                "min": 1,
                "d": 1,
                "v": 1
            },
            "stream_stats_present_only": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
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
                    8,
                    4,
                    2,
                    1,
                    1,
                    1,
                    1,
                    1
                ]
            },
            "min_bw_settings": {
                "d": {
                    "video_transmit_mode": "on demand",
                    "preview_transmit_mode": "on demand",
                    "always_transmit_mode": "on demand"
                },
                "v": {
                    "video_transmit_mode": "on demand",
                    "preview_transmit_mode": "on demand",
                    "always_transmit_mode": "on demand"
                }
            },
            "camera_class": {
                "d": "script",
                "v": "script"
            },
            "camera_applications": {
                "d": {},
                "v": {}
            },
            "shaping_mode": {
                "max": 127,
                "min": 0,
                "d": 31,
                "v": 31
            },
            "video_config": {
                "d": {
                    "preview_encoder": "videoencoder_config_cam1_stream2",
                    "video_profile": "UserCreatedProfileToken_3332364559",
                    "video_source": "videosource_config_cam1",
                    "preview_profile": "UserCreatedProfileToken_1903767221",
                    "preview_quality_settings": {
                        "std": {
                            "h": 360,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 3000,
                                    "fps": 8
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 3000,
                                    "fps": 8
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 3000,
                                    "fps": 8
                                }
                            },
                            "w": 640
                        },
                        "cif": {
                            "h": 240,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 8
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 8
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 8
                                }
                            },
                            "w": 320
                        }
                    },
                    "video_encoder": "videoencoder_config_cam1_stream1",
                    "preview_source": "videosource_config_cam1",
                    "video_quality_settings": {
                        "high": {
                            "h": 720,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 2000,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 2000,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 500,
                                    "fps": 10
                                }
                            },
                            "w": 1280
                        },
                        "std": {
                            "h": 360,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 600,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 400,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 600,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 200,
                                    "fps": 10
                                }
                            },
                            "w": 640
                        },
                        "1080P": {
                            "h": 1080,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 4000,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 2000,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 4000,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 10
                                }
                            },
                            "w": 1920
                        },
                        "cif": {
                            "h": 240,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 300,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 140,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 300,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 100,
                                    "fps": 10
                                }
                            },
                            "w": 352
                        }
                    }
                },
                "v": {
                    "video_profile": "UserCreatedProfileToken_3332364559",
                    "video_source": "videosource_config_cam1",
                    "preview_profile": "UserCreatedProfileToken_1903767221",
                    "preview_encoder": "videoencoder_config_cam1_stream2",
                    "preview_quality_settings": {
                        "std": {
                            "h": 360,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 3000,
                                    "fps": 8
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 3000,
                                    "fps": 8
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 3000,
                                    "fps": 8
                                }
                            },
                            "w": 640
                        },
                        "cif": {
                            "h": 240,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 8
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 8
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 8
                                }
                            },
                            "w": 320
                        }
                    },
                    "video_encoder": "videoencoder_config_cam1_stream1",
                    "preview_source": "videosource_config_cam1",
                    "video_quality_settings": {
                        "high": {
                            "h": 720,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 2000,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 2000,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 500,
                                    "fps": 10
                                }
                            },
                            "w": 1280
                        },
                        "std": {
                            "h": 360,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 600,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 400,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 600,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 200,
                                    "fps": 10
                                }
                            },
                            "w": 640
                        },
                        "1080P": {
                            "h": 1080,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 4000,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 2000,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 4000,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 1000,
                                    "fps": 10
                                }
                            },
                            "w": 1920
                        },
                        "cif": {
                            "h": 240,
                            "quality": {
                                "high": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 300,
                                    "fps": 15
                                },
                                "med": {
                                    "q": 6,
                                    "bw": 0,
                                    "kbps": 140,
                                    "fps": 12
                                },
                                "max-fps": {
                                    "q": 8,
                                    "bw": 0,
                                    "kbps": 300,
                                    "fps": 30
                                },
                                "low": {
                                    "q": 5,
                                    "bw": 0,
                                    "kbps": 100,
                                    "fps": 10
                                }
                            },
                            "w": 352
                        }
                    }
                }
            },
            "preview_compress_keyframes": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "driver_info": {
                "d": {
                    "descriptor_version": "20180315070114.234",
                    "descriptor": "EN-CDU-1080P_v2.0",
                    "version": "20160216085458.870",
                    "local": false
                },
                "v": {
                    "descriptor_version": "20180315070114.234",
                    "descriptor": "EN-CDU-1080P_v2.0",
                    "version": "20160216085458.870",
                    "local": false
                }
            },
            "preview_key_frame_hold_ms": {
                "max": 3600000,
                "min": 30000,
                "d": 1800000,
                "v": 1800000
            },
            "rois": {
                "d": {},
                "v": {}
            },
            "rtp_streaming": {
                "min": [
                    "udp",
                    "tcp",
                    "default"
                ],
                "d": "default",
                "v": "default"
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
            "retention_days": {
                "max": 10000,
                "min": 0,
                "d": 14,
                "v": 14
            },
            "always_transmit_mode": {
                "min": [
                    "always",
                    "event",
                    "background",
                    "on demand"
                ],
                "d": "background",
                "v": "background"
            },
            "retention_max_bytes": {
                "max": 1000000000000,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "motion_noise_filter": {
                "max": 1,
                "min": 0,
                "d": 0.7,
                "v": 0.7
            },
            "video_source_bounds": {
                "max": [
                    1920,
                    1080,
                    1920,
                    1080
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
                    1920,
                    1080
                ],
                "v": [
                    0,
                    0,
                    1920,
                    1080
                ]
            },
            "ptz_tours": {
                "d": {},
                "v": {}
            },
            "audio_clone_time_offset": {
                "max": 32,
                "min": -32,
                "d": 0,
                "v": 0
            },
            "pos_info_attach": {
                "d": {},
                "v": {}
            },
            "video_resolution": {
                "min": [
                    "cif",
                    "std",
                    "high",
                    "1080P"
                ],
                "d": "high",
                "v": "high"
            },
            "preview_min_gop_ms": {
                "max": 180000,
                "min": 1000,
                "d": 4000,
                "v": 4000
            },
            "motion_logmask": {
                "max": 7,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "ptz_user_to_idle": {
                "max": 500000,
                "min": 5,
                "d": 300,
                "v": 300
            },
            "active_alerts": {
                "d": {},
                "v": {}
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
            "audio_enable": {
                "d": false,
                "v": false
            },
            "video_bandwidth_factor": {
                "max": 64,
                "min": 1,
                "d": 1,
                "v": 1
            },
            "model_default_password": {
                "d": "admin",
                "v": "admin"
            },
            "motion_size_metric_active": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "bandwidth_background": {
                "max": 10000000000,
                "min": -1000,
                "d": 0,
                "v": 0
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
            "motion_expand_ratio": {
                "max": 0.99,
                "min": 0.001,
                "d": 0.1,
                "v": 0.1
            },
            "camera_on": {
                "max": 1,
                "min": 0,
                "d": 1,
                "v": 1
            },
            "ptz_active_tours": {
                "d": {},
                "v": {}
            },
            "active_application": {
                "d": {},
                "v": {}
            },
            "stream_stats": {
                "d": "none",
                "v": "none"
            },
            "motion_edge_expand_ratio": {
                "max": 0.99,
                "min": 0.001,
                "d": 0.1,
                "v": 0.1
            },
            "model_default_username": {
                "d": "admin",
                "v": "admin"
            },
            "preview_realtime_bandwidth": {
                "max": 100000000,
                "min": 8000,
                "d": 50000,
                "v": 50000
            },
            "motion_snap_size_ratio": {
                "max": 0.99,
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
            "ptz_stations": {
                "d": {},
                "v": {}
            },
            "alerts": {
                "d": {},
                "v": {}
            },
            "motion_hold_interval": {
                "max": 120,
                "min": 0,
                "d": 5,
                "v": 5
            },
            "display_audio_enabled": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
            },
            "preview_only_cloud_retention": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
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
                        }
                    }
                }
            },
            "cloud_retention_days": {
                "max": 2190,
                "min": 1,
                "d": 14,
                "v": 14
            },
            "always_retention_days": {
                "max": 100000,
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
            "audio_clone_source": {
                "d": "0",
                "v": "0"
            },
            "video_source_flip": {
                "d": false,
                "v": false
            },
            "motion_boxes_metric_active": {
                "max": 1,
                "min": 0,
                "d": 0,
                "v": 0
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
            "preview_quality": {
                "min": [
                    "low",
                    "med",
                    "high"
                ],
                "d": "low",
                "v": "low"
            },
            "video_quality": {
                "min": [
                    "low",
                    "med",
                    "high",
                    "max-fps"
                ],
                "d": "med",
                "v": "med"
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
                "rois": {},
                "active_rois": {}
            },
            "schedules": {}
        }
    }
}
```

### Camera (Attributes)

Parameter                     | Data Type     | Description                                                                                        | Editable    | Required
---------                     | ---------     | -----------                                                                                        |:-----------:| --------
**id**                        | string        | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> automatically generated and assigned while adding the camera to a <a class="definition" onclick="openModal('DOT-Bridge')">Bridge</a>                                                                            | **&cross;** | **<sub><form action="#get-camera"><button>GET</button></form></sub>** <br>**<sub><form action="#update-camera"><button>POST</button></form></sub>** <br>**<sub><form action="#delete-camera"><button>DELETE</button></form></sub>**
**name**                      | string        | Device name                                                                                        | **&check;** | **<sub><form action="#add-camera-to-bridge"><button>PUT</button></form></sub>**
**[settings](#camera-settings)** | json          | Json object of basic settings (location, motion regions, etc.)                                  | **&check;** | **<sub><form action="#add-camera-to-bridge"><button>PUT</button></form></sub>**
camera_settings_status_code   | int           | Indicates whether it was possible to retrieve the device settings (200) or not (404) <small>**(DEPRECATED)**</small> | **&cross;** |
camera_settings               | string        | Miscellaneous device settings <small>**(DEPRECATED)**</small>                                      | **&cross;** |
utcOffset                     | int           | Signed UTC offset in seconds of the set `'timezone'` (defaults to the cameras’s bridge offset)     | **&cross;** |
timezone                      | string        | Indicates the timezone of the camera (defaults to the cameras’s bridge timezone) <br><br>Example: `'US/Alaska'`, `'US/Arizona'`, `'US/Central'`, `'US/Eastern'`, `'US/Hawaii'`, `'America/Anchorage'` or `'UTC'`                                                                    | **&check;** |
guid                          | string        | The GUID (Globally Unique Identifier) is an immutable device identifier assigned to a device during the production process                                                                                                                                            | **&cross;** |
permissions                   | string        | String of characters each defining a permission level of the current user <br><br>Permissions include: <br>`'R'` - user has access to view images and video for this camera <br>`'W'` - user can modify and delete this camera <br>`'S'` - user can share this camera in a group share                                                                                                                                              | **&cross;** |
tags                          | array[string] | Array of strings each representing a tag name                                                      | **&check;** |
[bridges](#camera-bridges)    | json          | Json object of bridges (<a class="definition" onclick="openModal('DOT-ESN')">ESNs</a>) this device is seen by and the camera attach status: <br>`'ATTD'` - the camera is attached to a bridge <br>`'IGND'` - the camera is unattached and is available to be attached                                                                | **&cross;** |
camera_parameters_status_code | int           | Indicates whether it was possible to retrieve the device parameters (200) or not (404)             | **&cross;** |
camera_parameters             | json          | Json object of camera parameters. If camera parameters cannot be retrieved for whatever reason (example: communication with the bridge has been lost), this will be empty and camera_parameters_status_code will be 404                                                                   | **&check;** |
camera_info_status_code       | int           | Indicates whether it was possible to retrieve information about the device (200) or not (404)      | **&cross;** |
[camera_info](#camera-camera_info) | json          | Json object of basic information related to a camera. If camera information cannot be retrieved for whatever reason (example: communication with camera has been lost), then this will be empty and camera_info_status_code will be 404                                          | **&cross;** |

<aside class="notice">All cameras in a group must have the ‘S’ permission or the group cannot be shared</aside>

### Camera - settings

Parameter             | Data Type | Description | Required
---------             | --------- | ----------- | --------
**bridge**            | string    | <a class="definition" onclick="openModal('DOT-Device-ID')">Device ID</a> of bridge the camera is currently attached to (or ID of the bridge to attach camera to) <small>**(APPLIES ONLY TO CAMERAS)**</small> | **<sub><form action="#add-camera-to-bridge"><button>PUT</button></form></sub>**
**guid**              | string    | The GUID (Globally Unique Identifier) is an immutable device identifier assigned to a device during the production process | **<sub><form action="#add-camera-to-bridge"><button>PUT</button></form></sub>**
username              | string    | Username to login to camera <small>**(APPLIES ONLY TO CAMERAS)**</small>
password              | string    | Password to login to camera <small>**(APPLIES ONLY TO CAMERAS)**</small>
[roi_names](#camera-settings-roi_names) | json      | Json object of ROI names keyed by ROI ID <small>**(APPLIES ONLY TO CAMERAS)**</small>
[alert_notifications](#camera-settings-alert_notifications) | json      | Json object of user IDs keyed by ROI ID <small>**(APPLIES ONLY TO CAMERAS)**</small>
[alert_modes](#camera-settings-alert_modes) | json      | Json object of alert modes keyed by ROI ID <small>**(APPLIES ONLY TO CAMERAS)**</small>
[alert_levels](#camera-settings-alert_levels) | json      | Json object of alert levels keyed by ROI ID <small>**(APPLIES ONLY TO CAMERAS)**</small>
notes                 | string    | Notes
latitude              | float     | Latitude of the camera's location
longitude             | float     | Longitude of the camera's location
street_address        | string    | Street address of the camera's location
azimuth               | float     | Direction which the camera faces. Possible values: `0.0`-`360.0` (North=`0.0`)
range                 | float     | Effective distance the camera can *see* in feet
floor                 | int       | The floor of the building given that it is a multi-storey building
share_email           | string    | Comma-delimited list of emails to share this device with
local_retention_days  | json      | Json object of total retention days defined in the following way: <br><br>`{` <br>&nbsp;&nbsp;&nbsp;&nbsp;`'max'`: `10000`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'min'`: `1`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'d'`: `14`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'v'`: `14` <br>`}` <br><br>'d' - default value <br>'v' - currently set value
cloud_retention_days  | json      | Json object of total retention days defined in the following way: <br><br>`{` <br>&nbsp;&nbsp;&nbsp;&nbsp;`'max'`: `10000`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'min'`: `1`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'d'`: `14`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'v'`: `14` <br>`}` <br><br>'d' - default value <br>'v' - currently set value
bridge_retention_days | json      | Json object of total retention days defined in the following way: <br><br>`{` <br>&nbsp;&nbsp;&nbsp;&nbsp;`'max'`: `10000`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'min'`: `1`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'d'`: `14`, <br>&nbsp;&nbsp;&nbsp;&nbsp;`'v'`: `14` <br>`}` <br><br>'d' - default value <br>'v' - currently set value

<aside class="success">The listed settings are most common examples because the model differs from device to device</aside>

<aside class="notice">local_retention_days and cloud_retention_days are unpurposed in CMVR mode</aside>

<!-- TODO: Add the full camera model table including: 'settings' and 'camera_parameters' with
active_filters                | array[string] | Array of strings each representing an active for the device filter
user_settings                 | json          | Json object of miscellaneous user settings
schedules                     | json          | Json object of camera schedules defining recording times for the device -->

### Camera - settings - roi_names

Parameter  | Data Type | Description
---------  | --------- | -----------
\<roi_id\> | string    | Object with keys being ROI IDs and values being the name

### Camera - settings - alert_notifications

Parameter  | Data Type     | Description
---------  | ---------     | -----------
\<roi_id\> | array[string] | Object with keys being ROI IDs and values being the array of User IDs

### Camera - settings - alert_modes

Parameter  | Data Type     | Description
---------  | ---------     | -----------
\<roi_id\> | array[string] | Object with keys being ROI IDs and values being the array of alert modes

### Camera - settings - alert_levels

Parameter  | Data Type     | Description
---------  | ---------     | -----------
\<roi_id\> | array[string] | Object with keys being ROI IDs and values being the array of alert levels

### Camera - bridges

Parameter     | Data Type | Description
---------     | --------- | -----------
\<device_id\> | string    | Object with keys being bridge IDs and values being the service status of the camera on that bridge

### Camera - camera_info

Parameter           | Data Type | Description
---------           | --------- | -----------
esn                 | string    | Electronic Serial Number of the device
class               | string    | Camera or bridge, etc.
camtype             | string    | Type of device: <br>`'ONVIF'` - onvif-compliant device
model               | string    | Model of the device
make                | string    | Make of the device
uuid                | string    | UUID uniquely identifying the device
bridgeid            | string    | ID of the bridge this device is attached to
bridge              | string    | GUID of the bridge the device is attached to
service             | string    | Device service status: <br>`'ATTD'` - camera is attached to a bridge <br>`'IGND'` - camera is unattached from all bridges and is available to be attached to a bridge <br>`'IDLE'` - camera will register but will not operate (unregistered bridges) <br>`'ERSE'` - one shot, all camera data will be erased <br><br>enum: ATTD, IGND, IDLE, ERSE
connect             | string    | Device connect status: <br>`'STRM'` - camera is connected and streaming
[status](#overall-status) | string    | Decimal status of the device
[status_hex](#status-bitmask) | string    | Status bitmask as head string
[status_hex64](#status-bitmask) | string    | Extended status bitmask as hex string
intf                | string    | Interface of the device (not present for analog): <br>`'Camera LAN'` - camera is connected via LAN
mac                 | string    | MAC address of the device
ipaddr              | string    | IP addresses assigned to the device (comma-delimited) with the one in use prefixed by an asterisk (\*)
proxy               | string    | Proxy
camera_state_version | int       | Camera state version
tagmap_status_state | int       | Tag map status state
admin_user          | string    | Web username
admin_password      | string    | Web password
subclass            | string    | Firmware/driver type of the device
version             | string    | Firmware/driver version of the device
register_id         | int       | Camera register ID
camera_retention    | int       | Retention period in milliseconds
camera_retention_etag | int       | Retention period in milliseconds
camera_retention_asset | int       | Retention period in milliseconds
camera_retention_interval | int       | Retention interval in milliseconds
camera_newest       | string    | Timestamp of newest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_oldest       | string    | Timestamp of oldest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
now                 | string    | Current timestamp in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
ts                  | string    | Timestamp in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_property_analog | boolean   | Whether the device is connected via analog input (1) or not (0)
camera_info_version | int       | Device info version
camera_min_time     | string    | Minimum timestamp available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_now          | string    | Device's current timestamp in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_abs_newest   | string    | Timestamp of newest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_abs_oldest   | string    | Timestamp of oldest event available in EEN Timestamp format: YYYYMMDDHHMMSS.NNN
camera_property_model | string    | <small>Model of the device <br>**(DEPRECATED)**</small>
camera_property_make | string    | <small>Make of the device <br>**(DEPRECATED)**</small>
camera_property_version | string    | <small>Driver version of the device <br>**(DEPRECATED)**</small>
camera_valid_ts     | string    | <small>Timestamp of oldest event available <br>**(DEPRECATED)**</small>
r_model             | string    | <small>Model of the device <br>**(DEPRECATED)**</small>
r_make              | string    | <small>Make of the device <br>**(DEPRECATED)**</small>
r_version           | string    | <small>Firmware/driver version of the device <br>**(DEPRECATED)**</small>

<!-- TODO: Determine which (max) retention flags are Deprecated -->

<!--===================================================================-->
## Get Camera
<!--===================================================================-->

Returns a Camera object by ID

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/device -d "id=[CAMERA_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Get Camera's RTSP URLs
<!--===================================================================-->

Returns the full RTSP URLs for a Camera object by ID.

> Request

```shell
curl -X GET https://login.eagleeyenetworks.com/g/device/rtsp -d "id=[CAMERA_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device/rtsp`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true


> Json Response

```json
{
  "preview_url": "rtsp://...",
  "video_url": "rtsp://..."
}
```


### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400 | Unexpected or non-identifiable arguments are supplied
401 | Unauthorized due to invalid session cookie
403 | Forbidden due to the user missing the necessary privileges


<!--===================================================================-->
## Add Camera to <a class="definition" onclick="openModal('DOT-Bridge')">Bridge</a>
<!--===================================================================-->

Adds an unattached Camera to the bridge

> Request

```shell
curl -X PUT https://login.eagleeyenetworks.com/g/device -d '{"name":"[NAME]","timezone":[TIMEZONE],"settings":{"bridge":"[BRIDGE_ID]","guid":"[CAMERA_GUID]","username":"","password":""}}' -H "content-type: application/json" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`PUT https://login.eagleeyenetworks.com/g/device`

Parameter | Data Type     | Description | Is Required
--------- | ---------     | ----------- | -----------
**name**  | string        | Camera name | true
**[settings](#camera-settings)** | json          | Json object of basic settings (bridge, GUID, username, password, location, motion regions, etc.)  Please note that the GUID value is case-sensitive and should exactly match what is returned by the camera.| true
timezone  | string        | If unspecified, this will default to the camera’s bridge timezone
tags      | array[string] | Array of strings each representing a tag name


> Example JSON settings object

```json
{
  "name": "",
  "settings": {
    "bridge": "",
    "guid": "",
    "username": "",
    "password": ""
  }
}
```


> Json Response

```json
{
    "id": "1000f60d"
}
```

### HTTP Response (Array Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a>

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


<!--===================================================================-->
## Update Camera
<!--===================================================================-->

Update Camera information

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/device -d '{"id": "[CAMERA_ID], "name": "[NAME]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]"  --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/device`

Parameter                | Data Type     | Description | Is Required
---------                | ---------     | ----------- | -----------
**id**                   | string        | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true
name                     | string        | Camera name
timezone                 | strings       | If unspecified, this will default to the camera’s bridge timezone
tags                     | array[string] | Array of strings each representing a tag name
[settings](#camera-settings) | json          | Json object of basic settings (location, motion regions, etc.)
camera_parameters_add    | json          | Json object of camera parameters/settings to add/update
camera_parameters_delete | json          | Json object of camera parameters/settings to delete

> Json Response

```json
{
    "id": "1000f60d"
}
```

### HTTP Response (Json Attributes)

Parameter | Data Type | Description
--------- | --------- | -----------
id        | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a>

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
## Delete Camera
<!--===================================================================-->

Delete a Camera from the bridge (effectively unassigning it, the camera can then be added to another or the same device)

> Request

```shell
curl -X DELETE https://login.eagleeyenetworks.com/g/device -d "id=[CAMERA_ID]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

### HTTP Request

`DELETE https://login.eagleeyenetworks.com/g/device`

Parameter | Data Type | Description | Is Required
--------- | --------- | ----------- | -----------
**id**    | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a> | true

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
## Get List of Cameras
<!--===================================================================-->

Returns an array of arrays with each sub-array representing a Camera available to the user. The `'service_status'` attribute is set either to `'ATTD'`, `'IGND'`, `'IDLE'` or `'ERSE'`. If the `'service_status'` is `'ATTD'`, the camera is attached to a bridge. If the `'service_status'` is `'IGND'`, the camera is unattached from any bridge and is available to be attached. If the `'service_status'` is `'IDLE'`, the camera will register but will not operate (unregistered bridges). The `'ERSE'` status is used to erase all camera data from the bridge

> Request

```shell
curl --request GET https://login.eagleeyenetworks.com/g/device/list -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/device/list`

Parameter | Data Type | Description
--------- | --------- | -----------
e         | string    | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a>
n         | string    | <a class="definition" onclick="openModal('DOT-Camera-Name')">Camera Name</a>
t         | string    | Device Type
s         | string    | Device Service Status

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

Array Index | Attribute           | Data Type     | Description
----------- | ---------           | ---------     | -----------
0           | account_id          | string        | <a class="definition" onclick="openModal('DOT-Account-ID')">Account ID</a> of the device’s account
1           | id                  | string        | <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a>
2           | name                | string        | Device name
3           | type                | string, enum  | Device type <br><br>enum: bridge, camera, mobile_camera, multiview_camera, mca_camera
4           | bridges             | array&nbsp;[<br>&nbsp;&nbsp;array&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;string</br>&nbsp;&nbsp;]</br>]  | This is an array of string arrays, each array representing a bridge that can see the camera. The first element of the array is the bridge <a class="definition" onclick="openModal('DOT-ESN')">ESN</a>. The second element is the service status
5           | service_status      | string, enum  | Device service status: <br>`'ATTD'` - camera is attached to a bridge <br>`'IGND'` - camera is unattached from all bridges and is available to be attached to a bridge <br>`'IDLE'` - camera will register but will not operate (unregistered bridges) <br>`'ERSE'` - one shot, all camera data will be erased <br><br>enum: ATTD, IGND, IDLE, ERSE
6           | permissions         | string        | String of one or more characters each defining a permission level <br><br>Permissions include: <br>`'R'` - user has access to view images and video for this camera <br>`'W'` - user can modify and delete this camera <br>`'S'` - user can share this camera in a group share
7           | tags                | array[string] | Array of strings each representing a tag name
8           | guid                | string        | The GUID (Globally Unique Identifier) is an immutable device identifier assigned to a device during the production process
9           | serial_number       | string        | Serial number of the device
10          | [device_status](#status-bitmask) | int           | The device status bitmask
11          | timezone            | string        | Indicates the timezone of the camera
12          | timezone_utc_offset | int           | Timezone UTC offset as signed integer in seconds (example: `-25200` translates to -7 hours from UTC)
13          | is_unsupported      | int           | Indicates whether the camera is NOT supported (1) or is supported (0)
14          | ip_address          | string        | IP addresses assigned to the device (comma-delimited) with the one in use prefixed by an asterisk (\*)
15          | is_shared           | int           | Indicates whether the camera is shared (1) or not (0)
16          | owner_account_name  | string        | Name of the account that owns the device. This only applies to shared cameras, since they will be owned by a different account
17          | is_upnp             | boolean       | Indicates whether the camera is a UPNP device. Note that this property is different then all the other `'is_*'` properties in the API, which normally are integers (0 or 1). Currently this property only applies to cameras that haven’t yet been attached to the account, in which they could have been detected via ONVIF or UPNP
18          | video_input         | string        | For analog cameras only, this indicates the video input channel of the camera
19          | video_status        | string        | For analog cameras only, this indicates the video status of the camera
20          | location            | array         | Location of the device specified in the following way: <br><br>`[` <br>&nbsp;&nbsp;&nbsp;&nbsp;`latitude(float),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`longitude(float),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`azimuth(float/null for bridge),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`range(float/null for bridge),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`street address(string),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`floor(int),` <br>&nbsp;&nbsp;&nbsp;&nbsp;`location name(string)` <br>`]` <br><br>Note: If any field is not set, the value is null
21          | parent_camera_id    | string        | Parent <a class="definition" onclick="openModal('DOT-Camera-ID')">Camera ID</a>
22          | child_camera_view   | string        | Child camera view
23          | is_hidden           | int           | GUI control to not show device
24          | ignored_inputs      | array[string] | Array of analog port numbers which should be ignored by the bridge
25          | responder_camera    | int           | Indicates whether the camera is a first responder camera (1) or not (0)
26          | super_tags          | json          | Semantically classified device metadata
27          | discovered_state    | json          | Information regarding the connection state of discovered devices that have not been registered.  `created_at` is the last time the device was detected, `connect` (usually None) indicates the registration state of the device PENDING, IGNORED, etc.
28          | flags               | json          | Collection of boolean properties used internally for VMS GUI

<aside class="success">Please note that the model definition has property keys, but that's only for reference purposes since it's just a standard array</aside>

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

