import React from "react";
import {
  Platform,
  StyleSheet,
  ScrollViewProps,
  View,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "@/styles/сolors";

/**
 * ThemedView is a wrapper component with common styles and properties. This component ensures a consistent layout and behavior
 * across different screens.
 *
 * @param {'default' | 'form' | 'flatList'} [type='default'] - Type of view styling to apply.
 * @param {boolean} loading - Optional loading indicator.
 * @returns {JSX.Element} A component that wraps its children.
 */

interface ThemedViewProps extends ScrollViewProps {
  type?: "default" | "form" | "flatList";
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  type = "default",
  children,
  ...props
}) => {
  const handleScroll = () => {
    Keyboard.dismiss(); // Закрити клавіатуру при скролі
  };

  const renderBody = () => {
    switch (type) {
      case "default":
        return (
          <ScrollView
            style={[styles.container, { ...props }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {children}
            <View style={{ height: 50 }}></View>
          </ScrollView>
        );
      case "form":
        return (
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="always"
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            extraScrollHeight={100}
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === "ios"}
          >
            <ScrollView
              style={[styles.container, { ...props }]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          </KeyboardAwareScrollView>
        );
      case "flatList":
        return (
          <View style={[styles.container, { ...props, paddingBottom: 0 }]}>
            {children}
          </View>
        );
    }
  };

  return <>{renderBody()}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
    paddingTop: 35,
    paddingBottom: 40,
    paddingHorizontal: 25,
  },
});

export default ThemedView;
