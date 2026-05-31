import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { MoreHorizontalPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const MoreHorizontal: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const op1 = useSharedValue(0.3);
  const op2 = useSharedValue(0.3);
  const op3 = useSharedValue(0.3);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MoreHorizontalPaths);

  useEffect(() => {
    if (autoPlay) {
      const anim = (sv: Animated.SharedValue<number>, delay: number) => {
        sv.value = withDelay(delay, withRepeat(withSequence(
          withTiming(1,   { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        ), loop ? -1 : 1));
      };
      anim(op1, 0);
      anim(op2, d.stagger);
      anim(op3, d.stagger * 2);
    } else {
      cancelAnimation(op1); cancelAnimation(op2); cancelAnimation(op3);
      op1.value = withTiming(1, { duration: 150 });
      op2.value = withTiming(1, { duration: 150 });
      op3.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const dot1Props = useAnimatedProps(() => ({ opacity: op1.value }));
  const dot2Props = useAnimatedProps(() => ({ opacity: op2.value }));
  const dot3Props = useAnimatedProps(() => ({ opacity: op3.value }));

  return (
    <Svg width={size} height={size} viewBox={MoreHorizontalPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={dot1Props} d={MoreHorizontalPaths.dot1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} />
      <AnimatedPath animatedProps={dot2Props} d={MoreHorizontalPaths.dot2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} />
      <AnimatedPath animatedProps={dot3Props} d={MoreHorizontalPaths.dot3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} />
    </Svg>
  );
};
