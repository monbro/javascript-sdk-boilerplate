/*
*  This boilerplate javascript sdk is a collection of methods designed to make working with
*  an Api as easy as possible.
*
*  Learn more at https://github.com/monbro/javascript-sdk-boilerplate
*
*  @author Michael Klein (klein@monbro.de)
*/

/**
 * The browser console
 *
 * @property console
 * @private
 * @type object
 */
window.console = window.console || {};
window.console.log = this.console.log || function() {};

/**
 * expose our sdk
 */
(function(root) {
  root.WikiSampleSDK = root.WikiSampleSDK || {};
  root.WikiSampleSDK.VERSION = "js1.0.0";
}(this));

/**
 * main sdk
 */
(function(root) {

    root.WikiSampleSDK = root.WikiSampleSDK || {};

    /**
    * Contains all WikiSampleSDK API classes and functions.
    * @name WikiSampleSDK
    * @namespace
    *
    * Contains all WikiSampleSDK API classes and functions.
    */
    var WikiSampleSDK = root.WikiSampleSDK;

    // If jQuery has been included, grab a reference to it.
    if (typeof(root.$) !== "undefined") {
        WikiSampleSDK.$ = root.$;
    }

    // Set the server for WikiSampleSDK to talk to.
    WikiSampleSDK.serverURL = "https://en.wikipedia.org";

    /**
     * Call this method first to set your authentication key.
     * @param {String} API Token
     */
    WikiSampleSDK.Initialize = function(apiToken) {
        WikiSampleSDK._initialize(apiToken);
    };

    /**
     * Get data according to a wikipedia page.
     * @param {string} title of a wikipedia page like 'Cheese'
     */
    WikiSampleSDK.GetPage = function(title) {
      WikiSampleSDK._requestSample(title, function(data) {
        var rawtext = data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]["*"];
        var upperCaseTest = WikiSampleSDK.WikiTextHelper._upperCase(rawtext);

        WikiSampleSDK.$( "body" ).append( '<p>'+title+':</p>' );
        WikiSampleSDK.$( "body" ).append( '<p>'+rawtext.substring(0, 250)+'</p>' );
        WikiSampleSDK.$( "body" ).append( '<p>'+upperCaseTest.substring(0, 250)+'</p>' );
      });
    };

    /**
     * This method is for WikiSampleSDK's own private use.
     * @param {String} API Token
     */
    WikiSampleSDK._initialize = function(apiToken) {
        WikiSampleSDK.apiToken = apiToken;
    };

    /**
     * sample request to our api server
     * @param  {string} title
     * @param  {function} successCallback
     */
    WikiSampleSDK._requestSample = function(title, successCallback) {

        var url = WikiSampleSDK.serverURL+
                  "/w/api.php?rvprop=content&format=json&prop=revisions|categories&rvprop=content&action=query&titles="+
                  encodeURI(title)+
                  "&token="+
                  encodeURI(WikiSampleSDK.apiToken);

        var jqxhr =
          WikiSampleSDK.$.ajax({
              url: url,
              dataType: 'jsonp',
              type: 'GET'
          })
          .success (function(result) {
              successCallback(result);
          })
          .error   (function()     {
              console.log('Http request failed');
              // throw eror here
          })
          ;
    };

}(this));

/*
*  This boilerplate javascript sdk is a collection of methods designed to make working with
*  an Api as easy as possible.
*
*  Learn more at https://github.com/monbro/javascript-sdk-boilerplate
*
*  @author Michael Klein (klein@monbro.de)
*/

/**
 * sdk text helper class
 */
(function(root) {
    root.WikiSampleSDK = root.WikiSampleSDK || {};
    var WikiSampleSDK = root.WikiSampleSDK;

    /**
     * @namespace Provides an interface to WikiSampleSDK's wiki text processing helper.
     */
    WikiSampleSDK.WikiTextHelper = WikiSampleSDK.WikiTextHelper || {};

    WikiSampleSDK.WikiTextHelper._upperCase = function(content) {
        return content.toUpperCase();
    };
}(this));
