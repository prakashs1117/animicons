import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { VideoPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Video: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const dotOpacity = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, VideoPaths);

  useEffect(() => {
    if (autoPlay) {
      dotOpacity.value = withRepeat(withSequence(
        withTiming(0.1, { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.long * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(dotOpacity);
      dotOpacity.value = withTiming(1, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const dotProps = useAnimatedProps(() => ({ opacity: dotOpacity.value }));

  return (
    <Svg width={size} height={size} viewBox={VideoPaths.viewBox} style={style as any}>
      <Path d={VideoPaths.body}     stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={VideoPaths.playhead} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={dotProps} d={VideoPaths.dot} fill="#ef4444" stroke="none" />
    </Svg>
  );
};
