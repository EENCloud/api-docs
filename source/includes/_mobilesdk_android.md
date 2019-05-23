# EENSDK-Android

<!--===================================================================-->
## Import Dependencies
<!--===================================================================-->


> build.gradle

```shell
 dependencies {
    ...
 
    // ExoMedia
    implementation 'com.devbrackets.android:exomedia:4.3.0'
 }
```

The EENSDK-ANDROID is built using ExoMedia framework.  In order to use EENSDK-ANDROID you need to import it.

  1. See example changes to `build.gradle` on the right 



<!--===================================================================-->
## Import EENSDK-Android
<!--===================================================================-->

> build.gradle

```shell

repositories {
    ...
 
    flatDir {
        dirs 'libs'
    }
}
 
dependencies {
    ...
 
    implementation(name:'EENSDK', ext:'aar')
}
```


  1. Add EENSDK.aar file to your project (libs directory).
  2. See additional changes to `build.gradle` on the right




<!--===================================================================-->
## Downloads
<!--===================================================================-->

Please download the latest version to make sure you have the latest features and bug fixes.


Version | Download | Description 
------- | -------- | -----------
1.0.0   | [sdk-v1.0.0.zip](/images/Android/skd-v1.0.0.zip) | Release version, contains AAR file that should be imported
1.0.0   | [Sample-v1.0.0.zip](/images/Android/Sample-v1.0.0.zip) | Demo application



<!--===================================================================-->
## Usage Examples
<!--===================================================================-->

We have included example in Java.  We will continue to provide more examples and updates.


```shell
// init media player
EENMediaPlayer player = new EENMediaPlayer( context );
   
// init builder for live item
EENMediaItemBuilder builder = EENMediaItem.Builder.builderForLiveItem( cameraID,
                                                                       videoUrl );
  
// init builder for historical item
EENMediaItemBuilder builder = EENMediaItem.Builder.builderForHistoricalItem( cameraID,
                                                                             videoUrl,
                                                                             startDate,
                                                                             endDate );
  
// set api key for the builder
builder.setApiKey( apiKey );
 
// set title to show in controls bar
builder.setTitle( title );
  
// set time zone for the builder
builder.setTimeZone( timeZone );
  
// create  media item
EENMediaItem mediaItem = builder.build();
  
// start media player
player.startWithMediaItem( mediaItem );
 
// show controls bar
player.showControlBar();
  
// release resources of media player
player.release();
```



