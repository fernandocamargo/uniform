import { lazy } from 'react';

export const Dashboard = lazy(() => import('./dashboard'));

export const Login = lazy(() => import('./login'));

export const NotFound = lazy(() => import('./404'));

export const Profile = lazy(() => import('./profile'));
