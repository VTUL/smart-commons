# Smart Commons
A nodejs package that monitors a series of sensors attached to a C.H.I.P. board and reports space usage to a database behind a REST API.

## Installation
To get the software up and running, connect to the C.H.I.P. via serial or ssh and run:

`cd`

`git clone https://github.com/VTUL/smart-commons.git`

`cd smart-commons`

`cp config.js.example config.js`

`nano config.js`

Change the values in the config.js file to match those for your project. You'll need urls where your database API is located and an API key (if you're using one); region name, a uuid, and major identifiers for your beacons; and a name for that module. 

`npm install`

`sudo node index.js`

## Usage

This project requires creating one of the Smart Commons modules and connecting it to a C.H.I.P. controller. The wiring schematic for the module is provided below:

![module schematic](https://github.com/VTUL/smart-commons/raw/master/schematics/smart-commons-V1.1.png "Smart Commons Module Schematic")

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History
The Smart Commons started as a project in the Virginia Tech University Libraries. The aim is to add sensors to furniture around the spaces in order to collect anonymous usage data and ultimately improve user experience of the spaces.

## Credits
This project relies on the [Johnny-Five](http://johnny-five.io/) and [chip-io](https://github.com/sandeepmistry/node-chip-io) repositories.

## License
MIT
