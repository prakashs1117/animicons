import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { MailPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Mail: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, MailPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-mail-flap-${uid} {
          0%,100% { transform: scaleY(1); }
          30%,70% { transform: scaleY(-0.3); }
        }
        @keyframes ai-mail-letter-${uid} {
          0%,100% { transform: translateY(0); opacity: 1; }
          30%,70% { transform: translateY(-8px); opacity: 0.8; }
        }
        .ai-mail-flap-${uid} {
          animation: ai-mail-flap-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 12px;
        }
        .ai-mail-letter-${uid} {
          animation: ai-mail-letter-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={MailPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={MailPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinejoin="round" />
        <Path {...({ className: `ai-mail-flap-${uid}` } as any)} d={MailPaths.flap} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
        <Path {...({ className: `ai-mail-letter-${uid}` } as any)} d={MailPaths.letter} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </>
  );
};
