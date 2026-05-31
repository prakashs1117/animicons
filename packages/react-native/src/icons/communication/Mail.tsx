import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { MailPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Mail: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const flapScaleY = useSharedValue(1);
  const letterY = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MailPaths);

  useEffect(() => {
    if (autoPlay) {
      flapScaleY.value = withRepeat(withSequence(
        withTiming(-0.3, { duration: d.long * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0,  { duration: d.long * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0,  { duration: d.long * 0.3 }),
      ), loop ? -1 : 1);
      letterY.value = withRepeat(withSequence(
        withTiming(-8, { duration: d.long * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.long * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.long * 0.2 }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(flapScaleY); cancelAnimation(letterY);
      flapScaleY.value = withTiming(1, { duration: 150 });
      letterY.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const flapProps = useAnimatedProps(() => ({
    transform: [{ scaleY: flapScaleY.value }],
    originX: 24,
    originY: 12,
  }));
  const letterProps = useAnimatedProps(() => ({
    transform: [{ translateY: letterY.value }],
    originX: 24,
    originY: 25,
  }));

  return (
    <Svg width={size} height={size} viewBox={MailPaths.viewBox} style={style as any}>
      <Path d={MailPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={flapProps}   d={MailPaths.flap}   stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={letterProps} d={MailPaths.letter} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
