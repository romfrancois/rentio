import React from 'react';

type TabHeaderProps = {
    position: number;
    onClick: (position: number) => void;
    label: string;
    className: string;
};

const TabHeader = ({ label, className, onClick, position }: TabHeaderProps): JSX.Element => {
    return (
        <li key={label} className={className} onClick={() => onClick(position)}>
            {label}
        </li>
    );
};

export default TabHeader;
