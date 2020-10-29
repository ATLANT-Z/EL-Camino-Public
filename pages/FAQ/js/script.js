$('.info_block .content>.q_block>.body ul>li').click(function () {

    let $elToToggle = $('.text_wrapper', this);

    if ($elToToggle.is(":hidden")) {
        $elToToggle.slideDown();
        $(this).addClass('selected');
    }
    else {
        $elToToggle.slideUp();
        $(this).removeClass('selected');
    }
});