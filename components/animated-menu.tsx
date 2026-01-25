import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';


interface AnimatedMenuProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const AnimatedMenu: React.FC<AnimatedMenuProps> = ({ isActive, children }) => {

    const slideAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <Animated.View style={[styles.menu ,{
                      opacity: slideAnim,
                      transform: [
                        {
                          translateY: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [40, 0],
                          }),
                        },
                      ],
                    },]}>
        {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    elevation: 6,
    zIndex: 100,
    minWidth: 120,
  },
});
