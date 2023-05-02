import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { AddOfferScreenParams } from "../../../routes/types";
import { Text, Icon, Input, useTheme, Divider } from "@rneui/themed";
import { useForm, Controller } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EditDeleteImageModal from "./EditDeleteImageModal";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../reducers/types";
import { translate } from "../../../i18n/i18n";
import PhotoGallery from "./PhotoGallery";
import ButtonSubmit from "../../../components/ButtonSubmit";

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

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.white, paddingTop: 35, flex: 1 }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Icon
          name='window-close'
          size={24}
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
      <Divider />
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
        <PhotoGallery
          imageList={imageList}
          setSelectedImage={setSelectedImage}
          setEditImageListModal={setEditImageListModal}
          scrollView={scrollView}
          selectedImage={selectedImage}
          editImageListModal={editImageListModal}
          handleAddPicture={handleAddPicture}
          error={errors.picture}
        />
        <Text h4 style={styles.subtitle}>
          {translate.t("addOffer.subtitle.contact")}
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value } }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("SelectLocation", {
                  location,
                  backLocation: "AddOfferModal",
                });
              }}
            >
              <Input
                label={translate.t("addOffer.input.localization.title")}
                placeholder={translate.t(
                  "addOffer.input.localization.placeholder"
                )}
                disabled={true}
                disabledInputStyle={{ opacity: 1 }}
                value={value}
                errorMessage={!value ? errors.location?.message : ""}
                inputContainerStyle={{
                  backgroundColor: theme.colors.grey5,
                }}
                rightIcon={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name='chevron-right'
                      size={32}
                      color={theme.colors.black}
                      type='material-community'
                      containerStyle={{ marginRight: 5 }}
                    />
                    {errors.location?.message && !value ? (
                      <Icon
                        containerStyle={{ marginRight: 10 }}
                        name='alert-circle-outline'
                        size={24}
                        color={theme.colors.error}
                        type='material-community'
                      />
                    ) : (
                      value && (
                        <Icon
                          containerStyle={{ marginRight: 10 }}
                          name='check-circle-outline'
                          size={24}
                          color={theme.colors.success}
                          type='material-community'
                        />
                      )
                    )}
                  </View>
                }
              />
            </Pressable>
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
        <ButtonSubmit
          title={translate.t("addOffer.confirmButton")}
          onPress={handleSubmit(onSubmit)}
          containerStyle={{ marginTop: 16, marginBottom: 35 }}
        />
      </ScrollView>
      <EditDeleteImageModal
        editImageListModal={editImageListModal}
        setEditImageListModal={setEditImageListModal}
        handleModalAction={handleModalAction}
      />
    </SafeAreaView>
  );
};

export default AddOfferScreen;

const styles = StyleSheet.create({
  subtitle: { marginBottom: 10 },
});
