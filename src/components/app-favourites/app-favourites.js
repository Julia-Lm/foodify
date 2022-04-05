import { Component } from 'react';
import ReactDOM from 'react-dom';

import './app-favourites.scss';

import DishesList from '../dishes-list/dishes-list';
import FavouritesAddForm from '../favourites-add-form/favourites-add-form';

class AppFavourites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: [],
        };
    }

    componentDidMount = () => {
        this.props.onAddButton();

        this.setState(({ dishes }) => {
            const dishesLocal = localStorage.getItem('dishes') ? JSON.parse(localStorage.getItem('dishes')) : [];
            const newArr = dishesLocal.map(item => {
                return { ...item, readMore: false, deleteButton: true }
            });
            return { dishes: newArr };
        })
    }


    onAddDishInArr = (name, instructions, onDeleteAddDishModal) => {

        if (name !== '' && instructions !== '') {
            onDeleteAddDishModal();

            const newIem = {
                id: Math.floor(Math.random() * (3002 - 10) + 10),
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
            <>
                <div className="app-favourites">
                    <div className="container-favourites">
                        <DishesList
                            data={dishes}
                            onDelete={this.deleteItem}
                            onToggleProp={this.onToggleProp} />
                    </div>
                </div>

                <Portal>
                    {this.props.addModal && <Modal addModal={this.props.addModal} onAddDishInArr={this.onAddDishInArr} onDeleteModal={this.props.onDeleteModal} />}
                </Portal>
            </>

        )
    }
}

class Portal extends Component {
    node = document.createElement('div');

    componentDidMount() {
        this.node.classList = 'portal'
        document.body.appendChild(this.node);
    }
    componentWillUnmount() {
        document.body.removeChild(this.node);
    }
    render() {
        const { children } = this.props;

        return ReactDOM.createPortal(children, this.node);
    }
}

const Modal = (props) => {
    return (
        <div className={props.addModal ? 'add-dish-active' : 'add-dish'}>
            <FavouritesAddForm onAdd={props.onAddDishInArr} onDeleteModal={props.onDeleteModal} />
        </div>
    )
}


export default AppFavourites;