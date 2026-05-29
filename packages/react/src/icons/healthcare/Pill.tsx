import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { PillPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Pill: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, PillPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-pill-float-${uid} {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes ai-pill-shine-${uid} {
          0%, 100% { opacity: 0; }
          50%      { opacity: 0.8; }
        }
        .ai-pill-body-${uid}  { animation: ai-pill-float-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; }
        .ai-pill-shine-${uid} { animation: ai-pill-shine-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={PillPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-pill-body-${uid}` } as any)} d={PillPaths.capsule} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-pill-body-${uid}` } as any)} d={PillPaths.divider} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-pill-shine-${uid}` } as any)} d={PillPaths.shine} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </Svg>
    </>
  );
};
