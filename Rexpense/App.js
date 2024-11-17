import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//screens
import OpeningScreen from './components/openingScreen';
import HomeScreen from './components/homeScreen';
import ChartScreen from './components/chartScreen';
import CameraScreen from './components/cameraScreen';
import ProfileScreen from './components/profileScreen';

//gray icons
import GrayHomeIcon from './assets/universalAssets/navBarGrayIcons/home.png';
import GrayPieIcon from './assets/universalAssets/navBarGrayIcons/pie-chart.png';
import GrayCameraIcon from './assets/universalAssets/navBarGrayIcons/camera.png';
import GrayProfileIcon from './assets/universalAssets/navBarGrayIcons/user.png';

//purple icons
import PurpleHomeIcon from './assets/universalAssets/navBarPurpleIcons/home.png';
import PurplePieIcon from './assets/universalAssets/navBarPurpleIcons/pie-chart.png';
import PurpleCameraIcon from './assets/universalAssets/navBarPurpleIcons/camera.png';
import PurpleProfileIcon from './assets/universalAssets/navBarPurpleIcons/user.png';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconLabel;

          // Assign icons and labels based on the route name
          if (route.name === 'HomeScreen') {
            iconName = focused ? PurpleHomeIcon : GrayHomeIcon;
            iconLabel = "Home";
          } else if (route.name === 'ChartScreen') {
            iconName = focused ? PurplePieIcon : GrayPieIcon;
            iconLabel = "Chart";
          } else if (route.name === 'CameraScreen') {
            iconName = focused ? PurpleCameraIcon : GrayCameraIcon;
            iconLabel = "Camera";
          } else if (route.name === 'ProfileScreen') {
            iconName = focused ? PurpleProfileIcon : GrayProfileIcon;
            iconLabel = "Profile";
          }

          return (
            <Image source={iconName} style={{width: 24, height: 24, top: 10}}/>
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#272727', // Tab bar background
          width: 360, // Explicit width of the tab bar
          height: 62, // Height of the tab bar
          borderRadius: 50, // Rounded corners
          bottom: 20, // Distance from the bottom
          alignSelf: 'center', // Center horizontally within the parent
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5, // Adds space between icon and label
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <ImageBackground
        style={styles.container}
        source={require('./assets/universalAssets/RexpenseBackground.png')}
      >
        <MyTabs />
      </ImageBackground>
    </NavigationContainer>
  );
}
