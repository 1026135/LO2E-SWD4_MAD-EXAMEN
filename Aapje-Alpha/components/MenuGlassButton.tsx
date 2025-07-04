import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { menuButtonStyles } from '../styles/stylesLight';

interface MenuGlassButtonProps {
  onPress: () => void;
  title: string;
  red?: boolean;
}

export default function MenuGlassButton({ onPress, title, red = false }: MenuGlassButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        menuButtonStyles.button,
        red && menuButtonStyles.redButton,
      ]}
    >
      <Text
        style={[
          menuButtonStyles.buttonText,
          red && menuButtonStyles.redText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
