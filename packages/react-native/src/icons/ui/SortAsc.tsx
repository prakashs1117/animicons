import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SortAscPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const SortAsc: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, onAnimationEnd, ...colorProps
}) => {
  const b1 = useSharedValue(0);
  const b2 = useSharedValue(0);
  const b3 = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SortAscPaths);

  useEffect(() => {
    const cb = onAnimationEnd ? () => { 'worklet'; runOnJS(onAnimationEnd)(); } : undefined;
    if (autoPlay) {
      const seq = () => withSequence(
        withTiming(-5, { duration: d.medium * 0.3 }),
        withTiming(0, { duration: d.medium * 0.7 }),
      );
      b1.value = withRepeat(seq(), loop ? -1 : 1, false, cb);
      b2.value = withDelay(d.stagger, withRepeat(seq(), loop ? -1 : 1));
      b3.value = withDelay(d.stagger * 2, withRepeat(seq(), loop ? -1 : 1));
    } else {
      cancelAnimation(b1); cancelAnimation(b2); cancelAnimation(b3);
      b1.value = withTiming(0, { duration: 150 });
      b2.value = withTiming(0, { duration: 150 });
      b3.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const bar1Props = useAnimatedProps(() => ({ transform: [{ translateY: b1.value }] }));
  const bar2Props = useAnimatedProps(() => ({ transform: [{ translateY: b2.value }] }));
  const bar3Props = useAnimatedProps(() => ({ transform: [{ translateY: b3.value }] }));

  return (
    <Svg width={size} height={size} viewBox={SortAscPaths.viewBox} style={style as any}>
      <AnimatedPath
        animatedProps={bar1Props}
        d={SortAscPaths.bar1}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={bar2Props}
        d={SortAscPaths.bar2}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
      <AnimatedPath
        animatedProps={bar3Props}
        d={SortAscPaths.bar3}
        stroke={s.stroke}
        strokeWidth={s.strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity={s.opacity}
      />
    </Svg>
  );
};
