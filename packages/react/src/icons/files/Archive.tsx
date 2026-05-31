import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ArchivePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Archive: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ArchivePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-arch-lid-${uid}  { 0%, 100% { transform: rotate(0) translateY(0); } 30%, 70% { transform: rotate(-15deg) translateY(-6px); } }
        @keyframes ai-arch-item-${uid} { 0%, 30% { transform: translateY(-10px); opacity: 0; } 60% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(0); opacity: 1; } }
        .ai-arch-lid-${uid} {
          animation: ai-arch-lid-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 4px 14px;
        }
        .ai-arch-item-${uid} {
          animation: ai-arch-item-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ArchivePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={ArchivePaths.box} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-arch-lid-${uid}` } as any)}
          d={ArchivePaths.lid} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-arch-item-${uid}` } as any)}
          d={ArchivePaths.item} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
