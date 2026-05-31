import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { DNAPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const DNA: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, DNAPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-dna-scroll-${uid} {
          from { transform: translateY(0); }
          to   { transform: translateY(-16px); }
        }
        .ai-dna-${uid} {
          animation: ai-dna-scroll-${uid} ${d.medium}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          animation-direction: alternate;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={DNAPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-dna-${uid}` } as any)} d={DNAPaths.strand1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-dna-${uid}` } as any)} d={DNAPaths.strand2} stroke={s.secondaryColor} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-dna-${uid}` } as any)} d={`${DNAPaths.rung1} ${DNAPaths.rung2} ${DNAPaths.rung3}`} stroke={s.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={s.opacity * 0.6} />
      </Svg>
    </>
  );
};
