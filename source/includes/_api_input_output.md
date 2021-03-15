# Input / Output

<!--===================================================================-->
## Overview
<!--===================================================================-->

Input and output ports (I/O ports) that are built into IP cameras are used to connect to other devices. These devices can be programmed to the users specifications to provide a response when, for example, motion is detected or the camera has been tampered with.

Eagle Eye Networks is supporting up to 4 (0 - 3) input ports, and 4 (0 - 3) output ports.

<!--===================================================================-->
## Input port
<!--===================================================================-->

An input port can be used to detect for example a high temperature of a person, or a motion. An input device sends a signal and information to the camera, and the camera is sending that signal to our system.

<!--===================================================================-->
## Output port
<!--===================================================================-->

An output port can be used to send a signal from a specific output port to the connected device, such as doors, to open it.

The output port can be manually activated by the user.

<!--===================================================================-->
## Check if camera is I/O capable
<!--===================================================================-->

To check if the camera is I/O capable get the camera object from `/g/device` API:

`GET https://login.eagleeyenetworks.com/g/device?id=<camera id>`

Look for `camera_parameters.active_settings.camera_io.d` key to determine if the camera is I/O capable, and how many I/O ports it has. The object is read-only.

> Example camera with I/O support (showing data related to I/O only):

```json
{
  "camera_parameters": {
    "active_settings": {
      "camera_io_input_config": {
        "d": {
        },
        "v": {
          "input_1": {
            "username": "input_1-test",
            "polarity": "active_high",
            "enable": true,
            "alert": true,
            "record": false,
            "token": "1",
            "x_alert_icon": "siren"
          }
        }
      },
      "camera_io_output_config": {
        "d": {
        },
        "v": {
          "relay_1": {
            "username": "relay_1-test",
            "polarity": "normally_open",
            "enable": true,
            "alert": true,
            "record": false,
            "token": "relay_1",
            "x_alert_icon": "light"
          }
        }
      },
      "camera_io_output_state": {
        "d": {
        },
        "v": {
          "relay_1": {
            "state": "active"
          }
        }
      },
      "camera_io": {
        "d": {
          "inputs": [
            {
              "token": "1",
              "name": "input_1"
            }
          ],
          "outputs": [
            {
              "token": "relay_1",
              "type": "Bistable",
              "name": "relay_1"
            }
          ]
        }
      }
    }
  }
}
```

`camera_parameters.active_settings.camera_io.d.inputs` describes input ports and `camera_parameters.active_settings.camera_io.d.outputs` describes its output ports. Each entry is an array of objects.

The most important field here is the `name`, which is read-only, and will be used in all operations when using `/g/device` API call. Consider it as string ID of the input or output port.

Order in the `camera_parameters.active_settings.camera_io.d.inputs` or `camera_parameters.active_settings.camera_io.d.outputs` matters, so you need to provide the same order of objects when editing input or output settings.

`camera_io_input_config`, `camera_io_output_config` and `camera_io_output_state` are described below.

<!--===================================================================-->
## Setting input port configuration
<!--===================================================================-->

`POST https://login.eagleeyenetworks.com/g/device?id=<camera id>`

> Example POST:

```json
{
  "camera_settings_add": {
    "settings":{
      "camera_io_input_config":{
        "input_1":{
          "token":"1",
          "enable":true,
          "username":"input_1",
          "polarity":"active_high",
          "record":false,
          "alert":true,
          "x_alert_icon":"siren"
        }
      }
    }
  }
}
```

Initial structure for each input configuration should be read from `camera_parameters.active_settings.camera_io.d.inputs.<input name>`. Rest of the fields should be filled if not exists in the initial structure.

Each time when setting the input port, you must send all inputs in `camera_io_input_config`, not only the one you are editing.

You can provide your own fields in each input port configuration, good practice is to add `x_` prefix before its name.

### Description of input fields

Field name          | Data Type | Description
---------           | --------- | -----------
enable              | boolean   | Set to `true` to enable input port
username            | string    | Optional string user supplied name of this input (for UI) 
record              | boolean   | Set to `true` to record videos when the state of input port will be changed (eg. from `idle` to `active`)
alert               | boolean   | Set to `true` to enable input control on Live view, Layouts, Preview, and History Browser (UI)
polarity            | string    | `active_high`, `active_low` indicates what is considered "active" (usually set to `active_high`); if the polarity is set to `active_low`, then the Active and Hold event will be sent when the input is false, as that is the users defined "active" state.
x_alert_icon        | string    | Set icon for such input port to be visible in the UI; supported icons are `siren`, `light`, `dot`, `door`, `bell`

