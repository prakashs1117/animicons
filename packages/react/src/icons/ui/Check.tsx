import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { CheckPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Check: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CheckPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-check-circle-${uid} {
          from { stroke-dashoffset: 126; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes ai-check-mark-${uid} {
          from { stroke-dashoffset: 30; }
          to   { stroke-dashoffset: 0; }
        }
        .ai-check-circle-${uid} {
          stroke-dasharray: 126;
          animation: ai-check-circle-${uid} ${d.short}ms ease ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-check-mark-${uid} {
          stroke-dasharray: 30;
          animation: ai-check-mark-${uid} ${d.short}ms ease ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.short * 0.6}ms;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={CheckPaths.viewBox} style={style as any}>
        <Path {...({ className: `ai-check-circle-${uid}` } as any)} d={CheckPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-check-mark-${uid}` } as any)} d={CheckPaths.check} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
