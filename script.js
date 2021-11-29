let table = document.getElementById("table");
let body = document.getElementsByTagName('body')[0];
var pairs = {};
var tempNames = [];
var nameArray = [];
var keys = {};
var newPairs = {};
var counter = 0;

document.getElementById("field").addEventListener("keyup", function(e) {
        if (e.key === 'Enter') {
            document.getElementById("add").click();
        }
});

function addRow(){

    if (document.getElementById("field").value !== ""){
        
        let textField = document.getElementById("field").value;

        if (!tempNames.includes(textField)){
            tempNames.push(textField);

            let row = table.insertRow(-1);
            let cell1 = row.insertCell(0);

            let text = document.createTextNode(textField);
    
            cell1.appendChild(text);
            document.getElementById("field").value = "";    
            
            let cell2 = row.insertCell(1);
            let deleteBtn = document.createElement("INPUT");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.setAttribute("type", "button");
            deleteBtn.setAttribute("value", "Delete");
            deleteBtn.setAttribute("onclick", "removeRow(this)");
            cell2.appendChild(deleteBtn);
        }
        else{
            document.getElementById("field").value = "";
            alert("Name already exists here.");
        }

    }
    else{
        document.getElementById("field").value = "";
        alert("Please enter a name.");
    }

}

function removeRow(table){
    var p=table.parentNode.parentNode;
    p.parentNode.removeChild(p);
}


function randomize(){

    for (let row of table.rows) 
    {
        nameArray.push(row.firstChild.innerHTML);

    }
    console.log(nameArray);
    shuffle(nameArray);
    console.log(nameArray);

    for (var i = 0; i < nameArray.length-1; i++){
        pairs[nameArray[i]] = nameArray[i+1];
    }
    pairs[nameArray[nameArray.length-1]] = nameArray[0];

    console.log(pairs);

    newPairs = shufflePairs(pairs);

    console.log(newPairs);

    keys = Object.keys(newPairs);

    document.body.innerHTML = '';

    displayHelper();

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function shufflePairs(obj){
    // new obj to return
  let newObj = {};
    // create keys array
  var keys = Object.keys(obj);
    // randomize keys array
    keys.sort(function(a,b){return Math.random()- 0.5;});
  // save in new array
    keys.forEach(function(k) {
        newObj[k] = obj[k];
});
  return newObj;
}

function displayHelper(){

    document.body.innerHTML = '';

    console.log(keys[counter]);
    console.log(newPairs[keys[counter]]);

    var mainCont = document.createElement('div');
    mainCont.setAttribute('class', 'mainCont');
    document.body.appendChild(mainCont);

    var hold = document.createElement('div');
    hold.textContent = "Hold to see your selection:";
    hold.setAttribute('class', 'hold');
    mainCont.appendChild(hold);

    var theBody = document.createElement('div');
    theBody.setAttribute('class', 'theBody');
    mainCont.appendChild(theBody);

    var front = document.createElement('div');
    front.textContent = keys[counter];
    front.setAttribute('class', 'front');
    theBody.appendChild(front);

    var back = document.createElement('div');
    back.textContent = newPairs[keys[counter]];
    back.setAttribute('class', 'back');
    theBody.appendChild(back);

    let next = document.createElement('input');
    next.innerHTML = "Next";
    next.setAttribute("type", "button");

    var nextName = "";

    if (counter+1 < nameArray.length){
        nextName = `Next up: ${keys[counter+1]}`
    }
    else{
        nextName = "Done";
    }
    
    next.setAttribute("value", nextName);
    next.setAttribute("onclick", "displayHelper()");
    mainCont.appendChild(next);

    if (counter < nameArray.length){
        counter++;
    }
    else{
        location.reload();
    }

}