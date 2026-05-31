import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ThumbsUpPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const ThumbsUp: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ThumbsUpPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-thumb-bounce-${uid} {
          0%   { transform: translateY(0) scale(1); }
          40%  { transform: translateY(-10px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
        .ai-thumb-body-${uid} {
          animation: ai-thumb-bounce-${uid} ${d.short}ms ${EASING_CSS.spring} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ThumbsUpPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-thumb-body-${uid}` } as any)} d={ThumbsUpPaths.thumb} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinejoin="round" />
        <Path {...({ className: `ai-thumb-body-${uid}` } as any)} d={ThumbsUpPaths.palm} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path {...({ className: `ai-thumb-body-${uid}` } as any)} d={ThumbsUpPaths.grip} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} strokeLinejoin="round" />
      </Svg>
    </>
  );
};
