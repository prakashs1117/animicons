import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { EyePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Eye: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, EyePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-eye-blink-${uid} {
          0%, 100% { transform: scaleY(1); }
          45%, 55% { transform: scaleY(0.05); }
        }
        .ai-eye-lids-${uid} {
          animation: ai-eye-blink-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={EyePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-eye-lids-${uid}` } as any)}
          d={EyePaths.lids} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={EyePaths.iris} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" opacity={s.opacity} />
        <Path d={EyePaths.pupil} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
