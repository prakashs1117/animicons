import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { UploadPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Upload: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, UploadPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-upload-arrow-${uid} {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes ai-upload-bar-${uid} {
          0% { stroke-dashoffset: 28; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 28; }
        }
        .ai-upload-arrow-${uid} {
          animation: ai-upload-arrow-${uid} ${d.short}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-upload-bar-${uid} {
          stroke-dasharray: 28;
          animation: ai-upload-bar-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={UploadPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-upload-arrow-${uid}` } as any)} d={UploadPaths.arrow} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-upload-bar-${uid}` } as any)} d={UploadPaths.bar} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
      </Svg>
    </>
  );
};
