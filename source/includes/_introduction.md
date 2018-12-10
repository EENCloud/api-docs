# Introduction

<!--===================================================================-->
## Overview
<!--===================================================================-->

The Eagle Eye Video API is a comprehensive RESTful API for recording, indexing and storing camera video. The Eagle Eye Video API handles all the *heavy lifting* of interfacing with the cameras, recording video, securely transmitting video to the cloud, storing video and making video available for use for your applications. All of the Eagle Eye Security Camera VMS user interfaces (web, iOS, Android) have been built using this API

We provide language bindings in cURL. You can view code examples on the right-hand side *window* and you can switch the programming language of the examples with the tabs in the top right (when available)

<!--===================================================================-->
## Getting Started
<!--===================================================================-->

The Eagle Eye Video API allows you to securely record, manage and play video back from any camera, any place, any time. A robust annotation interface and smart bandwidth management allows you to turn terabytes of raw video into searchable, useful data

Since the API is based on REST principles, it’s very easy to write and test applications. You can use your browser to access URLs and you can use many different HTTP clients in nearly any programming language

### Requirements

  - TLS 1.2 or greater

<!--===================================================================-->
## Get an API Key
<!--===================================================================-->

### Create a Developer Account

> Request

```shell
curl -X PUT https://login.eagleeyenetworks.com/g/user -d '{"first_name": "[FIRST_NAME]", "last_name": "[LAST_NAME]", "email": "[EMAIL]"}' -H "Authentication: [API_KEY]:" -H "content-type: application/json" --cookie "auth_key=[AUTH_KEY]" -v
```

> Json Response

```json
{
    "id": "ca0ffa8c"
}
```

<aside><form action="https://login.eagleeyenetworks.com/api_signup.html"><button>&#9654; Create Developer Account</button></form></aside>

To get started with the Eagle Eye Video API you will need an *API Key*. This is used to identify you and your application. It also makes everything secure. To get an *API Key* you will need an account (so that you have some place to do some testing). You can either use your existing account or create a *Developer Account*. You can create an *API Key* in your existing account under the *Account Settings*

You will have to verify your email address to create your *Developer Account*. You will also get an email with a shortcut to create the *API Key*. Click on the shortcut link to create your *API Key* and get started writing some code

You may also want to purchase a development hardware kit from us (so you can connect some devices). These are available at a large discount for developers. You can get an Eagle Eye <a class="definition" onclick="openModal('DOT-Bridge')">Bridge</a> and even some <a class="definition" onclick="openModal('DOT-Camera')">Cameras</a> from us for development and testing. Just email us for more information and pricing

<!-- TODO: Maybe provide a contact email address for the sales department -->

The *API Key* should be located in the header under the `'Authorization'` key with a colon appended to it

<aside class="notice">User password authentication is still required</aside>

Please see the section on [Single Sign On](#single-sign-on) for alternatives to password authentication

### Visual Steps

![visual step 1](introduction/apikey_1.png "Step 1")
![visual step 2](introduction/apikey_2.png "Step 2")
![visual step 3](introduction/apikey_3.png "Step 3")
![visual step 4](introduction/apikey_4.png "Step 4")
![visual step 5](introduction/apikey_5.png "Step 5")

<!--===================================================================-->
## Content Features
<!--===================================================================-->

### Fully control the information flow:

### Content

Press <key>F8</key> to enable / disable <a class="definition" onclick="openModal('DOT-Hover-Modals')">Hover Modals</a><br>
<small>(onclick behavior will remain)</small><br><br>

To close the Modal definition:

  - Click outside of the Modal area
  - Press the close (**&times;**) button
  - Press <key>Esc</key>

### Appearance

Press <a class="definition" onclick="customModal(colorTitle, colorMsg)"><key>Alt</key> + <key>C</key></a> to change the Modal color<br>
<small>(the color will not be changed now)</small><br><br>

Press <key>F9</key> to enable / disable an additional feature
