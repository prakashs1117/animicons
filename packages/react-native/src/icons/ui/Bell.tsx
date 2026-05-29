import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { BellPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Bell: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const rotation = useSharedValue(0);
  const badgeScale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BellPaths);

  useEffect(() => {
    if (autoPlay) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(15, { duration: d.long * 0.2 }),
          withTiming(-15, { duration: d.long * 0.2 }),
          withTiming(8, { duration: d.long * 0.2 }),
          withTiming(-8, { duration: d.long * 0.2 }),
          withTiming(0, { duration: d.long * 0.2 }),
        ), loop ? -1 : 1
      );
      badgeScale.value = withRepeat(
        withSequence(withTiming(1.3, { duration: d.long * 0.3 }), withTiming(1, { duration: d.long * 0.7 })),
        loop ? -1 : 1
      );
    } else {
      cancelAnimation(rotation); cancelAnimation(badgeScale);
    }
  }, [autoPlay, loop, speed]);

  const bellStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));
  const badgeStyle = useAnimatedStyle(() => ({ transform: [{ scale: badgeScale.value }] }));

  return (
    <Svg width={size} height={size} viewBox={BellPaths.viewBox} style={style as any}>
      <Animated.View style={[{ position: 'absolute' }, bellStyle]}>
        <Svg width={size} height={size} viewBox={BellPaths.viewBox} style={{ position: 'absolute' }}>
          <Path d={BellPaths.bell} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
          <Path d={BellPaths.clapper} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
          <Path d={BellPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
        </Svg>
      </Animated.View>
      <Animated.View style={[{ position: 'absolute' }, badgeStyle]}>
        <Svg width={size} height={size} viewBox={BellPaths.viewBox} style={{ position: 'absolute' }}>
          <Circle cx="34" cy="12" r={5} fill={s.stroke} opacity={s.opacity} />
        </Svg>
      </Animated.View>
    </Svg>
  );
};
