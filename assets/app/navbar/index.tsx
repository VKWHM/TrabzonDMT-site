import React, {useContext} from "react";
import {Collapse, IconButton, MenuItem, Navbar, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faInfoCircle, faXmark} from "@fortawesome/free-solid-svg-icons";
import {aboutSourceContext} from "../components/Contexts.tsx";

function NavList() {
    const [, setAboutSource] = useContext(aboutSourceContext);
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <Typography
                placeholder={undefined}
                as="a"
                variant="small"
                color="gray"
                className="font-medium"
            >
                <MenuItem
                    onClick={() => setAboutSource(true)}
                    className={'flex items-center gap-2 lg:rounded-md'}
                    placeholder={undefined}>
                    <FontAwesomeIcon icon={faInfoCircle} className={'h-[20px] w-[20px]'}/>
                    <span className="font-bold">
                        Hakkımızda & Kaynakça
                    </span>
                </MenuItem>
            </Typography>
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
            className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-1 lg:px-8 lg:py-2">
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