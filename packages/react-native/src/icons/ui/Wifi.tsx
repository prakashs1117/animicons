import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { WifiPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Wifi: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const op1 = useSharedValue(0);
  const op2 = useSharedValue(0);
  const op3 = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, WifiPaths);

  useEffect(() => {
    if (autoPlay) {
      const anim = (sv: typeof op1, delay: number) => {
        sv.value = withDelay(delay, withRepeat(
          withTiming(1, { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
          loop ? -1 : 1, true
        ));
      };
      anim(op1, 0); anim(op2, d.stagger); anim(op3, d.stagger * 2);
    } else {
      cancelAnimation(op1); cancelAnimation(op2); cancelAnimation(op3);
    }
    return () => { cancelAnimation(op1); cancelAnimation(op2); cancelAnimation(op3); };
  }, [autoPlay, loop, speed]);

  const ap1 = useAnimatedProps(() => ({ opacity: op1.value }));
  const ap2 = useAnimatedProps(() => ({ opacity: op2.value }));
  const ap3 = useAnimatedProps(() => ({ opacity: op3.value }));

  return (
    <Svg width={size} height={size} viewBox={WifiPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={ap1} d={WifiPaths.arc1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" />
      <AnimatedPath animatedProps={ap2} d={WifiPaths.arc2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" />
      <AnimatedPath animatedProps={ap3} d={WifiPaths.arc3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" />
      <Circle cx="24" cy="40" r={2} fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
