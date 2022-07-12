import React, { useEffect } from "react";
import { useWindowDimensions, ViewProps } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { AnimationContainer } from "./styles";

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(cardOpacity.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(
              cardOffset.value,
              [0, 50],
              [0, 50],
              Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    /**
     * TODO - setup cardOpacity.value and cardOffset.value with
     * withTiming()
     */
    cardOpacity.value = withTiming(50, { duration: 1000 });
    cardOffset.value = withTiming(0, { duration: 500 });
  }, []);

  return (
      <AnimationContainer {...rest} style={animatedStyle}>
        {children}
      </AnimationContainer>
  );
}
