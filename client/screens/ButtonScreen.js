import React from 'react';
import { Button, Text, View, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

//COMPONENTS
import ButtonContainer from '../components/ButtonContainer';
import { usePlaylistContext } from '../context/playlistContext';
import { usePlayListSeedContext } from '../context/playlistSeedContext';

export default function ButtonScreen({ navigation }) {
  const playlistSeedContext = usePlayListSeedContext();
  const playlistContext = usePlaylistContext();

  // const getSeeds = ()=>{
  //   playlistSeedContext.tracks.map((item)=>{

  //   })
  // }

  const categoriesReady = () => {
    ///CALLING A FUNC TO GET NAMES AND SET SEEDS
    console.log('in button screen PlaylistContext', playlistContext.Playlist);
    navigation.navigate('SliderScreen');
  };

  return (
    <>
      <View style={styles.container}>
        <Text>add up to 5</Text>
        <>
        <ButtonContainer />
        <Pressable onPress={() => categoriesReady()}>
          <AntDesign name="arrowright" size={24} color="black" />
        </Pressable>
        </>
        {/* <Button title="next" onPress={() => categoriesReady()}></Button> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    paddingVertical: 30,

    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
