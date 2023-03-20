import { View, Pressable, Modal } from "react-native";
import { Button, Divider, useTheme } from "@rneui/themed";
import { translate } from "../../../i18n";

type EditDeleteImageModalParams = {
  editImageListModal: boolean;
  handleModalAction: (a: string) => void;
  setEditImageListModal: (a: boolean) => void;
};

const EditDeleteImageModal = ({
  setEditImageListModal,
  handleModalAction,
  editImageListModal,
}: EditDeleteImageModalParams) => {
  const { theme } = useTheme();
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={editImageListModal}
      onRequestClose={() => {
        setEditImageListModal(false);
      }}
    >
      <Pressable
        onPress={() => {
          setEditImageListModal(false);
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            height: 180,
            width: "100%",
            backgroundColor: theme.colors.secondary,
            position: "absolute",
            bottom: 0,
          }}
        >
          <Button
            onPress={() => {
              handleModalAction("edit");
            }}
            raised={false}
            type='clear'
            uppercase={true}
            titleStyle={{ color: theme.colors.grey5 }}
            title={translate.t("addOffer.editDeleteImageModal.edit")}
            buttonStyle={{
              height: 60,
            }}
          />
          <Divider color={theme.colors.grey2} />
          <Button
            onPress={() => {
              handleModalAction("delete");
            }}
            raised={false}
            type='clear'
            uppercase={true}
            titleStyle={{ color: theme.colors.grey5 }}
            title={translate.t("addOffer.editDeleteImageModal.delete")}
            buttonStyle={{
              height: 60,
            }}
          />
          <Divider color={theme.colors.grey2} />
          <Button
            onPress={() => {
              setEditImageListModal(false);
            }}
            raised={false}
            type='clear'
            uppercase={true}
            titleStyle={{ color: theme.colors.grey5 }}
            title={translate.t("addOffer.editDeleteImageModal.cancel")}
            buttonStyle={{
              height: 60,
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default EditDeleteImageModal;
