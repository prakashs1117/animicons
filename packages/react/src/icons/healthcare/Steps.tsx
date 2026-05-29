import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { StepsPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Steps: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, StepsPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-steps-f1-${uid} {
          0%, 49%, 100% { opacity: 0.3; }
          50%, 99%      { opacity: 1; }
        }
        @keyframes ai-steps-f2-${uid} {
          0%, 100%      { opacity: 1; }
          50%, 99%      { opacity: 0.3; }
        }
        .ai-steps-f1-${uid} { animation: ai-steps-f1-${uid} ${d.medium}ms ease ${iterCount}; animation-play-state: ${playState}; }
        .ai-steps-f2-${uid} { animation: ai-steps-f2-${uid} ${d.medium}ms ease ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={StepsPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-steps-f1-${uid}` } as any)} d={`${StepsPaths.foot1} ${StepsPaths.toe1a} ${StepsPaths.toe1b}`} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-steps-f2-${uid}` } as any)} d={`${StepsPaths.foot2} ${StepsPaths.toe2a} ${StepsPaths.toe2b}`} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
