import {
    SafeAreaView,
    StatusBar,
    View,
  } from "react-native";
  import React from "react";
import styles from './styles'
  
  
  type StatusBarProps = {
    backgroundColor: string;
    barStyle: any;
  };
  
  const CustomStatusBar: React.FC<StatusBarProps> = ({
    backgroundColor,
    barStyle,
  }) => {
    return (
      <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
          <StatusBar
            translucent
            barStyle={barStyle}
            backgroundColor={backgroundColor}
          />
        </SafeAreaView>
      </View>
    );
  };
  
  export  default CustomStatusBar ;

  
  
  
 
  
 
  
  