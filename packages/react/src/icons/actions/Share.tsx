import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { SharePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Share: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SharePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-share-center-${uid} {
          0%,100% { transform: scale(1); }
          30%     { transform: scale(1.4); }
          50%     { transform: scale(0.9); }
        }
        @keyframes ai-share-n1-${uid} {
          0%,100% { opacity: 0.4; transform: translate(0, 0); }
          40%,60% { opacity: 1; transform: translate(-4px, -6px); }
        }
        @keyframes ai-share-n2-${uid} {
          0%,100% { opacity: 0.4; transform: translate(0, 0); }
          40%,60% { opacity: 1; transform: translate(4px, -6px); }
        }
        @keyframes ai-share-n3-${uid} {
          0%,100% { opacity: 0.4; transform: translate(0, 0); }
          40%,60% { opacity: 1; transform: translate(0, 8px); }
        }
        .ai-share-center-${uid} {
          animation: ai-share-center-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-share-n1-${uid} {
          animation: ai-share-n1-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 12px 14px;
        }
        .ai-share-n2-${uid} {
          animation: ai-share-n2-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 36px 14px;
        }
        .ai-share-n3-${uid} {
          animation: ai-share-n3-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 38px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={SharePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={SharePaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path d={SharePaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path d={SharePaths.line3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path {...({ className: `ai-share-center-${uid}` } as any)} d={SharePaths.center} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-share-n1-${uid}` } as any)} d={SharePaths.node1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-share-n2-${uid}` } as any)} d={SharePaths.node2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-share-n3-${uid}` } as any)} d={SharePaths.node3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
