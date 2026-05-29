import React, { useEffect } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps, useAnimatedStyle,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ThermometerPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Thermometer: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const mercuryScale = useSharedValue(0.2);
  const tubeRotation = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ThermometerPaths);

  useEffect(() => {
    if (autoPlay) {
      mercuryScale.value = withRepeat(withTiming(1, { duration: d.long * 0.7, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
      tubeRotation.value = withRepeat(
        withSequence(
          withTiming(0, { duration: d.long * 0.6 }),
          withTiming(3, { duration: d.long * 0.1 }),
          withTiming(-3, { duration: d.long * 0.1 }),
          withTiming(2, { duration: d.long * 0.1 }),
          withTiming(0, { duration: d.long * 0.1 }),
        ), loop ? -1 : 1
      );
    } else {
      cancelAnimation(mercuryScale); cancelAnimation(tubeRotation);
    }
  }, [autoPlay, loop, speed]);

  const mercuryProps = useAnimatedProps(() => ({ transform: [{ scaleY: mercuryScale.value }], originY: 34 }));
  const tubeStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${tubeRotation.value}deg` }] }));

  return (
    <Svg width={size} height={size} viewBox={ThermometerPaths.viewBox} style={style as any}>
      <Animated.View style={[{ position: 'absolute' }, tubeStyle]}>
        <Svg width={size} height={size} viewBox={ThermometerPaths.viewBox} style={{ position: 'absolute' }}>
          <Path d={ThermometerPaths.tube} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        </Svg>
      </Animated.View>
      <AnimatedPath animatedProps={mercuryProps} d={ThermometerPaths.mercury} fill={s.fill} opacity={s.opacity} />
      <Circle cx="24" cy="40" r={5} fill={s.fill} opacity={s.opacity} />
    </Svg>
  );
};
