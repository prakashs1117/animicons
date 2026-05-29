import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps, useAnimatedStyle,
  withRepeat, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SleepPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Sleep: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const moonScale = useSharedValue(1);
  const star1Op = useSharedValue(0.3);
  const star2Op = useSharedValue(0.3);
  const z1Y = useSharedValue(0); const z1Op = useSharedValue(0);
  const z2Y = useSharedValue(0); const z2Op = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SleepPaths);

  useEffect(() => {
    if (autoPlay) {
      moonScale.value = withRepeat(withTiming(1.05, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
      star1Op.value = withDelay(d.stagger, withRepeat(withTiming(1, { duration: d.long }), loop ? -1 : 1, true));
      star2Op.value = withDelay(d.stagger * 2, withRepeat(withTiming(1, { duration: d.long }), loop ? -1 : 1, true));
      z1Op.value = withRepeat(withTiming(1, { duration: d.long * 0.5 }), loop ? -1 : 1, true);
      z1Y.value = withRepeat(withTiming(-12, { duration: d.long }), loop ? -1 : 1);
      z2Op.value = withDelay(d.stagger, withRepeat(withTiming(1, { duration: d.long * 0.5 }), loop ? -1 : 1, true));
      z2Y.value = withDelay(d.stagger, withRepeat(withTiming(-12, { duration: d.long }), loop ? -1 : 1));
    } else {
      [moonScale, star1Op, star2Op, z1Y, z1Op, z2Y, z2Op].forEach(sv => cancelAnimation(sv));
    }
  }, [autoPlay, loop, speed]);

  const moonStyle = useAnimatedStyle(() => ({ transform: [{ scale: moonScale.value }] }));
  const star1Props = useAnimatedProps(() => ({ opacity: star1Op.value }));
  const star2Props = useAnimatedProps(() => ({ opacity: star2Op.value }));
  const z1Props = useAnimatedProps(() => ({ opacity: z1Op.value, transform: [{ translateY: z1Y.value }] }));
  const z2Props = useAnimatedProps(() => ({ opacity: z2Op.value, transform: [{ translateY: z2Y.value }] }));

  return (
    <Svg width={size} height={size} viewBox={SleepPaths.viewBox} style={style as any}>
      <Animated.View style={[{ position: 'absolute' }, moonStyle]}>
        <Svg width={size} height={size} viewBox={SleepPaths.viewBox} style={{ position: 'absolute' }}>
          <Path d={SleepPaths.moon} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        </Svg>
      </Animated.View>
      <AnimatedPath animatedProps={star1Props} d={SleepPaths.star1} fill={s.fill} opacity={s.opacity} />
      <AnimatedPath animatedProps={star2Props} d={SleepPaths.star2} fill={s.fill} opacity={s.opacity} />
      <AnimatedPath animatedProps={z1Props} d={SleepPaths.z1} stroke={s.stroke} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <AnimatedPath animatedProps={z2Props} d={SleepPaths.z2} stroke={s.stroke} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};
