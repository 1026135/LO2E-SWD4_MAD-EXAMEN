import React, { useRef } from 'react';
import { Animated, Pressable, Text, StyleProp, ViewStyle } from 'react-native';
import { glassButtonStyles } from '../styles/stylesLight';

interface GlassButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export default function GlassButton({ onPress, title, style }: GlassButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 40,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{ borderRadius: 16, overflow: 'hidden' }, style]} // 16 radius to match stylesLight
    >
      <Animated.View
        style={[
          glassButtonStyles.button,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={glassButtonStyles.buttonText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}
