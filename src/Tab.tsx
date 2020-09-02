import React from 'react';

export type TabProps = {
    children: JSX.Element; //FormInfo | FormDates,
    label: string;
};

export const Tab = ({ children }: TabProps): JSX.Element => <div>{children}</div>;

export default Tab;
