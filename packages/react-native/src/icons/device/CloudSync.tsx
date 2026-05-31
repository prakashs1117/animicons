import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { CloudSyncPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const CloudSync: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CloudSyncPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(
        withTiming(360, { duration: d.long, easing: Easing.linear }),
        loop ? -1 : 1,
        false,
      );
    } else {
      cancelAnimation(rotation);
      rotation.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const spinProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={CloudSyncPaths.viewBox} style={style as any}>
      <Path d={CloudSyncPaths.cloud} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={spinProps} d={CloudSyncPaths.arc}   stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={spinProps} d={CloudSyncPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
