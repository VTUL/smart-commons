<snippet>
  <content><![CDATA[
# ${1:Project Name}
A nodejs package that monitors a series of sensors attached to a C.H.I.P. board and reports space usage to a database behind a REST API.
## Installation
To get the software up and running, connect to the C.H.I.P. via serial or ssh and run:
`cd`
`git clone https://git.it.vt.edu/bradley1/smart-commons.git`
`cd smart-commons`
`npm install`
`node index.js`
## Usage
TODO: add schematic
This project requires creating one of the Smart Commons modules and writing it to a C.H.I.P. controller. The schematic for this writing is provided below:
![alt text](url to image "Smart Commons Module Schematic")
## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request
## History
The Smart Commons started as a project in the Virginia Tech University Libraries. The aim is to add sensors to furniture around the spaces in order to collect anonymous usage data and ultimately improve user experience of the spaces.
## Credits
This project relies on the Johnny-Five and chipio repositories. 
## License
MIT
]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>