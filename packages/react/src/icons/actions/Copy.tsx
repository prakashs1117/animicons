import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { CopyPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Copy: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = false, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, CopyPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-copy-lift-${uid} {
          0%,100% { transform: translate(0, 0); }
          40%     { transform: translate(-4px, -6px); }
          70%     { transform: translate(0, 0); }
        }
        .ai-copy-front-${uid} {
          animation: ai-copy-lift-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={CopyPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={CopyPaths.back} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinejoin="round" />
        <Path {...({ className: `ai-copy-front-${uid}` } as any)} d={CopyPaths.front} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} strokeLinejoin="round" />
      </Svg>
    </>
  );
};
