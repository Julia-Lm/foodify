import { Component } from 'react';

import { Link } from 'react-router-dom';
import './app-header.scss';

class AppHeader extends Component {

    onAddButton() {
        const buttonAdd = document.querySelector('.header-button-add');
        const buttonAddSm = document.querySelector('.header-button-add-sm');
        buttonAdd.style.display = 'block';

        if (window.screen.width < 900) {
            buttonAddSm.style.display = 'flex';
        } else {
            buttonAddSm.style.display = 'none';
        }

    }

    onDeleteButton() {
        const buttonAdd = document.querySelector('.header-button-add');
        const buttonAddSm = document.querySelector('.header-button-add-sm');
        if (buttonAdd !== null) {
            buttonAdd.style.display = 'none';
        }
        if (buttonAddSm !== null) {
            buttonAddSm.style.display = 'none';
        }

    }
    onAddDish() {
        document.body.style.overflow = "hidden";
        const addDish = document.querySelector('.add-dish');
        addDish.style.display = 'flex';
    }

    render() {
        return (
            <div className="app-header">
                <div className="container">
                    <div className="header-menu">
                        <div className="header-menu-button">
                            <button className="header-button">
                                <Link to='/' className='header-button-link' onClick={this.onDeleteButton}>
                                    Random dish
                                </Link>
                            </button>

                            <button className="header-button button-favourites" onClick={this.onAddButton}>
                                <Link to='/favourites' className='header-button-link' >
                                    Favourites
                                </Link>
                            </button>
                        </div>

                        <button className="header-button-add" onClick={this.onAddDish}>
                            Add custom dish
                        </button>
                        <div className="header-button-add-sm" onClick={this.onAddDish}>
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88">
                                <title>add</title>
                                <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z" />
                            </svg>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
};

export default AppHeader;