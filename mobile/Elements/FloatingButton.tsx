import React from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import Colors from '../constants/Colors';

// import all the components we are going to use
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Props = {
    onPress: () => void;
  };

export default function FloatingButton(props: Props) {

  return (
    <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onPress}
        style={styles.touchableOpacityStyle}>
        <AntDesign name="pluscircle" size={50} color={Colors.dark.accent} />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});