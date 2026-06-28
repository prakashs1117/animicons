import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ChevronRightPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ChevronRight: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const tx = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ChevronRightPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      tx.value = withRepeat(
        withSequence(
          withTiming(6, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        ),
        loop ? -1 : 1, false, cb
      );
    } else {
      cancelAnimation(tx);
      tx.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const chevronProps = useAnimatedProps(() => ({
    transform: [{ translateX: tx.value }],
  }));

  return (
    <Svg width={size} height={size} viewBox={ChevronRightPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={chevronProps}
        d={ChevronRightPaths.chevron}
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
