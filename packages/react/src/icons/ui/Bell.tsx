import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { BellPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Bell: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BellPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-bell-swing-${uid} {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-15deg); }
          60% { transform: rotate(8deg); }
          80% { transform: rotate(-8deg); }
        }
        @keyframes ai-bell-badge-${uid} {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.3); }
        }
        .ai-bell-body-${uid} {
          animation: ai-bell-swing-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 12px;
        }
        .ai-bell-badge-${uid} {
          animation: ai-bell-badge-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 34px 12px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={BellPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-bell-body-${uid}` } as any)} d={BellPaths.bell} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={BellPaths.clapper} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path d={BellPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
        <Circle {...({ className: `ai-bell-badge-${uid}` } as any)} cx="34" cy="12" r="5" fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
