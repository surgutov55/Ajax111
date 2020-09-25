let arr = [];
let arr1= [];   
let changedData = {};
let booksWrapper = document.body.querySelector('.booksWrapper');

//поля
let TITLE = document.querySelector('.title input');
let DATA = document.querySelector('.data input');
let SomeInfo = document.querySelector('.someInfo input');

TITLE.addEventListener("oninput", verifyParams, false);
DATA.addEventListener("oninput", verifyParams, false);
SomeInfo.addEventListener("oninput", verifyParams, false);
//кнопки 
let addInfo = document.querySelector('.add');
let cancelChanges = document.querySelector('.cancel');

//Запрос для кнопки getInfo
function getbooks(callback){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://fakerestapi.azurewebsites.net/api/books'); //настраиваем запрос данных

    xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.responseText); //создаем массив данных 
    mountBooks(response)
    arr = [...response] 

    });

    xhr.send();            //отправляем запрос
}

const mountBooks = (arr) => {   //массив объектов книг
    
    arr.forEach((book, index) => {          
        
    booksWrapper.insertAdjacentHTML('beforeend', `
    <div class="books" id='num${index}'>
        <h4>${book.Title}</h4>
        <p class="description">${book.Description}</p>  
        <p class="excerpt">${book.Excerpt}</p> 

        <button name="change" id="change${index}" class="change">Change</button>
        <button name="delete" id="delete${index}" class="delete">Delete</button>
    </div>`); 

    let change = document.getElementById(`change${index}`);   //получаем одну из кнопок "добавить"
    let del = document.getElementById(`delete${index}`); //получаем одну из кнопок "удалить"

    change.addEventListener('click', addInformation);
    del.addEventListener('click', deleteInfrormation);

        function deleteInfrormation(e) {                                   
            const innerIndex1 = parseInt(e.target.id.split('delete')[1]);
            //console.log(innerIndex1);
            let node = document.getElementById(`num${index}`); 
            //console.log(node);
            if (innerIndex1 === index) { //если индекс кнопки удаления === id div, то del
                node.remove();
                const xhr = new XMLHttpRequest();
                xhr.open('DELETE', `http://fakerestapi.azurewebsites.net/api/books/${innerIndex1}`);
                xhr.send();  
                console.log(`num${index} deleted succesfully`);          
            };    
        }
    });
}

function addInformation(e) {
    const innerIndex = parseInt(e.target.id.split('change')[1]);
    changedData = arr[innerIndex]                                           //находим индекс в массиве
    TITLE.value = `${changedData.Title}`;                    //добавляем в поле заголовок
    DATA.value = `${changedData.Description}`;
    SomeInfo.value = `${changedData.Excerpt}`;
}



cancelChanges.addEventListener('click', () => {   //при нажатии удаляем содержимое полей
    changedData = {};
    TITLE.value = '';
    DATA.value = '';
    SomeInfo.value = '';
});

//Запрос для кнопки add
function putBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://fakerestapi.azurewebsites.net/api/books/${changedData.ID}`); //настраиваем запрос данных

    xhr.addEventListener('load', () => {  //создаем массив данных 
    const response = JSON.parse(xhr.responseText); 
    // arr1 = [...response]          
    console.log(response);
    });
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(changedData));            //отправляем запрос
}

// addInfo.addEventListener('click', () => {         //кнопка добавления измененных данных в карточку
//     let nodes = document.querySelectorAll('div.booksWrapper > div.books');
//     let array = Array.from(nodes);
//     //получаем id каждой карточки
//     array.forEach( (item) => {
//         console.log(item.id);
//     });
    
// });

function verifyParams(e) {   //функция проверки изменений, и внесения изменений в changedData

const name = TITLE;
const data = DATA;
const INFO = someInfo;

changedData[name];
changedData[data];
changedData[INFO];
console.log(changedData);

    // let nodes = document.querySelectorAll('div.booksWrapper > div.books');
    // let array = Array.from(nodes);
    //получаем id каждой карточки
    // array.forEach( (item) => {
    //     let elem = item.querySelector('.change');
    //     console.log(elem.id);
    // });
}


function checkParams() {   //функция разблокировки кнопки addInfo
    if(TITLE.value != 0 && DATA.value != 0 && SomeInfo.value != 0) {
        addInfo.removeAttribute("disabled");
        addInfo.classList.add('add1');
    } 
    else {
        addInfo.setAttribute("disabled", "disabled");
    }
}


// //запрос для кнопки delete
// function deleteBooks() {
//     const xhr = new XMLHttpRequest();
//     xhr.open('DELETE', `http://fakerestapi.azurewebsites.net/api/books/${deleted.id}`); //настраиваем запрос данных

//     let nodes = document.querySelectorAll('div.booksWrapper > div.books');
//     let array = Array.from(nodes);
//     //получаем id каждой карточки
//     array.forEach( (item) => {
//         deleted = item.querySelector('.delete');
//     });
//     xhr.send();            //отправляем запрос
// }

