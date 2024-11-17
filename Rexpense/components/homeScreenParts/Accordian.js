import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, ScrollView} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Accordion = ({ title, content, type}) => {
  const [expanded, setExpanded] = useState(false); // Track accordion state
  const [animationHeight] = useState(new Animated.Value(0)); // Animation for expanding/collapsing
  const [boxColor, setBoxColor] = useState("");

  const getColor = () => {
    switch(type) {
      case "Shopping":
        setBoxColor("#BFCC94");
        break;
      case "Restaurants":
        setBoxColor("#A90F2B");
        break;
      case "Grocery":
        setBoxColor("#9994C7");
        break;
      default:
        setBoxColor("#D9D9D9");
        break;
    }
  }

  useEffect(() => {
    getColor();
  }, []);

  const toggleAccordion = () => {
    if (expanded) {
      // Collapse animation
      Animated.timing(animationHeight, {
        toValue: 0, // Collapse to height 0
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(false)); // Set expanded to false after animation ends
    } else {
      setExpanded(true);
      // Expand animation
      Animated.timing(animationHeight, {
        toValue: 150, // Adjust based on content size
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };



  return (
    <View style={[styles.container, {backgroundColor: boxColor}]}>
      <ScrollView>
      {/* Accordion Header */}
      <TouchableOpacity style={[styles.header, {backgroundColor: boxColor, flexDirection: 'row', justifyContent: 'space-between'}]} onPress={toggleAccordion}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>

      {/* Accordion Body */}
      {expanded && (
        <Animated.View style={[styles.content, { height: animationHeight, backgroundColor: boxColor}]}>
          <Text style={styles.contentText}>{content}</Text>
        </Animated.View>
      )}
      </ScrollView>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
    container: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
      elevation: 3, // For shadow on Android
      shadowColor: '#000', // For shadow on iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    header: {
      width: SCREEN_WIDTH - 50,
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    headerText: {
      fontSize: 18,
      color: '#ffffff',
      fontWeight: '800',
      letterSpacing: 1,
    },
    content: {
      overflow: 'hidden',
    },
    contentText: {
      fontSize: 16,
      color: '#333333',
      marginVertical: 8,
    },
  });
  