var page = 1;
var flagAjax = true;
var isLast = false;

function getListeAlbum(showListe, showWait, addPage) {
    if (!isLast) {
        flagAjax = false;
        if (showWait) {
            $("#loaderListe").removeClass("none");
            $("#emplacementWaiterlist").addClass("none");
        }
        $.getJSON(url + "api/listeAlbum/" + page, function (datas) {
            if (!isLast) {
                if (datas.error === undefined) {
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
                    if (addPage) {
                        page++;
                    }
                    flagAjax = true;
                } else {
                    isLast = true;
                    if (page === 1) {
                        $("#loader").addClass("none");
                        $("#listeArticle").removeClass("none");
                        $("#listeArticle").html('<div class="article"><span>Il n\'y pas d\'album. Revenez plus tard.</span></div>')
                    } else {
                        $("#loaderListe").addClass("none");
                        $("#emplacementWaiterlist").removeClass("none");
                    }
                }
            }
        });
    }
}


$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        if (flagAjax) {
            getListeAlbum(false, true, true);
        }
    }
});

$(function () {
    getListeAlbum(false, false, true);
    page++;
    getListeAlbum(true, false, false);
});