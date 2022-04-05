import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import FavouritePage from '../pages/FavouritePage';
import AppHeader from '../app-header/app-header';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModal: false,
            addBtn: false
        };
    }

    onAddModal = () => {
        this.setState(({ addModal }) => {
            return {
                addModal: true
            }
        });
    }
    onDeleteModal = () => {
        this.setState(({ addModal }) => {
            return {
                addModal: false
            }
        });
    }

    onAddButton = () => {
        this.setState(({ addBtn }) => {
            return {
                addBtn: true
            }
        });
    }

    onDeleteButton = () => {
        this.setState(({ addBtn }) => {
            return {
                addBtn: false
            }
        });
    }

    render() {
        const home = '/';
        const favourites = '/favourites';
        let { addModal, addBtn } = this.state;

        return (
            <Router>
                <div className="app">
                    <AppHeader
                        favourites={favourites}
                        home={home}
                        onAddModal={this.onAddModal}
                        addBtn={addBtn}
                        onAddButton={this.onAddButton}
                        onDeleteButton={this.onDeleteButton} />
                    <main>
                        <Switch>
                            <Route path={favourites}>
                                <FavouritePage
                                    addModal={addModal}
                                    onDeleteModal={this.onDeleteModal}
                                    onAddButton={this.onAddButton} />
                            </Route>
                            <Route path={home}>
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
