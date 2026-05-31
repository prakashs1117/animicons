import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { BrainPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Brain: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BrainPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-brain-neuron-${uid} {
          0%, 100% { opacity: 0.2; transform: scale(0.67); }
          50%      { opacity: 1;   transform: scale(1.5); }
        }
        .ai-brain-n1-${uid} { animation: ai-brain-neuron-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; transform-origin: 16px 20px; }
        .ai-brain-n2-${uid} { animation: ai-brain-neuron-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; transform-origin: 24px 16px; }
        .ai-brain-n3-${uid} { animation: ai-brain-neuron-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; transform-origin: 32px 20px; }
      `}</style>
      <Svg width={size} height={size} viewBox={BrainPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={BrainPaths.left}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path d={BrainPaths.right} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path d={`${BrainPaths.synapse1} ${BrainPaths.synapse2}`} stroke={s.stroke} strokeWidth="1" fill="none" opacity={s.opacity * 0.5} />
        <Circle {...({ className: `ai-brain-n1-${uid}` } as any)} cx="16" cy="20" r="3" fill={s.fill} />
        <Circle {...({ className: `ai-brain-n2-${uid}` } as any)} cx="24" cy="16" r="3" fill={s.fill} />
        <Circle {...({ className: `ai-brain-n3-${uid}` } as any)} cx="32" cy="20" r="3" fill={s.fill} />
      </Svg>
    </>
  );
};
