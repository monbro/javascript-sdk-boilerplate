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
