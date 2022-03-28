import DishesItesListItem from "../dishes-list-item/dishes-list-item";
import './dishes-list.scss';

const DishesList = ({ data, onDelete, onToggleProp }) => {

    if (data.length !== 0) {
        const items = data.map(item => {
            const { id, ...itemProps } = item;
            return (
                <DishesItesListItem
                    key={id}
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))} />
            )
        });

        return (
            <> {items}</>
        )
    } else {
        return (
            <div className='no-addeds-favourites-dish'>
                No addeds favourites dish yet!
            </div>
        )
    }

}

export default DishesList;

