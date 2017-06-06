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
    var classListComment = "";
    var textCommentaire = " commentaires";
    if (val.number_comment === "0") {
        textCommentaire = " commentaire";
    } else {
        classListComment = "list-comment";
    }

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
        <a href="Javascript:void(0);" data-type="avenir" data-id="' + val.id + '" class="' + classListComment + ' block-comment">\n\
        ' + val.number_comment + textCommentaire + '\n\
        </a>\n\
        <a href="Javascript:void(0);" data-type="avenir" data-id="' + val.id + '" class="add-comment block-icon-comment">\n\
            <img class="add-comment" src="img/comment-white.png" alt="add-comment"/><div class="text-icon-comment">Commenter</div>\n\
        </a>\n\
    </div>');
}

$(function () {
    getListe();
});