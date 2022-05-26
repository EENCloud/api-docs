# How To's and Example Code

<!--===================================================================-->
## Making API Calls With Curl
<!--===================================================================-->

---

### cURL

> Authenticate Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/aaa/authenticate -d '{"username": "[USERNAME]", "password": "[PASSWORD]"}' -H "content-type: application/json" -H "Authentication: [API_KEY]"
```

In this section we will walk you through the process of making API requests using the **cURL** command line tool. The Eagle Eye APIs are platform agnostic and we use them to create the web, Android and iOS Eagle Eye clients. Curl is a tool for transferring data to and from a server using a wide range of supported protocols including HTTP/HTTPS, which is what we are interested in

**cURL** can be installed by visiting [this site](http://curl.haxx.se) (present on most linux systems by default)

With cURL installed the next step is to log in and have a valid session (visit the [cURL cheat sheet](https://ec.haxx.se/http-cheatsheet.html#curl-cheat-sheet) for basic HTTP commands), so that we can freely use any of the APIs. Logging in is a two step process consisting of authentication and authorization. The authentication API takes in 2 parameters. Our cURL common will look like the example (Authenticate Request) code to the right

<aside class="notice">The <small>[USERNAME]</small> and <small>[PASSWORD]</small> need to be valid for the API request to return successfully</aside>

  - The `--request` (or `-X`) flag specifies the *type of request* and can be set to *GET*, *POST*, *PUT* and/or *DELETE*
  - The `--data` (or `-d`) flag specifies the *data* (or in special cases *parameters*) of the API query
  - The `-H` flag specifies the *headers* of the API query
  - The `--cookie` flag specifies the *cookies* of the API query
  - Optionally provide the `-v` flag for a *verbose output* (more detailed output including HTTP headers, cookies and full server response)
  - Optionally provide the `-O` flag at the very end of the request for *file output* (displays download progress and saves the file with the name retrieved from the url to the current directory)
    - Alternatively provide `'-o "/<file_path/<filename>.<extension>"'` to specify output name and path <br>(path has to exist, can be relative `'./cam_01_recording.mp4'`)

> A certain degree of variation is possible within cURL for formulating HTTP requests:

```shell
curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/asset/prev/image.jpeg -d "id=[CAMERA_ID]" -d "timestamp=[TIMESTAMP]" -d "asset_class=[ASSET_CLASS]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

> Alternatively, the above request could be formulated as:

```shell
curl --request GET "https://[active_brand_subdomain].eagleeyenetworks.com/asset/prev/image.jpeg?id=[CAMERA_ID]&timestamp=[TIMESTAMP]&asset_class=[ASSET_CLASS]&A=[AUTH_KEY]" -H "Authentication: [API_KEY]"
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

**It is important to disassociate the types of request *data* from one another:**
<br><small>(certain request types require data to be sent via *parameters*, other types require the data to be delivered via *data* - as HTTP body)</small>

  - **Parameters** by providing the parameters following the request url with a `?` and injecting them into it (i.e. `id=[CAMERA_ID]&timestamp=[TIMESTAMP]` in `https://[active_brand_subdomain].eagleeyenetworks.com/asset/prev/image.jpeg?id=[CAMERA_ID]&timestamp=[TIMESTAMP]`)
  - **HTTP request body** via `--data` or `-d` (i.e. `-d "id=[CAMERA_ID]&timestamp=[TIMESTAMP]"`)
    - Example: data in a standard PUT/POST request including **Json-formatted data**, which can be explicitly specified by adding the appropriate header `-H 'Content-type: application/json'` in the following way during a Create User call:
      - `-d '{"first_name": "[FIRST_NAME]", "last_name": "[LAST_NAME]", "email": "[EMAIL]"}' -H "content-type: application/json"` <br>Alternatively the same data could be provided without specifying the data type in the following ways:
      - `-d "first_name=[FIRST_NAME]" -d "last_name=[LAST_NAME]" -d "email=[EMAIL]"`
      - `-d "first_name=[FIRST_NAME]&last_name=[LAST_NAME]&email=[EMAIL]"`
  - **HTTP headers or cookies** (`-H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"`)

The same request can frequently be mimicked using all 3 methods like with the *authentication key* in the following examples:

