import { Button, useTheme } from "@rneui/themed";
import type { ButtonProps } from "@rneui/base";

const ButtonSubmit = (props: ButtonProps) => {
  const { theme } = useTheme();
  return (
    <Button
      loading={props.loading}
      disabled={props.disabled}
      title={props.title}
      radius={15}
      titleStyle={{ letterSpacing: 0.5 }}
      buttonStyle={{ paddingVertical: 17, minWidth: 140 }}
      color={theme.colors.secondary}
      {...props}
    />
  );
};

export default ButtonSubmit;
