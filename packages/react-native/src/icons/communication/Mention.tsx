import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { MentionPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Mention: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MentionPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(
        withTiming(360, { duration: d.medium, easing: Easing.linear }), loop ? -1 : 1, false
      );
    } else {
      cancelAnimation(rotation);
      rotation.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const ringProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={MentionPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={ringProps} d={MentionPaths.ring} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <Path d={MentionPaths.inner} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <Path d={MentionPaths.tail}  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
