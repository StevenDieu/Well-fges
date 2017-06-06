/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var isProcessToSending = false;

var formSendComment = {

    name: "",
    text: "",
    isProcessToSending: false,

    launch: function () {
        if (!this.isProcessToSending) {
            this.name = $("#name").val();
            this.text = $("#text").val();
            $(".error").empty();
            if (this.isPresentValueTypeAndId() && this.checkAllInputForm()) {
                this.sendComment();
            }
        }
    },

    isPresentValueTypeAndId: function () {
        if (modal.type === null || modal.id === null || modal.type.length === 0 || modal.id.length === 0) {
            $("#error").html("Aie ! Une erreur est survenue, veuillez recommencer...");
            return false;
        }
        return true;
    },

    checkAllInputForm: function () {
        var isCanSubmit = true;

        if (this.name.length === 0) {
            $("#errorName").html("Oups... Ce champ est obligatoire");
            isCanSubmit = false;
        } else if (this.name.length >= 255) {
            $("#errorName").html("Oups... Ce champ ne peut pas contenir plus de 255 caratères");
            isCanSubmit = false;
        }

        if (this.text.length === 0) {
            $("#errorText").html("Oups... Ce champ est obligatoire");
            isCanSubmit = false;
        }
        return isCanSubmit;
    },

    getComment: function () {
        var dynamicData = {};
        dynamicData["type"] = modal.type;
        dynamicData["id"] = modal.id;
        dynamicData["name"] = this.name;
        dynamicData["text"] = this.text;

        return $.ajax({
            url: url + "api/comment",
            type: "POST",
            dataType: "json",
            data: dynamicData
        });
    },

    sendComment: function () {
        this.isProcessToSending = true;
        var self = this;

        $("#name,#text").attr("disabled", "disabled");
        $("#submit-comment").html("Chargement ...");

        this.getComment().done(function (result) {
            modal.needReloadModal = true;
            $("#form-comment,#submit-comment").hide();
            $("#resultName").html("Prénom Nom : " + self.name);
            $("#resultText").html("Commentaire : " + self.text);
            $("#success").html(result.message);
        }).fail(function (result) {
            modal.needReloadModal = true;
            self.isProcessToSending = false;
            $("#name,#text").attr("disabled", "");
            $("#submit-comment").html("Commenter");
            $("#error").html(result.message);
        });
    }
};

$(function () {
    $("#submit-comment").on("click", function () {
        formSendComment.launch();
        return false;
    });
});