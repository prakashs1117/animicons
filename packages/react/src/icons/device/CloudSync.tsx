import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { CloudSyncPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const CloudSync: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CloudSyncPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-cloudsync-spin-${uid} { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        .ai-cloudsync-spin-${uid} {
          animation: ai-cloudsync-spin-${uid} ${d.long}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 20px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={CloudSyncPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={CloudSyncPaths.cloud} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-cloudsync-spin-${uid}` } as any)}
          d={CloudSyncPaths.arc} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-cloudsync-spin-${uid}` } as any)}
          d={CloudSyncPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
