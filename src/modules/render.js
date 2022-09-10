import {dataBase, commentsData} from './store';
import { actionForm, actionComment } from './action';
import { openEditForm } from './add-film-form';

const filmsParrentContainer = document.body.querySelector('.films-container')

export function initialMount(){
    if(localStorage.getItem('filmsDb')){
        mount();
    }
}

export function unmount(){
    let films = document.body.querySelectorAll('.film-wrapper')
    for(const film of films){
        filmsParrentContainer.removeChild(film);
    }
}

export function mount(openCommentsOf = false){
    const filmsData = dataBase.getDb()

    const sortedData = filmsData.sort(sortByField('id'));

    for(const film of sortedData){
        let filmWrapper = document.createElement('div');
        filmWrapper.classList.add('film-wrapper');
        filmWrapper.innerHTML = template(film)

        const bgDiv = filmWrapper.querySelector('.film-bg')
        bgDiv.style.background = `url('${film.linkInput}') no-repeat center`
        bgDiv.style.backgroundSize = `cover`

        const posterImage = filmWrapper.querySelector('.poster-image')
        posterImage.style.background = `url('${film.linkInput}') no-repeat center`
        posterImage.style.backgroundSize = `cover`

        const deleteFilmButton = filmWrapper.querySelector('.delete-film-button')
        deleteFilmButton.onclick = ()=>{actionForm.deleteFilm(film.id)}

        const editFilmButton = filmWrapper.querySelector('.edit-film-button')
        editFilmButton.onclick = ()=>{openEditForm(film)}

        const addCommentInput = filmWrapper.querySelector('.add-coment-input')
        const addCommentButton = filmWrapper.querySelector('.add-comment')
        addCommentButton.onclick = ()=>{actionComment.addComment(film.id, addCommentInput.value)}

        const commentsButton = filmWrapper.querySelector('.comments-button')
        commentsButton.onclick = function(){
            setTimeout(()=>{addCommentInput.value = ''}, 700)
        }

        const filmComments = commentsData.getCommentByFilmId(film.id)
        const commentsContainer = filmWrapper.querySelector('.comments-container')
        for(const coment of filmComments){
            const comentItem = document.createElement('div')
            comentItem.classList.add('coment-item')
            comentItem.innerHTML = coment.film_comment
            commentsContainer.appendChild(comentItem)
        }

        const commentsAmount = filmWrapper.querySelector('.comments-amount')
        commentsAmount.innerHTML = filmComments.length

        filmsParrentContainer.appendChild(filmWrapper);
    }

    if(typeof openCommentsOf === 'number'){
        const commentsCheckbox = document.getElementById('' + openCommentsOf)
        commentsCheckbox.checked = true
    }
}

function sortByField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

function template(film){
    const filledTemplate = `
        <div class="film-bg">
            <div class="film-content">
                <div class="poster-image"></div>
                
                <div class="film-info">
                    <h2 class="film-title">${film.titleInput}</h2>
                    <p class="film-description">${film.descriptionInput}</p>
                    <div class="info-item">
                        <div class="info-title title-country">country</div>
                        <div class="info-content content-country">${film.countryInput}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title title-year">year</div>
                        <div class="info-content content-year">${film.yearInput}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title title-genere">genere</div>
                        <div class="info-content content-genere">${film.genereInput}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-title title-actors">actors</div>
                        <div class="info-content content-actors">${film.actorsInput}</div>
                    </div>
                    <div class="buttons-wrapper">
                        <a class="btn pink delete-film-button">Delete</a>
                        <a href="#" class="btn blue edit-film-button">Edit</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="coments">
            <input id="${film.id}" class="comments-checkbox" type="checkbox">
            <label for="${film.id}" class="comments-button">
                <span class="comment-button-text">Comments:</span>
                <span class="comments-amount"></span>
                <span class="comments-arrow"></span>
            </label>
            <div class="comments-wrapper">
                <div class="comments-container">
                </div>
                <input
                    class="add-coment-input"
                    type="text"
                    placeholder="Add your comment"
                >
                <div class="buttons-wrapper">
                    <div class="btn blue add-comment">Add</div>
                </div>
            </div>
        </div>
    `
    return filledTemplate
}