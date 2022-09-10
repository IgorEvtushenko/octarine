import { dataBase, currentFilm, commentsData } from "./store";
import {cancelForm} from './add-film-form'
import { unmount, mount } from "./render";

export const actionForm = {
    addFilm(inputs){
        if(this._checkInputsValue(inputs)){
    
            const data = dataBase.getDb()
        
            const newFilm = this._setNewFilmValues(inputs, data, true);
            data.push(newFilm)
    
            dataBase.setDb(data)
        
            cancelForm(inputs)
    
            unmount()
            mount()
        }
    },

    deleteFilm(filmToDelete_id){
        const data = dataBase.getDb()
    
        const result = []
    
        for(const filmFromDb of data){
            if(filmFromDb.id !== filmToDelete_id){
                result.push(filmFromDb)
            }
        }
    
        dataBase.setDb(result)
    
        unmount()
        mount()
    
        this._cleareDb()
    },

    editFilm(inputs){
        if(this._checkInputsValue(inputs)){
            const filmToEdit_id = currentFilm.getFilm()
            // console.log(filmToEdit)
            // console.log(inputs.titleInput.input.value)

            const data = dataBase.getDb()
        
            const result = []
        
            for(const filmFromDb of data){
                if(filmFromDb.id !== filmToEdit_id){
                    result.push(filmFromDb)
                }
            }

            const editedFilm = this._setNewFilmValues(inputs, data, false);

            editedFilm.id = filmToEdit_id

            result.push(editedFilm)

            //console.log(editedFilm)
        
            dataBase.setDb(result)
        
            cancelForm()
            unmount()
            mount()
        }
    },

    _checkInputsValue(inputs){
        let isInputsValid = true
    
        for(const i in inputs){
            if(inputs[i].isValid){
                inputs[i].input.parentElement.classList.remove('inCorrect')
                isInputsValid ? isInputsValid : isInputsValid = false
            } else{
                inputs[i].input.parentElement.classList.add('inCorrect')
                isInputsValid = false
            }
        }
    
        return isInputsValid
    },
    
    _setNewFilmValues(inputs, data, getId){
        const result = {
            titleInput: inputs.titleInput.input.value,
            yearInput: inputs.yearInput.input.value,
            countryInput: inputs.countryInput.input.value,
            genereInput: inputs.genereInput.input.value,
            linkInput: inputs.linkInput.input.value,
            actorsInput: inputs.actorsInput.input.value,
            descriptionInput: inputs.descriptionInput.input.value,
        };

        if(getId){
            const _id = this._getCurrentId(data);
            result.id = _id
        }

        return result;
    },
    
    _getCurrentId(data){
        if(data.length === 0){
            return 0
        }
    
        let idArray = []
    
        for(const obj of data){
            idArray.push(obj.id)
        }
    
        let largest = idArray.sort().reverse()[0];
    
        return largest+=1
    },

    _cleareDb(){
        const data = dataBase.getDb()
    
        if(data.length === 0){
            localStorage.removeItem('filmsDb');
            localStorage.removeItem('commentsDb');
        }
    },
};

export const actionComment = {
    addComment(currentFilmId, comment){
        if(comment.length >= 1){
            const commentsDb = commentsData.getCommentsDb()

            const commentBody = {
                film_id: currentFilmId,
                film_comment: comment
            }

            commentsDb.push(commentBody)
    
            commentsData.setCommentsDb(commentsDb)

            unmount()
            mount(currentFilmId)
        }
    },
}