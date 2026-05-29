import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { LungsPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Lungs: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LungsPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-lungs-breathe-${uid} {
          0%, 100% { transform: scale(1); }
          50%      { transform: scaleX(1.12) scaleY(1.08); }
        }
        .ai-lungs-left-${uid}  { animation: ai-lungs-breathe-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 16px 26px; }
        .ai-lungs-right-${uid} { animation: ai-lungs-breathe-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 32px 26px; }
      `}</style>
      <Svg width={size} height={size} viewBox={LungsPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-lungs-left-${uid}` } as any)}  d={LungsPaths.leftLobe}  stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-lungs-right-${uid}` } as any)} d={LungsPaths.rightLobe} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} strokeLinecap="round" opacity={s.opacity} />
        <Path d={LungsPaths.trunk} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