**Parameter (A=[AUTH_KEY])**

`curl -X GET "https://[active_brand_subdomain].eagleeyenetworks.com/asset/prev/image.jpeg?id=[CAMERA_ID]&timestamp=[TIMESTAMP]&asset_class=[ASSET_CLASS]&A=[AUTH_KEY]"`

**Request body (-d "A=[AUTH_KEY]")**
<br><small>(sneaky way of forcing GET to accept parameters via the data field, in this case data is still pushed as parameters and not in the request body)</small>

`curl -G https://[active_brand_subdomain].eagleeyenetworks.com/asset/prev/image.jpeg -d "id=[CAMERA_ID]" -d "timestamp=[TIMESTAMP]" -d "asset_class=[ASSET_CLASS]" -d "A=[AUTH_KEY]" -H "Authentication: [API_KEY]"`
<br><small>or</small></br>
`curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/asset/prev/image.jpeg -d "id=[CAMERA_ID]&timestamp=[TIMESTAMP]&asset_class=[ASSET_CLASS]&A=[AUTH_KEY]" -H "Authentication: [API_KEY]" -G`

**Cookie (--cookie "auth_key=[AUTH_KEY]")**

`curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/asset/prev/image.jpeg -d "id=[CAMERA_ID]" -d "timestamp=[TIMESTAMP]" -d "asset_class=[ASSET_CLASS]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -G`

---

### Token

> Json Response

```json
{
    "token": "MiDUwMQqwP1JsfKqbqT1DQ8hJFHEOZfROEUtBvnuqv0ICxvcOybkS1n9/awjrJ9YKijb60GqdUDPP8TW4o8Ei8iI8OXC/dj74KC2cLMxJ2vs/hmYPfbW8OpCwf0k683a2LfIbjcC3Uy/SmDpOsxVdPMTXQEGJHXD3ItmAvoQ5MOoRKfHBNOu7OJBWQjPUjeP0fkHSrx8JgAHSqT5SwRM0mLysFmiFHF0h7/5Apt81dDhZwLBDwwSrl+kTqgn+wnw6rJ432liESdK+yp3Qefk1wAtytoTJkkBE2srqsHJdW4ryVYKk9SKA62Cz7pO3VUaD8Yxx9Ff2Os9ez6TdfBmqg=="
}
```

Upon running this command with valid credentials, we receive a Json-formatted response containing a key/value pair for `'token'`, which will look like the example (Json Response) on the right side

This token is a required parameter for making the authorize API request
<br><small>(Copy the value of the token in order to have it on hand when creating the authorize API request)</small>

<br><br><br><br><br><br><br>

---

### Authorization

> Authorize Request

```shell
curl -D - -X POST https://login.eagleeyenetworks.com/g/aaa/authorize -d "token=[TOKEN]"
```

We can make the authorization API request using the example cURL command

The output are headers of the API request followed by the response body. The `-D` flag is used to write the protocol headers. Here is the description from the man pages:

Argument | Description
-------- | -----------
**-D**, –dump-header <file> | Write the protocol headers to the specified file. This option is handy to use when you want to store the headers that a HTTP site sends to you. Cookies from the headers could then be read in a second cURL invocation by using the -b, –cookie option! The -c, –cookie-jar option is however a better way to store cookies

---

> Get List of Devices Request (Authorized)

```shell
curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/g/device/list -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

Note that `'-'` after the `-D` indicates that the output *file* is stdout. One of the header elements will be `'Set-Cookie: auth_key=[AUTH_KEY]'`. Copy `'auth_key=[AUTH_KEY]'` into the clipboard as this cookie will need to be set for all other API requests. The cURL request for getting a list of devices will look like in the example to the right

<aside class="notice">The 'auth_key' cookie will need to be set for any other Eagle Eye API that requires a valid session</aside>

<!--===================================================================-->
## Constructing Layouts
<!--===================================================================-->

> Get List of Layouts (Request)

```shell
curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/g/layout/list -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

> Get List of Layouts (Json Response)

