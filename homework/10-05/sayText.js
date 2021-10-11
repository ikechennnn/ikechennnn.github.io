var sayText = function(txt){
    var alertString = "Hello " + txt + "!";
    console.log(alertString);
    alert(alertString);
    return alertString;
}

<script>
console.log(sayText("Ike"));
</script>