import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { AddOfferScreenParams } from "../../../types";
import { Text, Icon, Button, Image, Input, useTheme } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditDeleteImageModal from "./EditDeleteImageModal";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../types";
import { translate } from "../../../i18n";

const schema: yup.ObjectSchema<FormData> = yup.object({
  email: yup
    .string()
    .email(translate.t("addOffer.input.email.errors.email"))
    .required(translate.t("addOffer.input.email.errors.required"))
    .min(8, translate.t("addOffer.input.email.errors.min"))
    .max(32, translate.t("addOffer.input.email.errors.max")),
  phone: yup
    .string()
    .required(translate.t("addOffer.input.phone.errors.required"))
    .min(9, translate.t("addOffer.input.phone.errors.min"))
    .max(9, translate.t("addOffer.input.phone.errors.max")),
  title: yup
    .string()
    .required(translate.t("addOffer.input.title.errors.required"))
    .min(8, translate.t("addOffer.input.title.errors.min"))
    .max(32, translate.t("addOffer.input.title.errors.max")),
  name: yup
    .string()
    .required(translate.t("addOffer.input.name.errors.required"))
    .min(2, translate.t("addOffer.input.name.errors.min"))
    .max(32, translate.t("addOffer.input.name.errors.max")),
  price: yup
    .string()
    .required(translate.t("addOffer.input.price.errors.required")),
  description: yup
    .string()
    .required("Opis jest wymagany")
    .min(30, "Minimalna długość znaków 30")
    .max(120, "Maksymalna długość znaków 120"),
  location: yup
    .string()
    .required(translate.t("addOffer.input.localization.errors.required")),
  picture: yup
    .array()
    .of(yup.string().ensure())
    .min(1, "Zdjęcie jest wymagane")
    .default([""]),
});

type FormData = {
  title: string;
  description: string;
  price: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  picture: string[];
};

