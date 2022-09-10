export const dataBase = {
    getDb(){
        if(!localStorage.getItem('filmsDb')){
            const arr = JSON.stringify([]);
            localStorage.setItem('filmsDb', arr);
        }

        const data = localStorage.getItem('filmsDb');

        const parsedDb = JSON.parse(data);

        return parsedDb
    },
    setDb(data){
        const dbJson = JSON.stringify(data)
    
        localStorage.setItem('filmsDb', dbJson);
    }
}

export const commentsData = {
    getCommentsDb(){
        this._dbDoesNotExistThenCreate()

        const commentsData = localStorage.getItem('commentsDb');

        const parsedCommentsDb = JSON.parse(commentsData);

        return parsedCommentsDb
    },
    getCommentByFilmId(filmId){
        this._dbDoesNotExistThenCreate()

        const commentsData = localStorage.getItem('commentsDb');

        const parsedCommentsDb = JSON.parse(commentsData);

        const res = []

        for(const comment of parsedCommentsDb){
            if(comment.film_id === filmId)[
                res.push(comment)
            ]
        }

        return res
    },
    setCommentsDb(commentBody){
        const commentBodyJson = JSON.stringify(commentBody)
    
        localStorage.setItem('commentsDb', commentBodyJson);
    },
    _dbDoesNotExistThenCreate(){
        if(!localStorage.getItem('commentsDb')){
            const arr = JSON.stringify([]);
            localStorage.setItem('commentsDb', arr);
        }
    }
}

export const currentFilm = {
    _id: {},

    setFilm(id){
        this._id = id
    },

    getFilm(){
        return this._id
    }
}