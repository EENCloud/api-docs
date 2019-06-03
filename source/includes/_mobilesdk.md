# EENSDK


<!--===================================================================-->
## Overview
<!--===================================================================-->
In order to get our technology partners up to speed quickly, we provide SDKs for integrations with iOS and Android.  These are intended to be included in your own mobile apps.  Please see the sections below for specifics on each platform.



<!--===================================================================-->
## Public Interface
<!--===================================================================-->

###class EENMediaPlayer

`startWithMediaItem(EENMediaItem item);`
Starts stream with provided media item.

`showControlBar();`
Shows control bar.

`hideControlBar();`
Hides control bar.

`play();`

Resumes the stream that is in paused state. The playback state will be changed to either buffering or playing

`pause();`

Pauses the stream that is in playing state. The playback state will be changed to paused

`destroy();`

Disposes the resources that were used for streaming video. Player state changes to unknown, playback state changes to paused

`weak EENMediaPlayerDelegate delegate;`
Indicates object which will receive and process callbacks.

`readonly EENMediaItem currentItem;`
Indicates currently played item.

`readonly EENSDKError failureReason;`
If status is failed, this property Indicates the error that caused the failure. 

`readonly EENMediaMetadata metadata;`
If status is readyToPlay, this property Indicates loaded metadata for current media item.

`readonly EENMediaPlayerStatus status;`
Indicates current status of media player.

`readonly EENMediaPlayerPlaybackState playbackState;`
Indicates current playback state of media item.

###protocol EENMediaPlayerDelegate

`onStatusChanged(EENMediaPlayer mediaPlayer, EENMediaPlayerStatus newStatus)`
Will be called on status change

`onPlaybackStateChanged(EENMediaPlayer mediaPlayer, EENMediaPlayerPlaybackState newPlaybackState)`
Will be called on playback state change.

`donePressed(EENMediaPlayer mediaPlayer)`
Will be called when done button was pressed.

###enum EENMediaPlayerPlaybackState
`case paused;`
This state is entered when user pressed pause button.

In this state, playback is paused indefinitely and will not resume until user presses play button.

`case buffering;`
This state is entered when when sufficient media data has been buffered for playback to proceed.

`case playing;`
In this state, playback is currently progressing. Should playback stall because of insufficient media data, playbackState will change to buffering.

###enum EENMediaPlayerStatus
`case unknown;`
Indicates that the status of the player is not yet known because it has not tried to load or currently loading media resources for playback.

`case readyToPlay;`
Indicates that the player is ready to play MediaItem instance. Loaded data is described by the fields of the metadata property.

`case failed;`
Indicates that the player can no longer play MediaItem instance because of an error. The error is described by the value of the failureReason property.

###class EENMediaItem
`readonly String cameraId;`
Represents the camera ID.

`readonly String baseUrl;`
Represents the base URL of the video stream.

`readonly String apiKey;`
Represents the API key of the authorized user.

`readonly String title;`
Represents the title being shown in navigation bar.

`readonly Date startDate;`
Represents the start date of the stream in Greenwich time (GMT+0). Will be nil for the item representing live stream.

`readonly Date endDate;`
Represents the end date of the stream in Greenwich time (GMT+0). Will be nil for the item representing live stream.

`readonly String dateFormat;`
Represents the date format of the current playback time being shown in navigation bar.

`readonly TimeZone timeZone;`
Represents the time zone of the current playback time being shown in navigation bar.

###class EENMediaItemBuilder
`static EENMediaItemBuilder builderForLiveItem(String cameraId, String baseUrl);`
Creates a builder instance for the live item.

`static EENMediaItemBuilder builderForHistoricalItem(String cameraId, String baseUrl, Date startDate, Date endDate);`
Creates a builder instance for the historical item.

`EENMediaItemBuilder setApiKey(String apiKey);`
Configures the builder with a provided API key. Will override previously set value.

<aside class="notice">
  <p>Mandatory property. Providing an empty/invalid value will move EENMediaPlayerStatus into failed state. You can check EENMediaPlayer's failureReason property to analyze the cause.</p>
</aside>

`EENMediaItemBuilder setTitle(String title);`
Configures the builder with a provided title to be shown in navigation bar. Will override previously set value.

`EENMediaItemBuilder setDateFormat(String dateFormat);`
Configures the builder with a provided date format. Will override previously set value.

`EENMediaItemBuilder setTimeZone(TimeZone timeZone);`
Configures the builder with a provided time zone. Will override previously set value.

`EENMediaItem build();`
Builds EENMediaItem instance.

###class EENMediaMetadata
`readonly Data header;`
Represents the header of the media item.

`readonly Date startDate;`
Represents the start date of the media item.

`readonly Double duration;`
Represents the duration of the media item.

###class EENSDKError
`readonly EENSDKErrorCode code;`
Represents the code of the error.

`readonly String generalReason;`
Represents the general description of the error.

`readonly String detailedReason;`
Represents the detailed description of the error.

###enum EENSDKErrorCode
`case internalError = 1;`
General error occurred.

`case authenticationError = 2;`
You are not authenticated to perform an action.



<!--===================================================================-->
## Class Diagrams
<!--===================================================================-->

![Class Relationship](MobileSDK/ClassRelationUML.png "Class Relationship")



