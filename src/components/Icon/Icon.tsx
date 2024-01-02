import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

type IconProps = {
  IconPackage: string | undefined;
  tokenBoxDisplay: "none" | "flex" | undefined;
};

const Icon = ({IconPackage}:IconProps) => {
  return (
      <View>
    <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
    </View>

  )
}

export default Icon