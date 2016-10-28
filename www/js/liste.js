/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var start = 0;
var flagAjax = true;
var isLast = false;

function getListe(showWait) {
    if (!isLast && flagAjax) {
        flagAjax = false;
        if (showWait) {
            $("#loaderListe").removeClass("none");
            $("#emplacementWaiterlist").addClass("none");
        }
        $.getJSON(url + requestUri + start, function (datas) {
            if (datas.error === undefined) {
                jQuery.each(datas.articles, function (i, val) {
                    $("#listeArticle").append('\
                        <a href="./' + urlNextPage + '?id=' + val.id + '">\n\
                        <div class="article">\n\
                        <span>' + val.titre + '</span> - \n\
                        <span class="date_debut">' + val.date_debut + '</span>\n\
                        </div>\n\
                        </a>');
                });
                if (showWait) {
                    $("#loaderListe").addClass("none");
                    $("#emplacementWaiterlist").removeClass("none");
                } else {
                    $("#loader").addClass("none");
                    $("#listeArticle").removeClass("none");
                }
                start = datas.nextStart;
                flagAjax = true;
            } else {
                isLast = true;
                if (start === 0) {
                    $("#loader").addClass("none");
                    $("#listeArticle").removeClass("none");
                    $("#listeArticle").html(sentence);
                } else {
                    $("#loaderListe").addClass("none");
                    $("#emplacementWaiterlist").removeClass("none");
                }
            }
        });
    }
}

$(function () {
    getListe(false);

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            getListe(true);
        }
    });
});