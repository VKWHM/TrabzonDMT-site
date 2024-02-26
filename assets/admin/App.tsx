import {Layout, Options} from "react-admin";
import {HydraAdmin, fetchHydra as baseFetchHydra, hydraDataProvider, ResourceGuesser} from "@api-platform/admin";
import {parseHydraDocumentation} from "@api-platform/api-doc-parser";
import {AppBar, ToggleThemeButton} from "react-admin";
import {DateList, EventList} from "./components/Lists";
import {EventShow, DateShow} from "./components/Shows";
import {EventCreate} from "./components/Creates.tsx"
import './App.css'
import {EventEdit} from "./components/Edits.tsx";
import {authProvider} from "./components/utils/authProvider";

const MyAppBar = () => <AppBar toolbar={<ToggleThemeButton/>}/>;
const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar}/>

const getHeaders = () => localStorage.getItem("auth") !== null ? {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")!).token}`,
} : {};
const fetchHydra = (url: URL, options: Options = {}) =>
    baseFetchHydra(url, {
        ...options,
        // @ts-ignore
        headers: getHeaders,
    });

const dataProvider = hydraDataProvider({
    entrypoint: import.meta.env.VITE_API_URL,
    // @ts-ignore
    httpClient: fetchHydra,
    apiDocumentationParser: parseHydraDocumentation,
    mercure: true,
    useEmbedded: false,
});

function App() {
    return (
        <HydraAdmin
            authProvider={authProvider}
            dataProvider={dataProvider}
            entrypoint={import.meta.env.VITE_API_URL}
            layout={MyLayout}
            darkTheme={{palette: {mode: 'dark'}}}
            requireAuth={true}
        >
            <ResourceGuesser
                name={'calendar_dates'}
                show={DateShow}
                list={DateList}
                recordRepresentation={(record: { day: number, month: number }) => `${record.day}/${record.month}`}
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
