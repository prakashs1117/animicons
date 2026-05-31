import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SyringePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Syringe: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const plungerX = useSharedValue(0);
  const liquidScale = useSharedValue(1);
  const dropOp = useSharedValue(0);
  const dropY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SyringePaths);

  useEffect(() => {
    if (autoPlay) {
      plungerX.value = withRepeat(withSequence(withTiming(8, { duration: d.long * 0.5 }), withTiming(0, { duration: d.long * 0.5 })), loop ? -1 : 1);
      liquidScale.value = withRepeat(withSequence(withTiming(0.3, { duration: d.long * 0.5 }), withTiming(1, { duration: d.long * 0.5 })), loop ? -1 : 1);
      dropOp.value = withRepeat(withSequence(withTiming(0, { duration: d.long * 0.49 }), withTiming(1, { duration: d.long * 0.01 }), withTiming(0, { duration: d.long * 0.5 })), loop ? -1 : 1);
      dropY.value = withRepeat(withSequence(withTiming(0, { duration: d.long * 0.5 }), withTiming(6, { duration: d.long * 0.5 })), loop ? -1 : 1);
    } else {
      cancelAnimation(plungerX); cancelAnimation(liquidScale); cancelAnimation(dropOp); cancelAnimation(dropY);
    }
  }, [autoPlay, loop, speed]);

  const plungerProps = useAnimatedProps(() => ({ transform: [{ translateX: plungerX.value }] }));
  const liquidProps = useAnimatedProps(() => ({ transform: [{ scaleX: liquidScale.value }], originX: 14 }));
  const dropProps = useAnimatedProps(() => ({ opacity: dropOp.value, transform: [{ translateY: dropY.value }] }));

  return (
    <Svg width={size} height={size} viewBox={SyringePaths.viewBox} style={style as any}>
      <Path d={SyringePaths.barrel} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={liquidProps} d={SyringePaths.liquid} fill={s.fill} opacity={s.opacity * 0.7} />
      <AnimatedPath animatedProps={plungerProps} d={SyringePaths.plunger} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
      <Path d={SyringePaths.needle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={dropProps} d={SyringePaths.drop} fill={s.fill} />
    </Svg>
  );
};
