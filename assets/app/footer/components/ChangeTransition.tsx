import {useEffect, useState} from "react";

const ChangeTransition: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [displayedChildren, setDisplayedChildren] = useState(children);
    const [opacity, setOpacity] = useState<number>(1);

    useEffect(() => {
        if (children === displayedChildren) return;
        setOpacity(0);
        const timer = setTimeout(() => {
            setDisplayedChildren(children);
            setOpacity(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [children]);

    return (
        <span style={{transition: 'opacity 0.25s', opacity}}>
            {displayedChildren}
        </span>
    );
};

export default ChangeTransition;