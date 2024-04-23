import {AppBar, Layout, Options, ToggleThemeButton} from "react-admin";
import {fetchHydra as baseFetchHydra, HydraAdmin, hydraDataProvider, ResourceGuesser} from "@api-platform/admin";
import {parseHydraDocumentation} from "@api-platform/api-doc-parser";
import {DateList, EventList} from "./components/Lists";
import {DateShow, EventShow} from "./components/Shows";
import {EventCreate} from "./components/Creates.tsx";
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
            <ResourceGuesser name={'image_informations'}/>
            <ResourceGuesser name={'users'} />
        </HydraAdmin>

    );
}

export default App
