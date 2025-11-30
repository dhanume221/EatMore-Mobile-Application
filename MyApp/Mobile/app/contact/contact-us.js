import { View, Text } from 'react-native';
import { styles } from '../../assets/styles/auth.styles';
import {BlurView} from 'expo-blur';
import React from 'react';

const ContacUs = () => {
  return (
    <View style={styles.container}>
         <BlurView intensity={70} tint="light" style={styles.blurBoxs}>
      <Text style={styles.titles}>Contact Us</Text>
      </BlurView>
    </View>
  )
}

export default ContacUs