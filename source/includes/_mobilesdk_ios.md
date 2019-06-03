# EENSDK-iOS


<!--===================================================================-->
## Installation
<!--===================================================================-->


  1. Add EENSDK-iOS.framework file to your project.
  2. Add EENSDK-iOS.framework to Embedded Binaries section of your target's General tab.
  3. If you are using Swift, add `import EENSDK_IOS` to the file you want to import it from
  4. If you are using Objective-C, add `#import <EENSDK_IOS/EENSDK_IOS.h>` to the file file you want to import it from


<aside class="notice">
<p>  
Apple does not accept applications submitted with FAT frameworks (those include 4 slices: i386, x86_64, armv7, arm64 and can be run on both Simulator and real device) because framework size is twice larger but it's useless - you can't install app from AppStore to Simulator.
</p>

<p>
That's why we will provide you two versions of framework: one for testing on Simulator/device (with i386 x86_64 armv7 arm64 slices) and another for release (with armv7, arm64 slices).
</p>

<p>
Demo app is using FAT framework and doesn't include shell script to copy right version of framework depending on build configuration: FAT for Debug, AdHoc and Device-only for Release - you should add such scripts by yourself (or just replace FAT framework with Device-only version manually before submitting to AppStore). You can easily distinguish them by comparing sizes - FAT framework would be roughly twice larger.
</p>
</aside>



<!--===================================================================-->
## Downloads
<!--===================================================================-->

Please download the latest version to make sure you have the latest features and bug fixes.


Version | Download | Description 
------- | -------- | -----------
2.0.0   | [release-iphoneos-v200.zip](/images/iOS/release-iphoneos-v200.zip) | Release version, built with Xcode 10.2.1 (10E1001)
2.0.0   | [debug-iphoneuniversal-v1200.zip](/images/iOS/debug-iphoneuniversal-v200.zip) | Debug version, built with Xcode 10.2.1 (10E1001)
2.0.0   | [sample-app-v200.zip](/images/iOS/sample-app-v200.zip) | Demo application, built with Xcode 10.2.1 (10E1001) and EENSDK-iOS v2.0.0



<!--===================================================================-->
## Usage Examples
<!--===================================================================-->

We have included example in both Swift and Objective-C.  We will continue to provide more examples and updates.

> Swift Example

```shell
// init media player
let mediaPlayer = EENMediaPlayer()
 
// set media player delegate
mediaPlayer.delegate = self
 
// add media player to a view
mediaPlayer.frame = view.frame
view.addSubview(mediaPlayer)
  
// init builder for live item
let builder = EENMediaItemBuilder.init(forLiveItem: cameraId, baseUrl: baseUrl)
 
// init builder for historical item
let builder = EENMediaItemBuilder.init(forHistoricalItem: cameraId, baseUrl: baseUrl, start: startDate, end: endDate)
 
// set api key for the builder
builder.setApiKey(apiKey)
 
// set time zone for the builder
builder.setTimeZone(timeZone)
 
// create  media item
let mediaItem = builder.build()
 
// start media player
mediaPlayer.start(with: mediaItem)
 
// show control bar
mediaPlayer.showControlBar()
 
// dispose of media player
mediaPlayer.removeFromSuperview()
mediaPlayer = nil
```




> Objective-C Example

```shell
// init media player
EENMediaPlayer *mediaPlayer = [[EENMediaPlayer alloc] init];
 
// set media player delegate
mediaPlayer.delegate = self;
 
// add media player to a view
mediaPlayer.frame = view.frame;
[view addSubview:mediaPlayer];
  
// init builder for live item
EENMediaItemBuilder *builder = [EENMediaItemBuilder builderForLiveItem:cameraId baseUrl:baseUrl];
 
// init builder for historical item
EENMediaItemBuilder *builder = [EENMediaItemBuilder builderForHistoricalItem:cameraId baseUrl:baseUrl startDate:startDate endDate:endDate];
 
// set api key for the builder
[builder setApiKey:apiKey];
 
// set time zone for the builder
[builder setTimeZone:timezone];
 
// create  media item
EENMediaItem *mediaItem = [builder build];
 
// start media player
[mediaPlayer startWithMediaItem:mediaItem];
 
// show control bar
[mediaPlayer showControlBar];
 
// dispose of media player
[mediaPlayer removeFromSuperview];
mediaPlayer = nil;
```

