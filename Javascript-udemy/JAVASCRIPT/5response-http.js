var list= document.getElementById("list")
var inputValue = document.getElementById("input")
var btnAdd = document.getElementById("add-item")

var curInputValue;
inputValue.addEventListener('input',function(e){
    curInputValue = e.target.value;
});

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

inputValue.addEventListener('keyup',function(e){
    if(e.key == 'Enter'){
        addList();
    }
})

btnAdd.addEventListener('click', createTODOItemAtBackend);

function createTODODynamically(id, title){
    var newListElement = document.createElement('li');
    var text = document.createTextNode(title);
    newListElement.appendChild(text);
    newListElement.id = id;

    return newListElement;
}

function getTODOListFromBackend(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                var response = JSON.parse(this.responseText);
                for(var i=0;i<response.length;i++){
                    list.appendChild(createTODODynamically(response[i].id, response[i].title));
                }
            }else{
                console.log("Call failed")
            }
        }
    }
    http.open('GET','https://jsonplaceholder.typicode.com/todos',true);
    http.send();
}

getTODOListFromBackend();

function createTODOItemAtBackend(){
    var http = new XMLHttpRequest();
    http.open("POST",'https://jsonplaceholder.typicode.com/todos',true);
    http.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 201){
                var response = JSON.parse(this.responseText);
                list.appendChild(createTODODynamically(response.id,curInputValue));
                console.log("created");
            }else{
                console.log("Call failed")
            }
        }
    }
    var obj = JSON.stringify({
        "userId": 1,
        "id":1,
        "title": curInputValue,
        "completed": false
      })
    http.send(obj);
}