var page = 1;
var flagAjax = true;
var isLast = false;

function getListeFlashabck(showListe, showWait) {
    if (!isLast) {
        flagAjax = false;
        if (showWait) {
            $("#loaderListe").removeClass("none");
            $("#emplacementWaiterlist").addClass("none");
        }
        $.getJSON(url + "api/listeFlashback/" + page, function (datas) {
            if (!isLast) {
                if (datas.error === undefined) {
                    jQuery.each(datas, function (i, val) {
                        $("#listeArticle").append('\
                        <a href="./article-flashback.html?id=' + val.id + '">\n\
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
                    if ($(".article").length === 0) {
                        $("#loader").addClass("none");
                        $("#listeArticle").removeClass("none");
                        $("#listeArticle").html('<div class="article"><span>Il n\'y pas de flashback. Revenez plus tard.</span></div>')
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
            getListeFlashabck(false, true, true);
        }
    }
});

$(function () {
    getListeFlashabck(false, false, true);
    page++;
    getListeFlashabck(true, false, false);
});