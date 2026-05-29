import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { HeartPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Heart: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HeartPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-heart-pump-${uid} {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          56% { transform: scale(1); }
        }
        @keyframes ai-heart-glow-${uid} {
          0%, 100% { opacity: 0; transform: scale(1); }
          28% { opacity: 0.4; transform: scale(1.3); }
        }
        .ai-heart-body-${uid} {
          animation: ai-heart-pump-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-heart-glow-${uid} {
          animation: ai-heart-glow-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={HeartPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-heart-glow-${uid}` } as any)} d={HeartPaths.glow} fill={s.secondaryColor} stroke="none" />
        <Path {...({ className: `ai-heart-body-${uid}` } as any)} d={HeartPaths.heart} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
