import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startCheking } from './../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {

        dispatch(startCheking());

    }, [dispatch])

    if (checking) {
        return <h1>Cargando...</h1>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
