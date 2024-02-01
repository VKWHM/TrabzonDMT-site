import {Layout} from "react-admin";
import {HydraAdmin, fetchHydra, hydraDataProvider, ResourceGuesser} from "@api-platform/admin";
import {parseHydraDocumentation} from "@api-platform/api-doc-parser";
import {AppBar, ToggleThemeButton} from "react-admin";
import {DateList, EventList} from "./components/Lists";
import {EventShow, DateShow} from "./components/Shows";
import {EventCreate} from "./components/Creates.tsx"
import './App.css'
import {EventEdit} from "./components/Edits.tsx";

const MyAppBar = () => <AppBar toolbar={<ToggleThemeButton/>}/>;
const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar}/>

const dataProvider = hydraDataProvider({
    entrypoint: "http://localhost:8001/api",
    httpClient: fetchHydra,
    apiDocumentationParser: parseHydraDocumentation,
    mercure: true,
    useEmbedded: false,
});

function App() {
    return (
        <HydraAdmin
              dataProvider={dataProvider}
              entrypoint={"http://localhost:8001/api"}
              layout={MyLayout}
              darkTheme={{palette: {mode: 'dark'}}}
            >
            <ResourceGuesser
              name={'calendar_dates'} 
              show={DateShow} 
              list={DateList} 
              recordRepresentation={(record: {day: number, month: number}) => `${record.day}/${record.month}`} 
            />
            <ResourceGuesser 
              name={'calendar_events'}  
              list={EventList} 
              show={EventShow} 
              edit={EventEdit} 
              create={EventCreate}
              recordRepresentation={"title"}
            />
        </HydraAdmin>

    )
}

export default App
