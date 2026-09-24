import { Text, View } from "react-native";

export function HeaderComponent(){
    return(
        <View className="w-full mt-6 min-h-16 flex flex-row px-4 py-2 border-b border-zinc-800 items-center">
            <Text className="font-black text-xl text-brand-orange">{"<Passin />"}</Text>
        </View>
    )
}