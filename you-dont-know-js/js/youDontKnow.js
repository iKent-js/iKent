'use strict';
//получили элементы со страницы в переменные 
const newElem = document.createElement('li');
let getParrent = document.querySelector('.books'),
    getBooksDivs = document.querySelectorAll('.book'),
    getUlLists = document.querySelectorAll('ul'),
    getUlLiElems = document.querySelectorAll('li'),
    changeBackground = document.querySelector('body'),
    adds = document.querySelector('.adv'),
    getAelems = document.querySelectorAll('a');
console.log(getUlLists);
console.log(getUlLiElems);
console.log(getAelems);
//заталкиваем новый элемент в книгу №6
newElem.textContent = 'Глава 8: За пределами ES6';
getUlLiElems[26].before(newElem);
//поменяли фон   
changeBackground.style.background = 'url("/you-dont-know-js/image/you-dont-know-js.jpg")';

//исправляем заголовок в книге №3
getAelems[4].textContent = 'Книга 3. this и Прототипы Объектов';
console.log(getAelems);
//поменяли последовательность 

getParrent.prepend(getBooksDivs[4]);
getParrent.prepend(getBooksDivs[0]);
getParrent.prepend(getBooksDivs[1]);
getParrent.append(getBooksDivs[2]);

// упорядочиваем главы в книге №2
getUlLists[0].append(getUlLiElems[6]);
getUlLists[0].append(getUlLiElems[8]);
getUlLists[0].append(getUlLiElems[4]);
getUlLists[0].append(getUlLiElems[5]);
getUlLists[0].append(getUlLiElems[7]);
getUlLists[0].append(getUlLiElems[9]);
getUlLists[0].append(getUlLiElems[2]);
getUlLists[0].append(getUlLiElems[10]);

// упорядочиваем главы в книге №5
getUlLists[5].append(getUlLiElems[55]);   
getUlLists[5].append(getUlLiElems[49]);   
getUlLists[5].append(getUlLiElems[50]);   
getUlLists[5].append(getUlLiElems[48]);   
getUlLists[5].append(getUlLiElems[52]);   
getUlLists[5].append(getUlLiElems[53]);   
getUlLists[5].append(getUlLiElems[51]);   
getUlLists[5].append(getUlLiElems[54]);   
getUlLists[5].append(getUlLiElems[56]);  

//удаляем рекламу со страницы
adds.remove();