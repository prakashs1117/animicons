import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ReactionPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Reaction: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ReactionPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-react-neutral-${uid} {
          0%,40%,100% { opacity: 1; }
          60%,80%     { opacity: 0; }
        }
        @keyframes ai-react-smile-${uid} {
          0%,40%  { opacity: 0; }
          60%,80% { opacity: 1; }
          100%    { opacity: 0; }
        }
        @keyframes ai-react-pulse-${uid} {
          0%,100% { transform: scale(1); }
          50%     { transform: scale(1.04); }
        }
        .ai-react-face-${uid} {
          animation: ai-react-pulse-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
        .ai-react-neutral-${uid} {
          animation: ai-react-neutral-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
        .ai-react-smile-${uid} {
          animation: ai-react-smile-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ReactionPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-react-face-${uid}` } as any)} d={ReactionPaths.face} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} />
        <Path d={ReactionPaths.eye1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path d={ReactionPaths.eye2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-react-neutral-${uid}` } as any)} d={ReactionPaths.mouth} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" />
        <Path {...({ className: `ai-react-smile-${uid}` } as any)} d={ReactionPaths.smile} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" strokeLinecap="round" />
      </Svg>
    </>
  );
};
