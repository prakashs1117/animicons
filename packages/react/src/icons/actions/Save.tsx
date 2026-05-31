import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { SavePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Save: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SavePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-save-slide-${uid} {
          0%   { transform: translateY(-8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes ai-save-check-${uid} {
          0%   { stroke-dashoffset: 30; }
          100% { stroke-dashoffset: 0; }
        }
        .ai-save-body-${uid} {
          animation: ai-save-slide-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-save-check-${uid} {
          animation: ai-save-check-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation-delay: ${d.medium * 0.5}ms;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={SavePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-save-body-${uid}` } as any)} d={SavePaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinejoin="round" />
        <Path {...({ className: `ai-save-body-${uid}` } as any)} d={SavePaths.slot} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
        <Path {...({ className: `ai-save-check-${uid}` } as any)} d={SavePaths.check} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </>
  );
};
