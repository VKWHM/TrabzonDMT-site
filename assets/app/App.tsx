import Footer from './footer';
import Body from './body';
import Navbar from './navbar';
import axios from 'axios';

axios.defaults.headers.get['Accept'] = 'application/ld+json';

const App: React.FC = () => {
    return (
        <div className={'flex flex-col'}>
            <Navbar/>
            <Body/>
            <Footer/>
        </div>
    );
};

export default App;