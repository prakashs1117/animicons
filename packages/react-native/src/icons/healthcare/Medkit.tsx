import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { MedkitPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Medkit: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const bodyY = useSharedValue(0);
  const crossScale = useSharedValue(1);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MedkitPaths);

  useEffect(() => {
    if (autoPlay) {
      bodyY.value = withRepeat(withTiming(-5, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
      crossScale.value = withRepeat(withTiming(1.2, { duration: d.long, easing: Easing.inOut(Easing.ease) }), loop ? -1 : 1, true);
    } else {
      cancelAnimation(bodyY); cancelAnimation(crossScale);
    }
  }, [autoPlay, loop, speed]);

  const boxProps = useAnimatedProps(() => ({ transform: [{ translateY: bodyY.value }] }));
  const handleProps = useAnimatedProps(() => ({ transform: [{ translateY: bodyY.value }] }));
  const crossProps = useAnimatedProps(() => ({ transform: [{ translateY: bodyY.value }, { scale: crossScale.value }], originX: 24, originY: 27 }));

  return (
    <Svg width={size} height={size} viewBox={MedkitPaths.viewBox} style={style as any}>
      <AnimatedPath animatedProps={boxProps} d={MedkitPaths.box} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      <AnimatedPath animatedProps={handleProps} d={MedkitPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
      <AnimatedPath animatedProps={crossProps} d={`${MedkitPaths.crossV} ${MedkitPaths.crossH}`} stroke={s.fill} strokeWidth={3} strokeLinecap="round" fill="none" opacity={s.opacity} />
    </Svg>
  );
};
