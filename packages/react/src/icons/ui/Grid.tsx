import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { GridPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Grid: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, GridPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-grid-pop-${uid} {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .ai-grid-tl-${uid} {
          animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: 0ms;
          transform-origin: 15px 15px;
        }
        .ai-grid-tr-${uid} {
          animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger}ms;
          transform-origin: 33px 15px;
        }
        .ai-grid-bl-${uid} {
          animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger * 2}ms;
          transform-origin: 15px 33px;
        }
        .ai-grid-br-${uid} {
          animation: ai-grid-pop-${uid} ${d.medium}ms ${EASING_CSS.spring} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger * 3}ms;
          transform-origin: 33px 33px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={GridPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-grid-tl-${uid}` } as any)} d={GridPaths.tl} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-grid-tr-${uid}` } as any)} d={GridPaths.tr} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-grid-bl-${uid}` } as any)} d={GridPaths.bl} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-grid-br-${uid}` } as any)} d={GridPaths.br} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
      </Svg>
    </>
  );
};
