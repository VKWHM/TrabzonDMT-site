import SearchBox from "./SearchBox.tsx";
import {Chip, IconButton, List, ListItem, Tooltip} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket, faBackward, faForward} from "@fortawesome/free-solid-svg-icons";

const iconSize = 'sm';

export const HelperBox: React.FC = () => {
    return (
        <div className={'sticky top-20 bg-white rounded-xl my-shadow p-2 flex flex-col gap-2'}>
            <div className={'flex gap-2'}>
                <SearchBox/>
                <Tooltip content="Share">
                    <IconButton
                        color={'white'}
                        placeholder={undefined}>
                        <FontAwesomeIcon
                            size={'xl'}
                            icon={faArrowUpFromBracket}/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className={'flex gap-2 justify-between'}>
                <div className={'flex gap-2'}>
                    <Tooltip content="23 Ocak">
                        <IconButton
                            size={iconSize}
                            color={'white'}
                            // size={'lg'}
                            placeholder={undefined}>
                            <FontAwesomeIcon
                                size={'lg'}
                                icon={faBackward}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip content="25 Ocak">
                        <IconButton
                            size={iconSize}
                            color={'white'}
                            // size={'lg'}
                            placeholder={undefined}>
                            <FontAwesomeIcon
                                size={'lg'}
                                icon={faForward}/>
                        </IconButton>
                    </Tooltip>
                </div>
                <Chip
                    className={'text-black'}
                    size={iconSize}
                    variant={'outlined'}
                    value="24 Ocak"/>
            </div>
            <List
                className={'hidden'}
                placeholder={undefined}>
                <ListItem placeholder={undefined}>Test</ListItem>
            </List>
        </div>
    );
};