import { StyleSheet, Text, Image, View, ImageBackground, ScrollView} from 'react-native';
import { useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DonutHoleChart from './chartScreen/DonutChartContainer';
import { Svg, Circle} from 'react-native-svg';

const dummyData = [
    { value: 30, color: '#BFCC94' }, // Segment 2: 30 units, green color
    { value: 40, color: '#9994C7' }, // Segment 1: 40 units, purple color
    { value: 20, color: '#A90F2B' }, // Segment 3: 20 units, red color
    { value: 10, color: '#D9D9D9' }, // Segment 4: 10 units, gray color
  ];

export default function ChartScreen() {
    const [date, setDate] = useState('');
    
    function getDate() {
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth()+1;
        const currentYear = today.getFullYear();

        const formattedDate = `${currentMonth}/${currentDay}/${currentYear}`;

        setDate(formattedDate);
    }

    useEffect(() => {
        getDate();
      }, []);

    return (
        <ImageBackground style={styles.container} source={require('../assets/universalAssets/RexpenseBackground.png')}>
            <View style={styles.header}>
                <Image style={styles.logoImage} source={require('../assets/universalAssets/logos/logoAndText.png')}/>
            </View>
            <ScrollView   contentContainerStyle={styles.scrollContent} // Ensures scrolling
  showsVerticalScrollIndicator={false}>

            <View style={{width: 295, height: 90, alignItems: 'center', marginVertical: 20, marginHorizontal: 40}}>
                <Text style={{color: 'white', fontSize: 36, fontWeight: 'bold'}}>total for: </Text>
                <Text style={{color: 'white', fontSize: 36, fontWeight: 'bold'}}>{date}</Text>
            </View>

            <View style={styles.boxesContainer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.subText}>total</Text>
                    <Text style={styles.mainText}>15</Text>
                    <Text style={styles.subText}>transactions</Text>
                </View>
                <View style={styles.topExpenseContainer}>
                    <Text style={styles.subText}>top</Text>
                    <Text style={styles.mainText}>grocery</Text>
                    <Text style={styles.subText}>category</Text>
                </View>
                <View style={styles.largestTransactionContainer}>
                    <Text style={styles.subText}>largest</Text>
                    <Text style={styles.mainText}>$75</Text>
                    <Text style={styles.subText}>transaction</Text>
                </View>
            </View>

            <View style={styles.donutChartContainer}>
                <DonutHoleChart data={dummyData} radius={366/2}/>
                <Svg width={366} height={366} viewBox={`-35 -35 336 336`} style={styles.overlay}>
                    <Circle
                        cx={133} // X-coordinate of the center
                        cy={133} // Y-coordinate of the center
                        r={100}  // Radius
                        fill="black" // No fill color
                        stroke="black" // Stroke color
                        strokeWidth={60} // Thickness of the donut
                    />
                    <View style={{height: 66, width: 247, alignSelf: 'center', marginTop: '40%'}}>
                      <Text style={{color: 'white', textAlign: 'center', fontSize: 24, fontWeight: '600'}}
                        >
                        you’ve spent a total of $128.53 today
                    </Text>
                    </View>
                </Svg>
                <View style={{height: 163, width: 339, marginTop: 50, left: 10, flexDirection: 'row'}}>
                    <View style={styles.circleColumn}>
                        <Image source={require('../assets/chartScreenAssets/circles/Ellipse 6.png')}/>
                        <Image source={require('../assets/chartScreenAssets/circles/Ellipse 7.png')}/>
                        <Image source={require('../assets/chartScreenAssets/circles/Ellipse 8.png')}/>
                        <Image source={require('../assets/chartScreenAssets/circles/Ellipse 9.png')}/>
                    </View>
                    <View style={styles.categoryColumn}>
                        <Text style={[styles.categoryText, {marginTop: -5}]}>grocery</Text>
                        <Text style={styles.categoryText}>shopping</Text>
                        <Text style={styles.categoryText}>restaurants</Text>
                        <Text style={styles.categoryText}>misc.</Text>
                    </View>
                    <View style={styles.moneyColumn}>
                        <Text style={[styles.categoryText, {marginTop: -5}]}>$115</Text>
                        <Text style={styles.categoryText}>$115</Text>
                        <Text style={styles.categoryText}>$115</Text>
                        <Text style={styles.categoryText}>$115</Text>
                    </View>
                    <View style={styles.percentColumn}>
                        <Text style={[styles.categoryText, {marginTop: -5}]}>43.5%</Text>
                        <Text style={styles.categoryText}>43.5%</Text>
                        <Text style={styles.categoryText}>43.5%</Text>
                        <Text style={styles.categoryText}>43.5%</Text>
                    </View>
                </View>
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
    },
    scrollContent: {
        flexGrow: 1, // Allows the content to grow and scroll if it exceeds the screen height
        alignItems: 'center', // Centers items horizontally
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
    boxesContainer: {
        width: '100%',
        height: 54,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    totalContainer: {
        height: '100%',
        width: 88,
        backgroundColor: '#9994C7',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topExpenseContainer: {
        height: '100%',
        width: 88,
        backgroundColor: '#BFCC94',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    largestTransactionContainer: {
        height: '100%',
        width: 88,
        backgroundColor: '#A90F2B',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subText: {
        fontWeight: 'light',
        fontSize: 11,
        color: 'white',
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'white',
    },
    donutChartContainer: {
        height: 366,
        width: 366,
        marginTop: '10%',
    },
    overlay: {
        position: 'absolute', // Places the SVG on top of the DonutHoleChart
    },
    circleColumn: {
        height: 150,
        width: 15,
        justifyContent: 'space-between',
    },
    categoryColumn: {
        marginLeft: 20,
        height: 150,
        width: 113,
        justifyContent: 'space-between',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    moneyColumn: {
        marginLeft: 40,
        height: 150,
        width: 44,
        justifyContent: 'space-between',
    },
    percentColumn: {
        marginLeft: 40,
        height: 161,
        width: 66,
        justifyContent: 'space-between',
    }
  });