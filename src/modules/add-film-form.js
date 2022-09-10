import {actionForm} from "./action";
import { currentFilm } from "./store";

export const initInputs = {
    titleInput : {
        input: document.body.querySelector('.title-input'),
        isValid: false
    },
    yearInput : {
        input: document.body.querySelector('.year-input'),
        isValid: false
    },
    countryInput : {
        input: document.body.querySelector('.country-input'),
        isValid: false
    },
    genereInput : {
        input: document.body.querySelector('.genere-input'),
        isValid: false
    },
    linkInput : {
        input: document.body.querySelector('.link-input'),
        isValid: false
    },
    actorsInput : {
        input: document.body.querySelector('.actors-input'),
        isValid: false
    },
    descriptionInput: {
        input: document.body.querySelector('.description-input'),
        isValid: false
    },
};

const headerButtons = {
    addFilmCheckbox: document.body.querySelector('.add-film-checkbox'),
    addFilmButton: document.body.querySelector('.add-film-button')
}

const formButtons = {
    formCancelButton : document.body.querySelector('.form-cancel-button'),
    formAddButton : document.body.querySelector('.form-add-button'),
    formEditButton : document.body.querySelector('.form-edit-button'),
};

headerButtons.addFilmButton.onclick = ()=>{сlearingInput()};
formButtons.formCancelButton.onclick = ()=>{cancelForm()};
for(const i in initInputs){
    initInputs[i].input.oninput = ()=>{inputHandler(initInputs[i])}
}
formButtons.formAddButton.onclick = ()=>{actionForm.addFilm(initInputs)};
formButtons.formEditButton.onclick = ()=>{actionForm.editFilm(initInputs)};

export function cancelForm(){
    closeForm()
    сlearingInput()
};

function сlearingInput() {
    setTimeout(() =>{
        for(const i in initInputs){
            initInputs[i].input.value = ''
            initInputs[i].input.parentElement.classList.remove('inCorrect')
            initInputs[i].isValid = false
        }

        hideEditButton()
    }, 600)
};

function closeForm(){
    headerButtons.addFilmCheckbox.checked = false
};

function openForm(){
    headerButtons.addFilmCheckbox.checked = true
};

function inputHandler(elem){
    if(elem.input.name === 'year'){
        elem.input.value.length === 4 ? elem.isValid = true : elem.isValid = false
    } else if(elem.input.name === 'link'){
        const reg = /^https?:\/\/.*$/gi
        reg.test(elem.input.value) ? elem.isValid = true : elem.isValid = false
    } else {
        elem.input.value.length >= 3 ? elem.isValid = true : elem.isValid = false
    }
}

export function openEditForm(filmToEdit){
    currentFilm.setFilm(filmToEdit.id)
    setInitInputsToEdit(filmToEdit)
    openForm()
    hideAddButton()
};

function setInitInputsToEdit(filmToEdit){
    initInputs.titleInput.input.value = filmToEdit.titleInput
    initInputs.yearInput.input.value = filmToEdit.yearInput
    initInputs.countryInput.input.value = filmToEdit.countryInput
    initInputs.genereInput.input.value = filmToEdit.genereInput
    initInputs.linkInput.input.value = filmToEdit.linkInput
    initInputs.actorsInput.input.value = filmToEdit.actorsInput
    initInputs.descriptionInput.input.value = filmToEdit.descriptionInput

    for(const i in initInputs){
        initInputs[i].isValid = true
    }
}

function hideAddButton(){
    formButtons.formAddButton.style.display = 'none'
    formButtons.formEditButton.style.display = 'block'
}

function hideEditButton(){
    formButtons.formEditButton.style.display = 'none'
    formButtons.formAddButton.style.display = 'block'
}