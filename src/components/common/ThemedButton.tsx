import {
  TouchableOpacity,
  Text,
  type TextProps,
  StyleSheet,
} from "react-native";
import { COLORS } from "@/styles/сolors";

export type ThemedButtonProps = TextProps & {
  onPress: Function;
  disabled?: boolean;
  title: string;
  type?: "main" | "additional";
};

export function ThemedButton({
  style,
  onPress,
  disabled,
  type = "main",
  title,
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        type === "main"
          ? {
              backgroundColor: disabled
                ? COLORS.accentSecondary
                : COLORS.accentPrimary,
            }
          : undefined,
        type === "additional" ? styles.additional : undefined,

        style,
        styles.main,
      ]}
      onPress={onPress}
      disabled={disabled}
      testID="submit-button"
    >
      <Text
        style={[
          type === "main" ? styles.mainText : undefined,
          type === "additional" ? styles.additionalText : undefined,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,

    shadowColor: "rgba(128, 128, 128, 0.20)",
    shadowOffset: { width: 0, height: 5.774 },
    shadowRadius: 9.623,
    shadowOpacity: 0.2,
    elevation: 10,
  },
  mainText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textSecondary,

    fontWeight: "500",
  },
  additional: {
    borderWidth: 1,
    borderColor: COLORS.accentPrimary,
  },
  additionalText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.accentPrimary,

    fontWeight: "500",
  },
  googleText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.accentSecondary,

    fontWeight: "500",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
