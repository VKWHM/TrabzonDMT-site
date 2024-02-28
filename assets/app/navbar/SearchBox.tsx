import {IconButton, Input} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const SearchBox = () => {
    const [search, setSearch] = useState<string>("");
    return (
        <div className="relative flex w-full gap-2 md:w-max">
            <Input
                type="search"
                color="black"
                label="Search"
                value={search}
                className="pr-20"
                containerProps={{
                    className: "min-w-[288px]",
                }}
                onChange={(e) => setSearch(e.target.value)}
                crossOrigin={undefined}
            />
            <IconButton
                placeholder={undefined}
                size="sm"
                variant={'text'}
                className="!absolute right-1 top-1 rounded"
                onClick={() => setSearch("")}
            >
                {search ? <FontAwesomeIcon icon={faCircleXmark} size={'xl'}/> :
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={'xl'}/>}
            </IconButton>
        </div>
    );
};

export default SearchBox;