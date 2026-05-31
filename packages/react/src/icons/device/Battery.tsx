import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { BatteryPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Battery: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, BatteryPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-bat-line-${uid} { 0% { stroke-dashoffset: 30; } 80%, 100% { stroke-dashoffset: 0; } }
        @keyframes ai-bat-bolt-${uid} { 0%, 70% { opacity: 0; } 80%, 90% { opacity: 1; } 100% { opacity: 0; } }
        .ai-bat-level-${uid} {
          animation: ai-bat-line-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 30;
        }
        .ai-bat-bolt-${uid} {
          animation: ai-bat-bolt-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={BatteryPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={BatteryPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={BatteryPaths.cap} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-bat-level-${uid}` } as any)}
          d={BatteryPaths.level} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-bat-bolt-${uid}` } as any)}
          d={BatteryPaths.bolt} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={s.opacity} />
      </Svg>
    </>
  );
};
