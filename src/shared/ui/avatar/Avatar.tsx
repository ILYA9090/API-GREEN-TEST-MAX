import cls from "./Avatar.module.scss";

interface AvatarProps {
  label: string;
}

function hashToHue(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function Avatar({ label }: AvatarProps) {
  const hue = hashToHue(label);

  return (
    <div className={cls.avatar} style={{ background: `hsl(${hue}, 65%, 55%)` }}>
      {label.slice(-2)}
    </div>
  );
}
