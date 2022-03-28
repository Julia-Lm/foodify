import './dishes-list-item-ingredient.scss';

const ItemIngredient = ({ ingredient, measure }) => {
    if (ingredient !== null && measure !== null) {
        var elements = [];
        for (var i = 0, j = 0; i < ingredient.length, j < measure.length; i++, j++) {
            if (ingredient[i] !== undefined && measure[j] !== undefined) {
                elements.push(ingredient[i] + ' - ' + measure[j] + '; ');
            }
        }

        return (
            <>
                <h3 className="ingredient">Ingredient</h3>
                <p className="ingredien-item">
                    {elements}
                </p>
            </>

        );
    } else {
        return (
            <>
                <p className="ingredien-item">

                </p>
            </>

        );
    }


};

export default ItemIngredient;
