import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { FolderPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Folder: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const tabY = useSharedValue(0);
  const tabRot = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, FolderPaths);

  useEffect(() => {
    if (autoPlay) {
      tabY.value = withRepeat(withSequence(
        withTiming(-4, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      tabRot.value = withRepeat(withSequence(
        withTiming(-6, { duration: d.medium * 0.4, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,  { duration: d.medium * 0.6, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(tabY); cancelAnimation(tabRot);
      tabY.value = withTiming(0, { duration: 150 });
      tabRot.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const tabProps = useAnimatedProps(() => ({
    transform: [{ translateY: tabY.value }, { rotate: `${tabRot.value}deg` }],
    originX: 4,
    originY: 16,
  }));

  return (
    <Svg width={size} height={size} viewBox={FolderPaths.viewBox} style={style as any}>
      <Path d={FolderPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinejoin="round" fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={tabProps} d={FolderPaths.tab} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
