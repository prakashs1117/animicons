import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ImagePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Image: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const sunY = useSharedValue(0);
  const frameOp = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ImagePaths);

  useEffect(() => {
    if (autoPlay) {
      sunY.value = withRepeat(withSequence(
        withTiming(-5, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      frameOp.value = withRepeat(withSequence(
        withTiming(0.7, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(sunY); cancelAnimation(frameOp);
      sunY.value = withTiming(0, { duration: 150 });
      frameOp.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const sunProps   = useAnimatedProps(() => ({ transform: [{ translateY: sunY.value }] }));
  const frameProps = useAnimatedProps(() => ({ opacity: frameOp.value * s.opacity }));

  return (
    <Svg width={size} height={size} viewBox={ImagePaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={frameProps} d={ImagePaths.frame}    stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} />
      <AnimatedPath animatedProps={frameProps} d={ImagePaths.mountain} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.stroke} opacity={s.opacity} />
      <AnimatedPath animatedProps={sunProps}   d={ImagePaths.sun}      stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
    </Svg>
  );
};