```json
[
    [
        "fc7fa3a4-66ea-11e3-8ca8-523445989f37",
        "Default",
        [
            "iphone"
        ],
        "SWRD"
    ],
    [
        "14fbd682-66eb-11e3-8ca8-523445989f37",
        "Ekta 2",
        [
            "iphone"
        ],
        "SWRD"
    ],
    [
        "23535930-66eb-11e3-977b-ca8312ea370c",
        "Ekta 3",
        [
            "desktop"
        ],
        "SWRD"
    ],
    [...]
]
```

### HTTP Request

`GET /layout/list`
<br>`GET /layout`

When a user logs onto the Eagle Eye system, they are greeted with a grid of cameras, with each cell representing a camera pane. These panes can be of varying size so that the user can customize the layout to their liking. In this tutorial, we will demonstrate how to use the APIs to build these layouts so they are consistent on all platforms

While logged in, we make a request to the GET /layout/list API. This returns an array of Layout objects. Do note that this is not the same model as what is returned by the GET /layout API request. The one returned by the /layout/list API is an abridged version with only the most important attributes. The response of the request will look like this

We take the layout ID attribute for each layout of interest and pass it to the GET /layout API request. This will contain the information we need to construct the layout

> Get Layout (Request)

```shell
curl -X GET https://[active_brand_subdomain].eagleeyenetworks.com/g/layout -d "id=[LAYOUT_ID]" -G -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]"
```

