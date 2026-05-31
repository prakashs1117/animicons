import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BatteryPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Battery: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const levelDash = useSharedValue(40);
  const boltOp = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BatteryPaths);

  useEffect(() => {
    if (autoPlay) {
      levelDash.value = withRepeat(withSequence(
        withTiming(40, { duration: 0 }),
        withTiming(0,  { duration: d.long, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.3 }),
      ), loop ? -1 : 1);
      boltOp.value = withRepeat(withSequence(
        withTiming(1,   { duration: d.medium * 0.5 }),
        withTiming(0.2, { duration: d.short * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(1,   { duration: d.short * 0.3, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(levelDash); cancelAnimation(boltOp);
      levelDash.value = withTiming(0, { duration: 150 });
      boltOp.value    = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const levelProps = useAnimatedProps(() => ({ strokeDashoffset: levelDash.value }));
  const boltProps  = useAnimatedProps(() => ({ opacity: boltOp.value * s.opacity }));

  return (
    <Svg width={size} height={size} viewBox={BatteryPaths.viewBox} style={style as any}>
      <Path d={BatteryPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={BatteryPaths.cap}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={levelProps} d={BatteryPaths.level} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} strokeDasharray={40} opacity={s.opacity} />
      <AnimatedPath animatedProps={boltProps}  d={BatteryPaths.bolt}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
};
