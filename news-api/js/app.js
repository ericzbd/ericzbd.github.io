getNewsSource();
var url = "https://newsapi.org/v1/articles?source=";
var apiKey = "PASTE_YOUR_API_KEY_HERE";
var source;
var logoUrl;

//make the damn search bar visible
$(function() {
    $('#magGlass').click(function(e) {
        // add class to the input field to make it visible
        //toggle the `.active` class for the `#search` container
        e.preventDefault();
        $('#search input').css({'visibility' :'visible',
                                'width' : '500px'
        });
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
        $.ajax({
            //put the url together
                url: url + source + "&apiKey=" + apiKey,
                method: 'GET',
                success: function (response) {
                    try{
                        //add the logo for the current source
                    $('#logo').attr('src', logoUrl);
                    //hide section 4 on this one since this source always just has 3 headlines
                    $.each(response.articles, function (i, item) {
                        //   for (var i = 0; i < 5; i++) {
                        var article = {
                            count: 0,
                            headline: item.title,
                            imageUrl: item.urlToImage,
                            description: item.description,
                            articleUrl: item.url
                        };
                        //replace pic with the one from the article
                        $('#pic' + i).attr('src', article.imageUrl);
                        var $currentArticleIterationID = $('#art' + i + ' h3');
                        var $currentImpressionIterationID = $('#imp' + i);
                        //paste the current iteration into the counter
                        $currentImpressionIterationID.text(article.count);
                        //get the text you just pasted and store it in a variable
                        var $currentImpressionCount = $currentImpressionIterationID.text();
                        $currentArticleIterationID.css({
                            'color': 'blue',
                            'font-weight': 'bold',
                            'padding-top': '.8em'
                        });
                        //increment the count for article clicks
                        $currentArticleIterationID.onclick = function () {
                            $currentImpressionCount++;

                            $currentImpressionIterationID.text($currentImpressionCount);
                        };
                        //post a headline to each #headline section
                        $currentArticleIterationID.html(article.headline);
                        //post the subheadlines/descriptions underneath
                        var $subHeadline = $('#art' + i + ' h6');
                        $subHeadline.text(article.description);

                        //change link to the articleUrl
                        $('.popUpAction').attr('href', article.articleUrl);

                        //click logo to refresh page

/*                      ???????????????????????????????????? WHY IS THIS NOT WORKING ?????????????????????????????????

                        $logo = $('.container:nth-child(3) img');
                        $logo.onclick(function(){
                            location.reload();
                        });
                        ???????????????????????????????????? WHY IS THIS NOT WORKING ?????????????????????????????????

 */
                        //get the number of clicks to increment
                        $currentArticleIterationID.on('click', function (e) {
                            article.count++;
                            $currentImpressionIterationID.text(article.count);
                            e.preventDefault();
                            var $popupHeadline = $('.container:nth-child(2) h1');
                            var $popupDescription = $('.container:nth-child(2) p');
                            $popupHeadline.text(article.headline);
                            $popupDescription.text(article.description);

                        });//end onclick popup
                    });//end .each
                    } catch (e){
                        alert('Your news source is foiled/hogtied')
                    }
                }//end success

        });//end .ajax
    });//end sources click
}//end getNewsSource

