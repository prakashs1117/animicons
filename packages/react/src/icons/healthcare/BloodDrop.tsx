import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { BloodDropPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const BloodDrop: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BloodDropPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-drop-pulse-${uid} {
          0%, 100% { transform: scaleY(1); }
          50%      { transform: scaleY(0.85); }
        }
        @keyframes ai-drop-ripple-${uid} {
          0%   { opacity: 0.6; transform: scale(0.6); }
          100% { opacity: 0;   transform: scale(1); }
        }
        .ai-drop-body-${uid} { animation: ai-drop-pulse-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 28px; }
        .ai-drop-r1-${uid}   { animation: ai-drop-ripple-${uid} ${d.long}ms ${EASING_CSS.easeOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; transform-origin: 24px 42px; }
        .ai-drop-r2-${uid}   { animation: ai-drop-ripple-${uid} ${d.long}ms ${EASING_CSS.easeOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; transform-origin: 24px 42px; }
      `}</style>
      <Svg width={size} height={size} viewBox={BloodDropPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-drop-body-${uid}` } as any)} d={BloodDropPaths.drop} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Circle {...({ className: `ai-drop-r1-${uid}` } as any)} cx="24" cy="42" r="6" stroke={s.stroke} strokeWidth="1.5" fill="none" />
        <Circle {...({ className: `ai-drop-r2-${uid}` } as any)} cx="24" cy="42" r="10" stroke={s.stroke} strokeWidth="1.5" fill="none" />
      </Svg>
    </>
  );
};
