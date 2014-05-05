(function () {
    "use strict";

    describe("WikiSampleSDK", function () {
        it("sanity check", function () {
            expect(true).toBe(true);
        });

        it("should expose the sdk", function () {
            expect( WikiSampleSDK ).toBeDefined();
            expect( WikiSampleSDK.WikiTextHelper ).toBeDefined();
        });

        it("should have a method called GetPage", function () {
            expect( WikiSampleSDK.GetPage ).toBeDefined();
        });

        it("should call the requestSample method when getting a page", function () {
            spyOn(WikiSampleSDK, '_requestSample');
            WikiSampleSDK.GetPage('Cheese');
            expect(WikiSampleSDK._requestSample.calls.length).toEqual(1);
        });
    });

    describe("WikiSampleSDK.WikiTextHelper", function () {
        it("should convert a given text to upper case", function () {
            var upperCase = WikiSampleSDK.WikiTextHelper._upperCase('some text I got');
            expect(upperCase).toBe('SOME TEXT I GOT');
        });
    });

})();
