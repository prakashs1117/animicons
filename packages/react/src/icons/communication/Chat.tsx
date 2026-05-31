import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { ChatPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Chat: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, ChatPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-chat-pop-${uid} {
          0%,100% { transform: scale(1); }
          20%     { transform: scale(1.05); }
          40%     { transform: scale(0.98); }
        }
        @keyframes ai-chat-dot-${uid} {
          0%,60%,100% { opacity: 0.3; transform: translateY(0); }
          30%         { opacity: 1; transform: translateY(-3px); }
        }
        .ai-chat-bubble-${uid} {
          animation: ai-chat-pop-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 20px;
        }
        .ai-chat-d1-${uid} {
          animation: ai-chat-dot-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: 0ms;
          transform-origin: 17px 20px;
        }
        .ai-chat-d2-${uid} {
          animation: ai-chat-dot-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger}ms;
          transform-origin: 24px 20px;
        }
        .ai-chat-d3-${uid} {
          animation: ai-chat-dot-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          animation-delay: ${d.stagger * 2}ms;
          transform-origin: 31px 20px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={ChatPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-chat-bubble-${uid}` } as any)} d={ChatPaths.bubble} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinejoin="round" />
        <Path {...({ className: `ai-chat-d1-${uid}` } as any)} d={ChatPaths.dot1} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-chat-d2-${uid}` } as any)} d={ChatPaths.dot2} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
        <Path {...({ className: `ai-chat-d3-${uid}` } as any)} d={ChatPaths.dot3} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.fill} opacity={s.opacity} />
      </Svg>
    </>
  );
};
