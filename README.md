javascript-sdk-boilerplate [![Build Status](https://travis-ci.org/monbro/javascript-sdk-boilerplate.svg?branch=master)](https://travis-ci.org/monbro/javascript-sdk-boilerplate)
===========================

A boilerplate code template for creating a generic javascript sdk. Check out the [demo](https://rawgit.com/monbro/javascript-sdk-boilerplate/master/example/example1.html).

### 1. Installation

You will need to have [nodejs](http://nodejs.org/download) isntalled.

Clone the repository or download the [zip](https://github.com/monbro/javascript-sdk-boilerplate/archive/master.zip).
Or you can use the existing [yeoman generator](https://www.npmjs.org/package/generator-javascript-sdk-boilerplate):

* ```npm install -g generator-javascript-sdk-boilerplate```
* ```yo javascript-sdk-boilerplate```

### 2. Getting started

* open the command line and switch into the project folder
* ```npm install```
* ```sudo npm install -g gulp```
* ```gulp``` to see the list of available tasks

### 3. Essential Gulp Tasks

* ```gulp build``` dumps a plain and a minified file from all files in the folder ```src``` into the folder ```dist```.
* ```gulp clean``` removes all files in the folder ```dist```.
* ```gulp test``` runs the tests and linting for all files in the folder ```src```.
* ```gulp bump-patch``` increases the version by ```0.0.1``` for the last git commit and pushes the new tag to the remote repository.
* ```gulp bump-minor``` increases the version by ```0.1.0``` for the last git commit and pushes the new tag to the remote repository.
* ```gulp bump-major``` increases the version by ```1.0.0``` for the last git commit and pushes the new tag to the remote repository.

## Web References

### Tutorials to build a SDK

* http://msdn.microsoft.com/en-us/library/jj820239.aspx

### How others do it:

* https://github.com/apigee/apigee-javascript-sdk/blob/master/apigee.js
* https://github.com/stackmob/stackmob-js-sdk/blob/master/stackmob.js
* https://github.com/gilt/gilt-js-sdk/blob/master/gilt-js-api.js
* https://github.com/BuddyPlatform/Buddy-JS-SDK/blob/master/buddy.js
* https://github.com/EdmundsAPI/sdk-javascript/blob/master/edmunds.api.sdk.js
* https://github.com/justintv/twitch-js-sdk/blob/master/twitch.js
* https://github.com/aws/aws-sdk-js/blob/master/dist/aws-sdk.js
* https://github.com/Instagram/instagram-javascript-sdk/blob/master/ig.js
* https://github.com/splunk/splunk-sdk-javascript/blob/master/client/splunk.js

### Final usage examples

* https://keen.io/docs/clients/javascript/usage-guide/ with https://dc8na2hxrj29i.cloudfront.net/code/keen-2.1.0-min.js
* https://developers.facebook.com/docs/javascript/quickstart/v2.0 with https://connect.facebook.net/en_US/sdk.js
* https://parse.com/docs/js_guide with www.parsecdn.com/js/parse-1.2.18.min.js

### Helpful sites

* http://blog.ponyfoo.com/2014/01/27/my-first-gulp-adventure
* http://regex101.com/
