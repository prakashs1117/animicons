import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { CameraPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Camera: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CameraPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-cam-blink-${uid} { 0%, 85%, 100% { opacity: 1; } 90%, 95% { opacity: 0.2; } }
        @keyframes ai-cam-flash-${uid} { 0%, 80%, 100% { opacity: 0; } 85% { opacity: 0.6; } }
        .ai-cam-lens-${uid} {
          animation: ai-cam-blink-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-cam-flash-${uid} {
          animation: ai-cam-flash-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={CameraPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={CameraPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={CameraPaths.notch} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
        <Path {...({ className: `ai-cam-lens-${uid}` } as any)}
          d={CameraPaths.lens} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-cam-lens-${uid}` } as any)}
          d={CameraPaths.inner} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-cam-flash-${uid}` } as any)}
          d="M6 14 L42 14 L42 40 L6 40 Z" fill="white" opacity={0} />
      </Svg>
    </>
  );
};
