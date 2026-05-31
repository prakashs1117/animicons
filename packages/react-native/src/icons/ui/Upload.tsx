import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { UploadPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Upload: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const translateY = useSharedValue(0);
  const barDash = useSharedValue(28);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UploadPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(
        withTiming(-6, { duration: d.short, easing: Easing.inOut(Easing.ease) }),
        loop ? -1 : 1, true
      );
      barDash.value = withRepeat(
        withTiming(0, { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
        loop ? -1 : 1, true
      );
    } else {
      cancelAnimation(translateY); cancelAnimation(barDash);
    }
  }, [autoPlay, loop, speed]);

  const arrowProps = useAnimatedProps(() => ({ transform: [{ translateY: translateY.value }] }));
  const barProps = useAnimatedProps(() => ({ strokeDashoffset: barDash.value }));

  return (
    <Svg width={size} height={size} viewBox={UploadPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={arrowProps} d={UploadPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      <AnimatedPath animatedProps={barProps} d={UploadPaths.bar} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" strokeDasharray={28} opacity={s.opacity} />
    </Svg>
  );
};
