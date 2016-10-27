var page = 1;
var flagAjax = true;

function getListeAlbum(showListe, showWait) {
    flagAjax = false;
    if (showWait) {
        $("#loaderListe").removeClass("none");
        $("#emplacementWaiterlist").addClass("none");
    }
    $.getJSON(url + "api/listeAlbum/" + page, function (datas) {
        jQuery.each(datas, function (i, val) {
            $("#listeArticle").append('\
                        <a href="./article-lesphotos.html?id=' + val.id + '">\n\
                        <div class="article">\n\
                        <span>' + val.titre + '</span> - \n\
                        <span class="date_debut">' + val.date_debut + '</span>\n\
                        </div>\n\
                        </a>');
        });
        if (showListe) {
            $("#loader").addClass("none");
            $("#listeArticle").removeClass("none");
        }
        if (showWait) {
            $("#loaderListe").addClass("none");
            $("#emplacementWaiterlist").removeClass("none");
        }
        page++;
        flagAjax = true;

    });
}


$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        if (flagAjax) {
            getListeAlbum(false, true);
        }
    }
});

$(function () {
    getListeAlbum(false, false);
    getListeAlbum(true, false);
});