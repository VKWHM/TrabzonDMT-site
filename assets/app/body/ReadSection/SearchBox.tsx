import {IconButton, Input} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const SearchBox = () => {
    const [search, setSearch] = useState<string>("");
    return (
        <div className="relative flex w-full gap-2">
            <Input
                disabled={true}
                type="search"
                color="black"
                label="Search"
                value={search}
                containerProps={{
                    className: "min-w-[165px] w-full rounded-full",
                }}
                onChange={(e) => setSearch(e.target.value)}
                crossOrigin={undefined}
            />
            <IconButton
                disabled={true}
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