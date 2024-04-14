import {useEffect, useState} from "react";

const ChangeTransition: React.FC<{ state?: any, children: React.ReactNode }> = ({state: newState, children}) => {
    const state = newState !== undefined ? newState : children;
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
    }, [state]);

    return (
        <span style={{transition: 'opacity 0.25s', opacity}}>
            {displayedChildren}
        </span>
    );
};

export default ChangeTransition;