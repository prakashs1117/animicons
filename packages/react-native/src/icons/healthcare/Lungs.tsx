import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { LungsPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Lungs: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const scaleL = useSharedValue(1);
  const scaleR = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LungsPaths);

  useEffect(() => {
    if (autoPlay) {
      scaleL.value = withRepeat(withTiming(1.08, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
      scaleR.value = withRepeat(withTiming(1.08, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
    } else {
      cancelAnimation(scaleL); cancelAnimation(scaleR);
    }
  }, [autoPlay, loop, speed]);

  const leftProps = useAnimatedProps(() => ({ transform: [{ scaleX: scaleL.value }, { scaleY: scaleL.value }], originX: 16, originY: 26 }));
  const rightProps = useAnimatedProps(() => ({ transform: [{ scaleX: scaleR.value }, { scaleY: scaleR.value }], originX: 32, originY: 26 }));

  return (
    <Svg width={size} height={size} viewBox={LungsPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={leftProps} d={LungsPaths.leftLobe} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
      <AnimatedPath animatedProps={rightProps} d={LungsPaths.rightLobe} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
      <Path d={LungsPaths.trunk} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
