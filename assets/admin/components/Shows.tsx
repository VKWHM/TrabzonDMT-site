import {FieldGuesser, ShowGuesser, ShowGuesserProps} from "@api-platform/admin";
import {
    ChipField,
    FunctionField,
    ImageField,
    ReferenceArrayField,
    ReferenceField,
    RichTextField,
    Show,
    SimpleShowLayout,
    SingleFieldList,
    TabbedShowLayout,
    TextField,
    useRecordContext,
} from "react-admin";

const Aside = () => {
  const record = useRecordContext();
  return (
    <div style={{width: 200, margin: '1em'}}>

      <h4 >Modification details</h4>
      {record && (
        <>
          <p style={{fontSize: 14}}>
            <span style={{display: "block", fontWeight: "bold"}}>Creation date: </span>
            <span>{new Date(record.createdAt).toLocaleString()}</span>
          </p>
          {record.updatedAt && (
            <p style={{fontSize: 14}}>
              <span style={{display: "block", fontWeight: "bold"}}>Modification date: </span>
              <span>{new Date(record.updatedAt).toLocaleString()}</span>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export const EventShow = () => {
    return (
        <Show aside={<Aside />}>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label={"Event Summary"}>
                    <ReferenceField reference={"calendar_dates"} source={"date"} label={"Date (Day / Month)"}>
                        <FunctionField render={(record: {day: number, month: number}) => `${record.day} / ${record.month}`} />
                    </ReferenceField>
                    <TextField source={"title"} label={"Title"} />
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab label={"Event Content"}>
                    <TextField source={"title"} label={"Title"} />
                    <TextField source={"summary"} label={"summary"} />
                    <RichTextField source={"content"} label={"Content"} />
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    )
}

export const DateShow = (props: ShowGuesserProps) => {
  return (
      <ShowGuesser {...props} aside={<Aside />}>
        <SimpleShowLayout>
            <FieldGuesser source="day" />
            <FieldGuesser source="month" />
            <ReferenceArrayField reference={"calendar_events"} source={"events"} label={"Events of this Date"}>
              <SingleFieldList>
                <ChipField source="title"/>
              </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout> 
      </ShowGuesser>
  );
}

export const ImageShow = (props: ShowGuesserProps) => {
    return (
        <ShowGuesser {...props} aside={<Aside/>}>
            <SimpleShowLayout>
                <FieldGuesser source="description"/>
                <FieldGuesser source="imageName"/>
                <ImageField source={"imageUrl"}/>
            </SimpleShowLayout>
        </ShowGuesser>
    );
};
