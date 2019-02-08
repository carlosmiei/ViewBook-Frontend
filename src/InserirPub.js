import * as axios from 'axios';

const url = 'http://localhost:3000/api/pubs/';

function analisaHashtags(descricao){
    
    //Vai separar a descricao por espaços, tabs e enters
    let separado = descricao.split(/[\n|\t| ]/)
    //só vou querer apanhar as palavras que comecem por #
    let expReg = /^#/
    let hashtags = []
    //O filtro só apanha as palavras que satisfazem a expReg enquanto que o map vai retirar o #
    const m = separado.filter(pal => expReg.test(pal))
                        .map(elem => elem.substring(1))
    //para tratar das unique
    var uSet = new Set(m)
    hashtags = [...uSet]
    hashtags.forEach(x => console.log(x))
    return hashtags
}

function upload(formData) {
    return axios.post(url, formData)
        // get data
        .then(x => {
            return x.data;
        })
        .catch(erro=> {throw erro})
}

export { upload }
export { analisaHashtags }