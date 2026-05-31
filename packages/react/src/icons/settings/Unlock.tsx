import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { UnlockPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Unlock: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UnlockPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-unlock-swing-${uid} {
          0%   { transform: rotate(0) translateY(0); }
          100% { transform: rotate(-60deg) translateY(-4px); }
        }
        .ai-unlock-shackle-${uid} {
          animation: ai-unlock-swing-${uid} ${d.medium}ms ${EASING_CSS.easeOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 22px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={UnlockPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={UnlockPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={UnlockPaths.knob} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.stroke} opacity={s.opacity} />
        <Path {...({ className: `ai-unlock-shackle-${uid}` } as any)}
          d={UnlockPaths.shackle} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-unlock-shackle-${uid}` } as any)}
          d={UnlockPaths.open} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
