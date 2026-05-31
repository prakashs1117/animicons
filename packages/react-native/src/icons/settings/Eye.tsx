import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { EyePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Eye: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const lidsScaleY = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, EyePaths);

  useEffect(() => {
    if (autoPlay) {
      lidsScaleY.value = withRepeat(withSequence(
        withTiming(1,    { duration: d.long * 0.7, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.05, { duration: d.short * 0.15, easing: Easing.inOut(Easing.ease) }),
        withTiming(1,    { duration: d.short * 0.15, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(lidsScaleY);
      lidsScaleY.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const lidsProps = useAnimatedProps(() => ({
    transform: [{ scaleY: lidsScaleY.value }],
    originX: 24,
    originY: 24,
  }));
  const irisProps = useAnimatedProps(() => ({
    transform: [{ scaleY: lidsScaleY.value }],
    originX: 24,
    originY: 24,
  }));
  const pupilProps = useAnimatedProps(() => ({
    transform: [{ scaleY: lidsScaleY.value }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={EyePaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={lidsProps} d={EyePaths.lids}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={irisProps} d={EyePaths.iris}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={pupilProps} d={EyePaths.pupil} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
