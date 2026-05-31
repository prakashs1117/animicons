import React, { useId } from 'react';
import { Svg, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { PulsePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Pulse: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PulsePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-pulse-ring-${uid} {
          0%   { transform: scale(0.2); opacity: 0.8; }
          100% { transform: scale(1);   opacity: 0; }
        }
        .ai-pulse-r1-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; transform-origin: 24px 24px; }
        .ai-pulse-r2-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; transform-origin: 24px 24px; }
        .ai-pulse-r3-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; transform-origin: 24px 24px; }
      `}</style>
      <Svg width={size} height={size} viewBox={PulsePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Circle {...({ className: `ai-pulse-r1-${uid}` } as any)} cx="24" cy="24" r="20" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle {...({ className: `ai-pulse-r2-${uid}` } as any)} cx="24" cy="24" r="20" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle {...({ className: `ai-pulse-r3-${uid}` } as any)} cx="24" cy="24" r="20" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle cx="24" cy="24" r="3" fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
