import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { EditPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Edit: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', style, ...colorProps
}) => {
  const tipX = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, EditPaths);

  useEffect(() => {
    if (autoPlay) {
      tipX.value = withRepeat(withSequence(
        withTiming(10, { duration: d.long * 0.5, easing: Easing.linear }),
        withTiming(0,  { duration: d.long * 0.5, easing: Easing.linear }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(tipX);
      tipX.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const tipProps = useAnimatedProps(() => ({
    transform: [{ translateX: tipX.value }],
    originX: 12,
    originY: 36,
  }));

  return (
    <Svg width={size} height={size} viewBox={EditPaths.viewBox} style={style as any}>
      <Path d={EditPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={EditPaths.line} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <Path d={EditPaths.trace} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={tipProps} d={EditPaths.tip} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
