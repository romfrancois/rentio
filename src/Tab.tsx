import React from 'react';

// import FormInfo from './Forms/FormInfo'
// import FormDates from './Forms/FormDates'

export type TabProps = {
    children: any; //FormInfo | FormDates,
    label: string;
};

export const Tab = ({ children }: TabProps) => <div>{children}</div>;

export default Tab;
