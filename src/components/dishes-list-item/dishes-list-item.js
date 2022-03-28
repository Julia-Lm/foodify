import placeholder from '../../resources/img/placeholder.png';
import ItemIngredient from '../dishes-list-item-ingredient/dishes-list-item-ingredient';
import './dishes-list-item.scss';

const DishesItesListItem = (props) => {
    const { name, instructions, image, ingredient, measure, onToggleProp, onDelete, readMore, deleteButton } = props;
    let instructionsClass = "item__instructions";
    let readMoreClass = "Read more >>>";

    if (readMore) {
        readMoreClass = "<<< Collapse text";
        instructionsClass += ' active';
    }

    function btnTrash() {
        if (deleteButton) {
            return (
                <button type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
            )
        }

    };

    function btnReadMore() {
        if (instructions.length > 200) {
            return (
                <div className="read-more" onClick={onToggleProp} data-toggle="readMore"> {readMoreClass} </div>
            )
        }

    }


    return (
        <div className="dishes-list__item">
            <img className="item__img" src={(image === null || image === '' || image === undefined) ? placeholder : image} alt="Placeholder" />
            <div className="item__content">
                <h1 className="item__title">{name}</h1>
                <div className="item__description">
                    <div className={instructionsClass}>
                        {instructions}
                    </div>
                    {btnReadMore()}

                    <ItemIngredient
                        ingredient={ingredient}
                        measure={measure} />
                </div>

            </div>
            {btnTrash()}
        </div>
    )
}

export default DishesItesListItem;
