import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { GridPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Grid: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const sc1 = useSharedValue(0);
  const sc2 = useSharedValue(0);
  const sc3 = useSharedValue(0);
  const sc4 = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, GridPaths);

  useEffect(() => {
    if (autoPlay) {
      const pop = (sv: Animated.SharedValue<number>, delay: number) => {
        sv.value = withDelay(delay, withRepeat(withSequence(
          withTiming(1.1, { duration: d.medium * 0.7, easing: Easing.out(Easing.back(2)) }),
          withTiming(1.0, { duration: d.medium * 0.3 }),
        ), loop ? -1 : 1));
      };
      pop(sc1, 0);
      pop(sc2, d.stagger);
      pop(sc3, d.stagger * 2);
      pop(sc4, d.stagger * 3);
    } else {
      cancelAnimation(sc1); cancelAnimation(sc2); cancelAnimation(sc3); cancelAnimation(sc4);
      sc1.value = withTiming(1, { duration: 150 });
      sc2.value = withTiming(1, { duration: 150 });
      sc3.value = withTiming(1, { duration: 150 });
      sc4.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const tlProps = useAnimatedProps(() => ({ transform: [{ scale: sc1.value }], originX: 15, originY: 15 }));
  const trProps = useAnimatedProps(() => ({ transform: [{ scale: sc2.value }], originX: 33, originY: 15 }));
  const blProps = useAnimatedProps(() => ({ transform: [{ scale: sc3.value }], originX: 15, originY: 33 }));
  const brProps = useAnimatedProps(() => ({ transform: [{ scale: sc4.value }], originX: 33, originY: 33 }));

  return (
    <Svg width={size} height={size} viewBox={GridPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={tlProps} d={GridPaths.tl} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={trProps} d={GridPaths.tr} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={blProps} d={GridPaths.bl} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={brProps} d={GridPaths.br} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
    </Svg>
  );
};
