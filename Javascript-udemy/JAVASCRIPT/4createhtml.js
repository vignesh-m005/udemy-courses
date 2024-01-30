var list= document.getElementById("list")
var inputValue = document.getElementById("input")
var btnAdd = document.getElementById("add-item")
var btnUpdateFirst = document.getElementById("update-first")
var btnRemoveFirst = document.getElementById("remove-first")

var curInputValue;
inputValue.addEventListener('input',function(e){
    curInputValue = e.target.value;
});


inputValue.addEventListener('keyup',function(e){
    if(e.key == 'Enter'){
        addList();
    }
})

function createNewNode(){
    var newListElement = document.createElement('li');
    var text = document.createTextNode(curInputValue);
    newListElement.appendChild(text);
    newListElement.id = 'item' + (list.childElementCount + 1);

    return newListElement;
}

function addList(){
    if(curInputValue != undefined && curInputValue !==null && curInputValue !== ''){
       
        var newListElement = createNewNode()
        list.appendChild(newListElement);

        inputValue.value = ''
        curInputValue = ''
    }
}

btnAdd.addEventListener('click', addList)

btnUpdateFirst.addEventListener('click',function(){
    var firstElement = list.firstElementChild;
    var newListElement = createNewNode()

    list.replaceChild(newListElement,firstElement);
    inputValue.value = ''
        curInputValue = ''
})

btnRemoveFirst.addEventListener('click',function(){
    var firstElement = list.firstElementChild;
    list.removeChild(firstElement);
})