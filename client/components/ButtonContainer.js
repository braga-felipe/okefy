import {Text, View, StyleSheet, Pressable  } from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
import ButtonComponent from './ButtonComponent';
import { useAuthContext } from '../context/authContext';
// import { usePlayListSeedContext } from '../context/playlistSeedContext';
import { usePlayListSeedContext } from '../context/playlistSeedContext';

//API
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyApi = new SpotifyWebApi();

const ButtonContainer = () => {
  const playlistSeedContext = usePlayListSeedContext();

  const authContext=useAuthContext();
  // const [listOfGenres, setListOfGenres] = React.useState([]);  // TO GET FROM API
  const [selectedItems, setSelectedItems] = React.useState([]);
  const hardGenres=['indie','hip-hop','rock','pop','mood','alternative','instrumental','classical','techno','punk','reggae','trance']
 // SELECTED BUTTONS HANDLER

  const selectHandler = (item) => {

    if(selectedItems.length<5){
      if(selectedItems.includes(item)){
        let newSelectedItems = selectedItems.filter((i) => i !== item);
        playlistSeedContext.Playlist = [...newSelectedItems]; 
        setSelectedItems(newSelectedItems);

      }else{
        let newSelectedItems = [...selectedItems,item];
        playlistSeedContext.Playlist = [...newSelectedItems]; 
        setSelectedItems(newSelectedItems);
      }

    }else if(selectedItems.length===5){
      if(selectedItems.includes(item)){
        let newSelectedItems = selectedItems.filter((i) => i !== item);
        playlistSeedContext.Playlist = [...newSelectedItems]; 
        setSelectedItems(newSelectedItems);
      }
    }
  };

  const hasBeenSelected = (item) => {
    return selectedItems.includes(item);
  };

 // GET AVAILABLE GENRE SEEDS

  // if (authContext.Token) {
  //   SpotifyApi.setAccessToken(authContext.Token);

  //   React.useEffect(() => {
  //     SpotifyApi.getAvailableGenreSeeds().then(
  //       function (data) {
  //         const genreSeeds = data.body;
  //         setListOfGenres(genreSeeds.genres.slice(0, 15));
  //       },
  //       function (err) {
  //         console.log('Something went wrong!', err);
  //       }
  //     );
  //   }, []);
  // }

  return (
  
      <View style={styles.buttonContainer}>

      {hardGenres.length ? (
        hardGenres.map((seed, key) => {
          return (
            <Pressable key={key} onPress={() => selectHandler(seed)}>
              <TouchableOpacity>
                <View>
                  <ButtonComponent
                    genre={seed}
                    selected={hasBeenSelected(seed)}
                  />
                </View>
              </TouchableOpacity>
            </Pressable>
          );
        })
      ) : (
        <Text>nothing yet</Text>
      )}
     
      
    </View>
  );


};

export default ButtonContainer;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop:200,
    alignItems: 'center',
    justifyContent:'space-evenly',
    flex: 1,
    flexDirection:'row',
    flexWrap:'wrap'

  },
});
