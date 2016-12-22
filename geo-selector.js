(function($) {
    $.fn.geoSelector = function(defaultCode) {
        var region         = $("<input>").attr("type", "text"),
            anchorsList    = $("<div>"),
            citiesList     = $("<div>").addClass("cities");
        
        this.append(region);
        this.append(anchorsList);
        this.prepend(citiesList);

        
        function getData (sendedData) {
            // create a list of cities
            $.getJSON("http://evildevel.com/Test/City", 
            sendedData, function(data, status){
                var i;
                
                if (status === "success") {
                    for (i = 0; i < data.length; i++) {
                        citiesList.append(data[i][1] + 
                                          '<br>');
                    }
                } else if (status === "error" ||
                           status === "timeout" ||
                           status === "parsererror" ) {
                    alert ("Ошибка обработки данных");
                }
            });
        }
        
        function functionFactory (regionCode) {
            // create closure function width code of region in the scope
            return function () {
                citiesList.html("");
                getData ("region=" + regionCode);
                return false;
            };
        }
        
        
        region.on("input", function(){ 
            anchorsList.html("");
            citiesList.html("");


            if (region.val()) {
                $.getJSON("http://evildevel.com/Test/Region", 
                "name=" + region.val(), function (data, status) {
                    var i;
                    
                    if (status === "success") {
                        for (i = 0; i < data.length; i++) {
                            var newAnchor = $("<a>");
                
                            newAnchor
                            .html(data[i][0] + ' - ' + data[i][1] + '<br>')
                            .attr({
                                "href": "#",
                                "title": "Список городов"
                            })
                            .click(functionFactory(data[i][0]));
                
                            anchorsList.append(newAnchor);
                        }
                    } else if (status === "error" ||
                               status === "timeout" ||
                               status === "parsererror" ) {
                        alert ("Ошибка обработки данных");
                    }
                });
            }
        });     


        if (defaultCode) { getData ("region=" + defaultCode); }
        

        return this;
    };
})(jQuery);
