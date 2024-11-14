export default () => ({
  expo: {
    name: "Volito",
    slug: "Volito",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.s.s.volito",
      permissions: ["CAMERA", "ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
    },
    web: {
      favicon: "./src/assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow Volito to use your location.",
        },
      ],

      [
        "expo-camera",
        {
          cameraPermission: "Allow Volito to access your camera",
          microphonePermission: "Allow Volito to access your microphone",
          recordAudioAndroid: true,
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "895513f2-14c8-4dec-b64c-8f53807ad39b",
      },
    },
  },
});
