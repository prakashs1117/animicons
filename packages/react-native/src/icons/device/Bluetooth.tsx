import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BluetoothPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Bluetooth: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const r1Op = useSharedValue(0.4);
  const r2Op = useSharedValue(0.4);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BluetoothPaths);

  useEffect(() => {
    if (autoPlay) {
      r1Op.value = withRepeat(withSequence(
        withTiming(1.0, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      r2Op.value = withDelay(d.stagger, withRepeat(withSequence(
        withTiming(1.0, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1));
    } else {
      cancelAnimation(r1Op); cancelAnimation(r2Op);
      r1Op.value = withTiming(1, { duration: 150 });
      r2Op.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const ring1Props = useAnimatedProps(() => ({ opacity: r1Op.value }));
  const ring2Props = useAnimatedProps(() => ({ opacity: r2Op.value }));

  return (
    <Svg width={size} height={size} viewBox={BluetoothPaths.viewBox} style={style as any}>
      <Path d={BluetoothPaths.symbol} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={ring1Props} d={BluetoothPaths.ring1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
      <AnimatedPath animatedProps={ring2Props} d={BluetoothPaths.ring2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
    </Svg>
  );
};
