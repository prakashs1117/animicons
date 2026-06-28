import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ChevronUpPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ChevronUp: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const ty = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ChevronUpPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      ty.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(ty);
      ty.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const chevronProps = useAnimatedProps(() => ({
    transform: [{ translateY: ty.value }],
  }));

  return (
    <Svg width={size} height={size} viewBox={ChevronUpPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={chevronProps}
        d={ChevronUpPaths.chevron}
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
