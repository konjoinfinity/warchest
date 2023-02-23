import { Alert, StyleSheet, Dimensions, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from './components/Themed';
import { Input, Button } from '@ui-kitten/components';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

export default function TabTwoScreen({route, navigation}) {
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [btc, setBtc] = useState(0.00)
  const [usd, setUsd] = useState(0.00)
  const [price, setPrice] = useState(0);

  useEffect(() => {
		fetchData()
    if (route.params?.address) {
      console.log(route.params.address)
      let address = route.params.address.replace('bitcoin:', '')
      console.log(address)
      setTo(address)
    }
    if (route.params?.from) {
      console.log(route.params.from)
      setFrom(route.params.from)
    }
	}, [route.params?.address]);

  const fetchData = async () => {
    const resp = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const data = await resp.json();
    console.log(data.bpi.USD.rate);
    setPrice(parseFloat(data.bpi.USD.rate.replace(/,/g, '')).toFixed(2));
  };

  function send(){
    Alert.alert('sent!')
  }

  function calcBtc(val){
    console.log(val)
    setBtc(val)
    console.log((val*price).toFixed(6))
    setUsd((val*price).toFixed(2))
  }

  function calcUsd(val){
    setUsd(val)
    console.log((val/price).toFixed(6))
    setBtc((val/price).toFixed(6))
  }

  return (
    <View style={styles.container}>
     <Text style={styles.title}>Contribute</Text>

     <View style={styles.view}>
      {to == '' ? <Pressable onPress={()=> navigation.navigate('Modal')}><MaterialCommunityIcons color='#fff' size={25} name='qrcode-scan'/></Pressable>:
      <MaterialIcons color='#fff' size={25} name='send'/>}
     <Input
        style={styles.input}
        size='large'
        placeholder='bc1...'
        value={to}
        onChangeText={nextValue => setTo(nextValue)}
      />
      </View>
      <View style={styles.view}>
      <MaterialIcons style={{transform:([{rotate: '180deg'}])}} color='#fff' size={25} name='send'/>
       <Input
        style={styles.input}
        size='large'
        placeholder='Your Bitcoin Address'
        value={from}
        onChangeText={nextValue => setFrom(nextValue)}
      />
      </View>
      <View style={styles.view}>
      <FontAwesome color='#fff' size={25} name='bitcoin' style={{margin: 4}}/>
       <Input
        style={styles.input}
        size='large'
        placeholder='Amount in BTC'
        value={btc}
        keyboardType='decimal-pad'
        onChangeText={nextValue => calcBtc(nextValue)}
      />
      </View>
      <View style={styles.view}>
      <FontAwesome color='#fff' size={25} name='dollar' style={{margin: 5}}/>
       <Input
        style={styles.input}
        size='large'
        placeholder='Amount in USD'
        value={usd}
        keyboardType='decimal-pad'
        onChangeText={nextValue => calcUsd(nextValue)}
      />
      </View>
      <View style={styles.view}> 
      <Button style={[styles.button, {margin: 10}]} status='primary' size='giant' onPress={()=>navigation.navigate('Modal')}>
      Scan
    </Button>
      <Button style={styles.button} status='primary' size='giant' onPress={()=>send()}>
      Send
    </Button>
    </View>
  {price !== 0 && <Text>Price of Bitcoin: ${price}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    margin: Dimensions.get('screen').width*0.05
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input:{
    paddingBottom: 5,
    width: Dimensions.get('screen').width*0.85,
    marginLeft: 10
  },
  view:{
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
