import AppFavourites from '../app-favourites/app-favourites';

const FavouritePage = (props) => {
    let addModal = props.addModal;

    return (
        <>
            <AppFavourites addModal={addModal} onDeleteModal={props.onDeleteModal} onAddButton={props.onAddButton} />
        </>

    )
}

export default FavouritePage;