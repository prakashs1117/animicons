import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { FilterPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Filter: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, FilterPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-filter-pulse-${uid} {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.05); }
        }
        @keyframes ai-filter-line-${uid} {
          0%,100% { stroke-dashoffset: 20; }
          50%     { stroke-dashoffset: 0; }
        }
        .ai-filter-funnel-${uid} {
          animation: ai-filter-pulse-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 25px;
        }
        .ai-filter-line-${uid} {
          animation: ai-filter-line-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 20;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={FilterPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-filter-funnel-${uid}` } as any)} d={FilterPaths.funnel} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinejoin="round" />
        <Path {...({ className: `ai-filter-line-${uid}` } as any)} d={FilterPaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path {...({ className: `ai-filter-line-${uid}` } as any)} d={FilterPaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
      </Svg>
    </>
  );
};
