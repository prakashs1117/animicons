import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { MenuPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Menu: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MenuPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-menu-top-${uid} {
          0%,40%   { transform: translateY(0) rotate(0deg); }
          60%,100% { transform: translateY(6px) rotate(45deg); }
        }
        @keyframes ai-menu-mid-${uid} {
          0%,40%   { opacity: 1; }
          60%,100% { opacity: 0; }
        }
        @keyframes ai-menu-bot-${uid} {
          0%,40%   { transform: translateY(0) rotate(0deg); }
          60%,100% { transform: translateY(-6px) rotate(-45deg); }
        }
        .ai-menu-top-${uid} {
          animation: ai-menu-top-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 18px;
        }
        .ai-menu-mid-${uid} {
          animation: ai-menu-mid-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-menu-bot-${uid} {
          animation: ai-menu-bot-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 30px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={MenuPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-menu-top-${uid}` } as any)} d={MenuPaths.top} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path {...({ className: `ai-menu-mid-${uid}` } as any)} d={MenuPaths.middle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path {...({ className: `ai-menu-bot-${uid}` } as any)} d={MenuPaths.bottom} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
      </Svg>
    </>
  );
};
