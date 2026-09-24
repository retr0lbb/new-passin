import { Text, View } from "react-native";

export function HeaderComponent(){
    return(
        <View className="w-full flex flex-row bg-brand-dark pt-10 px-4 pb-4 border-b border-zinc-800 items-center">
            <Text className="font-black text-xl text-brand-orange">{"<Passin />"}</Text>
        </View>
    )
}