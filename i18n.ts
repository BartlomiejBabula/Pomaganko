import { I18n } from "i18n-js";

export const translate = new I18n({
  en: {
    addOffer: {
      title: "Add Advertisement",
      subtitle: {
        details: "Details",
        photos: "Photos",
        contact: "Contact",
      },
      input: {
        title: {
          title: "Title*",
          placeholder: "e.g. Dog food",
          errors: {
            required: "Title required",
            min: "Minimum character length 8",
            max: "Maximum character length 32",
          },
        },
        description: {
          title: "Description*",
          placeholder:
            "Describe in detail the help you need to best inform the supporter of the support you need",
          errors: {
            required: "Description required",
            min: "Minimum character length 30",
            max: "Maximum character length 120",
          },
        },
        price: {
          title: "Suggested price*",
          errors: {
            required: "Price required",
          },
        },
        localization: {
          title: "Location*",
          placeholder: "Select",
          errors: {
            required: "Location required",
          },
        },
        name: {
          title: "Name*",
          placeholder: "Enter your name",
          errors: {
            required: "Name required",
            min: "Wrong name",
            max: "Maximum character length 32",
          },
        },
        email: {
          title: "E-mail*",
          placeholder: "Enter your e-mail",
          errors: {
            email: "Wrong e-mail",
            required: "E-mail required",
            min: "Minimum character length 8",
            max: "Maximum character length 32",
          },
        },
        phone: {
          title: "Phone number*",
          placeholder: "Enter phone number",
          errors: {
            required: "Phone number required",
            min: "Incorrect length of phone number",
            max: "Incorrect length of phone number",
          },
        },
      },
      addPhotos: {
        title: "Add photos!",
        description:
          "The first photo will be the main photo. Click on the photo to delete or edit.",
      },
      confirmButton: "Add advertisement",
      editDeleteImageModal: {
        edit: "edit photo",
        delete: "delete photo",
        cancel: "cancel",
      },
      selectLocationScreen: {
        placeholder: "Search for locations",
        currentLocation: "Current location",
        description: "Click to set your current location",
        error: "Access to location denied",
      },
    },
  },
  pl: {
    addOffer: {
      title: "Dodaj Ogłoszenie",
      subtitle: {
        details: "Szczególy",
        photos: "Zdjęcia",
        contact: "Kontakt",
      },
      input: {
        title: {
          title: "Tytuł*",
          placeholder: "np. Karma dla psa",
          errors: {
            required: "Tytuł jest wymagany",
            min: "Minimalna długość znaków 8",
            max: "Maksymalna długość znaków 32",
          },
        },
        description: {
          title: "Opis*",
          placeholder:
            "Opisz dokładnie pomoc jaką potrzebujesz, aby jak najlepiej poinformować wspierającego o potrzebnym wsparciu",
          errors: {
            required: "Opis jest wymagany",
            min: "Minimalna długość znaków 30",
            max: "Maksymalna długość znaków 120",
          },
        },
        price: {
          title: "Sugerowana cena*",
          errors: {
            required: "Cena jest wymagana",
          },
        },
        localization: {
          title: "Lokalizacja*",
          placeholder: "Wybierz",
          errors: {
            required: "Lokacja jest wymagana",
          },
        },
        name: {
          title: "Imię*",
          placeholder: "Wpisz swoje imie",
          errors: {
            required: "Imię jest wymagane",
            min: "Błędne imię",
            max: "Maksymalna długość znaków 16",
          },
        },
        email: {
          title: "E-mail*",
          placeholder: "Wpisz swój adress e-mail",
          errors: {
            email: "Błędny adress email",
            required: "Adress e-mail jest wymagany",
            min: "Minimalna długość znaków 8",
            max: "Maksymalna długość znaków 32",
          },
        },
        phone: {
          title: "Numer telefonu*",
          placeholder: "Wpisz kontaktowy numer telefonu",
          errors: {
            required: "Numer telefonu jest wymagany",
            min: "Błędna długość numeru tlefonu",
            max: "Błędna długość numeru tlefonu",
          },
        },
      },
      addPhotos: {
        title: "Dodaj zdjęcia!",
        description:
          "Pierwsze zdjęcie będzie zdjęciem głównym. Kliknij na zdjęcie aby usunąć lub edytować.",
      },
      confirmButton: "Dodaj ogłoszenie",
      editDeleteImageModal: {
        edit: "zmień zdjęcie",
        delete: "usuń zdjęcie",
        cancel: "anuluj",
      },
      selectLocationScreen: {
        placeholder: "Wyszukaj lokalizacje",
        currentLocation: "Twoja lokalizacja",
        description: "Kliknij aby ustawić swoją aktualną lokalizacje",
        error: "Odmówiono dostępu do lokalizacji",
      },
    },
  },
});

// Set the locale once at the beginning of your app.
//Checking locales actual bugged
//i18n.locale = getLocales()[0].languageCode;
translate.locale = "pl";
