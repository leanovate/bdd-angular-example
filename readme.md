Requirements
------------
You need node.js and some global packages. Assuming, node.js is in place:

    sudo npm install -g grunt-cli yo bower

What I did in the working directory to prepare everything:

    npm install generator-cc-angular
    yo cc-angular
    ./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
    npm install todomvc-common todomvc-app-css

