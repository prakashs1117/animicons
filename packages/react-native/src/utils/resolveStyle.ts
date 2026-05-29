interface PathDefaults {
  defaultColor: string;
  defaultStrokeWidth: number;
}

interface ResolvedStyle {
  stroke: string;
  fill: string;
  secondaryColor: string;
  opacity: number;
  strokeWidth: number;
}

interface StyleProps {
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  secondaryColor?: string;
  opacity?: number;
  strokeWidth?: number;
}

export function resolveStyle(props: StyleProps, defaults: PathDefaults): ResolvedStyle {
  const base = props.color ?? defaults.defaultColor;
  return {
    stroke: props.strokeColor ?? base,
    fill: props.fillColor ?? base,
    secondaryColor: props.secondaryColor ?? `${base}33`,
    opacity: props.opacity ?? 1,
    strokeWidth: props.strokeWidth ?? defaults.defaultStrokeWidth,
  };
}