> _For information on **active_brand_subdomain** click [here](#active-brand-subdomain-explanation)._

> Get Layout (Json Response)

```json
{
    "id": "811dbe48-66eb-11e3-8ca8-523445989f37",
    "shares": [
        [
            "ca0c35cb",
            "SWRD"
        ]
    ],
    "name": "mob dev 1",
    "permissions": "SWRD",
    "current_recording_key": null,
    "types": [
        "desktop"
    ],
    "configuration": {
        "settings": {
            "camera_row_limit": 3,
            "automatic_rotation": false,
            "camera_name": false,
            "camera_border": "false",
            "camera_aspect_ratio": "0.75"
        },
        "panes": [
            {
                "type": "preview",
                "pane_id": 0,
                "name": "Conference Room",
                "cameras": [
                    "100f6136"
                ],
                "size": 2
            },
            {
                "type": "preview",
                "pane_id": 1,
                "name": "NW Parking",
                "cameras": [
                    "10003254"
                ],
                "size": 2
            }
        ]
    }
}
```

We get a wealth of good information, but the information specific to setting up the pane layout is in the `'configuration'` Json. Within that Json is an attribute called `'panes'`, which is an array of individual pane objects. Each pane specifies the \<camera_id\> and the size of the pane. The size represents the width and height in number of cells. A size of 2 means that the pane is 2 cells in width and height, so it occupies a total of 4 cells. A size of 3 would occupy 9 cells

The other important factor to know is the size of grid holding the panes, specifically the number of columns. For the Eagle Eye web client a browser can be resized to be a narrow strip or the full width of the screen. The layout will dynamically adjust the number of columns based on the width of the window. Mobile devices have fixed screen sizes, so for the iOS and Android smartphone clients the number of columns is set to three

Now that we have the order of panes, the size of each pane and the size of the grid, we can construct our layout. This proved to be of varying difficulty depending on the platform. The web client uses a robust packing library [Packery](http://metafizzy.co/blog/packery-released), which is based on a bin packing algorithm. This library minimizes empty space while preserving the order as best as possible. Using Packery reduced the development time for this feature significantly

At this time Android does not have a robust library for packing the panes so the algorithm to do so was written from scratch. The goal was to mimic the Packery library as best as possible. The Android algorithm works as such:

  1. Remove the next image from the `'panes'` array and place it in the `'panes_for_analysis'` list
  2. Analyze the panes in `'panes_for_analysis'`. If there is a fully packed block, remove those panes and add them to the layout
  3. If the `'panes'` array is not empty, GOTO 1, else GOTO 4
  4. Add the remaining panes from `'panes_for_analysis'` to the layout

This is the algorithm at a high level, though the specifics can get a little more complex, such as determining whether a fully packed block exists. The state of a fully packed block is also dependent on the number of columns for the grid

The ease of constructing layouts is highly dependent on the robustness of the 3rd party library. In the case that one does not exist, we fall back to our home-grown packing algorithm

<!--===================================================================-->
## Playing Live Video
<!--===================================================================-->

Please see <a href="https://www.eagleeyenetworks.com/authentication-live-camera-preview-stream/" target="\_blank">this article</a> for a detailed version with reference material or continue in this section

Video playback functionality can be accessed through the `'/asset/play/video.flv'` API. We will show you how to use this API to play live video, though the same API can also be used to play historic video

Below is the Javascript code that creates the URL for playing live video footage with a HTML flash video player. You can run the javascript code on [this site](https://js.do) to generate the URL string

The caller of the API need to supply 2 parameters. which are [DEVICE_ID] and [AUTH_KEY]. The [DEVICE_ID] represents the ID of the camera of interest. The [AUTH_KEY] is used for authentication and can be found in the response header of the `'/aaa/authorization'` API

`
eagleEyeLiveVideoApiUrl = "https://[active_brand_subdomain].eagleeyenetworks.com/asset/play/video.flv" +
    "?id=[DEVICE_ID]" +
    "&start_timestamp=stream_"+(new Date().getTime()) +
    "&end_timestamp=+300000" +
    "&A=[AUTH_KEY]";
`

<!--===================================================================-->
## Long Polling
<!--===================================================================-->

> Json Request for POST /poll

```json
{
     "cameras": {
         "100c30ea": {
             "resource": [
                 "event",
                 "pre",
                 "thumb",
                 "status"
             ],
             "event": [
                 "ECON",
                 "ECOF",
                 "AELI",
                 "AELO",
                 "EMES",
                 "EMEE",
                 "CECF",
                 "CSAT",
                 "CSDT",
                 "CONN",
                 "COFF",
                 "ESES",
                 "ESEE"
             ]
         },
         "100f6136": {
             "resource": [
                 "event",
                 "pre",
                 "thumb",
                 "status"
             ],
             "event": [
                 "ECON",
                 "ECOF",
                 "AELI",
                 "AELO",
             ]
         },
         "1009c1ab": {
             "resource": [
                 "event",
                 "pre",
                 "thumb",
                 "status"
             ],
             "event": [
                 "EMES",
                 "EMEE",
                 "CECF",
                 "CSAT",
                 "CSDT",
                 "CONN",
                 "COFF",
                 "ESES",
                 "ESEE"
             ]
         }
     }
}
```

Upon entering the Eagle Eye system, the user is presented with a grid of cameras. These cameras are retrieving images in real time through a poll stream. In this tutorial we will walk you through the steps to set up the poll stream for long polling using the /poll API

Long polling is used in the mobile clients. The process is to first register to the poll stream using the POST /poll API followed by constant API requests for GET /poll

The POST /poll API is used to initialize the poll stream and to register the events we want to listen for. For the mobile clients, we are listening to resource type `'pre'` and `'status'`, which are the preview images and status bits. Since the data we are sending to the server is a Json, the content-type of this request will be `'application/json'`

> Response for GET /poll

```json
{
    "cameras": {
        "10003254": {
            "event": {
                "PRFR": {
                    "cameraid": "10003254",
                    "timestamp": "20180528224954.312",
                    "file_offset": 17804500,
                    "frame_size": 6152,
                    "previewid": 1401314400
                }
            }
        },
        "100a9541": {
            "event": {
                "PRFR": {
                    "cameraid": "100a9541",
                    "timestamp": "20180528224955.507",
                    "file_offset": 12004385,
                    "frame_size": 3706,
                    "previewid": 1401314400
                }
            },
            "pre": "20180528224955.507"
        }
    }
}
```

Once the POST /poll request has been made successfully, a token is returned to the user. This token can be used to successfully make all subsequent GET /poll requests. If the token is not desired, the same requests can be made with the `'ee-poll-ses'` cookie from the POST /poll request

The GET /poll request should be called frequently so that new data can arrive as soon as possible. The response may be empty or it may look something like the example to the right

Only attributes with updated information will be returned in the response payload. For the mobile apps, we monitor the `'pre'` attribute for new timestamps and when a new timestamp does come in, we make the appropriate API call to retrieve the camera image

The power of this API lies in the ability of being able to control what events and resource types to listen to. This allows updates to the camera to be known in real time