const AddOfferScreen = ({ navigation, route }: AddOfferScreenParams) => {
  const [editImageListModal, setEditImageListModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>();
  const { theme } = useTheme();
  const location = route.params.location;
  const [imageList, setImageList] = useState<string[]>([]);
  const scrollView = useRef<ScrollView>(null);
  let user = useSelector((state: RootReducerType) => state.user);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      location: "",
      name: user?.name ? user.name : "",
      email: user?.email ? user.email : "",
      phone: user?.phone ? user.phone : "",
      picture: [],
    },
  });

  useEffect(() => {
    setValue("location", location);
  }, [location]);

  const onSubmit = (data: FormData) => console.log(data);

  const handleModalAction = (type: string) => {
    switch (type) {
      case "edit":
        handleAddPicture(selectedImage);
        break;
      case "delete":
        if (selectedImage !== undefined) {
          let imageArray = imageList;
          imageArray.splice(selectedImage, 1);
          setImageList(imageArray);
          setValue("picture", imageArray);
          setEditImageListModal(false);
          setSelectedImage(-1);
        }
        break;
      default:
        break;
    }
  };

  const handleAddPicture = async (key?: number) => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
    if (!result.canceled) {
      if (key || key === 0) {
        let newImage = result.assets[0].uri;
        let newArray = imageList.map((image: string, i: number) =>
          i === key ? (image = newImage) : image
        );
        setImageList(newArray);
        setValue("picture", newArray);
      } else {
        setImageList([...imageList, result.assets[0].uri]);
        setValue("picture", [...imageList, result.assets[0].uri]);
      }
    }
    setEditImageListModal(false);
    setSelectedImage(-1);
  };

  const PhotoGallery = () => (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        height: 160,
        marginTop: 8,
        marginBottom: 35,
        backgroundColor: theme.colors.grey5,
        borderRadius: 4,
        paddingHorizontal: 5,
        borderColor: imageList[0] ? theme.colors.primary : theme.colors.grey5,
        borderWidth: 3,
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
                  marginHorizontal: 8,
                }}
              >
                <Image
                  source={{ uri: image }}
                  PlaceholderContent={<ActivityIndicator />}
                  style={{
                    width: 60,
                    height: 75,
                    borderRadius: 6,
                    borderColor: theme.colors.primary,
                    borderWidth:
                      key === selectedImage && editImageListModal ? 3 : 0,
                  }}
                />
              </TouchableOpacity>
            );
          })}
          {imageList.length < 4 && (
            <TouchableOpacity
              onPress={() => {
                handleAddPicture();
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                borderWidth: 2,
                borderColor: theme.colors.secondary,
                width: 60,
                height: 75,
                marginLeft: 8,
              }}
            >
              <Icon
                name='plus'
                size={28}
                color={theme.colors.secondary}
                type='material-community'
              />
            </TouchableOpacity>
          )}
          {!imageList[0] && (
            <Text
              h4
              style={{
                paddingTop: 22,
                paddingLeft: 50,
                height: 75,
                color: errors.picture
                  ? theme.colors.error
                  : theme.colors.secondary,
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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.white }]}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Icon
          name='window-close'
          size={25}
          type='material-community'
          onPress={() => {
            navigation.goBack();
          }}
          containerStyle={{ marginLeft: 10, marginRight: 15, marginTop: 3 }}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {translate.t("addOffer.title")}
        </Text>
      </View>
      <ScrollView
        ref={scrollView}
        style={{ paddingHorizontal: 15, paddingTop: 10 }}
      >
        <Text h4 style={styles.subtitle}>
          {translate.t("addOffer.subtitle.details")}
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value}
              label={translate.t("addOffer.input.title.title")}
              placeholder={translate.t("addOffer.input.title.placeholder")}
              error={errors.title ? true : false}
              errorMessage={errors.title?.message || ""}
            />
          )}
          name='title'
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value}
              label={translate.t("addOffer.input.description.title")}
              placeholder={translate.t(
                "addOffer.input.description.placeholder"
              )}
              multiline={true}
              error={errors?.description ? true : false}
              errorMessage={errors.description?.message || ""}
            />
          )}
          name='description'
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value}
              label={translate.t("addOffer.input.price.title")}
              keyboardType='numeric'
              error={errors.price ? true : false}
              price={true}
              errorMessage={errors.price?.message || ""}
            />
          )}
          name='price'
        />
        <Text h4 style={styles.subtitle}>
          {translate.t("addOffer.subtitle.photos")}
        </Text>
        <PhotoGallery />
        <Text h4 style={styles.subtitle}>
          {translate.t("addOffer.subtitle.contact")}
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Text
                style={{
                  fontSize: 15,
                  marginBottom: 5,
                  marginTop: 10,
                  color: "#2a4865",
                  fontWeight: "normal",
                }}
              >
                {translate.t("addOffer.input.localization.title")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SelectLocation", { location });
                }}
              >
                <Input
                  placeholder={translate.t(
                    "addOffer.input.localization.placeholder"
                  )}
                  disabled={true}
                  disabledInputStyle={{ opacity: 1 }}
                  value={value}
                  placeholderTextColor='#2a4865'
                  errorMessage={!value ? errors.location?.message : ""}
                  inputContainerStyle={{
                    borderColor:
                      errors.location?.message && !value
                        ? "#ff5555"
                        : value
                        ? "#a2d2ff"
                        : "#f6f6f6",
                    borderBottomWidth: 2,
                  }}
                  rightIcon={
                    <Icon
                      name='chevron-right'
                      size={38}
                      color='#2a4865'
                      type='material-community'
                      containerStyle={{ marginRight: 5 }}
                    />
                  }
                />
              </TouchableOpacity>
            </>
          )}
          name='location'
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value}
              label={translate.t("addOffer.input.name.title")}
              placeholder={translate.t("addOffer.input.name.placeholder")}
              error={errors.name ? true : false}
              errorMessage={errors.name?.message || ""}
            />
          )}
          name='name'
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value}
              label={translate.t("addOffer.input.email.title")}
              keyboardType='email-address'
              placeholder={translate.t("addOffer.input.email.placeholder")}
              error={errors.email ? true : false}
              errorMessage={errors.email?.message || ""}
            />
          )}
          name='email'
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              onChange={onChange}
              value={value}
              keyboardType='phone-pad'
              label={translate.t("addOffer.input.phone.title")}
              placeholder={translate.t("addOffer.input.phone.placeholder")}
              error={errors.phone ? true : false}
              errorMessage={errors.phone?.message || ""}
            />
          )}
          name='phone'
        />
        <Button
          title={translate.t("addOffer.confirmButton")}
          onPress={handleSubmit(onSubmit)}
          raised={false}
          color={theme.colors.secondary}
          buttonStyle={{
            paddingVertical: 17,
            borderRadius: 4,
          }}
          containerStyle={{ marginTop: 16, marginBottom: 35 }}
        />
      </ScrollView>
      <EditDeleteImageModal
        editImageListModal={editImageListModal}
        setEditImageListModal={setEditImageListModal}
        handleModalAction={handleModalAction}
      />
    </View>
  );
};

export default AddOfferScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    width: "100%",
    height: "100%",
  },
  subtitle: { marginBottom: 10 },
});