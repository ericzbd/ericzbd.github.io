/*

 - Must provide either a category, tag, or custom taxonomy to display below the
 title (of course title of article is also required).
 - Must provide a point, ranking, or some type of total impressions for the
 respective article.
 - Must provide either a full version or a summary of the article for the pop up
 screen.

 __Feed rules:__

 - When the application first loads display the loading container (see below on
 instructions to toggle this). When you successfully retrieve information from
 the default API hide the loader and replace the content of the `#main`
 container with that of the API. The DOM structure of each article must adhere
 to the `.article` structure.
 - When the user selects an article's title show the `#popUp` overlay. The
 content of the article must be inserted in the `.container` class inside
 `#popUp`.
 ???????????????????????????????????????????????????????????????????
 Make sure you remove the `.loader` class when toggling the article
 information in the pop-up.
 ?????????????????????????????????????????????????????????????????????
 - Change the link of the "Read more from source" button to that of the
 respective article.
 - When the user selects a source from the dropdown menu on the header, replace
 the content of the page with articles from the newly selected source. Display
 the loading pop up when the user first selects the new source, and hide it on
 success.
 - Add an error message (either alert or a notification on the page) if the app
 cannot load from the selected feed.

 __Additional UI interaction rules:__

 - When the user clicks/taps the search icon, expand the input box. Best approach
 for this is to toggle the `.active` class for the `#search` container. If the
 search input box is already expanded tapping the search icon again will close
 the input. Pressing the "Enter" key should also close the opened input box.
 _See Bonus 2 for search filtering functionality._

 ????????????????????????????????????????????????????????????????????????????//
 - When the app is first loading and when the user selects to load a new feed
 from the dropdown, display the `#popUp` container with the `.loader` class.
 You can toggle the `.hidden` class from the container to display/hide the
 overlay container.
 ?????????????????????????????????????????????????????????????????????????????

 - Add functionality to hide the pop-up when user selects the "X" button on the
 pop-up.
 - Clicking/tapping the "Feedr" logo will display the main/default feed.

 */
$('.sources').on('click',function(e){
    e.preventDefault();
    getNewsSource();
});
var url = "https://newsapi.org/v1/articles?source=";
var apiKey = "378ebc5c29b44c15a26ba8be1c59f1bf";
var source;
var logoUrl;

//make the damn search bar visible
$(function() {
    $('header #search img').click(function() {
        // add class to the input field to make it visible
        $('header #search input').addClass("active");
    });
});

function getNewsSource() {

    $('.sources').click(function(e) {
        e.preventDefault();
        var target = $(e.target);
        if (target.is('#source1')) {
            source = "techcrunch";
            logoUrl = "https://nowfloats.com/Images/v2/accolades/Recognitions/Techcrunch-Logo.jpg";
            //hiding this section bc this source only has 3 articles
            $('#art4').hide();
        }else if (target.is('#source2')){
            source = "techradar";
            logoUrl = "https://upload.wikimedia.org/wikipedia/commons/7/77/TechRadar_logo.png";
            $('#art4').show();
        }
         else if (target.is('#source3')){
            source = "the-next-web";
            logoUrl = "http://investinholland.com/nfia_media/2016/02/the-next-web-logo.png";
            $('#art4').show();
        }
        //put the url together
        url += source + "&apiKey=" + apiKey;
    });//end click


    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            //add the logo for the current source
            $('#logo').attr('src', logoUrl);
            //hide section 4 on this one since this source always just has 3 headlines
            $.each(response.articles, function (i, item) {
                //   for (var i = 0; i < 5; i++) {
                var article = {
                    count: 0,
                    headline: item.title,
                    imageUrl: item.urlToImage, //WHY IS THIS WHITE???
                    description: item.description,
                    articleUrl: item.url
                };
                //replace pic with the one from the article
                $('#pic' + i).attr('src', article.imageUrl);
                var currentArticleIteration = $('#art' + i + ' h3');
                var currentImpressionIteration = $('#imp' + i);
                currentImpressionIteration.text(article.count);
                var currentImpressionCount = currentImpressionIteration.text();
                currentArticleIteration.css({
                    'color': 'blue',
                    'font-weight': 'bold',
                    'padding-top': '1.5em'
                });
                //increment the count for article clicks
                currentArticleIteration.onclick = function () {
                    currentImpressionCount++;
                    currentImpressionIteration.text(currentImpressionCount);
                };
                //post a headline to each #headline section
                currentArticleIteration.html(article.headline);
                //get the damn popup to work
                $('.popUpAction').attr('href', article.url);
                //get the number of clicks to increment
                currentArticleIteration.on('click', function (e) {
                    article.count++;
                    currentImpressionIteration.text(article.count);
                    e.preventDefault();
                    var popupHeadline = $('.container:nth-child(2) h1');
                    var popupDescription = $('.container:nth-child(2) p');
                    popupHeadline.text(article.headline);
                    popupDescription.text(article.description);
                });//end onclick popup


            });//end .each

        }//end success
    });//end .ajax
}//end getNewsSource

/*
            var logoUrl = "https://nowfloats.com/Images/v2/accolades/Recognitions/Techcrunch-Logo.jpg";
            //add the logo for the current source
            $('#logo').attr('src', logoUrl);
            var url = "https://newsapi.org/v1/articles?source=";
            var source = "techcrunch";
            var apiKey = "378ebc5c29b44c15a26ba8be1c59f1bf";
            url += source + "&apiKey=" + apiKey;
            //hide section 4 on this one since this source always just has 3 headlines
            $('#art4').hide();

            $.each(response.articles, function(i, item){

                //   for (var i = 0; i < 5; i++) {
                var article = {
                    count : 0,
                    headline : item.title,
                    imageUrl : item.urlToImage, //WHY IS THIS WHITE???
                    description : item.description,
                    articleUrl : item.url
                };
                //replace pic with the one from the article
                $('#pic'+i).attr('src', article.imageUrl);

               var currentArticleIteration = $('#art'+i+ ' h3');
               var currentImpressionIteration = $('#imp'+i);
               currentImpressionIteration.text(article.count);
               var currentImpressionCount = currentImpressionIteration.text();

                currentArticleIteration.css({
                    'color': 'blue',
                    'font-weight':'bold',
                    'padding-top':'1.5em'
                });
//                    IMPRESSION COUNTER ATTEMPTS - WHY DON'T THEY WORK??
/*
                currentArticleIteration.addEventListener('click', function (e) {
                    e.preventDefault();
                    currentImpressionIteration.text(currentImpressionCount++);
                });

                currentArticleIteration.onclick = function(){
                    currentImpressionCount++;
                    currentImpressionIteration.text(currentImpressionCount);
                };

                //post a headline to each #headline section
                currentArticleIteration.html(article.headline);
                //get the damn popup to work
                $('.popUpAction').attr('href', article.url);
                currentArticleIteration.on('click', function(e){
                    article.count++;
                    currentImpressionIteration.text(article.count);
                    e.preventDefault();
                    var popupHeadline=$('.container:nth-child(2) h1');
                    var popupDescription=$('.container:nth-child(2) p');
                    popupHeadline.text(article.headline);
                    popupDescription.text(article.description);
                });


            });
        }
    });
}
*/
