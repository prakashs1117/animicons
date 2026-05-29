import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { OxygenPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Oxygen: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, OxygenPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-o2-orbit-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ai-o2-orbit-${uid} {
          animation: ai-o2-orbit-${uid} ${d.long}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={OxygenPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={OxygenPaths.orbit} stroke={s.secondaryColor} strokeWidth="1" fill="none" strokeDasharray="3 3" opacity={s.opacity} />
        <Circle cx="18" cy="20" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Circle cx="26" cy="20" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={OxygenPaths.bond} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle {...({ className: `ai-o2-orbit-${uid}` } as any)} cx="40" cy="24" r="2.5" fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
