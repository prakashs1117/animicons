import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { TagPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Tag: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, TagPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-tag-swing-${uid} {
          0%, 100% { transform: rotate(0); }
          25%      { transform: rotate(12deg); }
          75%      { transform: rotate(-12deg); }
        }
        .ai-tag-body-${uid} {
          animation: ai-tag-swing-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 4px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={TagPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-tag-body-${uid}` } as any)}
          d={TagPaths.tag} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-tag-body-${uid}` } as any)}
          d={TagPaths.hole} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-tag-body-${uid}` } as any)}
          d={TagPaths.string} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
