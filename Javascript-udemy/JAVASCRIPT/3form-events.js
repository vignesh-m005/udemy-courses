console.log("JS file loaded");

var username = document.getElementById("username");

// username.addEventListener('change',function(){
//     console.log("value changed")
// })

username.addEventListener('input',function(event){
        // console.log("value changed")
        console.log(event.target.value)
})

username.addEventListener('focus',function(){
    console.log('Focused')
})

username.addEventListener('blur',function(){
    console.log('Lost focus - blurred')
})


var submit= document.getElementById("form");

submit.addEventListener('submit',function(e){
    alert("Submit button clicked");
    e.preventDefault();
})