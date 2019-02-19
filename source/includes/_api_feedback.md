# Feedback

<!--===================================================================-->
## Overview
<!--===================================================================-->

This service allows users to send Feedback to support

<!--===================================================================-->
## Send Feedback
<!--===================================================================-->

Send feedback to support

> Request

```shell
curl -X POST https://login.eagleeyenetworks.com/g/feedback -d "subject=[SUBJECT]" -d "message=[MESSAGE]" -H "Authentication: [API_KEY]" --cookie "auth_key=[AUTH_KEY]" -v
```

### HTTP Request

`POST https://login.eagleeyenetworks.com/g/feedback`

Parameter   | Data Type | Description | Is Required
---------   | --------- | ----------- | -----------
**subject** | string    | Subject of the feedback | true
**message** | string    | Feedback message content | true

### HTTP Status Codes

HTTP Status Code | Description
---------------- | -----------
202 | Request succeeded
400	| Unexpected or non-identifiable arguments are supplied
401	| Unauthorized due to invalid session cookie
403	| Forbidden due to the user missing the necessary privileges

