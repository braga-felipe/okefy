import { StyleSheet, Text, View ,Button, Pressable} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

//SLIDER COMPONENTS
import SliderPopular from '../components/sliders/SliderPopular';
import SliderEnergy from '../components/sliders/SliderEnergy';
import SliderDance from '../components/sliders/SliderDance';
import SliderInstrument from '../components/sliders/SliderInstrument';
import { SliderProvider } from '../context/sliderContext';

const SliderScreen = ({ navigation }) => {
  const playListReady = () => {
    navigation.navigate('PlaylistScreen');
  };

  return (
    <View style={styles.container}>
    <View style={styles.sliders}>
      <SliderProvider>
        <SliderPopular />
        <SliderEnergy />
        <SliderDance />
        <SliderInstrument />
      </SliderProvider>
    </View>
    
    <Pressable onPress={()=>playListReady()} style={styles.arrow}>
    <AntDesign name="arrowright" size={24} color="black" />
    </Pressable>


    </View>
  );
};

export default SliderScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  sliders:{
    // height:'80%'
  },
  arrow:{
    // bottom:60,

    // height:'20%'

  }
});
