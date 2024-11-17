import { StyleSheet, Image, Text, View, ImageBackground, ScrollView} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accordion from './homeScreenParts/Accordian';
import { useEffect } from 'react';

export default function HomeScreen() {

    // const fetchData = async () => {
    //     const serverURL = "http://localhost:3000/scan-receipt";
    //     try {
    //       const response = await fetch(serverURL, {
    //         method: 'POST', // Specify method (optional for GET requests)
    //       });
      
    //       if (!response.ok) {
    //         throw new Error(`Server error: ${response.status}`); // Handle non-2xx responses
    //       }
      
    //       const data = await response.json(); // Parse JSON response
    //       console.log('Fetched Data:', data); // Utilize the data
    //       return data; // Return the data if needed elsewhere
    //     } catch (error) {
    //       console.error('Fetch error:', error); // Handle errors
    //       throw error; // Re-throw error if necessary
    //     }
    //   };
      
    //   useEffect(() => {
    //     fetchData();
    //   }, []);
    
    return (
        <ImageBackground style={styles.container} source={require('../assets/universalAssets/RexpenseBackground.png')}>
            <View style={styles.header}>
                <Image style={styles.logoImage} source={require('../assets/universalAssets/logos/logoAndText.png')}/>
            </View>
            <View style={{backgroundColor: 'black', height: 412, width: '100%', position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <ImageBackground resizeMode='contain' style={{bottom: 80, width: 360, height: 141, alignSelf: 'center'}} source={require('../assets/homeScreenAssets/Rectangle 13.png')}>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 600, top: 20, left: 20}}>your balance</Text>
                    <Text style={{fontSize: 30, color: '#9994C7', fontWeight: 'bold', top: 30, left: 20}}>$3120.99</Text>
                    <Text style={{fontSize: 20, color: '#8D8D8D', fontWeight: 'bold', top: 40, left: 20}}>************5886</Text>
                </ImageBackground>
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', top: -80, left: 20}}>recent transactions</Text>
            </View>
            <ScrollView style={styles.accordianContainer}>
                <Accordion
                    title="Kroger"
                    content="This is the content for Accordion 1. You can put anything here."
                    type="Grocery"
                    money="34.55"
                />
                <Accordion
                    title="Nordstrom"
                    content="This is the content for Accordion 2. Feel free to customize it!"
                    type="Shopping"
                    money="34.55"
                />
                <Accordion
                    title="Jollibee's"
                    content="This is the content for Accordion 3. Add as many accordions as you like."
                    type="Restaurants"
                    money="34.55"
                />
                <Accordion
                    title="Theater of Arts"
                    content="This is the content for Accordion 3. Add as many accordions as you like."
                    type="Miscellaneous"
                    money="34.55"
                />
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', top: 20}}>your balance</Text>
                <View style={{top: 20, height: 38, width: 375}}>
                    <Text style={{fontSize: 20, color: '#8D8D8D', fontWeight: '700', alignSelf: 'flex-end', right: 20}}>$532.03</Text>
                    <View style={{height: 11, width: 356, backgroundColor: '#8D8D8D', borderRadius: 20}}></View>
                    <Text style={{fontSize: 20, color: '#8D8D8D', fontWeight: '700'}}>october</Text>
                </View>
                <View style={{top: 40, height: 38, width: 282}}>
                    <Text style={{fontSize: 20, color: '#BFCC94', fontWeight: '700', alignSelf: 'flex-end'}}>$532.03</Text>
                    <View style={{height: 11, width: 282, backgroundColor: '#BFCC94', borderRadius: 20}}></View>
                    <Text style={{fontSize: 20, color: '#BFCC94', fontWeight: '700'}}>november</Text>
                </View>
                
            </ScrollView>
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
    header: {
        top: 40,
        height: '10%',
        width: '90%',
        flexDirection: 'row',
    },
    logoImage: {
        height: '100%',
        width: '40%',
        resizeMode: 'contain',
    },
    accordianContainer: {
        resizeMode: 'stretch',
        top: 230,
        padding: 16,
        backgroundColor: 'transparent',

    }
  });