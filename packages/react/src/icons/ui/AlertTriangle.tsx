import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { AlertTrianglePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const AlertTriangle: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, AlertTrianglePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-alttri-shake-${uid} {
          0%, 100%  { transform: rotate(0deg); }
          20%       { transform: rotate(-6deg); }
          40%       { transform: rotate(6deg); }
          60%       { transform: rotate(-4deg); }
          80%       { transform: rotate(4deg); }
        }
        @keyframes ai-alttri-pulse-${uid} {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.3); opacity: 0.8; }
        }
        .ai-alttri-shake-${uid} {
          animation: ai-alttri-shake-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-alttri-pulse-${uid} {
          animation: ai-alttri-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={AlertTrianglePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-alttri-shake-${uid}` } as any)} d={AlertTrianglePaths.triangle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-alttri-pulse-${uid}` } as any)} d={AlertTrianglePaths.stem} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-alttri-pulse-${uid}` } as any)} d={AlertTrianglePaths.dot} stroke="none" strokeWidth={0} fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
