import React, { useId } from 'react';
import { Svg, Circle } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { PulsePaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Pulse: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', style, ...colorProps
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
          0%   { r: 4; opacity: 0.8; }
          100% { r: 20; opacity: 0; }
        }
        .ai-pulse-r1-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-pulse-r2-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
        .ai-pulse-r3-${uid} { animation: ai-pulse-ring-${uid} ${d.medium}ms ease-out ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={PulsePaths.viewBox} style={style as any}>
        <Circle {...({ className: `ai-pulse-r1-${uid}` } as any)} cx="24" cy="24" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle {...({ className: `ai-pulse-r2-${uid}` } as any)} cx="24" cy="24" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle {...({ className: `ai-pulse-r3-${uid}` } as any)} cx="24" cy="24" r="4" stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Circle cx="24" cy="24" r="3" fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
