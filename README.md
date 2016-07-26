jQuery plugin
==========
jQuery plugin for region/city selection. Using AJAX for data exchange with server.

The task was:
-------------
It was necessary to write a plugin for jQuery to select the region and display a list of the cities in the selected region. The plugin should be applied to the div element and generate therein input [type = text] to enter the name of the region. When you enter the name of the region, requests have to be sent to the API, which returns a list of the regions found. This list have to be displayed as links on the page. Clicking the link name of the region a request have to be sent for another API that returns a list of the cities in the selected region. The resulting list of cities must be displayed on the page as plain text. When you change the values ​​in the "Region" field the list of found regions have to be updated, and a list of towns have to be cleaned. List of regions and cities have to be cleared if you do not put the name of the region. When starting the plugin initialization can be transferred to the region ID for which you want to load the API list of cities and put them on the page in the appropriate box. In case an empty initialization (if the region ID is not transmitted), a list of cities will be empty. After initialization logic must work as described above. 

License
-------
This software licensed under the [MIT license] (https://opensource.org/licenses/MIT).

content:
-------
#### script file:
* geo-selector.js

#### HTML file:
* geo-selector.html
