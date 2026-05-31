import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { MoreHorizontalPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const MoreHorizontal: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MoreHorizontalPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-moreh-pulse-${uid} {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.4); }
        }
        .ai-moreh-d1-${uid} {
          animation: ai-moreh-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: 0ms;
          transform-origin: 14px 24px;
        }
        .ai-moreh-d2-${uid} {
          animation: ai-moreh-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger}ms;
          transform-origin: 24px 24px;
        }
        .ai-moreh-d3-${uid} {
          animation: ai-moreh-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger * 2}ms;
          transform-origin: 34px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={MoreHorizontalPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-moreh-d1-${uid}` } as any)} d={MoreHorizontalPaths.dot1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-moreh-d2-${uid}` } as any)} d={MoreHorizontalPaths.dot2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-moreh-d3-${uid}` } as any)} d={MoreHorizontalPaths.dot3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
