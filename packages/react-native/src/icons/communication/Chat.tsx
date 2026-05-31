import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ChatPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Chat: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const bubbleScale = useSharedValue(1);
  const d1Y = useSharedValue(0); const d2Y = useSharedValue(0); const d3Y = useSharedValue(0);
  const d1Op = useSharedValue(0.3); const d2Op = useSharedValue(0.3); const d3Op = useSharedValue(0.3);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ChatPaths);

  useEffect(() => {
    if (autoPlay) {
      bubbleScale.value = withRepeat(withSequence(
        withTiming(1.05, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);

      const dotAnim = (yVal: Animated.SharedValue<number>, opVal: Animated.SharedValue<number>, delay: number) => {
        yVal.value = withDelay(delay, withRepeat(withSequence(
          withTiming(-3, { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
          withTiming(0,  { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
          withTiming(0,  { duration: d.medium * 0.4 }),
        ), loop ? -1 : 1));
        opVal.value = withDelay(delay, withRepeat(withSequence(
          withTiming(1,   { duration: d.medium * 0.3 }),
          withTiming(0.3, { duration: d.medium * 0.3 }),
          withTiming(0.3, { duration: d.medium * 0.4 }),
        ), loop ? -1 : 1));
      };
      dotAnim(d1Y, d1Op, 0);
      dotAnim(d2Y, d2Op, d.stagger);
      dotAnim(d3Y, d3Op, d.stagger * 2);
    } else {
      cancelAnimation(bubbleScale);
      cancelAnimation(d1Y); cancelAnimation(d2Y); cancelAnimation(d3Y);
      cancelAnimation(d1Op); cancelAnimation(d2Op); cancelAnimation(d3Op);
      bubbleScale.value = withTiming(1, { duration: 150 });
      d1Y.value = withTiming(0, { duration: 150 }); d2Y.value = withTiming(0, { duration: 150 }); d3Y.value = withTiming(0, { duration: 150 });
      d1Op.value = withTiming(1, { duration: 150 }); d2Op.value = withTiming(1, { duration: 150 }); d3Op.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const bubbleProps = useAnimatedProps(() => ({ transform: [{ scale: bubbleScale.value }], originX: 24, originY: 20 }));
  const dot1Props   = useAnimatedProps(() => ({ transform: [{ translateY: d1Y.value }], opacity: d1Op.value, originX: 17, originY: 20 }));
  const dot2Props   = useAnimatedProps(() => ({ transform: [{ translateY: d2Y.value }], opacity: d2Op.value, originX: 24, originY: 20 }));
  const dot3Props   = useAnimatedProps(() => ({ transform: [{ translateY: d3Y.value }], opacity: d3Op.value, originX: 31, originY: 20 }));

  return (
    <Svg width={size} height={size} viewBox={ChatPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={bubbleProps} d={ChatPaths.bubble} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={dot1Props}   d={ChatPaths.dot1}   stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} />
      <AnimatedPath animatedProps={dot2Props}   d={ChatPaths.dot2}   stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} />
      <AnimatedPath animatedProps={dot3Props}   d={ChatPaths.dot3}   stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.stroke} />
    </Svg>
  );
};
