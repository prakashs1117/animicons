import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { WifiPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Wifi: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, WifiPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-wifi-fade-${uid} {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .ai-wifi-a1-${uid} { animation: ai-wifi-fade-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: 0ms; }
        .ai-wifi-a2-${uid} { animation: ai-wifi-fade-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger}ms; }
        .ai-wifi-a3-${uid} { animation: ai-wifi-fade-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; animation-delay: ${d.stagger * 2}ms; }
      `}</style>
      <Svg width={size} height={size} viewBox={WifiPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-wifi-a1-${uid}` } as any)} d={WifiPaths.arc1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-wifi-a2-${uid}` } as any)} d={WifiPaths.arc2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-wifi-a3-${uid}` } as any)} d={WifiPaths.arc3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Circle cx="24" cy="40" r="2" fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
