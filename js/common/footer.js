$('div.sm-toggle-list-btn').click(function (e) {

    if (document.documentElement.clientWidth < 768) {
        var $elToToggle = $(".sm-toggle-list", $(this).parent());

        if ($elToToggle.is(":hidden"))
            $elToToggle.slideDown();
        else {
            $elToToggle.slideUp();
            setTimeout(() => {
                $elToToggle.removeAttr('style');
            }, 500);
        }
    }
});



