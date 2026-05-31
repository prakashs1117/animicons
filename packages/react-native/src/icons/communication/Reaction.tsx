import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ReactionPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Reaction: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const faceScale = useSharedValue(1);
  const neutralOp = useSharedValue(1);
  const smileOp = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ReactionPaths);

  useEffect(() => {
    if (autoPlay) {
      faceScale.value = withRepeat(withSequence(
        withTiming(1.04, { duration: d.long * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0,  { duration: d.long * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      neutralOp.value = withRepeat(withSequence(
        withTiming(1, { duration: d.long * 0.2 }),
        withTiming(0, { duration: d.long * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: d.long * 0.3 }),
        withTiming(1, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      smileOp.value = withRepeat(withSequence(
        withTiming(0, { duration: d.long * 0.2 }),
        withTiming(1, { duration: d.long * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: d.long * 0.3 }),
        withTiming(0, { duration: d.long * 0.2, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(faceScale); cancelAnimation(neutralOp); cancelAnimation(smileOp);
      faceScale.value = withTiming(1, { duration: 150 });
      neutralOp.value = withTiming(1, { duration: 150 });
      smileOp.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const faceProps    = useAnimatedProps(() => ({ transform: [{ scale: faceScale.value }], originX: 24, originY: 24 }));
  const neutralProps = useAnimatedProps(() => ({ opacity: neutralOp.value }));
  const smileProps   = useAnimatedProps(() => ({ opacity: smileOp.value }));

  return (
    <Svg width={size} height={size} viewBox={ReactionPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={faceProps}    d={ReactionPaths.face} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={ReactionPaths.eye1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
      <Path d={ReactionPaths.eye2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} opacity={s.opacity} />
      <AnimatedPath animatedProps={neutralProps} d="M16 28 L32 28"         stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
      <AnimatedPath animatedProps={smileProps}   d="M16 28 Q24 36 32 28"  stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" />
    </Svg>
  );
};
