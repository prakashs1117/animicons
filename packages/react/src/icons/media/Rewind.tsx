import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { RewindPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Rewind: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, RewindPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-rw-chev-${uid} { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-8px); } }
        .ai-rw-c1-${uid} {
          animation: ai-rw-chev-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: 0ms;
        }
        .ai-rw-c2-${uid} {
          animation: ai-rw-chev-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger}ms;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={RewindPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-rw-c1-${uid}` } as any)}
          d={RewindPaths.chev1} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-rw-c2-${uid}` } as any)}
          d={RewindPaths.chev2} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path d={RewindPaths.end} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
