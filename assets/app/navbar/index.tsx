import React from "react";
import {Collapse, IconButton, MenuItem, Navbar, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faInfoCircle, faXmark} from "@fortawesome/free-solid-svg-icons";
import SearchBox from './SearchBox.tsx';

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <Typography
                placeholder={undefined}
                as="a"
                href="#"
                variant="small"
                color="gray"
                className="font-medium"
            >
                <MenuItem className={'flex items-center gap-2 lg:rounded-full'}
                          placeholder={undefined}>
                    <FontAwesomeIcon icon={faInfoCircle} className={'h-[18px] w-[18px]'}/>
                    <span className="font-bold">
                        Hakkımızda
                    </span>
                </MenuItem>
            </Typography>
            <SearchBox/>
        </ul>
    );
}

export function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar
            fullWidth={true}
            placeholder={undefined}
            className="mx-auto w-full px-6 py-3 fixed">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    placeholder={undefined}
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    Trabzon Dijital Maarif Takvimi
                </Typography>
                <div className="hidden lg:block">
                    <NavList/>
                </div>
                <IconButton
                    placeholder={undefined}
                    variant="text"
                    className="ml-auto w-6 h-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <FontAwesomeIcon icon={faXmark} size={'xl'}/>
                    ) : (
                        <FontAwesomeIcon icon={faBars} size={'xl'}/>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList/>
            </Collapse>
        </Navbar>
    );
}

export default NavbarSimple;