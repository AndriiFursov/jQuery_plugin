(function($) {
    $.fn.geoSelector = function(defaultCode) {

        var region         = $("<input>").attr("type", "text"),
            anchorsList    = $("<div>"),
            citiesList     = $("<div>");
            geoSelectorDiv = this;
        var regionCode = [];
        
        citiesList.addClass("cities");
        
        geoSelectorDiv.append(region);
        geoSelectorDiv.append(anchorsList);
        geoSelectorDiv.prepend(citiesList);

        
        region.on("input", function(){ 
            var i;

            anchorsList.html("");
            citiesList.html("");


            if (region.val()) {
                $.getJSON("http://evildevel.com/Test/Region", 
                "name=" + region.val(), function(data, status){
                    if (status === "success") {
                        for (i = 0; i < data.length; i++) {
                            var newAnchor = $("<a>");
                
                            newAnchor.html(data[i][0] + ' - ' + 
                                           data[i][1] + '<br>');
                            newAnchor.attr("href", "cities.html");
                            newAnchor.attr("title", "Список городов");
                            newAnchor.attr("data-code", data[i][0]);
                
                            anchorsList.append(newAnchor);
                
                
                            newAnchor.click(function () {
                                var i;
                
                                citiesList.html("");
                
                                $.getJSON("http://evildevel.com/Test/City", 
                                "region=" + $(this).attr("data-code"), 
                                function(data, status){
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
                                return false;
                            });
                        }
                    } else if (status === "error" ||
                               status === "timeout" ||
                               status === "parsererror" ) {
                        alert ("Ошибка обработки данных");
                    }
                });
            }
        });     


        if (defaultCode) {
            $.getJSON("http://evildevel.com/Test/City", 
            "region=" + defaultCode, 
            function(data, status){
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

        return this;
    };
})(jQuery);
