import {FieldGuesser, ListGuesser, ListGuesserProps} from "@api-platform/admin";
import {ChipField, NumberField, ReferenceArrayField, ReferenceField, SingleFieldList} from "react-admin";

export const DateList = (props: ListGuesserProps) => {
    return (
        <ListGuesser {...props}>
            <FieldGuesser source={"day"} label={"Day"} />
            <FieldGuesser source={"month"} label={"Month"} />
            <ReferenceArrayField reference={"calendar_events"} source={"events"} label={"Events of this Date"}>
              <SingleFieldList>
                <ChipField source="title"/>
              </SingleFieldList>
            </ReferenceArrayField>
        </ListGuesser>
    )
}

export const EventList = (props: ListGuesserProps) => {
    return (
        <ListGuesser {...props}>
            <ReferenceField reference={"calendar_dates"} source={"date"} label={"Day"}>
                <NumberField source={"day"} />
            </ReferenceField>
            <ReferenceField reference={"calendar_dates"} source={"date"} label={"Month"}>
                <NumberField source={"month"} />
            </ReferenceField>
            <FieldGuesser source={"title"} label={"Title"} />
        </ListGuesser>
    )
}

export const ImageList = (props: ListGuesserProps) => {
    return (
        <ListGuesser {...props}>
            <FieldGuesser source={"imageName"} label={"File Name"}/>
            <FieldGuesser source={"description"} label={"Description"}/>
        </ListGuesser>
    );
};
