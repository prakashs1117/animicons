import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withTiming, withDelay, withRepeat, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { CheckPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Check: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal',
  onAnimationEnd, style, ...colorProps
}) => {
  const circleProgress = useSharedValue(126);
  const checkProgress = useSharedValue(30);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CheckPaths);

  useEffect(() => {
    if (autoPlay) {
      if (loop) {
        circleProgress.value = withRepeat(withTiming(0, { duration: d.short, easing: Easing.ease }), -1);
        checkProgress.value = withRepeat(withDelay(d.short * 0.6, withTiming(0, { duration: d.short * 0.6, easing: Easing.ease })), -1);
      } else {
        circleProgress.value = withTiming(0, { duration: d.short, easing: Easing.ease });
        checkProgress.value = withDelay(d.short * 0.6, withTiming(0, { duration: d.short * 0.6, easing: Easing.ease }));
      }
    } else {
      cancelAnimation(circleProgress); cancelAnimation(checkProgress);
    }
  }, [autoPlay, loop, speed]);

  const circleProps = useAnimatedProps(() => ({ strokeDashoffset: circleProgress.value }));
  const checkProps = useAnimatedProps(() => ({ strokeDashoffset: checkProgress.value }));

  return (
    <Svg width={size} height={size} viewBox={CheckPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={circleProps} d={CheckPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeDasharray={126} opacity={s.opacity} />
      <AnimatedPath animatedProps={checkProps} d={CheckPaths.check} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeDasharray={30} strokeLinecap="round" opacity={s.opacity} />
    </Svg>
  );
};
