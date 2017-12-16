/**Facebook Graph API Search **/

/* REMINDER to update the access token!!!!!!! */

document.getElementById("searchBox").focus();
let pageSearchApp = {
    loader: document.getElementsByClassName("loader")[0],
    
    /** Invoked while pressing enter key on searchBox **/
    /////////////*From FACEBOOK, Api URL and Access token search tool */////////////////////
    onSearchFieldEnter: function (ev) {
        var that = this,
            searchField = document.getElementById("searchBox"),
            pagesContainer = document.getElementById("pagesContainer"),
            apiUrl = "https://graph.facebook.com/v2.8/search?q=",
            access_token = "EAACEdEose0cBAIT54CqBZB17SPYHnZA0ZC6xRfHUNYnrJnlGsMqjI9DfFdhblVO8TDjGFh3hn5ZAS38cmfWmyk3ORUfSgSbAzxuZA55OFkIh5BPsblZBBGWbLxhcJs4oXGgpNLk0xd6pf1PGBV6CgWM19uqudmCiC6E9I9D8RU4IxfcZBO68bBYvwcFO36D0xWvQTzA2Kq5TQZDZD";

        if (searchField.value != "") {
            pagesContainer.innerHTML = "";
            apiUrl = apiUrl + searchField.value + "&type=page&limit=25&fields=id,name,about,category,company_overview,bio,engagement,picture,overall_star_rating&access_token=" + access_token;
            that.createAjaxRequest("GET", apiUrl, that.pageCallbackFunction);
        }
        else {
            pagesContainer.innerHTML = "<pre>\
                                        <h1>Oops...! You forgot to enter the page!!!</h1>\
                                        <h1>Please enter the page to be searched...</h1>\
                                    </pre>";
        }
    },
    /////////////*From FACEBOOK, Api URL and Access token search tool */////////////////////




    /////////////////*  Makes a div card to display the 5 results of the search query *///////////////////////////
    onClickCard: function (card) {
        window.open("http://facebook.com/" + card.getAttribute("pageid"), "_blank");
    },
    /** callback function for pageApi request **/
    pageCallbackFunction: function (event) {
        var that = this,
            pagesContainer = document.getElementById("pagesContainer"),
            xhrResponse = event.currentTarget,
            pictureURL, dom = "";

        if (xhrResponse.readyState == 4 && xhrResponse.status == 200) {
            // when document is read, do this
            var response = JSON.parse(xhrResponse.response).data,
                dom = "";
            //response from the api query if results found (note: values pulled are id,name,about,category,company_overview,bio,engagement,picture,overall_star_rating)
            if (response.length) {
                response.forEach(function (resultData) {
                    var card = "";
                    console.log(resultData);
                    card += "<div class='card' pageId=" + resultData.id + " onclick='pageSearchApp.onClickCard(this)'>";
                    card += "<img src='" + resultData.picture.data.url + "'>";
                    card += "<div class='card-body'>";
                    card += "<h4><b>" + resultData.name + "</b></h4>";
                    card += "<p>" + resultData.category + "</p>";
                    card += "<p>Likes: " + resultData.engagement.social_sentence + "</p>";
                    //console.log("People who Like this: " + resultData.engagement.count); 
                    card += "</div>";
                    card += "</div>";
                    dom += card;
                });
                pagesContainer.innerHTML = dom;
            }
            //if no response are found 
            else {
                pagesContainer.innerHTML = "<h1>No Results Found.</h1>";
            }
        }
    },
   /////////////////*Makes a div card to display the 5 results of the search query *///////////////////////////


   //////////////** An utility method for making Ajax calls **//////////////////////////
    createAjaxRequest: function (method, apiUrl, callbackFn) {
        var xhttp = new XMLHttpRequest(),
            that = this;

        xhttp.open(method, apiUrl, true);
        xhttp.send();
        xhttp.onreadystatechange = callbackFn.bind(that);
    },




};

