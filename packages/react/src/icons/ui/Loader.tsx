import React, { useId } from 'react';
import { Svg, Path } from 'react-native-svg';
import { IconProps } from '@animicons/shared';
import { LoaderPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Loader: React.FC<IconProps> = ({
  size = 48,
  autoPlay = true,
  loop = true,
  speed = 'normal',
  onAnimationEnd,
  style,
  ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, LoaderPaths);
  const iterCount = loop ? 'infinite' : '1';
  const playState = autoPlay ? 'running' : 'paused';

  return (
    <>
      <style>{`
        @keyframes ai-spin-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ai-loader-${uid} {
          animation: ai-spin-${uid} ${d.medium}ms linear ${iterCount};
          animation-play-state: ${playState};
          transform-origin: 24px 24px;
        }
      `}</style>
      <Svg width={size} height={size} viewBox={LoaderPaths.viewBox} style={style as any}>
        <Path
          {...({ className: `ai-loader-${uid}` } as any)}
          d={LoaderPaths.arc}
          stroke={s.stroke}
          strokeWidth={s.strokeWidth}
          strokeLinecap="round"
          fill="none"
          opacity={s.opacity}
        />
      </Svg>
    </>
  );
};
