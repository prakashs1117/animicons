import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { PausePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Pause: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PausePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-pause-breathe-${uid} { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.6); } }
        .ai-pause-r1-${uid} {
          animation: ai-pause-breathe-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: 0ms;
          transform-origin: 16px 38px;
        }
        .ai-pause-r2-${uid} {
          animation: ai-pause-breathe-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger}ms;
          transform-origin: 32px 38px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={PausePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-pause-r1-${uid}` } as any)}
          d={PausePaths.rect1} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-pause-r2-${uid}` } as any)}
          d={PausePaths.rect2} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
