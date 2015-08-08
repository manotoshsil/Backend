$(function () {
    $('.navbar-toggle-sidebar').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);
    });

    $('#search-trigger').click(function () {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');
        $('.search-input').focus();
    });

    $('#add-question').click(
        function () {
            $('#myModal').css('display', 'block');
        }
    );
    $('#add-page').click(
        function () {
            $('#myModal1').css('display', 'block');
        }
    );

    $('button#save-page').click(function (e) {

        e.preventDefault();
        $.post('page/create', {
            pageName: $('input#page-name').val(),
            pageOrder: $('input#page-order').val()
        }, function (result) {
            console.log(result);
        });
    });

    $('button#save-question').click(function (e) {
        e.preventDefault();
        $.post('Question/create', {
            pageId: $('span#selected-pageid').data('pageid'),
            questionText: $('input#question-text').val(),
            questionType: $("input[name='questiontype']:checked").val()
        }, function (result) {
            $.each(result, function (item, index) {

                $('#indiv-questions').append('<li><a href="#">' + index.questionText + '</a></li>');
            });

        });
    });

    $('ul#indiv-pages a').click(function (el) {
        $('#indiv-questions').empty();
        var selectedPageId = $(this).data("pageid");
        var questionPanel = $('span#selected-pageid');
        $(questionPanel).text($(this).text());
        $(questionPanel).attr('data-pageid', selectedPageId);
        $('#page-detail-panel').removeClass('hidden');

        $.getJSON('questions/get', {
                pageId: selectedPageId
            },
            function (result) {
                $.each(result, function (item, index) {
                    var rowCount = 0,
                        rowClass = "";
                    if ((rowCount % 2) === 0)
                        rowClass = "info"
                    else
                        rowClass = "danger"

                    $('#indiv-questions').append('<tr class=' + rowClass + '><td class="hidden">' + item.id + '</td><td>' + index.questionText + '</td><td>' + index.questionType + '</td><td><a href="#">Delete</a></td></tr>');
                    rowCount++;
                });
            });
    });

});