$('.quantity_num').on('change, paste, mouseup, keyup', updatePrice);
$('.quantity_block .btn').on('click', updatePrice);

function updatePrice() {
    let $card = $(this).closest('.card');
    let $quantity_num = $('.quantity_num', $card);

    setTimeout(function () {
        let price = $('.price', $card).text().trim();
        price = price.replace(',', '.').replace(' ', '');
        price = parseFloat(price);

        let $sum = $('.sum', $card);

        price = price * $quantity_num.val();
        price = price.toFixed(1);

        price = (price + ' ' + $sum.attr('data-currency')).replace('.', ',');

        $sum.text(price);
    }, 40);
}

