import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Button,
} from 'react-native';

//CONTEXT
import { useAuthContext } from '../context/authContext';
// import { usePlayListUriContext } from '../context/playlistUriContext';

//API
const SpotifyWebApi = require('spotify-web-api-node');
const SpotifyApi = new SpotifyWebApi();

const SongModal = (props) => {
  // const playListUriContext = usePlayListUriContext();
  const modalVisible = props.modalVisible;
  const setModalVisible = props.setModalVisible;
  const modalInfo = props.modalInfo; //! CONTAINS INFO ON TRACK
  const [isPlaying, setIsPlaying] = React.useState(false);

  //API
  const authContext = useAuthContext();
  SpotifyApi.setAccessToken(authContext.Token);
  const [uri, setUri] = React.useState('');

  //TOGGLE PLAY

  const startPlay = () => {
    SpotifyApi.play({
      uris: [String(uri)],
    }).then(
      function () {
        setIsPlaying(true);
        console.log('Playback started');
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  };

  const stopPlay = () => {
    SpotifyApi.pause().then(
      function () {
        setIsPlaying(false);
        console.log('Playback stopped');
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  };


  return (
    modalInfo && (
      <View style={styles.centeredView}>
        {/* {console.log(modalInfo)} */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.songInfo}>
                <View style={styles.infoText}>
                  <Text style={{ fontWeight: '600' }}>{modalInfo.name}</Text>

                  <Text>{modalInfo.artists[0].name}</Text>
                </View>
                <Image
                  source={{
                    uri: modalInfo.album.images[0].url,
                    height: 200,
                    width: 200,
                  }}
                />
              </View>

              {/* PLAY BUTTON */}
              {!isPlaying ? (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setUri(modalInfo.uri);
                    startPlay();
                  }}
                >
                  <Text style={styles.textStyle}>PLAY</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    stopPlay();
                  }}
                >
                  <Text style={styles.textStyle}>STOP</Text>
                </Pressable>
              )}

              {/* HIDE BUTTON */}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  stopPlay();
                }}
              >
                <Text style={styles.textStyle}>hide</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 80,
    width: 300,
    height: 500,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // margin:5,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: 'rgb(209,209,214)',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  songInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default SongModal;
