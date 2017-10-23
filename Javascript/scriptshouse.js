var estado, partyR, partyD, partyI;
var data, titulo;
var auxSenate = JSON.stringify(datasenate, null, 2);
var auxHouse = JSON.stringify(datahouse, null, 2);
var data1 = JSON.parse(auxSenate);
var data2 = JSON.parse(auxHouse);

document.getElementById('homePage').style.display = 'block';
document.getElementById('containerTable').style.display = 'none';
document.getElementById('attendance').style.display = 'none';
document.getElementById('loyalty').style.display = 'none';

/*function dataSource(source, title, page) {
    data = source;

    //titulo = title;
    if (page == 1) {

        document.getElementById('titleSenate').style.display = 'block';
        document.getElementById('titleHouse').style.display = 'none';
    } else {
        document.getElementById('titleSenate').style.display = 'none';
        document.getElementById('titleHouse').style.display = 'block';

    }
    document.getElementById('landing').style.display = 'none';
    document.getElementById('tgif').style.display = 'block';
    document.getElementById('containerTable').style.display = 'block';
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('attendance').style.display = 'none';
    

}*/

/*function showHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('tgif').style.display = 'block';
    document.getElementById('containerTable').style.display = 'none';
    document.getElementById('landing').style.display = 'none';
    document.getElementById('attendance').style.display = 'none';

}*/

function attData(fuente, pagina) {
    attDatos = fuente;

    switch (pagina) {
        case 1:
            document.getElementById('homePage').style.display = 'block';
            document.getElementById('containerTable').style.display = 'none';
            document.getElementById('attendance').style.display = 'none';
            document.getElementById('loyalty').style.display = 'none';
            break;
        case 2:
            document.getElementById('homePage').style.display = 'none';
            document.getElementById('containerTable').style.display = 'block';
            document.getElementById('attendance').style.display = 'none';
            document.getElementById('loyalty').style.display = 'none';
            //senateof();
            break;

        case 3:
            document.getElementById('homePage').style.display = 'none';
            document.getElementById('containerTable').style.display = 'none';
            document.getElementById('attendance').style.display = 'block';
            document.getElementById('loyalty').style.display = 'none';
            break;

        case 4:
            document.getElementById('homePage').style.display = 'none';
            document.getElementById('containerTable').style.display = 'none';
            document.getElementById('attendance').style.display = 'none';
            document.getElementById('loyalty').style.display = 'block';
            break;
        default:
            break;
    }
}

/*if (pagina == 3) {
        document.getElementById('attSenate').style.display = 'block';
        // document.getElementById('attHouse').style.display ='none';
    } else {
        //document.getElementById('attHouse').style.display ='block';
        document.getElementById('attSenate').style.display = 'none';
    }
    document.getElementById('attendance').style.display = 'block';
    document.getElementById('landing').style.display = 'none';
    document.getElementById('tgif').style.display = 'none';
    document.getElementById('containerTable').style.display = 'none';
    document.getElementById('homePage').style.display = 'none';

}*/



function toggle() {
    var x = document.getElementById('hide-show');
    var y = document.getElementById('more');
    if (x.style.display === 'none') {
        x.style.display = 'block';
        y.innerHTML = "Read Less";
    } else {
        x.style.display = 'none';
        y.innerHTML = "Read More";
    }
}







function senateof(datasource, title) {
    estado = document.getElementById("state").value;
    partyR = document.getElementById("rep").checked;
    partyD = document.getElementById("dem").checked;
    partyI = document.getElementById("ind").checked;


    data = datasource;
    titulo = title;
    var miembros = data.results[0].members;
    var salida = "";



    for (var i = 0; i < miembros.length; i++) {
        if (memberValid(miembros[i])) {
            salida +=
                '<tr><td><a href=' +
                miembros[i].url +
                '>' +
                nombrecompleto(miembros[i]) +
                '</a></td><td>' +
                partidos(miembros[i].party) +
                '</td><td>' +
                miembros[i].state +
                '</td><td>' +
                miembros[i].seniority +
                '</td><td>' +
                miembros[i].votes_with_party_pct +
                '%</td></tr>';
        }

    }
    document.getElementById("senate-data").innerHTML = salida;
    //document.getElementById("botonaqui").innerHTML='<button onclick="senateof(datasource, "senate")">Search</button>'
    // document.getElementById("titulomembers").innerHTML = titulo;

}



function nombrecompleto(member) {

    var nombres = member.first_name;
    if (member.middle_name != null) {
        nombres += " " + member.middle_name;

    }

    nombres += " " + member.last_name;
    return nombres;

}



function memberValid(persona) {
    if (!stateValid(persona.state)) {
        return false;
    }
    if (!partyR && !partyD && !partyI) {
        return true;
    }
    if ((partyR && persona.party == "R") || (partyD && persona.party == "D") || (partyI && persona.party == "I")) {
        return true;
    }
    return false;
}



function stateValid(persona) {
    return estado == "All" || estado == persona;
}


function partidos(partido) {

    if (partido == "R") {
        return "Republicans";
    } else if (partido == "D") {
        return "Democrats"
    } else {
        return "independent"
    }

}


// INICIO FUNCIONES ATTENDANCE

