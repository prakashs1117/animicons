import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { CameraPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Camera: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const lensOp  = useSharedValue(1);
  const flashOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CameraPaths);

  useEffect(() => {
    if (autoPlay) {
      lensOp.value = withRepeat(withSequence(
        withTiming(1,   { duration: d.long * 0.6 }),
        withTiming(0.2, { duration: d.short * 0.15, easing: Easing.inOut(Easing.ease) }),
        withTiming(1,   { duration: d.short * 0.25, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      flashOp.value = withRepeat(withSequence(
        withTiming(0,   { duration: d.long * 0.6 }),
        withTiming(0.6, { duration: d.short * 0.1, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,   { duration: d.short * 0.3, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(lensOp); cancelAnimation(flashOp);
      lensOp.value  = withTiming(1, { duration: 150 });
      flashOp.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const lensProps  = useAnimatedProps(() => ({ opacity: lensOp.value * s.opacity }));
  const flashProps = useAnimatedProps(() => ({ opacity: flashOp.value }));

  return (
    <Svg width={size} height={size} viewBox={CameraPaths.viewBox} style={style as any}>
      <Path d={CameraPaths.body}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={CameraPaths.notch} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={lensProps} d={CameraPaths.lens}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={lensProps} d={CameraPaths.inner} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} />
      <AnimatedPath animatedProps={flashProps} d={CameraPaths.flashOverlay} stroke="none" fill="#ffffff" strokeWidth={0} />
    </Svg>
  );
};
