import { Component } from 'react';
import './app-favourites.scss';

import DishesList from '../dishes-list/dishes-list';
import FavouritesAddForm from '../favourites-add-form/favourites-add-form';

class AppFavourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: [],
        };
        this.maxId = 0;
    }

    componentDidMount() {
        let buttonAdd = document.querySelector('.header-button-add');
        const buttonAddSm = document.querySelector('.header-button-add-sm');
        buttonAdd.style.display = 'block';

        window.onresize = function (e) {
            if (e.target.outerWidth < 900) {
                buttonAddSm.style.display = 'flex';
            } else {
                buttonAddSm.style.display = 'none';
            }
        };

        this.setState(({ dishes }) => {
            const dishesLocal = localStorage.getItem('dishes') ? JSON.parse(localStorage.getItem('dishes')) : [];
            const newArr = dishesLocal.map(item => {
                return { ...item, readMore: false, deleteButton: true }
            });
            return { dishes: newArr };
        })
    }


    onAddDishInArr = (name, instructions, onDeleteAddDishModal) => {

        if (name !== '' && instructions !== '' && name.length > 3) {
            onDeleteAddDishModal();
            const arr = localStorage.getItem('dishes') ? JSON.parse(localStorage.getItem('dishes')) : [];

            const newIem = {
                id: arr.length++,
                name,
                instructions,
                readMore: false,
                deleteButton: true,
                ingredient: null,
                measure: null

            }
            this.setState(({ dishes }) => {
                const newArr = [...dishes, newIem];
                localStorage.setItem('dishes', JSON.stringify(newArr));
                return {
                    dishes: newArr
                }
            });
        }
    }
    deleteItem = (id) => {
        this.setState(({ dishes }) => {
            const newArr = dishes.filter(item => item.id !== id);
            localStorage.setItem('dishes', JSON.stringify(newArr));
            return {
                dishes: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({ dishes }) => ({
            dishes: dishes.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }

    render() {
        const { dishes } = this.state;

        return (
            <div className="app-favourites">
                <div className="container-favourites">
                    <DishesList
                        data={dishes}
                        onDelete={this.deleteItem}
                        onToggleProp={this.onToggleProp} />
                    <div className='add-dish'>
                        <FavouritesAddForm onAdd={this.onAddDishInArr} />
                    </div>


                </div>

            </div>
        )
    }
}

export default AppFavourites;