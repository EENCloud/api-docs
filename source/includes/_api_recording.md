# Recording

<!--===================================================================-->
## Overview

This service is used to retrieve and update recording info for recordings that were started/stopped using the "action/recordnow" and "action/recordoff" services.

<!--===================================================================-->

## Get Recording Object

> Request TODO

```shell
```

> Json Response TODO

```json
```

Returns recording object by recording_key.

### HTTP Request

`GET https://login.eagleeyenetworks.com/g/recording`

Parameter       	| Data Type   	| Description
---------       	| ----------- 	| -----------
**recording_key**   | string      	| Recording Key

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

<!--===================================================================-->
## Update Recording Object

> Request TODO

```shell
```

> Json Response TODO

```json
```

Update a Recording

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/recording`

Parameter       	| Data Type   	| Description
---------       	| ----------- 	| -----------
**recording_key**   | string      	| Unique identifier (within an account) of a recording
meta 				| object 		| Meta data. This is meant to be a generic object that can store any data that is needed, so the properties are not predefined.

### Error Status Codes

HTTP Status Code    | Data Type   
------------------- | ----------- 
200 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges
