import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { StepsPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Steps: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const op1 = useSharedValue(0.3);
  const op2 = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, StepsPaths);

  useEffect(() => {
    if (autoPlay) {
      op1.value = withRepeat(withTiming(1, { duration: d.medium, easing: Easing.ease }), loop ? -1 : 1, true);
      op2.value = withRepeat(withTiming(0.3, { duration: d.medium, easing: Easing.ease }), loop ? -1 : 1, true);
    } else {
      cancelAnimation(op1); cancelAnimation(op2);
    }
  }, [autoPlay, loop, speed]);

  const f1Props = useAnimatedProps(() => ({ opacity: op1.value }));
  const f2Props = useAnimatedProps(() => ({ opacity: op2.value }));

  return (
    <Svg width={size} height={size} viewBox={StepsPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={f1Props} d={`${StepsPaths.foot1} ${StepsPaths.toe1a} ${StepsPaths.toe1b}`} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} strokeLinecap="round" />
      <AnimatedPath animatedProps={f2Props} d={`${StepsPaths.foot2} ${StepsPaths.toe2a} ${StepsPaths.toe2b}`} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} strokeLinecap="round" />
    </Svg>
  );
};
