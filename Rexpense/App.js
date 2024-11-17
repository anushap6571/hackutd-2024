import React from 'react';
import { StyleSheet, Button, View, ImageBackground, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import HomeScreen from './components/homeScreen';
import ChartScreen from './components/chartScreen';
import CameraScreen from './components/cameraScreen';
import ProfileScreen from './components/profileScreen';

// Gray icons
import GrayHomeIcon from './assets/universalAssets/navBarGrayIcons/home.png';
import GrayPieIcon from './assets/universalAssets/navBarGrayIcons/pie-chart.png';
import GrayCameraIcon from './assets/universalAssets/navBarGrayIcons/camera.png';
import GrayProfileIcon from './assets/universalAssets/navBarGrayIcons/user.png';

// Purple icons
import PurpleHomeIcon from './assets/universalAssets/navBarPurpleIcons/home.png';
import PurplePieIcon from './assets/universalAssets/navBarPurpleIcons/pie-chart.png';
import PurpleCameraIcon from './assets/universalAssets/navBarPurpleIcons/camera.png';
import PurpleProfileIcon from './assets/universalAssets/navBarPurpleIcons/user.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused ? PurpleHomeIcon : GrayHomeIcon;
          } else if (route.name === 'ChartScreen') {
            iconName = focused ? PurplePieIcon : GrayPieIcon;
          } else if (route.name === 'CameraScreen') {
            iconName = focused ? PurpleCameraIcon : GrayCameraIcon;
          } else if (route.name === 'ProfileScreen') {
            iconName = focused ? PurpleProfileIcon : GrayProfileIcon;
          }

          return (
            <Image source={iconName} style={{ width: 24, height: 24, top: 10 }} />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#272727',
          width: 360,
          height: 62,
          borderRadius: 50,
          bottom: 30,
          alignSelf: 'center',
          position: 'absolute', // Prevents white box underneath
          marginLeft: 10,
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ChartScreen" component={ChartScreen} />
      <Tab.Screen name="CameraScreen" component={CameraScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function OpeningScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/universalAssets/RexpenseBackground.png')}
    >
      <Image source={require('./assets/universalAssets/logos/fullRex.png')} style={{height: '25%', width: '50%', resizeMode: 'contain'}}/>
      <Image source={require('./assets/universalAssets/logos/rexpense.png')} style={{height: '10%', width: '50%', resizeMode: 'contain'}}/>
      <View style={styles.buttonContainer}>
        <Button
          title="Go To Home"
          color="#9994C7"
          onPress={() => navigation.navigate('MainTabs')} // Navigate to the main tabs
        />
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Opening Screen */}
        <Stack.Screen name="OpeningScreen" component={OpeningScreen} />
        
        {/* Main Tabs */}
        <Stack.Screen name="MainTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#272727',
    borderRadius: 20,
    position: 'absolute',
    bottom: '10%',
  },
});
