

$('.info_block .content .q_block>.body ul>li .q_btn').click(function () {
    let $li = $(this).closest('li');
    
    let $elToToggle = $('.text_wrapper', $li);

    if ($elToToggle.is(":hidden")) {
        $elToToggle.slideDown();
        $($li).addClass('selected');
    }
    else {
        $elToToggle.slideUp();
        $($li).removeClass('selected');
    }
});