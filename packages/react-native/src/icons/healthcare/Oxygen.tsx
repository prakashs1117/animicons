import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { OxygenPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const Oxygen: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, OxygenPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(withTiming(360, { duration: d.long, easing: Easing.linear }), loop ? -1 : 1);
    } else {
      cancelAnimation(rotation);
    }
  }, [autoPlay, loop, speed]);

  const electronProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    originX: 24, originY: 24,
  }));

  return (
    <Svg width={size} height={size} viewBox={OxygenPaths.viewBox} style={style as any}>
      <Path d={OxygenPaths.orbit} stroke={s.secondaryColor} strokeWidth={1} fill="none" strokeDasharray="3 3" opacity={s.opacity} />
      <Circle cx="18" cy="20" r={4} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Circle cx="26" cy="20" r={4} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={OxygenPaths.bond} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedCircle animatedProps={electronProps} cx="40" cy="24" r={2.5} fill={s.fill} opacity={s.opacity} />
    </Svg>
  );
};
