import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { LockPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Lock: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LockPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-lock-bounce-${uid} { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ai-lock-shackle-${uid} { 0%, 100% { transform: translateY(0); } 30%, 50% { transform: translateY(-6px); } }
        .ai-lock-body-${uid} {
          animation: ai-lock-bounce-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-lock-shackle-${uid} {
          animation: ai-lock-shackle-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={LockPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-lock-shackle-${uid}` } as any)}
          d={LockPaths.shackle} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-lock-body-${uid}` } as any)}
          d={LockPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-lock-body-${uid}` } as any)}
          d={LockPaths.knob} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.stroke} opacity={s.opacity} />
        <Path {...({ className: `ai-lock-body-${uid}` } as any)}
          d={LockPaths.stem} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
