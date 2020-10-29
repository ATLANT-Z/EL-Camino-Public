$('.left .user_nav .new').click(function () {
    $('.left.old_user').hide();
    $('.left.new_user').fadeIn();
});

$('.left .user_nav .old').click(function () {
    $('.left.new_user').hide();
    $('.left.old_user').fadeIn();
});

$('.left .step:first-child').addClass('selected');

$('.left .step .footer.next .btn_my').click(function () {
    $(this).closest('.footer.next').slideUp();

    let $tStep = $(this).closest('.step');
    $tStep.removeClass('selected');

    $tStep.next().slideDown();
    $tStep.next().addClass('selected');
});