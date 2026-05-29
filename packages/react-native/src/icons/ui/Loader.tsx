import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation,
  Easing, runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { LoaderPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Loader: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal',
  onAnimationEnd, style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LoaderPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(
        withTiming(360, { duration: d.medium, easing: Easing.linear }),
        loop ? -1 : 1,
        false,
        () => { if (onAnimationEnd) runOnJS(onAnimationEnd)(); }
      );
    } else {
      cancelAnimation(rotation);
    }
    return () => { cancelAnimation(rotation); };
  }, [autoPlay, loop, speed, onAnimationEnd]);

  const animatedProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={LoaderPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={animatedProps}
        d={LoaderPaths.arc}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
    </Svg>
  );
};
