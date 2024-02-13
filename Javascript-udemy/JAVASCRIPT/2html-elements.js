console.log("Script loaded");
// console.log(document.getElementById("biryani"));

// console.log(document.getElementsByClassName("image"));

// console.log(document.getElementsByTagName("img"));

// console.log(document.querySelector(".image"));

// console.log(document.querySelectorAll(".image"));


var countdownElement = document.getElementById("countdown");

var countdown = countdownElement.innerHTML;
var interval = setInterval(function(){
    countdown =  countdown > 0 ? countdown - 1 : countdown;
  
    countdownElement.style.fontSize = Number(countdown * 50) + 50 + "px";
    countdownElement.innerHTML = countdown;
    countdownElement.style.backgroundColor = countdown%2==0 ? "red" : "blue";

    if( countdown == "0" ){
        clearInterval(interval);
        console.log("stopped")
    }
}, 1000);


var btn = document.getElementById("button-click");
var bodyElement = document.getElementById("body")
function onBtnClick(){
    // alert("Button clicked")
    var r = Math.floor(Math.random() * 255)
    var g = Math.floor(Math.random() * 255)
    var b = Math.floor(Math.random() * 255)
    bodyElement.style.backgroundColor = "rgb("+ r +","+ g +","+ b +")"
}

// btn.onclick = onBtnClick;

btn.addEventListener('click',onBtnClick);

// btn.onclick = function(){
//     alert("Button clicked")
// }


var paraElement = document.getElementById("para");
paraElement.classList.add('small');
btn.addEventListener('click',function(){
    paraElement.classList.remove('small');
})
// setTimeout(function(){
//     paraElement.classList.remove('small')
// },2000)


console.log(window.getComputedStyle(bodyElement).backgroundColor)

var fontIncBtn = document.getElementById("font-increase")
var fontDecBtn = document.getElementById("font-decrease")

fontDecBtn.addEventListener('click',function(){
    fontSize = window.getComputedStyle(paraElement).fontSize;
    paraElement.style.fontSize= fontSize.substring(0,(fontSize.length - 2)) - 5 +"px";
    
})

fontIncBtn.addEventListener('click',function(){
    fontSize = window.getComputedStyle(paraElement).fontSize;
    paraElement.style.fontSize= Number(fontSize.substring(0,(fontSize.length - 2))) + 5 +"px";
    
})