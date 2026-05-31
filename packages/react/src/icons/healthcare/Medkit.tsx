import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { MedkitPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Medkit: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MedkitPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-kit-bounce-${uid} {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
        @keyframes ai-kit-cross-${uid} {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.2); }
        }
        .ai-kit-body-${uid}  { animation: ai-kit-bounce-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; }
        .ai-kit-cross-${uid} { animation: ai-kit-cross-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 27px; }
      `}</style>
      <Svg width={size} height={size} viewBox={MedkitPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-kit-body-${uid}` } as any)} d={MedkitPaths.box} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-kit-body-${uid}` } as any)} d={MedkitPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-kit-cross-${uid}` } as any)} d={`${MedkitPaths.crossV} ${MedkitPaths.crossH}`} stroke={s.fill} strokeWidth="3" strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
