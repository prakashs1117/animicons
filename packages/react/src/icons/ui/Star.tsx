import React, { useId, useState } from 'react';
import { Svg, Path } from 'react-native-svg';
import type { IconProps } from '@animicons/shared';
import { StarPaths } from '@animicons/shared';
import { resolveStyle } from '../../utils/resolveStyle';
import { getAnimDuration } from '../../utils/animDuration';

export const Star: React.FC<IconProps> = ({
  size = 48, autoPlay = true, loop: _loop, speed = 'normal', onAnimationEnd, style, ...colorProps
}) => {
  const uid = useId().replace(/:/g, '');
  const d = getAnimDuration(speed);
  const s = resolveStyle(colorProps, StarPaths);
  const [active, setActive] = useState(autoPlay);

  return (
    <>
      <style>{`
        @keyframes ai-star-pop-${uid} {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes ai-star-sparkle-${uid} {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .ai-star-body-${uid} {
          animation: ${active ? `ai-star-pop-${uid} ${d.short}ms ease forwards` : 'none'};
          transform-origin: 24px 24px;
        }
        .ai-star-sp-${uid} {
          animation: ${active ? `ai-star-sparkle-${uid} ${d.short}ms ease forwards` : 'none'};
        }
      `}</style>
      <Svg
        width={size} height={size} viewBox={StarPaths.viewBox} style={style as any}
        {...({ onClick: () => { setActive(true); setTimeout(() => { setActive(false); onAnimationEnd?.(); }, d.short); } } as any)}
      >
        <Path {...({ className: `ai-star-body-${uid}` } as any)} d={StarPaths.star} stroke={s.stroke} strokeWidth={s.strokeWidth} fill={active ? s.fill : 'none'} opacity={s.opacity} />
        <Path {...({ className: `ai-star-sp-${uid}` } as any)} d={StarPaths.sparkle1} fill={s.stroke} opacity={s.opacity} />
        <Path {...({ className: `ai-star-sp-${uid}` } as any)} d={StarPaths.sparkle2} fill={s.stroke} opacity={s.opacity} />
        <Path {...({ className: `ai-star-sp-${uid}` } as any)} d={StarPaths.sparkle3} fill={s.stroke} opacity={s.opacity} />
      </Svg>
    </>
  );
};
