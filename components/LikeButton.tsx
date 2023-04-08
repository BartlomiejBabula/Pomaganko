import { Button, useTheme, Icon } from "@rneui/themed";
import { useState } from "react";

export const LikeButton = () => {
  const { theme } = useTheme();
  const [favorite, setFavorite] = useState(false);
  return (
    <Button
      onPress={() => {
        setFavorite(!favorite);
      }}
      title='Obserwuj'
      raised={false}
      radius={25}
      buttonStyle={{
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 7,
        backgroundColor: favorite ? theme.colors.success : theme.colors.white,
      }}
      titleStyle={{
        fontSize: 14,
        marginRight: 5,
        color: favorite ? theme.colors.white : theme.colors.success,
      }}
      type='outline'
      iconRight={true}
      icon={
        <Icon
          name={favorite ? "heart" : "heart-outline"}
          size={20}
          color={favorite ? theme.colors.white : theme.colors.success}
          type='material-community'
        />
      }
    />
  );
};
