import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { DocumentPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Document: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, DocumentPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-doc-line-${uid} { 0% { stroke-dashoffset: 18; } 100% { stroke-dashoffset: 0; } }
        .ai-doc-l1-${uid} {
          animation: ai-doc-line-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 18;
          animation-delay: 0ms;
        }
        .ai-doc-l2-${uid} {
          animation: ai-doc-line-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 18;
          animation-delay: ${d.stagger}ms;
        }
        .ai-doc-l3-${uid} {
          animation: ai-doc-line-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 18;
          animation-delay: ${d.stagger * 2}ms;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={DocumentPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={DocumentPaths.page} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={DocumentPaths.fold} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-doc-l1-${uid}` } as any)}
          d={DocumentPaths.line1} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-doc-l2-${uid}` } as any)}
          d={DocumentPaths.line2} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-doc-l3-${uid}` } as any)}
          d={DocumentPaths.line3} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
