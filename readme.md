Requirements
------------
You need node.js and some global packages. Assuming, node.js is in place:

    sudo npm install -g grunt-cli yo bower

Command playlist
----------------
What I did in the working directory to prepare everything:

    npm install generator-cc-angular
    yo cc-angular
    ./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update
    npm install todomvc-common todomvc-app-css

Now generate the todos module and a partial for the route

    yo cc-angular:module todos
    yo cc-angular:partial todos




