import { Component } from 'react';
import './app-random-dish.scss';

import FoodifyServices from '../../services/foodify-services';
import DishesList from '../dishes-list/dishes-list';

class AppRandomDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: [
                {
                    id: null,
                    name: null,
                    instructions: '',
                    readMore: false,
                    deleteButton: false,
                    image: null,
                    ingredient: null,
                    measure: null
                }
            ]
        }
    }

    foodifyServices = new FoodifyServices();

    componentDidMount() {
        /*
        const buttonAddSm = document.querySelector('.header-button-add-sm');
        if (buttonAddSm !== null) {
            buttonAddSm.style.display = 'none';
        }
*/
        this.updateDish();
    }

    pushDishlocalStorage = () => {
        const dishes = localStorage.getItem('dishes') ? JSON.parse(localStorage.getItem('dishes')) : [];
        const idDish = this.state.dish[0].id;

        const idDishes = dishes.find((item) => {
            return item.id === idDish;
        });

        if (idDishes === undefined) {
            const dish = this.state.dish[0];

            dishes.push(dish);
            localStorage.setItem('dishes', JSON.stringify(dishes));
        } else {
            console.log("This dish is in arr");
        }
    }

    updateDish = () => {
        this.foodifyServices.getAllCharacters()
            .then(res => {
                var data = res.meals[0];
                var dataObj = {
                    id: data.idMeal,
                    name: data.strMeal,
                    instructions: data.strInstructions,
                    image: data.strMealThumb,
                    ingredients: [],
                    measures: []
                }

                for (var key in data) {
                    if (key.includes('strIngredient')) {
                        if (data[key] !== '' && data[key] !== null) {
                            var ingredient = data[key];
                            dataObj.ingredients.push(ingredient);
                        }
                    }
                    if (key.includes('strMeasure')) {
                        if (data[key] !== '' && data[key] !== null) {
                            var measure = data[key];
                            dataObj.measures.push(measure);
                        }
                    }
                }
                return dataObj;
            })
            .then((data) => {

                this.setState(({ dish }) => {
                    return {
                        dish: [
                            {
                                id: +data.id,
                                name: data.name,
                                instructions: data.instructions,
                                readMore: false,
                                deleteButton: false,
                                image: data.image,
                                ingredient: data.ingredients,
                                measure: data.measures
                            }
                        ]
                    }
                });
            });
    }

    onToggleProp = (id, prop) => {

        this.setState(({ dish }) => ({
            dish: dish.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))

    }

    render() {
        const { dish } = this.state;

        return (
            <div className="app-body-ramdom" >
                <div className="container">
                    <DishesList
                        data={dish}
                        onToggleProp={this.onToggleProp} />

                    <div className="buttons">
                        <button type="submit"
                            className="button button-skip"
                            onClick={this.updateDish}> Skip</button>

                        <button type="submit" className="button button-like"
                            onClick={this.pushDishlocalStorage}>Like</button>
                    </div>
                </div>
            </div >
        );
    }
}

export default AppRandomDish;