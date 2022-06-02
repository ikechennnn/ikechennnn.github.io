
var selection
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


//
for (let i = 0; i < btnArray.length; i++){

    document.getElementById(btnArray[i]).onclick = function(){
        
        for (let j = 0; j < btnArray.length; j++){
            document.getElementById(btnArray[j]).style.backgroundColor = "#fff";
            document.getElementById(btnArray[j]).style.color = "black";
        }
        
        document.getElementById(btnArray[i]).style.backgroundColor = "#326CF6";
        document.getElementById(btnArray[i]).style.color = "white";

        selection = document.getElementById(btnArray[i]).innerHTML.toLowerCase();
        
        // console.log(selection);
        
    }
}


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
        document.getElementById("suggestion").innerHTML = "Do you mean to communicate that you are annoyed with your " + selection + "? If not, try rephrasing the message."
        document.getElementById("suggestion").style.fontWeight = "normal";
        document.getElementById("emotionImg").src = "img/annoyed.svg";

    } else if (prediction.score > 0.2 && prediction.score <= 0.4){
        document.getElementById("emotion").innerHTML = "Sad";
        document.getElementById("emotion").style.color = "#8CBBE8";
        document.getElementById("suggestion").innerHTML = "This message is an appropriate way to communicate to your " + selection + "that you are sad."
        document.getElementById("suggestion").style.fontWeight = "normal";
        document.getElementById("emotionImg").src = "img/sad.svg";

    } else if (prediction.score > 0.4 && prediction.score <= 0.6 || typing == "uhh I guess? If that's what you want to do?"){
        document.getElementById("emotion").innerHTML = "Uncomfortable";
        document.getElementById("emotion").style.color = "#FFD561"
        document.getElementById("suggestion").innerHTML = "This message is an appropriate way to communicate to your " + selection + "that you are uncomfortable."
        document.getElementById("suggestion").style.fontWeight = "normal";
        document.getElementById("emotionImg").src = "img/uncomfortable.svg";

    } else if (prediction.score > 0.6 || typing == "Sounds good to me!"){
        document.getElementById("emotion").innerHTML = "Happy";
        document.getElementById("emotion").style.color = "#5DB075"
        document.getElementById("suggestion").innerHTML = "This message is an appropriate way to communicate to your " + selection + "that you are happy."
        document.getElementById("suggestion").style.fontWeight = "normal";
        document.getElementById("emotionImg").src = "img/happy.svg";
    }

    modal.style.display = "block";
}