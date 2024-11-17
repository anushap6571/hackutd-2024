import { useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, Button, View, Image, FlatList, Alert, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const navigation = useNavigation();

  // Request Media Library Permissions
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === 'granted');
    })();
  }, []);

  // Load Gallery Photos
  const loadGalleryPhotos = async () => {
    try {
      const assets = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo, // Fetch only photos
        first: 50, // Fetch the first 50 photos
      });

      // Convert `ph://` URIs to `file://` URIs
      const assetsWithFileUris = await Promise.all(
        assets.assets.map(async (asset) => {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
          return { ...asset, uri: assetInfo.localUri || asset.uri };
        })
      );

      setGalleryPhotos(assetsWithFileUris);
    } catch (error) {
      Alert.alert('Error', 'Could not load gallery photos.');
      console.error(error);
    }
  };

  // Load photos every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadGalleryPhotos();
    }, [])
  );

  // Handle Permission States
  if (hasMediaLibraryPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Requesting Permissions...</Text>
      </View>
    );
  }

  if (hasMediaLibraryPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>No access to media library</Text>
      </View>
    );
  }

  return (
    <ImageBackground style={styles.container} source={require('../assets/universalAssets/RexpenseBackground.png')}>
        <View style={styles.header}>
            <Image style={styles.logoImage} source={require('../assets/universalAssets/logos/logoAndText.png')}/>
        </View>
        <Text style={{color: 'white', fontSize: 40, marginVertical: 20}}>Profile</Text>
        <Image style={{height: 298, width: 298, borderRadius: 150, resizeMode: 'center'}}source={require('../assets/universalAssets/bob.jpeg')}></Image>
        <Text style={{color: 'white', fontSize: 24, marginVertical: 20}}>Mercedes</Text>
        <Text style={{color: 'white', fontSize: 12, marginVertical: 20, top: -30}}>mercedes_benz25</Text>
        <View style={styles.buttonContainer}>
        <Button
          title="logout"
          color="#9994C7"
          onPress={() => navigation.navigate('OpeningScreen')} // Navigate to the main tabs
        />
      </View>
      {galleryPhotos.length > 0 ? (
        <FlatList
          data={galleryPhotos}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
            />
          )}
          contentContainerStyle={styles.gallery}
        />
      ) : (
        <Text style={styles.noPhotosText}>No photos to display. Press "Load Gallery Photos" to load your gallery.</Text>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    top: '5%',
    height: '10%',
    width: '90%',
    flexDirection: 'row',
},
logoImage: {
    height: '100%',
    width: '40%',
    resizeMode: 'contain',
},
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery: {
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  noPhotosText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    top: -30,
    backgroundColor: '#272727',
    borderRadius: 20,
  },
});
