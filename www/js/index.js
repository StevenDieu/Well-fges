/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        window.plugins.PushbotsPlugin.initialize("58d17bcc4a9efa39508b4568", {"android": {"sender_id": "586629882770"}});

        // Should be called once app receive the notification only while the application is open or in background
        window.plugins.PushbotsPlugin.on("notification:received", function (data) {
            console.log("received:" + JSON.stringify(data));

            //Silent notifications Only [iOS only]
            //Send CompletionHandler signal with PushBots notification Id
            window.plugins.PushbotsPlugin.done(data.pb_n_id);
        });

        // Should be called once the notification is clicked
        window.plugins.PushbotsPlugin.on("notification:clicked", function (data) {
            console.log("clicked:" + JSON.stringify(data));
        });

        // Should be called once the device is registered successfully with Apple or Google servers
        window.plugins.PushbotsPlugin.on("registered", function (token) {
            console.log(token);
        });

        //Get device token
        window.plugins.PushbotsPlugin.getRegistrationId(function (token) {
            console.log("Registration Id:" + token);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var url = "http://comin.stevendieu.com/";

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function (m, key, value) { // callback
                vars[key] = value !== undefined ? value : '';
            }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }

    return vars;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

var modal = {
    modal: "",
    id: "",
    current: "",
    needReloadModal: false,
    isErrorOnRequest : false,

    init: function () {
        var self = this;
        $(document).on("click", ".add-comment", function (e) {
            self.addContent("add-comment.html", $(this));
            e.stopPropagation();
        });

        $(document).on("click", ".list-comment", function (e) {
            self.addContent("list-comment.html", $(this));
            e.stopPropagation();
        });

        $(document).on("click", ".close-modal", function (e) {
            self.hideModal();
            e.stopPropagation();
        });
    },

    addContent: function (specUrl, elt) {
        if(!this.isErrorOnRequest){
            this.showModal();
        }
        if (this.current !== specUrl || this.type !== elt.data("type") || this.id !== elt.data("id") || this.needReloadModal || this.isErrorOnRequest) {
            this.needReloadModal = false;
            this.current = specUrl;
            this.type = elt.data("type");
            this.id = elt.data("id");
            var self = this;
            
            $(".loader-popin").show();
            $("#modal-content").empty();
            
            $.ajax({
                url: specUrl,
                type: "GET",
                cache: false,
                success: function (result) {
                    this.isErrorOnRequest = false;
                    $(".loader-popin").hide();
                    $("#modal-content").html(result);
                },
                error: function () {
                    this.isErrorOnRequest = true;
                    self.hideModal();
                }
            });
        }
    },

    showModal: function () {
        $(".modal").show();
        $("body").addClass("no-scroll-y");
    },

    hideModal: function () {
        $(".modal").hide();
        $("body").removeClass("no-scroll-y");
    }
}

$(function () {
    modal.init();
});