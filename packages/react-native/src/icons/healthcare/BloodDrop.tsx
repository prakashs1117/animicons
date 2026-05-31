import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BloodDropPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const BloodDrop: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const scaleY = useSharedValue(1);
  const r1 = useSharedValue(6); const op1 = useSharedValue(0.6);
  const r2 = useSharedValue(6); const op2 = useSharedValue(0.6);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BloodDropPaths);

  useEffect(() => {
    if (autoPlay) {
      scaleY.value = withRepeat(withTiming(0.85, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
      r1.value = withRepeat(withTiming(10, { duration: d.long, easing: Easing.out(Easing.ease) }), loop ? -1 : 1);
      op1.value = withRepeat(withTiming(0, { duration: d.long }), loop ? -1 : 1);
      r2.value = withDelay(d.stagger, withRepeat(withTiming(10, { duration: d.long, easing: Easing.out(Easing.ease) }), loop ? -1 : 1));
      op2.value = withDelay(d.stagger, withRepeat(withTiming(0, { duration: d.long }), loop ? -1 : 1));
    } else {
      [scaleY, r1, op1, r2, op2].forEach(sv => cancelAnimation(sv));
    }
  }, [autoPlay, loop, speed]);

  const dropProps = useAnimatedProps(() => ({ transform: [{ scaleY: scaleY.value }], originY: 28 }));
  const rip1Props = useAnimatedProps(() => ({ r: r1.value, opacity: op1.value }));
  const rip2Props = useAnimatedProps(() => ({ r: r2.value, opacity: op2.value }));

  return (
    <Svg width={size} height={size} viewBox={BloodDropPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={dropProps} d={BloodDropPaths.drop} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      <AnimatedCircle animatedProps={rip1Props} cx="24" cy="42" stroke={s.stroke} strokeWidth={1.5} fill="none" />
      <AnimatedCircle animatedProps={rip2Props} cx="24" cy="42" stroke={s.stroke} strokeWidth={1.5} fill="none" />
    </Svg>
  );
};
