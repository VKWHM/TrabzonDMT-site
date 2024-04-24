import {createContext} from 'react';

export const dateContext = createContext<string>('');
export const aboutSourceContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([
    false,
    () => {},
]);
