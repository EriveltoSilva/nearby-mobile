import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import React from "react";
import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { colors } from "@/styles/colors";
import { s } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
};

const Button = ({ children, style, isLoading = false, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity style={[s.container, style]} activeOpacity={0.8} disabled={isLoading} {...props}>
      {isLoading ? <ActivityIndicator size={"small"} color={colors.gray[100]} /> : children}
    </TouchableOpacity>
  );
};

const ButtonIcon = ({ icon: Icon }: { icon: React.ComponentType<TablerIconProps> }) => {
  return <Icon size={24} color={colors.gray[100]} />;
};

const ButtonText = ({ children }: TextProps) => {
  return <Text style={s.title}>{children}</Text>;
};

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
