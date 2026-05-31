import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { HeartRatePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const HeartRate: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, HeartRatePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-hr-pump-${uid} {
          0%, 100% { transform: scale(1); }
          20%      { transform: scale(1.2); }
          40%      { transform: scale(1); }
        }
        @keyframes ai-hr-glow-${uid} {
          0%, 100% { opacity: 0; }
          20%      { opacity: 0.5; }
        }
        .ai-hr-heart-${uid} { animation: ai-hr-pump-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 24px; }
        .ai-hr-glow-${uid}  { animation: ai-hr-glow-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={HeartRatePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Circle {...({ className: `ai-hr-glow-${uid}` } as any)} cx="24" cy="24" r="16" fill={s.secondaryColor} />
        <Path {...({ className: `ai-hr-heart-${uid}` } as any)} d={HeartRatePaths.heart} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