function nMiembros() { //

    document.getElementById("titulos_tabla2").innerHTML = titulo;



    var miembros = data.results[0].members;

    var miembrosR = miembros.filter(function (item) {
        return item.party == "R";
    });
    var miembrosD = miembros.filter(function (item) {
        return item.party == "D";
    });
    var miembrosI = miembros.filter(function (item) {
        return item.party == "I";
    });



    var stadistics = {
        nRepublicans: miembrosR.length,
        nDemocrats: miembrosD.length,
        nIndependents: miembrosI.length,
        pct_R: 0,
        pct_D: 0,
        pct_I: 0
    };

    stadistics.pct_R = Total_pct(miembrosR);
    stadistics.pct_D = Total_pct(miembrosD);
    stadistics.pct_I = Total_pct(miembrosI);



    var salida2 = "";
    salida2 += "<tr><th class='th'>Party</th><th class='th'>Number of Reps</th><th class='th'>% Voted with Prty</th></tr><tr><td>Republicans</td><td>" +
        stadistics.nRepublicans +
        "</td><td>" +
        stadistics.pct_R + "</td></tr><tr><td>Democrats</td><td>" +
        stadistics.nDemocrats +
        "</td><td>" +
        stadistics.pct_D + "</td></tr><tr><td>Independent</td><td>" +
        stadistics.nIndependents +
        "</td><td>" +
        stadistics.pct_I + "</td></tr>"

    document.getElementById("num_i_pct").innerHTML = salida2;
    document.getElementById("num_i_pct1").innerHTML = salida2;



    function Total_pct(miembrosX) {

        var sumaX = 0;
        var mediaX;
        for (var i = 0; i < miembrosX.length; i++) {

            sumaX += parseFloat(miembrosX[i].votes_with_party_pct);

        }
        mediaX = parseFloat(sumaX / miembrosX.length).toFixed(2);
        return mediaX;

        console.log(mediaX);


    }

}

function MostAttendance() {

    var miembros = data.results[0].members;


    var MostAttendance = miembros.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    });

    maximo = parseInt(miembros.length / 10);

    while (maximo < maximo.length && miembros[maximo] == miembros[maximo - 1]) {
        maximo++;
    }

    var salida3 = "";
    salida3 += "<tr><th class='th'>Name</th><th class='th'>Number Missed Votes</th><th class='th'>% Missed Votes</th></tr>"

    for (i = 0; i < maximo; i++) {
        salida3 +=
            "<tr><td><a href=" +
            miembros[i].url +
            ">" +
            nombrecompleto(miembros[i]) +
            "</a></td><td>" +
            MostAttendance[i].missed_votes + "</td><td>" +
            MostAttendance[i].missed_votes_pct +
            "</td></tr>"
    }

    document.getElementById("most_attendance").innerHTML = salida3;
   
}

function LessAttendance() {

    var miembros = data.results[0].members,

        LessAttendance = miembros.sort(function (a, b) {
            return a.missed_votes_pct - b.missed_votes_pct
        }),

        maximo = parseInt(miembros.length / 10);

    while (maximo < maximo.length && miembros[maximo] == miembros[maximo - 1]) {
        maximo++;
    }


    var salida4 = "";
    salida4 += "<tr><th class='th'>Name</th><th class='th'>Number Missed Votes</th><th class='th'>% Missed Votes</th></tr>"

    for (i = 0; i < maximo; i++) {
        salida4 +=
            "<tr><td><a href=" +
            miembros[i].url +
            ">" +
            nombrecompleto(miembros[i]) +
            "</a></td><td>" +
            LessAttendance[i].missed_votes + "</td><td>" +
            LessAttendance[i].missed_votes_pct +
            "</td></tr>"
    }

    document.getElementById("less_attendance").innerHTML = salida4;
 
}


function MostLoyalty() {

    var miembros = data.results[0].members;


    var mostloyal = miembros.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct
    });

    maximo = parseInt(miembros.length / 10);

    while (maximo < maximo.length && miembros[maximo] == miembros[maximo - 1]) {
        maximo++;
    }

    var salida3 = "";
    salida3 += "<tr><th class='th'>Name</th><th class='th'>Number Party Votes</th><th class='th'>% Party Votes</th></tr>"

    for (i = 0; i < maximo; i++) {
        salida3 +=
            "<tr><td><a href=" +
            miembros[i].url +
            ">" +
            nombrecompleto(miembros[i]) +
            "</a></td><td>" +
            mostloyal[i].total_votes + "</td><td>" +
            mostloyal[i].votes_with_party_pct +
            "</td></tr>"
    }

     document.getElementById("most_attendance1").innerHTML = salida3;
}

function LessLoyalty() {

    var miembros = data.results[0].members,

        LessLoyal = miembros.sort(function (a, b) {
            return b.votes_with_party_pct - a.votes_with_party_pct
    });

    maximo = parseInt(miembros.length / 10);

    while (maximo < maximo.length && miembros[maximo] == miembros[maximo - 1]) {
        maximo++;
    }

    var salida4 = "";
    salida4 += "<tr><th class='th'>Name</th><th class='th'>Number Party Votes</th><th class='th'>% Party Votes</th></tr>"

    for (i = 0; i < maximo; i++) {
        salida4 +=
            "<tr><td><a href=" +
            miembros[i].url +
            ">" +
            nombrecompleto(miembros[i]) +
            "</a></td><td>" +
            LessLoyal[i].total_votes + "</td><td>" +
            LessLoyal[i].votes_with_party_pct +
            "</td></tr>"
    }

    
    document.getElementById("less_attendance1").innerHTML = salida4;
}



function Attendance(datasource, title) {

    data = datasource;
    titulo = title;
    nMiembros();
    MostAttendance();
    LessAttendance();
}

function Loyalty(datasource, title) {

    data = datasource;
    titulo = title;
    nMiembros();
    MostLoyalty();
    LessLoyalty();

}
