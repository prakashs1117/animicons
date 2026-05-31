import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { AttachmentPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Attachment: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const swing = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, AttachmentPaths);

  useEffect(() => {
    if (autoPlay) {
      swing.value = withRepeat(withSequence(
        withTiming(-10, { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(10,  { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(0,   { duration: d.medium * 0.2, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
    } else {
      cancelAnimation(swing);
      swing.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const clipProps = useAnimatedProps(() => ({
    transform: [{ rotate: `${swing.value}deg` }],
    originX: 24,
    originY: 6,
  }));

  return (
    <Svg width={size} height={size} viewBox={AttachmentPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={clipProps} d={AttachmentPaths.clip} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
