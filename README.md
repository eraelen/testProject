testProject
===========
The project was built using yeoman.io.

###Installation
* Note: This should be run through a shell that has the git command.
* Install Ruby: `sudo apt-get install ruby` for Ubuntu and http://rubyinstaller.org/ for Windows
* Install Compass: `gem update --system && gem install compass`
* Clone this git repo to your local git directory
* Globally install yo/grunt/bower: `npm install -g yo grunt-cli bower` 
* Install node_modules: `npm install`
* Install bower_components: `bower install`

### To Run Normally
* Souce the .sh file to locate additional libraries:
`source cms.sh`
* Run app.js with node:
`node app` 
* Open browser, Chrome recommended, and go to localhost:3000/

### File Structure
* app/ - directory for client-side
  * app.js - simple node server to serve the app (once index.html is served, Angular effectively takes over)
  * index.html - core html file where Angular is called, all the .js files are referenced, and where html views are injected into `<div ng-view>` (this is done by Angular)
  * bower_components/ - bower component directory
  * scripts/
      * app.js - Angular app file. This declares the links between controllers and views, declares Angular modules being used, as well as routing within the app
      * controllers/ - This includes the controller scripts for each view
          * mainCtrl.js - manages the main view which has the description of the features of the app
          * listCustomers.js - manages the view for listing, deleting and updating (uses modal) customers
          * addCustomer.js - manages the view for adding customers
      * services/ - This directory holds the services
          * CustomerService.js - main model for the app
  * styles/ - CSS files (but mostly uses Bootstrap3 and Angular-UI for styles)
  * views/ - This includes the html views that are injected in index.html
      * main.html - view for the splash page
      * listCustomers.html - view for listing, deleting and updating (uses modal) customers
      * addCustomer.html - view for adding customers (mostly form)
* server/ - directory for server-side
  * lib - contains additional class libraries 
  * routes - contains api for client-server communication
* out/ - JSDoc for server class libraries and README.md
* customers/ - pseudo "database" directory; contains all the customer .json files
  * Customer records are saved in individual .json files with the format customerN.json wherein N is a unique ID associated to the customer
