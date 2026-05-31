import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing, runOnJS,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { ECGPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const ECG: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const dashOffset = useSharedValue(100);
  const opacity = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ECGPaths);

  useEffect(() => {
    if (autoPlay) {
      dashOffset.value = withRepeat(withTiming(0, { duration: d.long * 0.7, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, false,
        () => { if (!loop && onAnimationEnd) runOnJS(onAnimationEnd)(); }
      );
      opacity.value = withRepeat(withTiming(0, { duration: d.long * 0.3, easing: Easing.ease }), loop ? -1 : 1);
    } else {
      cancelAnimation(dashOffset); cancelAnimation(opacity);
    }
  }, [autoPlay, loop, speed, onAnimationEnd]);

  const animProps = useAnimatedProps(() => ({ strokeDashoffset: dashOffset.value, opacity: opacity.value }));

  return (
    <Svg width={size} height={size} viewBox={ECGPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={animProps} d={ECGPaths.line} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={100} />
    </Svg>
  );
};
