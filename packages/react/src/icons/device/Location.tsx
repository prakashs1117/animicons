import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { LocationPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Location: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LocationPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-loc-pin-${uid} {
          0%   { transform: translateY(-20px); opacity: 0; }
          60%  { transform: translateY(4px); }
          80%  { transform: translateY(-2px); }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes ai-loc-shadow-${uid} {
          0%   { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        .ai-loc-pin-${uid} {
          animation: ai-loc-pin-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-loc-shadow-${uid} {
          animation: ai-loc-shadow-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 46px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={LocationPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-loc-pin-${uid}` } as any)}
          d={LocationPaths.pin} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-loc-pin-${uid}` } as any)}
          d={LocationPaths.inner} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.stroke} opacity={s.opacity} />
        <Path {...({ className: `ai-loc-pin-${uid}` } as any)}
          d={LocationPaths.stem} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-loc-shadow-${uid}` } as any)}
          d={LocationPaths.shadow} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
