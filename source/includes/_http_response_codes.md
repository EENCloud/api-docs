# HTTP Response Codes

<!--===================================================================-->
## Overview
<!--===================================================================-->

We use the established HTTP status codes.  This is the general description for all the codes we return.  Each API call defines any additional meaning intended with the return codes it uses.

HTTP Status Code | Description
---------------- | -----------
200 | The request was fulfilled successfully
201 | The request has been created and a webhook will be triggered upon completion or error
202 | The request has been accepted for processing, but the processing has not been completed
204 | User has been logged out


HTTP Status Code | Description
---------------- | -----------
301 | Item has been moved, please follow redirect


HTTP Status Code | Description
---------------- | -----------
400	| The request had bad syntax or was inherently impossible to be satisfied
401	| Supplied credentials are not valid / invalid session cookie
402	| Account is suspended
403	| Forbidden due to the user missing the necessary privileges
404	| Element not found (section specific)
405	| Unexpected method used for the HTTP request
406	| Realm is invalid due to not being a root realm
409	| Email address has already been registered for the specified realm
410	| Communication cannot be made to attach the camera to the bridge
412	| User is disabled
415	| Device associated with the given GUID is unsupported
429 | Too many requests.  Client has exceeded the maximum requests per second, please slow down.
460	| Account is inactive
461	| Account is pending
462	| User is pending
463	| Unable to communicate with the camera or bridge, contact support


HTTP Status Code | Description
---------------- | -----------
500 | Internal Error.  Please contact our support department.
502 | Bad Gateway.  We were unable to return the requested data.  Please try again.
503 | Internal Camera Tag Maps Error.  Please contact our support department.
504 | Gateway Timeout.  We were unable to return the requested data inside our time limit.  Please try again.

