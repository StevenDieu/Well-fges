/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getListe() {
    $.getJSON(url + requestUri, function (datas) {
        if (datas.error === undefined) {
            var i = 0;
            jQuery.each(datas.avenirs, function (i, val) {
                changeText(val);
            });
            $("#loader").addClass("none");
        } else {
            $("#loader").addClass("none");
            $("#listeAvenir").html(sentence);
        }
    });
}

function changeText(val) {
    $("#listeAvenir").append('\
    <div class="article article-contenu">\n\
        <div class="titreAvenir">\n\
            ' + val.titre + '\n\
        </div>\n\
        <br>\n\
        <div class="date"> \n\
            <div class="dateDebut bloc-left">Début : ' + val.date_debut + ' </div>\n\
            <div class="heureDebut bloc-right">' + val.heure_debut + '</div>\n\
        </div>\n\
        <div class="clearBoth"></div>\n\
        <div class="date"> \n\
            <div class="dateFin bloc-left">Fin : ' + val.date_fin + ' </div>\n\
            <div class="heureFin bloc-right">' + val.heure_fin + '</div>\n\
        </div>\n\
        <div class="clearBoth"></div>\n\
        <div class="text-left" > Lieu : ' + val.lieu + ' </div>\n\
        <br>\n\
        <div class="text-left" >\n\
            ' + val.description + '\n\
        </div>\n\
    </div>');
}

$(function () {
    getListe();
});