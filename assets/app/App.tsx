import Footer from './footer';
import Body from './body';
import Navbar from './navbar';
import axios from 'axios';
import {initialize} from "./components/Hooks.tsx";
import {useEffect, useState} from "react";

import calendarIconLight from '../icons/calendarIconLight.png';

axios.defaults.headers.get['Accept'] = 'application/ld+json';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        initialize().then(() => setTimeout(() => setLoading(false), 1000));
    }, []);
    return loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={calendarIconLight} alt="Loading..." className="animate-pulse max-w-[50vw]"/>
            <div className={'flex space-x-2 justify-center items-center'}>
                <div
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-black/90 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-black/90 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 bg-black/90 rounded-full animate-bounce"></div>
            </div>
        </div>
    ) : (
        <div className={'flex flex-col bg-gray-100/80 '}>
            <Navbar/>
            <Body/>
            <Footer/>
        </div>
    );
};

export default App;