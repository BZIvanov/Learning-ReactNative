import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

export default function App() {
  return (
    // SafeAreaView for ios will make sure our component will not overlap with the status bar
    <SafeAreaView style={styles.root}>
      <Text>My awesome app</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    // for android this is how we get the height of the status bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
