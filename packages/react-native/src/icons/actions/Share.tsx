import React, { useEffect } from 'react';
import { Svg, Path } from 'react-native-svg';
import Animated, {
  useSharedValue, useAnimatedProps,
  withRepeat, withSequence, withTiming, cancelAnimation, Easing,
} from 'react-native-reanimated';
import type { IconProps } from '@animicons/shared';
import { SharePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const Share: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
}) => {
  const centerScale = useSharedValue(1);
  const n1X = useSharedValue(0); const n1Y = useSharedValue(0);
  const n2X = useSharedValue(0); const n2Y = useSharedValue(0);
  const n3Y = useSharedValue(0);
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SharePaths);

  useEffect(() => {
    if (autoPlay) {
      centerScale.value = withRepeat(withSequence(
        withTiming(1.4, { duration: d.medium * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: d.medium * 0.2, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: d.medium * 0.5, easing: Easing.inOut(Easing.ease) }),
      ), loop ? -1 : 1);
      n1X.value = withRepeat(withSequence(withTiming(-4, { duration: d.medium * 0.4 }), withTiming(0, { duration: d.medium * 0.6 })), loop ? -1 : 1);
      n1Y.value = withRepeat(withSequence(withTiming(-6, { duration: d.medium * 0.4 }), withTiming(0, { duration: d.medium * 0.6 })), loop ? -1 : 1);
      n2X.value = withRepeat(withSequence(withTiming(4,  { duration: d.medium * 0.4 }), withTiming(0, { duration: d.medium * 0.6 })), loop ? -1 : 1);
      n2Y.value = withRepeat(withSequence(withTiming(-6, { duration: d.medium * 0.4 }), withTiming(0, { duration: d.medium * 0.6 })), loop ? -1 : 1);
      n3Y.value  = withRepeat(withSequence(withTiming(8,  { duration: d.medium * 0.4 }), withTiming(0, { duration: d.medium * 0.6 })), loop ? -1 : 1);
    } else {
      cancelAnimation(centerScale);
      cancelAnimation(n1X); cancelAnimation(n1Y);
      cancelAnimation(n2X); cancelAnimation(n2Y);
      cancelAnimation(n3Y);
      centerScale.value = withTiming(1, { duration: 150 });
      n1X.value = withTiming(0, { duration: 150 }); n1Y.value = withTiming(0, { duration: 150 });
      n2X.value = withTiming(0, { duration: 150 }); n2Y.value = withTiming(0, { duration: 150 });
      n3Y.value = withTiming(0, { duration: 150 });
    }
  }, [autoPlay, loop, speed]);

  const centerProps = useAnimatedProps(() => ({ transform: [{ scale: centerScale.value }], originX: 24, originY: 24 }));
  const node1Props  = useAnimatedProps(() => ({ transform: [{ translateX: n1X.value }, { translateY: n1Y.value }], originX: 12, originY: 14 }));
  const node2Props  = useAnimatedProps(() => ({ transform: [{ translateX: n2X.value }, { translateY: n2Y.value }], originX: 36, originY: 14 }));
  const node3Props  = useAnimatedProps(() => ({ transform: [{ translateY: n3Y.value }], originX: 24, originY: 38 }));

  return (
    <Svg width={size} height={size} viewBox={SharePaths.viewBox} style={style as any}>
      <Path d={SharePaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <Path d={SharePaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <Path d={SharePaths.line3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
      <AnimatedPath animatedProps={centerProps} d={SharePaths.center} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      <AnimatedPath animatedProps={node1Props}  d={SharePaths.node1}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      <AnimatedPath animatedProps={node2Props}  d={SharePaths.node2}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      <AnimatedPath animatedProps={node3Props}  d={SharePaths.node3}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
    </Svg>
  );
};
