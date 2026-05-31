import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ForwardPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Forward: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ForwardPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-fwd-slide-${uid} {
          0%, 100% { transform: translateX(0); }
          40%      { transform: translateX(6px); }
          70%      { transform: translateX(-2px); }
        }
        .ai-fwd-body-${uid} {
          animation: ai-fwd-slide-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ForwardPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-fwd-body-${uid}` } as any)} d={ForwardPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
        <Path {...({ className: `ai-fwd-body-${uid}` } as any)} d={ForwardPaths.shaft} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
      </Svg>
    </>
  );
};
