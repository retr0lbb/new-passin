import { EventForm } from "@/components/forms/event-form";
import { HeaderComponent } from "@/components/header";
import { View } from "react-native";

export default function CreateEventsPage(){
    return(
        <View className='flex flex-1' style={{backgroundColor: "#121719"}}>
            <HeaderComponent />

            <View className="flex flex-1 px-2">
                <EventForm onSubmit={(payload) => {
                    console.log(payload)
                }} />
            </View>
        </View>
    )
}