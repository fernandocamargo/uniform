import { lazy } from 'react';

export const Basic = lazy(() => import('./basic'));

export const Macros = lazy(() => import('./macros'));

export const NotFound = lazy(() => import('./404'));
