import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { PillPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Pill: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const translateY = useSharedValue(0);
  const shineOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PillPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(withTiming(-5, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
      shineOp.value = withRepeat(withTiming(0.8, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
    } else {
      cancelAnimation(translateY); cancelAnimation(shineOp);
    }
  }, [autoPlay, loop, speed]);

  const capsuleProps = useAnimatedProps(() => ({ transform: [{ translateY: translateY.value }] }));
  const dividerProps = useAnimatedProps(() => ({ transform: [{ translateY: translateY.value }] }));
  const shineProps = useAnimatedProps(() => ({ opacity: shineOp.value, transform: [{ translateY: translateY.value }] }));

  return (
    <Svg width={size} height={size} viewBox={PillPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={capsuleProps} d={PillPaths.capsule} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={dividerProps} d={PillPaths.divider} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={shineProps} d={PillPaths.shine} stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
};
