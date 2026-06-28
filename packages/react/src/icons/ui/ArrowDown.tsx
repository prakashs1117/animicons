import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ArrowDownPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const ArrowDown: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ArrowDownPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-arrowdown-bounce-${uid} {
          0%, 100% { transform: translateY(0); }
          40%      { transform: translateY(8px); }
          70%      { transform: translateY(2px); }
        }
        .ai-arrowdown-body-${uid} {
          animation: ai-arrowdown-bounce-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ArrowDownPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-arrowdown-body-${uid}` } as any)} d={ArrowDownPaths.shaft} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-arrowdown-body-${uid}` } as any)} d={ArrowDownPaths.head} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
