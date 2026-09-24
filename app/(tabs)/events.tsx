import { EventForm } from "@/components/forms/event-form";
import { HeaderComponent } from "@/components/header";
import { useEvents } from "@/hooks/useEvents";
import { View } from "react-native";

export default function CreateEventsPage(){

    const {createEvents} = useEvents()

    return(
        <View className='flex flex-1' style={{backgroundColor: "#121719"}}>
            <HeaderComponent />

            <View className="flex flex-1 px-2">
                <EventForm onSubmit={async (payload) => {
                    const sluggedName = payload.title.toLowerCase().replace(" ", "-")
                    if(!payload.eventDate){
                        throw new Error("Events must have a date")
                    }
                    await createEvents({
                        slug: sluggedName, 
                        categoryId: payload.categoryId!, 
                        detail: payload.detail,
                        eventDate: payload.eventDate,
                        imageKey: payload.imageKey,
                        limitDateToSubscribe: payload.limitDateToSubscribe!,
                        maximumAttendees: payload.maximumAttendees,
                        title: payload.title
                    })
                }} />
            </View>
        </View>
    )
}