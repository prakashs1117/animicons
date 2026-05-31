import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BrainPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Brain: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const n1r = useSharedValue(3); const n1op = useSharedValue(0.2);
  const n2r = useSharedValue(3); const n2op = useSharedValue(0.2);
  const n3r = useSharedValue(3); const n3op = useSharedValue(0.2);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BrainPaths);

  useEffect(() => {
    if (autoPlay) {
      const fire = (r: typeof n1r, op: typeof n1op, delay: number) => {
        r.value = withDelay(delay, withRepeat(withTiming(4.5, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true));
        op.value = withDelay(delay, withRepeat(withTiming(1, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true));
      };
      fire(n1r, n1op, 0); fire(n2r, n2op, d.stagger); fire(n3r, n3op, d.stagger * 2);
    } else {
      [n1r, n2r, n3r, n1op, n2op, n3op].forEach(sv => cancelAnimation(sv));
    }
    return () => { [n1r, n2r, n3r, n1op, n2op, n3op].forEach(sv => cancelAnimation(sv)); };
  }, [autoPlay, loop, speed]);

  const ap1 = useAnimatedProps(() => ({ r: n1r.value, opacity: n1op.value }));
  const ap2 = useAnimatedProps(() => ({ r: n2r.value, opacity: n2op.value }));
  const ap3 = useAnimatedProps(() => ({ r: n3r.value, opacity: n3op.value }));

  return (
    <Svg width={size} height={size} viewBox={BrainPaths.viewBox} style={style as any}>
      <Path d={BrainPaths.left} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
      <Path d={BrainPaths.right} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
      <Path d={`${BrainPaths.synapse1} ${BrainPaths.synapse2}`} stroke={s.stroke} strokeWidth={1} fill="none" opacity={s.opacity * 0.5} />
      <AnimatedCircle animatedProps={ap1} cx="16" cy="20" fill={s.fill} />
      <AnimatedCircle animatedProps={ap2} cx="24" cy="16" fill={s.fill} />
      <AnimatedCircle animatedProps={ap3} cx="32" cy="20" fill={s.fill} />
    </Svg>
  );
};
