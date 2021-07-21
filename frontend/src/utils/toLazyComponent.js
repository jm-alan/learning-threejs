import { lazy } from 'react';

/* eslint-disable import/no-anonymous-default-export */
export default path => lazy(() => import(path));
