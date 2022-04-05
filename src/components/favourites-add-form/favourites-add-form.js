import { Component } from 'react';
import './favourites-add-form.scss';
import FormErrors from './form-errors';

class FavouritesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            instructions: '',
            formErrors: { name: '', instructions: '' },
            namelValid: false,
            instructionsValid: false,
            formValid: false
        }
    }
    onValueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let namelValid = this.state.namelValid;
        let instructionsValid = this.state.instructionsValid;
        const regName = /^[^\s_\d\W]+(\s.*)?$/;
        const regInstructions = /^[^\s_\d\W]+(\s.*)?/;

        switch (fieldName) {
            case 'name':
                namelValid = regName.test(String(value));
                fieldValidationErrors.name = namelValid ? '' : ' is invalid';
                break;
            case 'instructions':
                instructionsValid = regInstructions.test(String(value));
                fieldValidationErrors.instructions = instructionsValid ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            namelValid: namelValid,
            instructionsValid: instructionsValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.namelValid &&
                this.state.instructionsValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.instructions, this.onDeleteAddDishModal);
        this.setState({
            name: '',
            instructions: '',
        });
    }

    onDeleteAddDishModal = () => {
        this.setState(({
            name: '',
            instructions: '',
            formErrors: { name: '', instructions: '' },
            formValid: false
        }));

        this.props.onDeleteModal();
        document.body.style.overflow = "";
    }


    render() {
        const { name, instructions } = this.state;

        return (
            <div className="add-dish-body">
                <h2 className="dish-body-title">Add custom dish</h2>

                <form className='form-dish' onSubmit={this.onSubmit}>

                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>

                    <input
                        minLength={3}
                        type="text"
                        className={`form-dish__name ${this.errorClass(this.state.formErrors.name)}`}
                        placeholder='Dish title'
                        value={name}
                        name='name'
                        onChange={this.onValueChange}
                    />
                    <textarea
                        className={`form-dish__description ${this.errorClass(this.state.formErrors.instructions)}`}
                        cols="30"
                        rows="10"
                        placeholder='Dish description...'
                        value={instructions}
                        name='instructions'
                        onChange={this.onValueChange}
                    >
                    </textarea>
                    <button
                        type="submit"
                        className="form-dish__button"
                        disabled={!this.state.formValid}>Add custom dish</button>
                </form>

                <button className="dish-body-close" onClick={this.onDeleteAddDishModal}>X</button>
            </div>

        )
    }
}

export default FavouritesAddForm;