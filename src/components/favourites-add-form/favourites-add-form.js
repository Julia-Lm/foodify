import { Component } from 'react';
import './favourites-add-form.scss';

class FavouritesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            instructions: '',
        }
    }
    onValueChange = (e) => {
        this.setState(({
            [e.target.name]: e.target.value
        }))
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.instructions, this.onDeleteAddDishModal);
        this.setState({
            name: '',
            instructions: '',
        });
    }

    onDeleteAddDishModal() {
        const addDish = document.querySelector('.add-dish');
        addDish.style.display = 'none';
    }


    render() {
        const { name, instructions } = this.state;

        return (
            <div className="add-dish-body">
                <h2 className="dish-body-title">Add custom dish</h2>
                <form className='form-dish' onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="form-dish__name"
                        placeholder='Dish title'
                        value={name}
                        name='name'
                        onChange={this.onValueChange}
                    />
                    <textarea
                        className="form-dish__description"
                        cols="30"
                        rows="10"
                        placeholder='Dish description...'
                        value={instructions}
                        name='instructions'
                        onChange={this.onValueChange}>
                    </textarea>
                    <button
                        type="submit"
                        className="form-dish__button" >Add custom dish</button>
                </form>

                <button className="dish-body-close" onClick={this.onDeleteAddDishModal}>X</button>
            </div>

        )
    }
}

export default FavouritesAddForm;