import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SendPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Send: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SendPaths);

  useEffect(() => {
    if (autoPlay) {
      const dur = d.medium;
      translateX.value = withRepeat(withSequence(
        withTiming(16,  { duration: dur * 0.6, easing: Easing.inOut(Easing.ease) }),
        withTiming(-16, { duration: 0 }),
        withTiming(0,   { duration: dur * 0.4, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      translateY.value = withRepeat(withSequence(
        withTiming(-16, { duration: dur * 0.6, easing: Easing.inOut(Easing.ease) }),
        withTiming(16,  { duration: 0 }),
        withTiming(0,   { duration: dur * 0.4, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      opacity.value = withRepeat(withSequence(
        withTiming(0, { duration: dur * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: dur * 0.1 }),
        withTiming(1, { duration: dur * 0.4, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(translateX); cancelAnimation(translateY); cancelAnimation(opacity);
      translateX.value = withTiming(0, { duration: 150 });
      translateY.value = withTiming(0, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const sendProps = useAnimatedProps(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={SendPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={sendProps} d={SendPaths.plane} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={sendProps} d={SendPaths.fold}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
