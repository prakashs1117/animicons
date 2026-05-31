import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { SearchPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Search: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, SearchPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-srch-pulse-${uid} {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }
        @keyframes ai-srch-scan-${uid} {
          0%   { transform: translate(-4px, -4px); }
          100% { transform: translate(4px, 4px); }
        }
        .ai-srch-lens-${uid} {
          animation: ai-srch-pulse-${uid} ${d.long}ms ${EASING_CSS.easeInOut} ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 20px 20px;
        }
        .ai-srch-scan-${uid} {
          animation: ai-srch-scan-${uid} ${d.medium}ms ${EASING_CSS.easeInOut} ${iterCount} alternate;
          animation-play-state: ${playState};
        }
      `}</style>
      <Svg width={size} height={size} viewBox={SearchPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path {...({ className: `ai-srch-lens-${uid}` } as any)} d={SearchPaths.lens} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} />
        <Path {...({ className: `ai-srch-scan-${uid}` } as any)} d={SearchPaths.handle} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
      </Svg>
    </>
  );
};
