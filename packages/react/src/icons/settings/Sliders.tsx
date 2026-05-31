import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { SlidersPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Sliders: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SlidersPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-sliders-k1-${uid} { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(10px); } }
        @keyframes ai-sliders-k2-${uid} { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-8px); } }
        @keyframes ai-sliders-k3-${uid} { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
        .ai-sliders-k1-${uid} {
          animation: ai-sliders-k1-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: 0ms;
        }
        .ai-sliders-k2-${uid} {
          animation: ai-sliders-k2-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger}ms;
        }
        .ai-sliders-k3-${uid} {
          animation: ai-sliders-k3-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger * 2}ms;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={SlidersPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={SlidersPaths.track1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path d={SlidersPaths.track2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path d={SlidersPaths.track3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path {...({ className: `ai-sliders-k1-${uid}` } as any)}
          d={SlidersPaths.knob1} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-sliders-k2-${uid}` } as any)}
          d={SlidersPaths.knob2} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-sliders-k3-${uid}` } as any)}
          d={SlidersPaths.knob3} stroke={s.stroke} strokeWidth={s.strokeWidth}
          fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
