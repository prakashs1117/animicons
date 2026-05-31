import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { LocationPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Location: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const pinY  = useSharedValue(-20);
  const pinOp = useSharedValue(0);
  const shadowScale = useSharedValue(0.3);
  const shadowOp    = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LocationPaths);

  useEffect(() => {
    if (autoPlay) {
      pinY.value = withSequence(
        withTiming(-20, { duration: 0 }),
        withTiming(0,   { duration: d.medium, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
      );
      pinOp.value = withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
      );
      shadowScale.value = withSequence(
        withTiming(0.3, { duration: 0 }),
        withTiming(1,   { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
      );
      shadowOp.value = withSequence(
        withTiming(0,   { duration: 0 }),
        withTiming(0.4, { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
      );
    } else {
      cancelAnimation(pinY); cancelAnimation(pinOp);
      cancelAnimation(shadowScale); cancelAnimation(shadowOp);
      pinY.value = withTiming(0, { duration: 150 });
      pinOp.value = withTiming(1, { duration: 150 });
      shadowScale.value = withTiming(1, { duration: 150 });
      shadowOp.value = withTiming(0.4, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const pinProps    = useAnimatedProps(() => ({ transform: [{ translateY: pinY.value }], opacity: pinOp.value }));
  const shadowProps = useAnimatedProps(() => ({
    transform: [{ scale: shadowScale.value }],
    originX: 24,
    originY: 45,
    opacity: shadowOp.value,
  }));

  return (
    <Svg width={size} height={size} viewBox={LocationPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={shadowProps} d={LocationPaths.shadow} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill={s.secondaryColor} />
      <AnimatedPath animatedProps={pinProps} d={LocationPaths.pin}   stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} />
      <AnimatedPath animatedProps={pinProps} d={LocationPaths.inner} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" />
      <AnimatedPath animatedProps={pinProps} d={LocationPaths.stem}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
    </Svg>
  );
};
