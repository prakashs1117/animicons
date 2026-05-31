import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withSequence, withTiming, withDelay, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { DocumentPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Document: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const dash1 = useSharedValue(18);
  const dash2 = useSharedValue(18);
  const dash3 = useSharedValue(18);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, DocumentPaths);

  useEffect(() => {
    if (autoPlay) {
      dash1.value = withDelay(0, withSequence(
        withTiming(18, { duration: 0 }),
        withTiming(0, { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
      ));
      dash2.value = withDelay(d.stagger, withSequence(
        withTiming(18, { duration: 0 }),
        withTiming(0, { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
      ));
      dash3.value = withDelay(d.stagger * 2, withSequence(
        withTiming(18, { duration: 0 }),
        withTiming(0, { duration: d.medium, easing: Easing.inOut(Easing.ease) }),
      ));
    } else {
      cancelAnimation(dash1); cancelAnimation(dash2); cancelAnimation(dash3);
      dash1.value = withTiming(18, { duration: 150 });
      dash2.value = withTiming(18, { duration: 150 });
      dash3.value = withTiming(18, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const line1Props = useAnimatedProps(() => ({ strokeDashoffset: dash1.value }));
  const line2Props = useAnimatedProps(() => ({ strokeDashoffset: dash2.value }));
  const line3Props = useAnimatedProps(() => ({ strokeDashoffset: dash3.value }));

  return (
    <Svg width={size} height={size} viewBox={DocumentPaths.viewBox} style={style as any}>
      <Path d={DocumentPaths.page} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <Path d={DocumentPaths.fold} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={line1Props} d={DocumentPaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" strokeDasharray={18} opacity={s.opacity} />
      <AnimatedPath animatedProps={line2Props} d={DocumentPaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" strokeDasharray={18} opacity={s.opacity} />
      <AnimatedPath animatedProps={line3Props} d={DocumentPaths.line3} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" strokeDasharray={18} opacity={s.opacity} />
    </Svg>
  );
};
