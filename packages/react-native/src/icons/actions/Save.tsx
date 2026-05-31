import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SavePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Save: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const translateY = useSharedValue(-8);
  const opacity = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SavePaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(withTiming(0, { duration: d.medium, easing: Easing.out(Easing.ease) }), loop ? -1 : 1);
      opacity.value = withRepeat(withTiming(1, { duration: d.medium }), loop ? -1 : 1);
    } else {
      cancelAnimation(translateY); cancelAnimation(opacity);
      translateY.value = withTiming(0, { duration: 150 });
      opacity.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const saveProps = useAnimatedProps(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={SavePaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={saveProps} d={SavePaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={saveProps} d={SavePaths.slot} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={saveProps} d={SavePaths.check} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
