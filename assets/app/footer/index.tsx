import {Typography} from '@material-tailwind/react';
import DateSelector from './DateSelector';

const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    return (
        <footer className={'fixed bottom-0 w-full h-fit'}>
            {/*Date Tabs*/}
            <DateSelector/>
            {/*Copyrights section*/}
            <Typography
                variant={'small'}
                placeholder={'Created By Rayan Ali Salem'}
                className={'text-center text-white bg-black py-1'}>
                Created By <span className={'font-bold'}>Rayan Ali Salem </span>
                ©{year - 1}-{year} All Rights Reserved.
            </Typography>
        </footer>
    );
};

export default Footer;