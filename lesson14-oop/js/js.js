'use strict';
//////////////////////////////////////////////////////////////////////////////////////////
let btn = document.getElementsByTagName('button')[1],
    divs = document.querySelectorAll('.main');
    btn.style.cssText = `display: block; 
                        margin: 0 auto; 
                        background-color: green;
                        margin-top: 10px; 
                        margin-bottom: 10px;
                        padding: 20px;
                        color: white;
                        cursor: pointer;`;
//////////////////////////////////////////////////////////////////////////////////////////
const DomElement = function() {
    this.selector = '';
    this.height = '';
    this.width = '';
    this.bg = '';
    this.fontSize = '';
};
DomElement.prototype.createElem = function() {
    btn.addEventListener('click', function() {

        let mainContainer = document.querySelectorAll('div[class="main"]'),
            cloneDiv,
            cloneDivInput = document.createElement('input'),
            closeBtn = document.createElement('button');

            closeBtn.style.cssText = `background-color: blue;
                                    height: 50px;
                                    width: 100%;`;
            closeBtn.textContent = 'close me';
            

            cloneDivInput.style.cssText = `width: 100%; 
                                        height: 30px; 
                                        background-color: black; 
                                        color: yellow;`;

        this.selector = prompt('Блок или параграф ?', '.block');
        if (this.selector === null) {
            return;
        }
        this.height = prompt('Введите высоту', '100px');
        if (this.height === null) {
            return;
        }
        this.width = prompt('Введите ширину', '100%');
        if (this.width === null) {
            return;
        }
        this.bg = prompt('Введите цвет заднего фона', 'rgba(255, 125, 150, .2)');
        if (this.bg === null) {
            return;
        }
        this.fontSize = prompt('Введите размер шрифта', '2em');
        if (this.fontSize === null) {
            return;
        }
        
        if (this.selector[0] === '.') {
            cloneDiv = document.createElement('div');
            cloneDiv.className = this.selector.substring(1);
            mainContainer[0].after(cloneDiv);
            cloneDiv.before(closeBtn);
        } else if (this.selector[0] === '#') {
            cloneDiv = document.createElement('p');
            cloneDiv.id = this.selector.substring(1);
            mainContainer[0].after(cloneDiv);
            cloneDiv.before(closeBtn);
        } else { 
            return;
        }
        
        cloneDiv.style.cssText = `margin: 0 auto; 
                                text-align: justify;
                                cursor: pointer;`;
        cloneDiv.style.height = this.height;
        cloneDiv.style.width = this.width;
        cloneDiv.style.backgroundColor = this.bg;
        cloneDiv.style.fontSize = this.fontSize;
        cloneDiv.textContent = prompt('vvedite text', 'write text and then CLICK on this block to call INPUT below');

        closeBtn.addEventListener('click', function() {
            cloneDiv.style.display = 'none';
            closeBtn.style.display = 'none';
            cloneDivInput.style.display = 'none';
        });

        cloneDiv.addEventListener('click', function() {
            cloneDivInput.setAttribute('placeholder', 'write text here');
            mainContainer[1].before(cloneDivInput);
            cloneDivInput.addEventListener('input', function() {
                cloneDiv.textContent = cloneDivInput.value;
            });
        });
        // cloneDiv.innerHTML = '<textarea rows="10" cols="45" name="text"></textarea>';
        // console.log(cloneDiv);
        // cloneDiv.className = 'new';
        // cloneDiv.classList.add('main', 'twoclass');
        // mainContainer[0].after(cloneDiv);
        // console.log(mainContainer);
            
            // divs[i].appendChild(div);
            // divs[7].append(li);
            // li.textContent = 'value: ' + [i];
            // li.style.cssText = 'display: inline-block; margin: 5px; padding: 5px; color: darkred;';
            // console.log(_this);
    });

};
//////////////////////////////////////////////////////////////////////////////////////////
const domElement = new DomElement();
//////////////////////////////////////////////////////////////////////////////////////////
domElement.createElem();
// console.log(domElement);