import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface AnimatedSectionProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ isActive, children }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(isActive ? 1.02 : 1, { duration: 250 }) }],
    shadowOpacity: withTiming(isActive ? 0.25 : 0.05, { duration: 250 }),
    shadowRadius: withTiming(isActive ? 6 : 3, { duration: 250 }),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={isActive ? ['#cce7ff', '#e6f2ff'] : ['#fff', '#fff']}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
  },
});
