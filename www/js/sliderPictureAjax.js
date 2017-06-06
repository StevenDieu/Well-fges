/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var urlApiPhoto = url + "api/photo/" + $_GET("id_album") + "/";
var urlApiPreviousNext = url + "api/previousNextPhoto/" + $_GET("id_album") + "/";

var middleWidth = $(window).width() * (1 / 4);
var allPictureLoad = [];
var currentPicture = {};

$(function () {
    $(document).on('scroll', function () {
        $(document).scrollLeft(0);
    });
    currentPicture["id"] = $_GET("id");
    getUrlAjax(true);
    $("#slider").draggable({axis: "x",
        stop: function () {
            var position = $("#slider").position();

            if (middleWidth < position.left && currentPicture["previousId"] !== undefined && currentPicture["previousId"] !== null) {
                changeImage($(window).width(), "previousId", false);
            } else if ((middleWidth * -1) > position.left && currentPicture["nextId"] !== undefined && currentPicture["nextId"] !== null) {
                changeImage(-$(window).width(), "nextId", true);
            }

            $("#slider").css({left: "0px"});
        }});

    function changeImage(width, previousOrNext, isNext) {
        changeLeftAllPicture(width);
        if (noContains(currentPicture[previousOrNext])) {
            currentPicture["id"] = currentPicture[previousOrNext];
            getUrlAjax(isNext);
        } else {
            getPictureById(currentPicture[previousOrNext]);
        }
    }

    function getUrlAjax(isNext) {
        var savePicture = {};
        savePicture["id"] = currentPicture["id"];

        addImgInDom(isNext);

        currentPicture["previousId"] = null;
        currentPicture["nextId"] = null;



        $.getJSON(urlApiPreviousNext + currentPicture["id"], function (data) {


            if (data.previousId !== undefined) {
                savePicture["previousId"] = data.previousId.valueOf();
                currentPicture["previousId"] = data.previousId.valueOf();
            }
            if (data.nextId !== undefined) {
                savePicture["nextId"] = data.nextId.valueOf();
                currentPicture["nextId"] = data.nextId.valueOf();
            }

            allPictureLoad.push(savePicture);

            $.getJSON(urlApiPhoto + savePicture["id"], function (data) {
                if (data.url !== undefined) {
                    addUrlOnImg(savePicture["id"], data.url, data.number_comment);
                }
            });
        });
    }


    function addImgInDom(isNext) {

        if (isNext) {
            $("#slider").append('<i class="photo-background loader-white" id="' + currentPicture["id"] + '" alt=""></i>');
        } else {
            $("#slider").prepend('<i class="photo-background loader-white" id="' + currentPicture["id"] + '" alt=""></i>');
        }
    }

    function addUrlOnImg(id, url, numberComment) {
        var styleImgPresentOnDom = ""
        if ($("#" + id).attr("style") !== undefined) {
            styleImgPresentOnDom = $("#" + id).attr("style");
        }
        $("#" + id).attr("style", styleImgPresentOnDom + ' background-image: url(' + url + ')');
        $("#" + id).removeClass("loader-white");


        var classListComment = "";
        var textCommentaire = " COMMENTAIRES";
        if (numberComment === "0") {
            textCommentaire = " COMMENTAIRE";
        }else{
            classListComment = " list-comment";
        }
        $("<div/>", {
            class: "block-comment-picture",
            id: "block-comment-picture" + id
        }).appendTo("#" + id);

        $("<div/>", {
            class: "block-count-comment-picture" + classListComment,
            id: "block-count-comment-picture" + id,
            text: numberComment + textCommentaire,
            "data-type": "photo",
            "data-id": id
        }).appendTo("#block-comment-picture" + id);

        $("<div/>", {
            class: "block-add-comment-picture add-comment block-icon-comment",
            id: "block-add-comment-picture" + id,
            "data-type": "photo",
            "data-id": id
        }).appendTo("#block-comment-picture" + id);

        $("<img/>", {
            class: "add-comment",
            src: "img/comment-white.png",
            alt: "add-comment"
        }).appendTo("#block-add-comment-picture" + id);

        $("<div/>", {
            class: "text-icon-comment",
            text: "COMMENTER"
        }).appendTo("#block-add-comment-picture" + id);

    }

    function changeLeftAllPicture(widthWindow) {
        var i = allPictureLoad.length;
        while (i--) {
            $("#" + allPictureLoad[i]["id"]).css({'left': ($("#" + allPictureLoad[i]["id"]).position().left + widthWindow) + "px"});
        }
    }

    function getPictureById(id) {
        var i = allPictureLoad.length;
        while (i--) {
            if (allPictureLoad[i]["id"] === id) {
                currentPicture["id"] = allPictureLoad[i]["id"];
                if (allPictureLoad[i]["previousId"]) {
                    currentPicture["previousId"] = allPictureLoad[i]["previousId"];
                } else {
                    currentPicture["previousId"] = null;
                }

                if (allPictureLoad[i]["nextId"]) {
                    currentPicture["nextId"] = allPictureLoad[i]["nextId"];
                } else {
                    currentPicture["nextId"] = null;
                }
            }
        }
    }

    function noContains(obj) {
        var i = allPictureLoad.length;
        while (i--) {
            if (allPictureLoad[i]["id"] === obj) {
                return false;
            }
        }
        return true;
    }
});