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

//////////////////*Initialize SDK for Facebook *////////////////////////
window.fbAsyncInit = function() {
  FB.init({
    appId: '1968644966792089',
    page_token: 'kittiesonfleek',
    cookie: true,
    xfbml: true,
    version: 'v2.11'
  });

  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;

        console.log(accessToken);

        // gets access token for page

        FB.api(
          'GET', {
            "fields": "https://graph.facebook.com/kittiesonfleek?fields=access_token"

          },
          function(reponse) {
            console.log(response);
            console.log(response.authResponse.accessToken)
            // sets access token as variable
            var pageToken = response.authResponse.accessToken;

            FB.api(
              '/kittiesonfleek',
              'GET', {
                "fields": "fan_count,page_token,insights.metric(page_impressions)",
                "access_token": "EAAbZBeNZCvO5kBAH7UdgreybMufrjRvW7tbEOf9ZBMTTpvTPfeOKGzLhCMtNH58Eb25GCSFDoolCTLrUl3zZAPGpMDZBqchpAzLHZCm7Td0vbBRZBtk1fvFqtRECqcyhhG0N8w3ey7DMQvZA1c6UkdLJPF33G4YO4mLb6xFjDetAiUKQ6fklhoC2ZAbUIes7pyJYZD"
              },
              function(response) {
                console.log(response);
              });

          }
        )

    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app
    } else {
      // the user isn't logged in to Facebook.
      FB.login(function(response) {
        console.log(response);
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log('Good to see you, ' + response.name + '.');
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, {
        scope: 'email,user_likes, manage_pages, publish_pages, account_linking_token',
        return_scopes: true
      });
    }
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// Only works after `FB.init` is called
function myFacebookLogin() {
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  });
};
