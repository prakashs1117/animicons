import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { GlobePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Globe: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, GlobePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-globe-spin-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ai-globe-meridian-${uid} {
          animation: ai-globe-spin-${uid} ${d.long}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={GlobePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={GlobePaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-globe-meridian-${uid}` } as any)} d={GlobePaths.meridian} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path d={GlobePaths.equator} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path d={GlobePaths.topArc} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path d={GlobePaths.botArc} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
