import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import FavouritePage from '../pages/FavouritePage';
import AppHeader from '../app-header/app-header';


class App extends Component {

    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Switch>
                            <Route path="/favourites">
                                <FavouritePage />
                            </Route>
                            <Route path="/">
                                <MainPage />
                            </Route>

                        </Switch>
                    </main>

                </div>
            </Router>
        );
    }
}

export default App;

/*
<Route path='favourite/' element={<div>fhfgjfgj</div>}>

                        </Route>*/