import {CreateGuesser, CreateGuesserProps} from "@api-platform/admin";
import {AutocompleteInput, ImageField, ImageInput, ReferenceInput, required, TextInput} from "react-admin";

export const EventCreate = (props: CreateGuesserProps) => {
    // @ts-ignore
    const filterToQuery = searchText => {
      const [day, month] = searchText.split("/");
      return {
        day,
        month,
      };
    }
    return (
        <CreateGuesser {...props}>
            <ReferenceInput reference={"calendar_dates"} source={"date"}>
                <AutocompleteInput 
                    validate={[required()]} 
                    label={"Date (Day / Month)"} 
                    optionText={(record: {day: number, month: number}) => `${record.day} / ${record.month}`} 
                    filterToQuery={filterToQuery}
                    fullWidth={true}
                  />
            </ReferenceInput>
            <TextInput source={'title'} label={'Title'} fullWidth={true} validate={[required()]} />
            <TextInput source={'summary'} label={'Summary'} fullWidth={true} multiline={true} />
            <TextInput source={'content'} label={'Content'} fullWidth={true} multiline={true} validate={[required()]} />
        </CreateGuesser>
    )
}

export const ImageCreate = (props: CreateGuesserProps) => {
    return (
        <CreateGuesser {...props}>
            <TextInput source={'description'} label={'Description'} fullWidth={true}/>
            <ImageInput source={'image'} name={'image'} accept={['image/png', 'image/jpeg']} validate={[required()]}>
                <ImageField source={'src'} title={'title'}/>
            </ImageInput>
        </CreateGuesser>
    );
}
