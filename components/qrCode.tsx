import { Image } from "react-native";

type Props = {
  value: string;
  size: number;
};

export default function QrCode({ size, value }: Props) {
  return (
    <Image
      source={require("@/assets/ticket/qrcode.png")}
      style={{
        width: size,
        height: size,
      }}
      resizeMode="contain"
    />
  );
}