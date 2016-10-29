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
                var i = 0;
                jQuery.each(datas.articles, function (i, val) {
                    if (type === "text") {
                        changeText(val);
                    } else {
                        changeImage(val, i);
                        i++;
                    }

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

function changeText(val) {
    $("#listeArticle").append('\
        <a href="./' + urlNextPage + '?id=' + val.id + '">\n\
        <div class="article">\n\
        <span>' + val.titre + '</span> - \n\
        <span class="date_debut">' + val.date_debut + '</span>\n\
        </div>\n\
        </a>');
}

function changeImage(val, i) {
    var urlImgage = replaceAll(val.url, '/assets/img/', url + '/assets/img/');
    var classCss;
    var div = "";
    if (i % 2) {
        classCss = "imageRight";
    } else {
        classCss = "imageLeft";
    }
    $("#listeArticle").append('\
        <div class="' + classCss + '">\n\
        <a href="./' + urlNextPage + '?id_album=' + $_GET("id") + '&id=' + val.id + '">\n\
        <i class="imagePhoto" style="background-image: url(' + urlImgage + ')" alt="' + val.name + '"></i>\n\
        </a>\n\
        </div>' + div);
}

$(function () {
    getListe(false);
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            getListe(true);
        }
    });
});