
import { EventCard } from '@/components/event-card';
import { FilterTags } from '@/components/filter-tags';
import { HeaderComponent } from '@/components/header';
import { SearchInput } from '@/components/search-input';
import { View } from '@/components/Themed';
import { Event, useEvents } from '@/hooks/useEvents';
import { Tag, useTags } from '@/hooks/useTags';
import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

export default function TabOneScreen() {
  const {createEvents, getEvents} = useEvents()
  const {getTags} = useTags()
  const [events, setEvents] = useState<Event[]>()
  const [tags, setTags] = useState<Tag[]>()
  const [selectedTag, setSelectedTag] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
      async function exec(){
        const tags = await getTags()

        setTags([...tags])

        const events = await getEvents()
        setEvents(events)
      }
      exec()
  }, [])


  if(!tags){
    return
  }

  return ( 
    <View className='flex flex-1 ' style={{backgroundColor: "#121719"}}>
      <HeaderComponent />
      <View style={{
        flex: 1,
        backgroundColor: "#121719"
      }}>
        <Text className='text-zinc-200 ml-6 mt-10 text-2xl font-bold'>Explorar Eventos</Text>

        <View className='flex flex-col gap-6 mt-4' style={{backgroundColor: "transparent"}}>
          <View className='px-4' style={{backgroundColor: "transparent"}}>
            <SearchInput value={search} onChangeText={e => setSearch(e)}/>
          </View>
          <View className='px-4' style={{backgroundColor: "transparent"}}>
            <FilterTags selectedId={selectedTag} tags={tags} onSelect={(id) => setSelectedTag(id)} />
          </View>
        </View>

        <FlatList
          className='pt-4 px-2' 
         data={events}
         keyExtractor={(event) => event.id}
         renderItem={({item}) => <EventCard event={item} />}
        />
      </View>
    </View>
  );
}

