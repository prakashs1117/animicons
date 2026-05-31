import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { HelpPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Help: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HelpPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-help-float-${uid} { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .ai-help-body-${uid} {
          animation: ai-help-float-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={HelpPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-help-body-${uid}` } as any)}
          d={HelpPaths.circle} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-help-body-${uid}` } as any)}
          d={HelpPaths.mark} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-help-body-${uid}` } as any)}
          d={HelpPaths.dot} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
