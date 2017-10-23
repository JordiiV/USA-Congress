switch (window.location.pathname) {
        
    case '/Tarea%20Moha/Task%202/house-data.html':
    case '/senate-data.html':
        addListeners();
        fillSelector();
        makeTable();
        footer();
        break;

    case '/index.html':
        footer();
        break;
}





function getFullName(member) {

    var middlename = "";

    if (member.middle_name != null) {
        middlename = " " + member.middle_name + " ";
    }

    return '<a href="' + member.url + '">' + member.first_name + middlename + member.last_name + '</a>';
}

function makeTable() {
    
    var x = document.getElementById("mytable");
    var member = JSON.parse(JSON.stringify(data)).results[0].members;
    while (x.rows.length > 0) {
        x.deleteRow(0);
    } 
    for (var i = 0; i < member.length; i++) {
        var row = document.createElement("tr");
        x.append(row);
        var partyValue = member[i].party;
        var stateValue = member[i].state;
        var visible = isVisible(partyValue, stateValue);
        if (visible) {
            if (member[i].middle_name === null) {
                row.insertCell().innerHTML = '<a href="' + member[i].url + '">' + member[i].first_name + " " + member[i].last_name + '</a>';
            } else {
                row.insertCell().innerHTML = '<a href="' + member[i].url + '">' + member[i].first_name + " " + member[i].middle_name + " " + member[i].last_name + '</a>';
            }
            row.insertCell().innerHTML = member[i].party;
            row.insertCell().innerHTML = member[i].state;
            row.insertCell().innerHTML = member[i].seniority;
            row.insertCell().innerHTML = member[i].votes_with_party_pct + " %";
        }
    }
}

function addListeners() {
    document.getElementById("selectState").addEventListener("click", makeTable);
    document.getElementById("rep").addEventListener("click", makeTable);
    document.getElementById("dem").addEventListener("click", makeTable);
    document.getElementById("ind").addEventListener("click", makeTable);
}

function filter() {
    var array = [];
    if (document.getElementById("rep").checked) {
        array.push(document.getElementById("rep").value);
    }
    if (document.getElementById("dem").checked) {
        array.push(document.getElementById("dem").value);
    }
    if (document.getElementById("ind").checked) {
        array.push(document.getElementById("ind").value);
    }
    if (!document.getElementById("rep").checked && !document.getElementById("dem").checked && !document.getElementById("ind").checked) {
        array.push(document.getElementById("rep").value);
        array.push(document.getElementById("dem").value);
        array.push(document.getElementById("ind").value);
    }
    return array;
}

function isVisible(partyValue, stateValue) {
    var x = document.getElementById("selectState");
    var array = filter();
    
    var value1 = array.indexOf(partyValue) != -1;
    var value2 = x.value == stateValue || x.value == "all";
    
    return value1 && value2;
}

function fillSelector() {
    var x = document.getElementById("selectState");
    var array = [];
    var member = data.results[0].members;
    for (var i = 0; i < member.length; i++) {
        if (array.indexOf(member[i].state) == -1) {
            array.push(member[i].state);
        }
    }
    array.sort();
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = array[i];
        x.append(option);
    }
}


function footer() {

    var member = data.copyright;
    var x = document.getElementById("foot");
    var foot = document.createElement("h4");
    var footText = document.createTextNode(member);
    foot.append(footText);
    x.append(foot);
}

/*function makeTable() {
    //console.log(data);
    var x = document.getElementById("mytable");
    var member = data.results[0].members;
    while (x.rows.length > 0) {
        x.deleteRow(0);
    }
    for (var i = 0; i < member.length; i++) {
        var row = document.createElement("tr");
        x.append(row);
        var partyValue = member[i].party;
        var stateValue = member[i].state;

        var visible = isVisible(partyValue, stateValue);

        row.insertCell().innerHTML =    if (member.middle_name == null) {
                                            member[i].first_name + member[i].last_name;
                                        }
                                        else {
                                            member[i].first_name + member[i].middle_name + member[i].last_name;
                                        }
        row.insertCell().innerHTML = member[i].party;
        row.insertCell().innerHTML = member[i].state;
        row.insertCell().innerHTML = member[i].seniority;
        row.insertCell().innerHTML = member[i].votes_with_party_pct + " %";
    }
}*/

