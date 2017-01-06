(function($) {
    $.fn.geoSelector = function(defaultCode) {
        // initialization of variables and functions
        var region         = $("<input>").attr("type", "text"),
            anchorsList    = $("<div>"),
            citiesList     = $("<div>").addClass("cities");
        
        this.append(region);
        this.append(anchorsList);
        this.prepend(citiesList);
        
        
        function serverRequest(address, parameter, callback) {
            // AJAX request
            $.getJSON(address, parameter, function(data, status){
                switch (status) {
                    case "success":
                        callback(data);
                        break;
                    case "error":
                    case "timeout": 
                    case "parsererror":
                        alert ("Ошибка обработки данных");
                        break;
                }
            });
        }
        
        function getCitiesList (sentData) {
            /* create a list of cities
               var:
                   sentData - string with a parameter for a GET request
                   cities   - array of the cities of the asked region
            */
            serverRequest("http://evildevel.com/Test/City", sentData, 
            function(cities) {    
                /* callback function
                   var: 
                       cities - array of cities which was got from a server
                */
                for (var i = 0, l = cities.length; i < l; i++) {
                    citiesList.append(cities[i][1] + 
                                      '<br>');
                }
            });
        }
        
        function createCitiesList (regionCode) {
            // create closure function width code of region in the scope
            return function () {
                citiesList.html("");    // clear div with list of cities
                getCitiesList ("region=" + regionCode);
                return false;
            };
        }
        
        
        // body
        region.on("input", function(){ 
            anchorsList.html("");    // clear div with list of found regions
            citiesList.html("");     // clear div with list of cities


            if (region.val()) {
                serverRequest("http://evildevel.com/Test/Region", "name=" + 
                region.val(), function(regions) {    
                    /* callback function
                       var: 
                           regions - array of regions which was got from a server
                    */
                    for (var i = 0, l = regions.length; i < l; i++) {
                        var newAnchor = $("<a>");
                
                        newAnchor
                        .html(regions[i][0] + ' - ' + regions[i][1] + '<br>')
                        .attr({
                            "href": "#",
                            "title": "Список городов"
                        })
                        .click(createCitiesList(regions[i][0]));
                
                        anchorsList.append(newAnchor);
                    }
                });
            }
        });     


        if (defaultCode) { getCitiesList ("region=" + defaultCode); }
        

        return this;
    };
})(jQuery);
