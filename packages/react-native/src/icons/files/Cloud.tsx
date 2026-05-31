import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { CloudPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Cloud: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const arrowY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CloudPaths);

  useEffect(() => {
    if (autoPlay) {
      arrowY.value = withRepeat(withSequence(
        withTiming(6,  { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(arrowY);
      arrowY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const arrowProps = useAnimatedProps(() => ({ transform: [{ translateY: arrowY.value }] }));

  return (
    <Svg width={size} height={size} viewBox={CloudPaths.viewBox} style={style as any}>
      <Path d={CloudPaths.cloud} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={arrowProps} d={CloudPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
