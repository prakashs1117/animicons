import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps, useAnimatedStyle,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { PillPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Pill: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const translateY = useSharedValue(0);
  const shineOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PillPaths);

  useEffect(() => {
    if (autoPlay) {
      translateY.value = withRepeat(withTiming(-5, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
      shineOp.value = withRepeat(withTiming(0.8, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
    } else {
      cancelAnimation(translateY); cancelAnimation(shineOp);
    }
  }, [autoPlay, loop, speed]);

  const bodyStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));
  const shineProps = useAnimatedProps(() => ({ opacity: shineOp.value }));

  return (
    <Svg width={size} height={size} viewBox={PillPaths.viewBox} style={style as any}>
      <Animated.View style={[{ position: 'absolute' }, bodyStyle]}>
        <Svg width={size} height={size} viewBox={PillPaths.viewBox} style={{ position: 'absolute' }}>
          <Path d={PillPaths.capsule} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
          <Path d={PillPaths.divider} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        </Svg>
      </Animated.View>
      <AnimatedPath animatedProps={shineProps} d={PillPaths.shine} stroke="white" strokeWidth={2} fill="none" strokeLinecap="round" />
    </Svg>
  );
};
