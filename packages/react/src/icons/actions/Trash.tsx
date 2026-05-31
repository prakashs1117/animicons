import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { TrashPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Trash: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, TrashPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-trash-shake-${uid} {
          0%,100% { transform: rotate(0); }
          20%     { transform: rotate(-8deg); }
          40%     { transform: rotate(8deg); }
          60%     { transform: rotate(-5deg); }
          80%     { transform: rotate(5deg); }
        }
        .ai-trash-body-${uid} {
          animation: ai-trash-shake-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 26px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={TrashPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={TrashPaths.lid} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path d={TrashPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
        <Path {...({ className: `ai-trash-body-${uid}` } as any)} d={TrashPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
        <Path {...({ className: `ai-trash-body-${uid}` } as any)} d={TrashPaths.lines} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
      </Svg>
    </>
  );
};
