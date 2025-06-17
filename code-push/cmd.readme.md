doc:
https://www.npmjs.com/package/code-push-standalone

## login
code-push-standalone login "https://codepush.pro" --key push-token-key

## add app

code-push-standalone app add TestApp-Android
code-push-standalone app add TestApp-iOS

will auto create an app with two deployment: Staging & Production

TestApp-Android
Name       │ Deployment Key  
Production │ fake-prod-key
Staging    │ fake-staging-key

## bundle:

### Note: android bundle name default should be: index.android.bundle
react-native bundle \
--platform android \
--entry-file index.js \
--bundle-output ./codepush_bundle/android/index.android.bundle \
--assets-dest ./codepush_bundle/android/ \
--dev false

react-native bundle --platform android --entry-file index.js --dev false --bundle-output ./codepush_bundle/android/index.android.bundle --assets-dest ./codepush_bundle/android/

error: SHA-1 for file /Users/cen/.config/yarn/global/node_modules/metro-runtime/src/polyfills/require.js
fix: yarn global add react-native-cli && react-native --version

## release new update

==== Staging
yarn code-push-standalone release \
TestApp-Android \
./codepush_bundle/android \
1.0.0 \
--deploymentName Staging \
--description "Test label update" \
--mandatory true

==== Production
yarn code-push-standalone release \
TestApp-Android \
./codepush_bundle/android \
1.0.0 \
--deploymentName Production \
--description "Fixed critical login bug" \
--mandatory true

## check existing release
==== Staging
yarn code-push-standalone deployment history TestApp-Android Staging
==== Production
yarn code-push-standalone deployment history TestApp-Android Production