/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Animated from 'react-native-reanimated';
import codePush, {DownloadProgress} from 'react-native-code-push';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

function App(): JSX.Element {
  const [syncState, setSyncState] = useState('');
  const [appLabel, setAppLabel] = useState('');

  const codePushStatusChange = (syncStatus: codePush.SyncStatus) => {
    console.log('syncStatus=====:', syncStatus, arrSyncStatus[syncStatus]);
    setSyncState(state => {
      return state + arrSyncStatus[syncStatus] + ' | ';
    });
  };
  const codePushDownloadProgress = (progress: DownloadProgress) => {
    console.log('progress=====:', progress);
  };
  const onButtonPress = () => {
    setSyncState('');
    // codePush.restartApp();
    // return;
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusChange,
      codePushDownloadProgress,
    );
  };
  useEffect(() => {
    codePush
      .getUpdateMetadata(codePush.UpdateState.RUNNING)
      .then((metadata: any) => {
        console.log('🚀====== ~ .then ~ metadata:', metadata);
        if (metadata) {
          const label = metadata.label;
          setAppLabel(label);
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={styles.content}>
        <Text style={styles.title}>Code-push Testing</Text>
        {/* <Text style={styles.text}>Press R to crash on reload</Text> */}
        <Text style={styles.text}>Test code push test </Text>
        <Text style={styles.text}>Code-push label: {appLabel}</Text>
        <TouchableOpacity onPress={onButtonPress}>
          <Text style={{padding: 14, fontSize: 20, color: 'red'}}>
            Press to Check for Updates:{syncState}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 30,
  },
  text: {
    paddingVertical: 10,
    fontSize: 20,
  },
});
const MyApp = codePush(codePushOptions)(App);
export default MyApp;

const arrSyncStatus = [
  'UP_TO_DATE',
  'UPDATE_INSTALLED',
  'UPDATE_IGNORED',
  'UNKNOWN_ERROR',
  'SYNC_IN_PROGRESS',
  'CHECKING_FOR_UPDATE',
  'AWAITING_USER_ACTION',
  'DOWNLOADING_PACKAGE',
  'INSTALLING_UPDATE',
];


/**
 * e2e codePushStatusChange for an code-push.
 * 5, 'CHECKING_FOR_UPDATE'
 * 6, 'AWAITING_USER_ACTION': await to click "continue" button in the dialog
 * 7, 'DOWNLOADING_PACKAGE'
 * 8, 'INSTALLING_UPDATE'
 * 1, 'UPDATE_INSTALLED'
 */