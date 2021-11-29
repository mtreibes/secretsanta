let table = document.getElementById("table");
let body = document.getElementsByTagName('body')[0];
var pairs = {};
var nameArray = [];


document.getElementById("field").addEventListener("keyup", function(e) {
        if (e.key === 'Enter') {
            document.getElementById("add").click();
        }
});

function addRow(){

    if (document.getElementById("field").value !== ""){

        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);

        let text = document.createTextNode(document.getElementById("field").value);

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

    display();

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


function display(){

    document.body.innerHTML = '';
    var table = document.createElement('table');
    var tbdy = document.createElement('tbody');

    newPairs = shufflePairs(pairs);

    var keys = Object.keys(newPairs);

    for (var i = 0; i < Object.keys(newPairs).length; ++i){
        var row = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(keys[i]));
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(newPairs[keys[i]]));
        row.appendChild(td);
        row.appendChild(td1);
        tbdy.appendChild(row);
        table.appendChild(tbdy);

    }

    body.appendChild(table);

}