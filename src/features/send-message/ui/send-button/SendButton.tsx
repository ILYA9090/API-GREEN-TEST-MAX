import { Button } from "@/shared/ui";
import ArrowUpIcon from "@/shared/assets/icon/arrowIcon.svg?react";
import cls from "./SendButton.module.scss";

interface SendButtonProps {
  visible: boolean;
  disabled: boolean;
}

export function SendButton({ visible, disabled }: SendButtonProps) {
  return (
    <Button
      type="submit"
      icon={<ArrowUpIcon />}
      className={visible ? `${cls.send} ${cls.send_visible}` : cls.send}
      disabled={disabled}
      aria-label="Отправить сообщение"
      tabIndex={visible ? 0 : -1}
    />
  );
}
