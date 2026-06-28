import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { UndoPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Undo: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UndoPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-undo-spin-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .ai-undo-body-${uid} {
          animation: ai-undo-spin-${uid} ${d.long}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={UndoPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-undo-body-${uid}` } as any)} d={UndoPaths.arc} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-undo-body-${uid}` } as any)} d={UndoPaths.head} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
