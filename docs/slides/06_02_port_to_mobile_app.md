# Porting to Mobile Apps with Capacitor

## Main Ideas to Convey

- Introduce Capacitor as a framework for porting responsive React web apps to native mobile apps (iOS, Android).
- Highlight Capacitor's approach: cross-platform native runtime, web-focused APIs, access to native device features.
- Outline the Capacitor workflow: Build web code, Sync web code to Capacitor project (`npx cap sync`), Test on device (`npx cap run ios/android`), Compile native binary (via IDE or `npx cap build android/ios`).

## Visual Ideas

- **Logo:** Capacitor logo.
- **Flowchart (Capacitor Workflow):**
    1.  React Web App (Code)
    2.  `npm run build` -> Web Assets (dist folder)
    3.  `npx cap sync` -> Copies assets to Native Projects (iOS/Android folders)
    4.  `npx cap run ios/android` OR Open IDE (Xcode/Android Studio) -> App on Device/Emulator.
    5.  (Optional) `npx cap build android/ios` -> Native Binary (APK/AAB/IPA).
- **Device Mockups:** Show a responsive web app design seamlessly appearing on iOS and Android device mockups.

## Content

For responsive React app, it can be port to Mobile app through third party framework like Capacitor. Capacitor is a cross-platform native runtime that makes it easy to build performant mobile applications that run natively on iOS, Android, and more using modern web tooling. Capacitor provides a consistent, web-focused set of APIs that enable an app to stay as close to web standards as possible, while accessing rich native device features on platforms that support them with native functionality.

Capacitor workflow:

1.  **Building your web code**: Once you are ready to test your web app on a mobile device, you\'ll need to build your web app for distribution. If you are using a tool like Create React App or Vite that command will be `npm run build`.

2.  **Syncing web code to your Capacitor project**: Once your web code has been built for distribution, you will need to push your web code to the web native Capacitor application. To do this, you can use the capacitor to "sync" your web code and install/update the required native dependencies.
    
    To sync your project, run:
    
    ```bash
    npx cap sync
    ```
    
    Running `npx cap sync` will copy over your already built web bundle to both your Android and iOS projects as well as update the native dependencies that Capacitor uses.

3.  **Testing your Capacitor app**[​](https://capacitorjs.com/docs/basics/workflow#testing-your-capacitor-app): Once you\'ve synced over your web bundle to your native project, it is time to test your application on a mobile device. There are a few different ways to do this, but the easiest way is to use the built in Capacitor CLI commands.
    
    To run a debug build of your Capacitor app on an iOS device, you can run:
    
    ```bash
    npx cap run ios
    ```
    
    Similarly, to run a debug build of your Capacitor app on an Android device, you can run:
    
    ```bash
    npx cap run android
    ```

4.  **Compiling your native binary**:
    
    After `sync`, you are encouraged to open your target platform\'s IDE: Xcode for iOS or Android Studio for Android, for compiling your native app.
    
    Alternatively, to compile your app in a terminal or in CI environments, you can use the build command to build the native project, outputting a signed AAB, APK or IPA file ready for distribution to a device or end users.
    
    ```bash
    npx cap build android
    # or npx cap build ios (requires macOS environment and Xcode tools)
    ``` 

## Presentation Status: Ready for Review 