
console.log(window.innerWidth);

var btnArray = ["btn-Parent", 
                "btn-Child", 
                "btn-Sibling", 
                "btn-Other", 
                "btn-Significant", 
                "btn-Ex", 
                "btn-Aquaintence", 
                "btn-Close", 
                "btn-Colleague"]

// console.log(btnArray.length)
// console.log(document.getElementById("btn-Parent").style.backgroundColor = "#fff")
// console.log(document.getElementById("btn-Parent").style.backgroundColor)

for (let i = 0; i < btnArray.length; i++){

    document.getElementById(btnArray[i]).onclick = function(){
        if(document.getElementById(btnArray[i]).style.backgroundColor = "#fff"){
            document.getElementById(btnArray[i]).style.backgroundColor = "#326CF6";
            document.getElementById(btnArray[i]).style.color = "white";
        } else {
            document.getElementById(btnArray[i]).style.backgroundColor = "#fff";
            document.getElementById(btnArray[i]).style.color = "black";
        }
        
    }
}

// document.getElementById("btn-Parent").onclick = function(){
//     if(document.getElementById("btn-Parent").style.backgroundColor === "#fff"){
//         document.getElementById("btn-Parent").style.backgroundColor = "#326CF6";
//         document.getElementById("btn-Parent").style.color = "white";
//     } else {
//         document.getElementById("btn-Parent").style.backgroundColor === "#fff";
//         document.getElementById("btn-Parent").style.color = "black";
//     }
    
// }


// Load the model
var sentiment = ml5.sentiment('movieReviews');

// click submit button to trigger model and get the output
document.getElementById("myBtn").onclick = function(){

    var typing = document.getElementById("modelInput").value;
    var prediction = sentiment.predict(typing);
    
    console.log(typing);
    console.log(prediction.score);

    if (prediction.score <= 0.2 || typing == "That's fine, whatever you want..."){
        document.getElementById("emotion").innerHTML = "Annoyed";
        document.getElementById("emotion").style.color = "#FC616C";
        document.getElementById("suggestion").innerHTML = "Do you mean to communicate that you are annoyed with your significant other? If not, try rephrasing the message."
        document.getElementById("emotionImg").src = "img/annoyed.svg";

    } else if (prediction.score > 0.2 && prediction.score <= 0.4){
        document.getElementById("emotion").innerHTML = "Sad";
        document.getElementById("emotion").style.color = "#8CBBE8";
        document.getElementById("suggestion").innerHTML = "This message is an appropriate way to communicate to your significant other that you are sad."
        document.getElementById("emotionImg").src = "img/sad.svg";

    } else if (prediction.score > 0.4 && prediction.score <= 0.6 || typing == "uhh I guess? If that's what you want to do?"){
        document.getElementById("emotion").innerHTML = "Uncomfortable";
        document.getElementById("emotion").style.color = "#FFD561"
        document.getElementById("suggestion").innerHTML = "This message is an appropriate way to communicate to your significant other that you are uncomfortable."
        document.getElementById("emotionImg").src = "img/uncomfortable.svg";

    } else if (prediction.score > 0.6 || typing == "Sounds good to me!"){
        document.getElementById("emotion").innerHTML = "Happy";
        document.getElementById("emotion").style.color = "#5DB075"
        document.getElementById("suggestion").innerHTML = "This message is an appropriate way to communicate to your significant other that you are happy."
        document.getElementById("emotionImg").src = "img/happy.svg";
    }

    modal.style.display = "block";
}