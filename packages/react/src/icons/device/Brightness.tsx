import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { BrightnessPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Brightness: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BrightnessPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-bright-rays-${uid} { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        .ai-bright-rays-${uid} {
          animation: ai-bright-rays-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={BrightnessPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={BrightnessPaths.sun} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-bright-rays-${uid}` } as any)}
          d={BrightnessPaths.rays} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
