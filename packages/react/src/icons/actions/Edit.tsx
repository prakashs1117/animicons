import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { EditPaths, EASING_CSS } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Edit: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop = true, speed = 'slow', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, EditPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-edit-draw-${uid} {
          0%   { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .ai-edit-trace-${uid} {
          animation: ai-edit-draw-${uid} ${d.long}ms ${EASING_CSS.linear} ${iterCount};
          animation-play-state: ${playState};
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={EditPaths.viewBox} style={style as any}
        {...({ onAnimationEnd: loop ? undefined : onAnimationEnd } as any)}>
        <Path d={EditPaths.body} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={s.secondaryColor} opacity={s.opacity} strokeLinejoin="round" />
        <Path d={EditPaths.tip} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path d={EditPaths.line} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
        <Path {...({ className: `ai-edit-trace-${uid}` } as any)} d={EditPaths.trace} stroke={s.stroke} strokeWidth={s.strokeWidth} fill="none" opacity={s.opacity} strokeLinecap="round" />
      </Svg>
    </>
  );
};
