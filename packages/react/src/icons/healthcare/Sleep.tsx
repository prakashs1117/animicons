import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { SleepPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Sleep: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SleepPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-sleep-glow-${uid} {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes ai-sleep-star-${uid} {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes ai-sleep-z-${uid} {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
          50%  { opacity: 1; transform: translate(4px, -6px) scale(1); }
          100% { opacity: 0; transform: translate(8px, -12px) scale(0.5); }
        }
        .ai-sleep-moon-${uid}  { animation: ai-sleep-glow-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 18px 24px; }
        .ai-sleep-s1-${uid}    { animation: ai-sleep-star-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
        .ai-sleep-s2-${uid}    { animation: ai-sleep-star-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; }
        .ai-sleep-z1-${uid}    { animation: ai-sleep-z-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-sleep-z2-${uid}    { animation: ai-sleep-z-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={SleepPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-sleep-moon-${uid}` } as any)} d={SleepPaths.moon} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-sleep-s1-${uid}` } as any)}   d={SleepPaths.star1} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-sleep-s2-${uid}` } as any)}   d={SleepPaths.star2} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-sleep-z1-${uid}` } as any)}   d={SleepPaths.z1} stroke={s.stroke} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-sleep-z2-${uid}` } as any)}   d={SleepPaths.z2} stroke={s.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
