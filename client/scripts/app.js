"use strict";
(function () {
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function DisplayHomePage() {
        console.log("Display Home Page called");
        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";
        });
        $("#ProductsBtn").on("click", () => {
            location.href = "/contact-list";
        });
        $("#ContactsBtn").on("click", () => {
            location.href = "/contact";
        });
        $("#ServicesBtn").on("click", () => {
            location.href = "/service";
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main Paragraph</p>`);
        $("main").append(`<article>
            <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
    }
    function DisplayProductsPage() {
        console.log("Display Products Page called");
    }
    function DisplayAboutUsPage() {
        console.log("Display About Page called");
    }
    function DisplayServicesPage() {
        console.log("Display Services Page called");
    }
    function ContactFormValidation() {
        ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Please enter a valid firstName and lastName (ex. Mr. Peter Parker)");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Contact Number (ex. 416-555-5555");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address(ex. username@isp.com");
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea");
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function DisplayContactPage() {
        console.log("Display Contact Page called");
        let messageArea = $("#messageArea");
        messageArea.hide();
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            location.href = "/contact-list";
        });
        ContactFormValidation();
        let sendButton = document.getElementById("sendButton");
        let subscribeBox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeBox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }
    function DisplayContactListPage() {
        console.log("Display ContactList Page called");
        $("a.delete").on("click", function (event) {
            if (!confirm("Delete contact, please confirm")) {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });
    }
    function DisplayEditPage() {
        console.log("Display Edit Page called");
        let messageArea = $("#messageArea");
        messageArea.hide();
        ContactFormValidation();
    }
    function DisplayLoginPage() {
        console.log("Display Register Page called");
    }
    function AuthGuard() {
        let protected_routes = ["contact-list", "edit"];
        if (protected_routes.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(` <a id="logout" class="nav-link" href="#">
            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            $("#login").html(` <a class="nav-link" data="login">
            <i class="fa-solid fa-sign-in-alt"></i> Login</a>`);
            location.href = "/login";
            ;
        });
    }
    function DisplayRegisterPage() {
        console.log("Display Register Page called");
    }
    function Display404Page() {
        console.log("Display 404 Page ");
    }
    function Start() {
        console.log("Application Started");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutUsPage();
                break;
            case "service":
                DisplayServicesPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "products":
                DisplayProductsPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "edit":
                DisplayEditPage();
                break;
            case "add":
                DisplayEditPage();
                break;
            case "404":
                Display404Page();
                break;
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map