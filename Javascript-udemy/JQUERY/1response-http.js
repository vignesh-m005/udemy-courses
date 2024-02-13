$(document).ready(function(){
    console.log("DOM is ready");

var list= $("#list");
var inputValue = $("#input");
var curInputValue;

inputValue.on({
    'input':function(e){
        curInputValue = e.target.value;
    },
    'keyup':function(e){
        if(e.key == 'Enter'){
            createTODOItemAtBackend();
        }
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
        list.append(newListElement);

        clearInputValue();
    }
}

function clearInputValue(){
    inputValue.val('');
    curInputValue='';
}


$("#update-first").click(function(){
    var firstElement = list.firstElementChild;
    var newListElement = createNewNode()

    list.replaceChild(newListElement,firstElement);
    clearInputValue();
})

$("#remove-first").click(function(){
    var firstElement = list.firstElementChild;
    list.removeChild(firstElement);
})

$("#clear-all").click(function(){
    list.empty();
})

$("#add-item").click( createTODOItemAtBackend);

function createTODODynamically(id, title){
    var newListElement = document.createElement('li');
    var text = document.createTextNode(title);
    newListElement.appendChild(text);
    newListElement.id = id;

    return newListElement;
}

function getTODOListFromBackend(){
    $.get('https://jsonplaceholder.typicode.com/todos',function(response,status){
        
        for(var i=0;i<response.length;i++){
            list.append(createTODODynamically(response[i].id, response[i].title));
        }
    })
    // var http = new XMLHttpRequest();
    // http.onreadystatechange = function(){
    //     if(this.readyState == 4){
    //         if(this.status == 200){
    //             var response = JSON.parse(this.responseText);
    //             for(var i=0;i<response.length;i++){
    //                 list.append(createTODODynamically(response[i].id, response[i].title));
    //             }
    //         }else{
    //             console.log("Call failed")
    //         }
    //     }
    // }
    // http.open('GET','https://jsonplaceholder.typicode.com/todos',true);
    // http.send();
}

var listItem1 = "<li>First List Item 1<li>";
var listItem2 = "<li>First List Item 2<li>";
var listItem3 = "<li>First List Item 3<li>";
var listItem4 = "<li>First List Item 4<li>";
list.append(listItem1,listItem2,listItem3,listItem4)

// getTODOListFromBackend();

function createTODOItemAtBackend(){
    // var http = new XMLHttpRequest();
    // http.open("POST",'https://jsonplaceholder.typicode.com/todos',true);
    // http.onreadystatechange = function(){
    //     if(this.readyState == 4){
    //         if(this.status == 201){
    //             var response = JSON.parse(this.responseText);
    //             list.append(createTODODynamically(response.id,curInputValue));
    //             clearInputValue();
    //             console.log("created");
    //         }else{
    //             console.log("Call failed")
    //         }
    //     }
    // }
    // var obj = JSON.stringify({
    //     "userId": 1,
    //     "id":1,
    //     "title": curInputValue,
    //     "completed": false
    //   })
    // http.send(obj);

    var obj = JSON.stringify({
            "userId": 1,
            "id":1,
            "title": curInputValue,
            "completed": false
          })

    $.post('https://jsonplaceholder.typicode.com/todos',obj,function(response,status){
        list.append(createTODODynamically(response.id,curInputValue));
        clearInputValue();
        console.log("created");
    })
}

})

