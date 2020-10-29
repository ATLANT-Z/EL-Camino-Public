

$('.pay_btn').click(function() {

    /* ЛОГИКА ОПЛАТЫ */

    /* В СЛУЧАЕ УСПЕХА */
    $(this).hide();
    $('.title.main').slideUp();
    $('.title.main.success').slideDown();
});