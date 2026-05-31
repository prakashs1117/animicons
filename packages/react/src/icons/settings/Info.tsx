import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { InfoPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Info: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, InfoPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-info-pulse-${uid} { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes ai-info-bounce-${uid} { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .ai-info-circle-${uid} {
          animation: ai-info-pulse-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-info-i-${uid} {
          animation: ai-info-bounce-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={InfoPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-info-circle-${uid}` } as any)}
          d={InfoPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-info-circle-${uid}` } as any)}
          d={InfoPaths.dot} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.stroke} opacity={s.opacity} />
        <Path {...({ className: `ai-info-i-${uid}` } as any)}
          d={InfoPaths.stem} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
