import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { DownloadPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Download: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const arrowY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, DownloadPaths);

  useEffect(() => {
    if (autoPlay) {
      arrowY.value = withRepeat(withSequence(
        withTiming(8, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(arrowY);
      arrowY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const arrowProps = useAnimatedProps(() => ({
    transform: [{ translateY: arrowY.value }],
    originX: 24,
    originY: 20,
  }));

  return (
    <Svg width={size} height={size} viewBox={DownloadPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={arrowProps} d={DownloadPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <Path d={DownloadPaths.bar} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
