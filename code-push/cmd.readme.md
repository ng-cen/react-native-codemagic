doc:
https://www.npmjs.com/package/code-push-standalone

## login
code-push-standalone login "https://codepush.pro" --key push-token-key

## add app

"TestApp-iOS" 
┌────────────┬──────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                       │
├────────────┼──────────────────────────────────────────────────────┤
│ Production │ 7IHviOETvsmPHkWIZyFYmo1ICUms681b177d11ffadd7bf9a2c17 │
├────────────┼──────────────────────────────────────────────────────┤
│ Staging    │ aH8e3hqM5__-m0kTvVgRCSqpilAg681b177d11ffadd7bf9a2c17 │
└────────────┴──────────────────────────────────────────────────────┘

TestApp-Android
Name       	│ Deployment Key  
Production 	│ 2lBcDUSk64r1uTgILZOnp5zE-4NL681b177d11ffadd7bf9a2c17 
Staging    	│ _zjDgckWIEL43ygp4-j3Ou_0s-al681b177d11ffadd7bf9a2c17

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

## codePushStatusChange
/**
 * e2e codePushStatusChange for an code-push.
 * 5, 'CHECKING_FOR_UPDATE'
 * 6, 'AWAITING_USER_ACTION': await to click "continue" button in the dialog
 * 7, 'DOWNLOADING_PACKAGE'
 * 8, 'INSTALLING_UPDATE'
 * 1, 'UPDATE_INSTALLED'
 */