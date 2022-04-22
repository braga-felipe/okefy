import {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
//CONTEXT
import { usePlayListSeedContext } from '../context/playlistSeedContext';
import { useAuthContext } from '../context/authContext';
import { useSliderContext } from '../context/sliderContext';
import { usePlaylistContext } from '../context/playlistContext';
import { usePlayListUriContext } from '../context/playlistUriContext';

//COMPONENTS
import SongPlaylistComponent from '../components/SongPlaylistComponent';
import SongModal from '../components/SongModal';
// import {
//   SwipeItem,
//   SwipeButtonsContainer,
//   SwipeProvider,
// } from 'react-native-swipe-item';
// import ModalTest from '../components/';

const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyApi = new SpotifyWebApi();

const PlaylistScreen = ({ navigation }) => {
  const playListSeedContext = usePlayListSeedContext(); //GIVES US ALL TRACKS
  const playlistContext = usePlaylistContext(); // gives us genres
  const playListUriContext = usePlayListUriContext();
  const sliderContext = useSliderContext();

  const authContext = useAuthContext();
  SpotifyApi.setAccessToken(authContext.Token);
  const [playList, setPlayList] = React.useState([]);

  let recommendations = [];
  let recommendationsUri = [];

  (() => {
    console.log(playListSeedContext.Playlist);
  })();

  // GET PLAYLIST FROM API
  React.useEffect(() => {
    SpotifyApi.getRecommendations({
      target_energy: Number(sliderContext.Energy),
      target_danceability: Number(sliderContext.Dance),
      target_popularity: Number(sliderContext.Popular),
      target_instrumentalness: Number(sliderContext.Instrument),
      seed_genres: playListSeedContext.Playlist
        ? playListSeedContext.Playlist.join(',')
        : 'indie',
      limit: 20,
    }).then(
      function (data) {
        recommendations = data.body.tracks;
        setPlayList([...recommendations]);
      },
      function (err) {
        console.log('Something went wrong!', err);
        throw new Error(err.message);
      }
    );
  }, []);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        {playList.map((item, index) => {
          recommendationsUri.push(item.uri);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setModalVisible(true);
                setModalInfo(item);
              }}
            >
              <SongPlaylistComponent item={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <SongModal
        modalInfo={modalInfo}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <View style={styles.btn}>
        <Pressable
          // style={styles.next}
          onPress={() => {
            // sendPlaylist();
            playListUriContext.Uris = [...recommendationsUri];
            // console.log(playlistContext.Playlist);
            navigation.replace('DoneScreen');
          }}

        >
          <AntDesign name="arrowright" size={24} color="black" />
          
        </Pressable>
      </View>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginHorizontal: 20,
    flex: 1,
  },
  btn: {
    // paddingTop:90,
    height: 60,
    paddingTop: 10,
  },
  next: {
    // borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    // margin:5,
    marginBottom: 50,
    elevation: 2,
    backgroundColor: 'rgb(209,209,214)',
  },
});

//!TODO SWIPE DOWN TO REFRESH
