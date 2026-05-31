import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { DownloadPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Download: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, DownloadPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-dl-arrow-${uid} {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(8px); }
        }
        @keyframes ai-dl-bar-${uid} {
          0%   { stroke-dashoffset: 28; }
          50%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 28; }
        }
        .ai-dl-arrow-${uid} {
          animation: ai-dl-arrow-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-dl-bar-${uid} {
          animation: ai-dl-bar-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 28;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={DownloadPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-dl-arrow-${uid}` } as any)} d={DownloadPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
        <Path {...({ className: `ai-dl-bar-${uid}` } as any)} d={DownloadPaths.bar} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
      </Svg>
    </>
  );
};