/*getFullName(member[i]);

function getFullName(member) {

    var middlename = "";

    if (member.middle_name != null) {
        middlename = " " + member.middle_name + " ";
    }

    return '<a href="' + member.url + '">' + member.first_name + middlename + member.last_name + '</a>';
}*/

/*function addListeners() {
    document.getElementById("selectState").addEventListener("change", makeTable);
    document.getElementById("rep").addEventListener("click", makeTable);
    document.getElementById("dem").addEventListener("click", makeTable);
    document.getElementById("ind").addEventListener("click", makeTable);
}*/


/*
function filter() {
    var array = [];
    if (document.getElementById("rep").checked) {
        array.push(document.getElementById("rep").value);
    }
    if (document.getElementById("dem").checked) {
        array.push(document.getElementById("dem").value);
    }
    if (document.getElementById("ind").checked) {
        array.push(document.getElementById("ind").value);
    }
    if (!document.getElementById("rep").checked && !document.getElementById("dem").checked && !document.getElementById("ind").checked) {
        array.push(document.getElementById("rep").value);
        array.push(document.getElementById("dem").value);
        array.push(document.getElementById("ind").value);
    }
    console.log(array);
    return array;
}
*/


/*function isVisible(partyValue, stateValue) {
    var x = document.getElementById("selectState");
    var array = filter();

    var value1 = array.indexOf(partyValue) != -1;
    var value2;

    if (x.value == stateValue || x.value == "all") {
        value2 = true;
    } else {
        value2 = false;
    }
    return value1 && value2;
}*/


/*fillSelector();

function fillSelector() {
    var x = document.getElementById("selectState");
    var array = [];
    var member = data.results[0].members;
    for (var i = 0; i < member.length; i++) {
        if (array.indexOf(member[i].state) == -1) {
            array.push(member[i].state);
        }
    }
    array.sort();
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = array[i];
        x.append(option);
    }
}*/









//var myJSON = JSON.stringify(data);
/*
//console.log(myJSON);

var yJSON = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
console.log(yJSON);

var tbl = document.getElementById("myTable");
tbl.className = "names";

for (var i = 0; i < data.length; i++) {
    var row = document.createElement("tr");
    tbl.append(row);
    makeCells(data[i]);   
}


function makeCells(object) {

    var key;
    for( key in object ){
        var cell = document.createElement("td");
        cell.innerHTML = object[key];
        row.append(cell);
        cell.className = "names";
    }
}   


function addTable() {
	// First, we select the table and then set members equal to "members" array of objects
	var table = document.getElementById("senate-table");
	var members = senateData.results[0].members;
	var tbody = document.createElement("tbody");
	table.append(tbody);

	// Then we start to iterate through the array
	for (var i=0; i<members.length; i++) {
		var row = document.createElement("tr");
		var name = createName(members[i]);
		var a = document.createElement("a");
		a.innerHTML = name;
		a.href = members[i].url;
		// Now we create every cell and fill it with data from our JSON
		row.insertCell().append(a);
		row.insertCell().innerHTML = members[i].party;
		row.insertCell().innerHTML = members[i].state;
		row.insertCell().innerHTML = members[i].seniority;
		row.insertCell().innerHTML = members[i].votes_with_party_pct + " %";
		tbody.append(row);
	}


        row.insertCell().innerHTML = data.results[0].members[i].first_name + data.results[0].members[i].last_name;    
    row.insertCell().innerHTML = data.results[0].members[i].last_name;  


}*/



/*

var repCheckbox = document.getElementById("rep");
var demCheckbox = document.getElementById("dem");
var indCheckbox = document.getElementById("ind");
*/
//repCheckbox.addEventListener("click", hello);
