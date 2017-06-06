/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var listComment = {

    urlListComment: url + "api/comment/" + modal.type + "/" + modal.id,

    showListComment: function () {
        $("#loader-modal").removeClass("none");
        this.callApiToGetJsonListComment();
    },

    callApiToGetJsonListComment: function () {
        var self = this;
        $.getJSON(this.urlListComment, function (datas) {
            if (datas.error === undefined) {
                jQuery.each(datas.comments, function (i, val) {
                    self.changeText(val);
                });
                $("#loader-modal").addClass("none");
            } else {
                $("#loader-modal").addClass("none");
                $("#modal-body").html(datas.error);
            }
        });
    },

    changeText: function (val) {
        $("<p />", {
            class: "list-comment-name",
            text: val.name
        }).appendTo("#modal-body");
        $("<p />", {
            class: "list-comment-text",
            text: val.text
        }).appendTo("#modal-body");
        $("<p />", {
            class: "list-comment-date",
            text: val.created
        }).appendTo("#modal-body");
    }
}

$(function () {
    listComment.showListComment();
});
