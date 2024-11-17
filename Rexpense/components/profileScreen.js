import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function ProfileScreen() {
    return (
        <ImageBackground style={styles.container} source={require('../assets/universalAssets/RexpenseBackground.png')}>
            <Text style={{color: 'white'}}>ProfileScreen</Text>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });