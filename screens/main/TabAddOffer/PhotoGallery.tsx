import React from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTheme, Image, Text, Icon } from "@rneui/themed";
import { translate } from "../../../i18n/i18n";

type PhotoGalleryParams = {
  imageList: string[];
  setSelectedImage: Function;
  setEditImageListModal: Function;
  scrollView: React.RefObject<ScrollView>;
  selectedImage: number | undefined;
  editImageListModal: boolean;
  handleAddPicture: Function;
  error: any;
};

const PhotoGallery = ({
  imageList,
  setSelectedImage,
  setEditImageListModal,
  scrollView,
  selectedImage,
  editImageListModal,
  handleAddPicture,
  error,
}: PhotoGalleryParams) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        marginTop: 8,
        marginBottom: 35,
        backgroundColor: theme.colors.grey4,
        borderRadius: 15,
        paddingHorizontal: 5,
        borderColor: imageList[0] ? theme.colors.primary : theme.colors.grey4,
        borderWidth: 2,
        padding: 5,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {imageList.map((image: string, key: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(key);
                  setEditImageListModal(true);
                  scrollView.current?.scrollTo({
                    x: 0,
                    y: 300,
                    animated: true,
                  });
                }}
                key={key}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginHorizontal: 10,
                }}
              >
                <Image
                  source={{ uri: image }}
                  PlaceholderContent={<ActivityIndicator />}
                  style={{
                    width: 80,
                    height: 100,
                    borderRadius: 6,
                    borderColor: theme.colors.primary,
                    borderWidth:
                      key === selectedImage && editImageListModal ? 2 : 0,
                  }}
                />
              </TouchableOpacity>
            );
          })}
          {imageList.length < 3 && (
            <TouchableOpacity
              onPress={() => {
                handleAddPicture();
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                borderWidth: 2,
                borderColor: theme.colors.black,
                width: 80,
                height: 100,
                marginLeft: 8,
              }}
            >
              <Icon
                name='plus'
                size={28}
                color={theme.colors.black}
                type='material-community'
              />
            </TouchableOpacity>
          )}
          {!imageList[0] && (
            <Text
              h4
              style={{
                paddingTop: 35,
                paddingLeft: 50,
                height: 75,
                color: error ? theme.colors.error : theme.colors.black,
                width: "100%",
              }}
            >
              {translate.t("addOffer.addPhotos.title")}
            </Text>
          )}
        </View>
        <Text
          style={{
            marginTop: 25,
            width: "100%",
            fontSize: 13,
          }}
        >
          {translate.t("addOffer.addPhotos.description")}
        </Text>
      </View>
    </View>
  );
};

export default PhotoGallery;
