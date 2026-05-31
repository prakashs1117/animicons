import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { EyeOffPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const EyeOff: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, EyeOffPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-eyeoff-slash-${uid} {
          0%   { stroke-dashoffset: 54; }
          100% { stroke-dashoffset: 0; }
        }
        .ai-eyeoff-slash-${uid} {
          animation: ai-eyeoff-slash-${uid} ${d.short}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 54;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={EyeOffPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={EyeOffPaths.lids} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path d={EyeOffPaths.iris} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-eyeoff-slash-${uid}` } as any)}
          d={EyeOffPaths.slash} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
