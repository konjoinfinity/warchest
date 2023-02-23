import { StyleSheet, Dimensions, ScrollView, Image, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from './components/Themed';


export default function SetupScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
