$('header .menu-open-btn').parent().click(function (e) {
    var $dialog = $("#menu");
    $dialog.removeClass("d-none");


    setTimeout(() => {
        $dialog.removeClass("hidden");
    }, 10)

    let $selectedSubCatalogList = $('#menu .catalog-list-toggle-header.selected')

    var $elToToggle = $(".sub-toggle-catalog-list-wrapper", $($selectedSubCatalogList));
    var $arrow = $('.fa', $('.header', $selectedSubCatalogList));

    if ($elToToggle.is(":hidden")) {
        $elToToggle.slideDown();
        $arrow.toggleClass('toggled');
    }
});

$('#menu li.m-menu-button').click(function (e) {

    var $dialog = $("#menu");
    $dialog.addClass("hidden");

    setTimeout(() => {
        $dialog.addClass("d-none");
    }, 300)
});

$('#menu .blur-bg').click(function (e) {
    if (e.target = this) {
        var $dialog = $("#menu");
        $dialog.addClass("hidden");

        setTimeout(() => {
            $dialog.addClass("d-none");
        }, 300)
    }
});


$('#menu .catalog-list-toggle-header > .header').click(function (e) {
    var $prevSelectedLi = $('#menu ul.nav-vertical-list li.selected');
    var $elToClose = $(".sub-toggle-catalog-list-wrapper",
        $prevSelectedLi);
    var $arrowToClose = $('.fa', $('.header', $prevSelectedLi));

    if (!$elToClose.is(":hidden")) {
        $elToClose.slideUp();
        $arrowToClose.toggleClass('toggled');
        $prevSelectedLi.removeClass('selected');
    }
    var $elToToggle = $(".sub-toggle-catalog-list-wrapper", $(this).parent());
    var $arrowToToggle = $('.fa', this);

    if ($elToClose[0] != $elToToggle[0]) {
        if ($elToToggle.is(":hidden")) {
            $elToToggle.slideDown();
            $arrowToToggle.toggleClass('toggled');
        }
        else {
            $elToToggle.slideUp();
            $arrowToToggle.toggleClass('toggled');
        }

        $(this).parent().addClass('selected');
    }
});

$('#menu .language-opt-wrapper .language-opt').click(function (e) {
    $(this).addClass('selected');
    $(this).siblings('.language-opt').removeClass('selected');
});


