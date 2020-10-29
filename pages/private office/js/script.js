$('#nav_panel>li').on('click', function () {
    $(this).siblings('li.selected').removeClass('selected');
    $(this).addClass('selected');
    hideSections();
});


function hideSections() {
    let $sections = $('.r_section');
    $sections.removeClass('show');
    $sections.hide();
}

$('#wishedBtn').on('click', function () {
    $('#s_wished').addClass('show');
    $('#s_wished').fadeIn();
});

$('#ordersBtn').on('click', function () {
    $('#s_orders').addClass('show');
    $('#s_orders').fadeIn();
});

$('#dataBtn').on('click', function () {
    $('#s_data').addClass('show');
    $('#s_data').fadeIn();
});

$('#compareBtn').off('click');

$('btn_to_card').click(function (e) {
    e.stopPropagation();
    return false;
});

$('.r_section ul.product_orders>li ').click(function () {
    let $consist = $('ul.product_rows', this);

    if ($consist.is(':hidden')) {
        $(this).addClass('selected');
        $consist.slideDown();
    }
    else {
        $(this).removeClass('selected');
        $consist.slideUp();
    }
});

$('.r_section ul.product_orders>li .products ').click(function (e) {
    e.stopPropagation();
    return false;
});

$('.r_section ul.product_orders>li').each(function () {
    let $list = $('ul.cards', this);
    let $lis = $('>li', $list)
    let len = $lis.length;


    if (len - 5 >= 1) {
        $list.attr('data-count', '+' + (len - 5));
        for (let i = 5; i < len; i++) {
            $($lis[i]).remove();
        }
    }
    else {
        $list.addClass('hideAfter');
        $list.removeAttr('data-count');
    }
});