After setting input port configuration you will see it in `camera_parameters.active_settings.camera_io_input_config.v.<input name>` key.

<!--===================================================================-->
## Setting output port configuration
<!--===================================================================-->

`POST https://login.eagleeyenetworks.com/g/device?id=<camera id>`

> Example POST:

```json
{
    "camera_settings_add": {
        "settings":{
            "camera_io_output_config":{
                "relay_1":{
                    "token":"1",
                    "enable":true,
                    "username":"relay_1",
                    "polarity":"normally_open",
                    "record":false,
                    "alert":true,
                    "x_alert_icon":"siren"
                }
            }
        }
    }
}
```

### Description of output fields

Field name          | Data Type | Description
---------           | --------- | -----------
polarity            | string    | `normally_open`, `normally_closed` (usually `normally_open`); if the `polarity` is set to `normally_closed`, then the Active and Hold event will be sent when the output is `idle`, as that is the users defined "active" state.

After setting output port configuration you will see it in `camera_parameters.active_settings.camera_io_output_config.v.<output name>` key.

<!--===================================================================-->
## Setting state of the output port
<!--===================================================================-->

You can set `active` or `idle` state of the output port at any time:

`POST https://login.eagleeyenetworks.com/g/device?id=<camera id>`

> Example POST:

```json
{
    "camera_settings_add": {
        "settings":{
            "camera_io_output_state":{
                "relay_1":{
                  "state":"active"
                }
            }
        }
    }
}
```

Only output port state can be changed (not input).

After setting output port state you will see it in `camera_parameters.active_settings.camera_io_output_state.v.<output name>` key.

When output port state was changed to `active` system should drop `IOAx` or `IOHx` event.

<!--===================================================================-->
## Event codes
<!--===================================================================-->

`I<I/O><A/H/I><index>` where:

Field name          | Data Type | Description
---------           | --------- | -----------
I                   | string    | Const describing that event is I/O
`I` or `O`          | string    | `I` for input, `O` for output
`A` or `H` or `I`   | string    | `A` for `active`, `H` for `hold`, `I` for `idle`
index               | string    | number provided as string; index for the I/O port, counting from 0 to 3

For example `IOA0` event code means “active output port on index 0”.

<!--===================================================================-->
## Reading historical I/O data
<!--===================================================================-->

`GET https://login.eagleeyenetworks.com/api/v2/Device/<camera id>/service/master/utils/events?id=<camera id>&start_timestamp=<een timestamp>&result_count=<count>&events=<events IDs separated by comma>&end_timestamp=<een timestamp>`

Parameter name      | Data Type | Description
---------           | --------- | -----------
camera id           | string   | ID of the camera to get historical I/O data for
`start_timestamp`   | string   | EEN Timestamp, start timestamp
`result_count`      | string   | number provided as string; how much entries you want to get, use `-1` for all
`events`            | string   | Event codes separated by comma
`end_timestamp`     | string   | EEN Timestamp, end timestamp

Example:
`GET https://login.eagleeyenetworks.com/api/v2/Device/12345678/service/master/utils/events?id=12345678&start_timestamp=20210215141340.491&result_count=-1&events=IIA0,IIH0,III0,IOA0,IOH0,IOI0&end_timestamp=20210217141340.491`

<!--===================================================================-->
## Reading I/O events in real-time
<!--===================================================================-->

System will drop `active` / `hold` / `idle` events when state of the specific I/O port will be changed.

To read it connect to websockets at `wss://login.eagleeyenetworks.com/api/v2/Device/<account ID>/Events` and register for such events by sending:

> Request data:

```json
{
    "cameras":{
        "<camera id>":{
            "resource":[
                "event"
            ],
            "event":[
                "event id"
            ]
        }
    }
}
```

Then listen on that websockets connection to get I/O states.

<!--===================================================================-->
## Setting alerts
<!--===================================================================-->

Each I/O port can have only one alert set. Alert can be set exactly like alerts for analytics or motion, just remember to use I/O port name instead of ID.

