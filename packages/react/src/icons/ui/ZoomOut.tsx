import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ZoomOutPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const ZoomOut: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ZoomOutPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-zoomout-pulse-${uid} {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(0.85); }
        }
        .ai-zoomout-lens-${uid} {
          animation: ai-zoomout-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 20px 20px;
        }
        .ai-zoomout-handle-${uid} {
          animation: ai-zoomout-pulse-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 20px 20px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ZoomOutPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-zoomout-lens-${uid}` } as any)} d={ZoomOutPaths.lens} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-zoomout-handle-${uid}` } as any)} d={ZoomOutPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-zoomout-lens-${uid}` } as any)} d={ZoomOutPaths.hline} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
