import React, { useId } from 'react';
import { Svg, Path, Circle } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ThermometerPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Thermometer: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ThermometerPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-therm-rise-${uid} {
          0%   { transform: scaleY(0.2); }
          70%  { transform: scaleY(1); }
          100% { transform: scaleY(1); }
        }
        @keyframes ai-therm-shake-${uid} {
          0%, 60%, 100% { transform: rotate(0deg); }
          70%           { transform: rotate(3deg); }
          80%           { transform: rotate(-3deg); }
          90%           { transform: rotate(2deg); }
        }
        .ai-therm-mercury-${uid} { animation: ai-therm-rise-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 34px; }
        .ai-therm-tube-${uid}    { animation: ai-therm-shake-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 24px 24px; }
      `}</style>
      <Svg width={size} height={size} viewBox={ThermometerPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-therm-tube-${uid}` } as any)} d={ThermometerPaths.tube} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-therm-mercury-${uid}` } as any)} d={ThermometerPaths.mercury} fill={s.fill} opacity={s.opacity} />
        <Circle cx="24" cy="40" r="5" fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
