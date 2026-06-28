import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ChevronUpPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const ChevronUp: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ChevronUpPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-chevup-bounce-${uid} {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .ai-chevup-body-${uid} {
          animation: ai-chevup-bounce-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ChevronUpPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-chevup-body-${uid}` } as any)} d={ChevronUpPaths.chevron} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
