import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { SyringePaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Syringe: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SyringePaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-syringe-push-${uid} {
          0%, 100% { transform: translateX(0); }
          50%      { transform: translateX(8px); }
        }
        @keyframes ai-syringe-liquid-${uid} {
          0%, 100% { transform: scaleX(1); }
          50%      { transform: scaleX(0.3); }
        }
        @keyframes ai-syringe-drop-${uid} {
          0%, 49% { opacity: 0; transform: translateY(0); }
          50%     { opacity: 1; transform: translateY(0); }
          100%    { opacity: 0; transform: translateY(6px); }
        }
        .ai-syringe-plunger-${uid} { animation: ai-syringe-push-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; }
        .ai-syringe-liquid-${uid}  { animation: ai-syringe-liquid-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; transform-origin: 14px 25px; }
        .ai-syringe-drop-${uid}    { animation: ai-syringe-drop-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount}; animation-play-state: ${playState}; }
      `}</style>
      <Svg width={size} height={size} viewBox={SyringePaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={SyringePaths.barrel} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path {...({ className: `ai-syringe-liquid-${uid}` } as any)} d={SyringePaths.liquid} fill={s.fill} opacity={s.opacity * 0.7} />
        <Path {...({ className: `ai-syringe-plunger-${uid}` } as any)} d={SyringePaths.plunger} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" opacity={s.opacity} />
        <Path d={SyringePaths.needle} stroke={s.stroke} strokeWidth={s.strokeWidth} strokeLinecap="round" fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-syringe-drop-${uid}` } as any)} d={SyringePaths.drop} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
