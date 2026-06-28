import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { UndoPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Undo: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const rot = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UndoPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      rot.value = withRepeat(
        withTiming(-360, { duration: d.long, easing: Easing.linear }),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(rot);
      rot.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const arcProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rot.value}deg` }],
    originX: 24,
    originY: 24,
  }));
  const headProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rot.value}deg` }],
    originX: 24,
    originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={UndoPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={arcProps}
        d={UndoPaths.arc}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={headProps}
        d={UndoPaths.head}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={s.opacity}
      />
    </Svg>
  );
};
