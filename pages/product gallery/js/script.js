$('aside .filters ul.inputs_wrapper>li .close_btn').click(function () {
    let $li = $($(this).closest('li'));
    $li.toggleClass('toggled');
    let $body = $('>.body', $li);

    if ($body.is(":hidden")) {
        $body.slideDown();
    } else {
        $body.slideUp();
    }
});

$(document).ready(function () {
    $('aside .filters ul.inputs_wrapper>li.price .close_btn')[0].click();
});


/* Попап для цены */
let $pricePop = $('aside .popup_wrapper .popup.price');

$('aside .filters .price_wrapper').on('mouseover', function () {
    $pricePop.fadeIn();
});

$('aside').on('mouseleave', function () {
    $pricePop.fadeOut();
});

$('aside .filters .price_wrapper').on('mousemove', function () {
    let pos = $(this).position();
    $pricePop.css('top', pos.top + parseFloat($pricePop.css('height')) / 2 - 24);
});


$(document).on('scroll', function () {
    let board = $('.pagination')[0].offsetTop;

    if (window.scrollY + window.innerHeight >= board)
        $('aside').css('bottom', window.scrollY + window.innerHeight - board);
    else
        $('aside').css('bottom', '');

    if (window.scrollY > 100)
        $('aside').css('marginTop', -100);
    else
        $('aside').css('marginTop', -24);

});


