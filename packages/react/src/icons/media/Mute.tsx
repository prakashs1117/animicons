import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { MutePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Mute: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MutePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-mute-slash-${uid} { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
        .ai-mute-slash-${uid} {
          animation: ai-mute-slash-${uid} ${d.short}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 24;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={MutePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={MutePaths.speaker} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-mute-slash-${uid}` } as any)}
          d={MutePaths.slash} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
