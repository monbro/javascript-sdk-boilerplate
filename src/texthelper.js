/**
 * sdk text helper
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
