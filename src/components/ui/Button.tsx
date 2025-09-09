import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  size = "medium",
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size] as any];

    if (disabled) {
      baseStyle.push(styles.disabled as any);
    } else {
      baseStyle.push(styles[variant] as any);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`] as any];

    if (disabled) {
      baseStyle.push(styles.disabledText as any);
    } else {
      baseStyle.push(styles[`${variant}Text`] as any);
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },

  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },

  // Variants
  primary: {
    backgroundColor: "#4a90e2",
    borderColor: "#357abd",
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: "#666",
  },
  danger: {
    backgroundColor: "#e74c3c",
    borderColor: "#c0392b",
  },
  disabled: {
    backgroundColor: "#333",
    borderColor: "#555",
  },

  // Text styles
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Text variants
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#ccc",
  },
  dangerText: {
    color: "#fff",
  },
  disabledText: {
    color: "#888",
  },
});
