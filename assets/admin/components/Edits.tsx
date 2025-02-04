import {EditGuesser, EditGuesserProps, InputGuesser} from "@api-platform/admin";
import {AutocompleteInput, ImageField, ReferenceInput, required, TextInput} from "react-admin";

export const EventEdit = (props: EditGuesserProps) => {
    // @ts-ignore
    const filterToQuery = searchText => {
        const [day, month] = searchText.split("/");
        return {
            day,
            month,
        };
    };
    return (
        <EditGuesser {...props}>
            <ReferenceInput reference={"calendar_dates"} source={"date"}>
                <AutocompleteInput
                    validate={[required()]}
                    label={"Date (Day / Month)"}
                    optionText={(record: { day: number, month: number }) => `${record.day} / ${record.month}`}
                    filterToQuery={filterToQuery}
                    fullWidth={true}
                />
            </ReferenceInput>
            <TextInput source={'title'} label={'Title'} fullWidth={true} validate={[required()]}/>
            <TextInput source={'summary'} label={'Summary'} fullWidth={true} multiline={true}/>
            <TextInput source={'content'} label={'Content'} fullWidth={true} multiline={true} validate={[required()]}/>
        </EditGuesser>
    );
};

export const ImageEdit = (props: EditGuesserProps) => {
    return (
        <EditGuesser {...props}>
            <InputGuesser source={'description'} label={'Description'} fullWidth={true}/>
            <ImageField source="imageUrl"/>
        </EditGuesser>
    );
};