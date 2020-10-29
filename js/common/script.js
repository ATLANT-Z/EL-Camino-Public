$('.img_svg img').each(function () {
    var $img = $(this);
    var $parent = $(this).parent();
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    $.get(imgURL, function (data) {
        var $svg = $(data).find('svg');

        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        $svg = $svg.removeAttr('xmlns:a');

        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {

            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);

        var color = $parent.css('color');
        $('path', $svg).css('fill', color);

    }, 'xml');
});

$('#slide-to-top-btn').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}


$('.popup').fadeOut(400, 'linear', function () {
    $('.popup').css('visibility', 'visible');
});

$('.popup_btn').on('click', function (e) {
    $('.popup').fadeOut();
    let $popup = $('.popup', this);

    if ($popup.is(":hidden"))
        $popup.fadeIn(400, 'linear');

    $('li.popup_btn.selected').removeClass('selected');
    if ($(this).is('li'))
        $(this).addClass('selected');

    e.preventDefault();
    e.stopPropagation();
});

$('.popup').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

$('.popup .close_popup_btn').on('click', function (e) {
    let $popBtn = $(this).closest('.popup_btn');
    if ($popBtn != 0)
        if ($popBtn.is('li'))
            $popBtn.removeClass('selected');

    $(this).closest('.popup').fadeOut();

    e.preventDefault();
    e.stopPropagation();
});

$('body').on('click', function (e) {
    if ($(e.target).parents('.popup_btn').length == 0) {
        let $popBtn = $('.popup_btn');

        for (let i = 0; i < $popBtn.length; i++) {
            let $el = $($popBtn[i]);

            let $popup = $('.popup', $popBtn[i]);

            if ($el.length != 0)
                if ($el.is('li'))
                    $el.removeClass('selected');

            if ($popup.is(":visible"))
                $popup.fadeOut();
        }
    }
});


$(document).ready(function () {
    var phones = [{ "mask": "+## (###) ###-##-##" }];
    $('input[type="tel"]').inputmask({
        mask: phones,
        greedy: false,
        definitions: { '#': { validator: "[0-9]", cardinality: 1 } }
    });
});

$('.ui_select>.view').click(function () {
    let $sel = $(this).closest('.ui_select');
    $sel.toggleClass('toggled');
});


$('.ui_select ul.options>li').click(function () {
    let $sel = $(this).closest('.ui_select');

    $('.view input.view_input', $sel).val(
        $(this).text().trim()
    );
    $('.view .text.view_input', $sel).text(
        $(this).text().trim()
    );
    $sel.removeClass('toggled');
});


$('.ui_select').click(function (e) {
    e.stopPropagation();
    return false;
});

$('body').on('click', function (e) {
    $('.ui_select').removeClass('toggled');
});

$('form.ui_select .view input.view_input').on('change', function () {
    let $sel = $(this).closest('.ui_select');
    $(".view input[type='submit']", $sel)[0].click();
    return false;
});

// $('.btn_my').click(function (e) {
//     $('input', this)[0].click();
// });

$('#btn_top').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});

$('.btn.download').click(function () {
    $('.attach', this).toggleClass('active');
});

let $addGalleryArrows = $('.gallery_block .arrows');

$('.left_arrow', $addGalleryArrows).click(function () {
    let $body = $(this).closest('.body');
    let $wrapper = $('.gallery_wrapper', $body);

    let $myUl = $('>ul', $wrapper);
    let $firstLi = $('li', $myUl).first();
    let $firstTile = $('>.tile', $firstLi);

    let liWidth = $firstLi[0].getBoundingClientRect().width;
    let wrapperWidth = $wrapper[0].getBoundingClientRect().width;
    let tileWidth = $firstTile[0].getBoundingClientRect().width;


    let len = $('>li', $myUl).length
    let maxLeft = wrapperWidth - (liWidth * len);

    let marginW = (liWidth - tileWidth) / 2;

    moveOn($firstLi, liWidth, maxLeft);
});

$('.right_arrow', $addGalleryArrows).click(function () {
    let $body = $(this).closest('.body');
    let $wrapper = $('.gallery_wrapper', $body);

    let $myUl = $('>ul', $wrapper);
    let $firstLi = $('li', $myUl).first();
    let $firstTile = $('>.tile', $firstLi);

    let liWidth = $firstLi[0].getBoundingClientRect().width;
    let wrapperWidth = $wrapper[0].getBoundingClientRect().width;
    let tileWidth = $firstTile[0].getBoundingClientRect().width;

    let len = $('>li', $myUl).length
    let maxLeft = wrapperWidth - (liWidth * len);

    let marginW = (liWidth - tileWidth) / 2;

    moveOn($firstLi, -liWidth, maxLeft);
});

function moveOn($firstLi, moveOnW, maxLeft) {
    let left = parseFloat($firstLi.css('marginLeft'));

    left += moveOnW;
    if (left < maxLeft)
        left = maxLeft;
    else if (left > 0)
        left = 0;

    $firstLi.css('marginLeft', left);
}



/*--------Древнее зло-------*/
function Parallax(options) {
    options = options || {};
    this.nameSpaces = {
        wrapper: options.wrapper || '.parallax',
        layers: options.layers || '.parallax-layer',
        deep: options.deep || 'data-parallax-deep'
    };
    this.init = function () {
        var self = this,
            parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);
        for (var i = 0; i < parallaxWrappers.length; i++) {
            (function (i) {
                document.addEventListener('mousemove', function (e) {
                    var x = e.clientX,
                        layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
                    for (var j = 0; j < layers.length; j++) {
                        (function (j) {
                            var deep = layers[j].getAttribute(self.nameSpaces.deep),
                                disallow = layers[j].getAttribute('data-parallax-disallow'),
                                itemX = (disallow && disallow === 'x') ? 0 : x / deep;
                            if (disallow && disallow === 'both') return;
                            layers[j].style.left = itemX + 50 + '%';

                            layers[j].style.marginLeft = -layers[j].getBoundingClientRect().width / deep / 2 + '%';
                        })(j);
                    }
                });
                parallaxWrappers[i].addEventListener('mousemove', function (e) {
                    var y = e.clientY,
                        layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
                    for (var j = 0; j < layers.length; j++) {
                        (function (j) {
                            var deep = layers[j].getAttribute(self.nameSpaces.deep),
                                disallow = layers[j].getAttribute('data-parallax-disallow'),
                                itemY = (disallow && disallow === 'y') ? 0 : y / deep * 2;
                            if (disallow && disallow === 'both') return;
                            layers[j].style.top = itemY + 50 + '%';
                            layers[j].style.marginTop = -layers[j].getBoundingClientRect().height / deep / 2 + '%';
                        })(j);
                    }
                });
            })(i);
        }
    };
    this.init();
    return this;
}

// window.addEventListener('load', function () {
//     new Parallax();
// });
/*--------Древнее зло-------*/

$('.img_parallax').each(function () {
    var img = $(this);
    var imgParent = $(this).parent();
    function parallaxImg() {
        var speed = img.data('speed');
        var imgY = imgParent.offset().top;
        var winY = $(this).scrollTop();
        var winH = $(this).height();
        var parentH = imgParent.innerHeight();


        // The next pixel to show on screen      
        var winBottom = winY + winH;

        // If block is shown on screen
        if (winBottom > imgY && winY < imgY + parentH) {
            // Number of pixels shown after block appear
            var imgBottom = ((winBottom - imgY) * speed);
            // Max number of pixels until block disappear
            var imgTop = winH + parentH;
            // Porcentage between start showing until disappearing
            var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
        }
        img.css({
            top: imgPercent + '%',
            transform: 'translate(-50%, -' + imgPercent + '%)'
        });
    }
    $(document).on({
        scroll: function () {
            parallaxImg();
        }, ready: function () {
            parallaxImg();
        }
    });
});

/* number input */

let $quantityBlock = $(".quantity_block");

for (let i = 0; i < $quantityBlock.length; i++) {
    let $curElem = $($quantityBlock[i]);
    let $quantityArrowMinus = $(".btn.minus", $curElem);
    let $quantityArrowPlus = $(".btn.plus", $curElem);
    let $quantityNum = $(".quantity_num", $curElem);


    $quantityArrowMinus.click(function (e) {
        if ($quantityNum.val() > 1) {
            $quantityNum.val(+$quantityNum.val() - 1);
        }
    });

    $quantityArrowPlus.click(function (e) {
        $quantityNum.val(+$quantityNum.val() + 1);
    });
}


/* DIALOG */
/* DIALOG */
/* DIALOG */
/* DIALOG */

$('.pop_dialog.need_width').each(function () {
    let t = this;
    setTimeout(function() {
        $(t).css('display', 'none');
        $(t).css('visibility', 'visible');
    }, 200);
});

$('.pop_dialog .close_dialog_btn').click(function () {
    $(this).closest('.pop_dialog').fadeOut();
});

$('.pop_dialog .bg').click(function () {
    $(this).closest('.pop_dialog').fadeOut();
});

$('#dialogRemPass').click(function () {

});

function slideHideSiblings($variant) {
    $variant.siblings('.var').css('transition', '.5s');
    $variant.siblings('.var').css('opacity', '0');
    $variant.siblings('.var').css('marginLeft', - 400);
    $variant.siblings('.var').css('position', 'absolute');
}

function slideShow($variant) {
    $variant.css('position', 'relative');
    $variant.css('opacity', 1);
    $variant.css('display', 'flex');
    let $header = $('>.header', $variant);
    let $body = $('>.body', $variant);
    let $footer = $('>.footer', $variant);
    let $bodyChildren = $('>.body>*', $variant);

    $variant.css('transition', 0);
    $header.css('transition', 0);
    $body.css('transition', 0);
    $footer.css('transition', 0);
    $bodyChildren.css('transition', 0);

    $variant.css('marginLeft', 0);
    $body.css('marginLeft', 0);
    $header.css('marginLeft', 400);
    $footer.css('marginLeft', 400);
    $bodyChildren.css('marginLeft', 400);

    $header.css('transition', 'all .5s cubic-bezier(0.6, 0.37, 0.22, 1.24)');
    $footer.css('transition', 'all .5s cubic-bezier(0.6, 0.37, 0.22, 1.24)');
    $bodyChildren.css('transition', 'all .5s cubic-bezier(0.6, 0.37, 0.22, 1.24)');

    $header.css('marginLeft', 0);

    let j = 0;
    for (let i = 0; i < $bodyChildren.length; i++) {
        setTimeout(function () {
            $($bodyChildren[i]).css('marginLeft', 0);
        }, 100 + 100 * i);
        j++;
    }
    setTimeout(function () {
        $footer.css('marginLeft', 0);
    }, 100 + 100 * j);

}

function showLoginDialog() {
    $('#user_pop_dialog').fadeIn();
    slideShow($('#user_pop_dialog .var.login'));
    slideHideSiblings($('#user_pop_dialog .var.login'));
}

function showRegistrationDialog() {
    $('#user_pop_dialog').fadeIn();
    slideShow($('#user_pop_dialog .var.registration'));
    slideHideSiblings($('#user_pop_dialog .var.registration'));
}

function showRememberPassDialog() {
    $('#user_pop_dialog').fadeIn();
    slideHideSiblings($('#user_pop_dialog .var.remember_password'));
    slideShow($('#user_pop_dialog .var.remember_password'));
}

$(document).ready(function () {
    $('.call_pass_dialog').on('click', function () {
        showRememberPassDialog();
    });
    $('.call_login_dialog').on('click', function () {
        showLoginDialog();
    });
    $('.call_registration_dialog').on('click', function () {
        showRegistrationDialog();
    });
});

/* MAIN SLIDES */
/* MAIN SLIDES */
/* MAIN SLIDES */


$(document).scroll(function () {
    $('main>.a_slide').each(function () {
        let topOff = $(this).offset().top;

        if (window.scrollY + innerHeight / 2 >= topOff)
            $(this).css('marginLeft', 0);
    });
});

$(document).on('scroll', function (e) {
    let $header = $('body>header');
    if (window.scrollY > parseFloat($header.css('height')))
        $header.addClass('fixed');
    else if (!$header.hasClass('not_touch'))
        $header.removeClass('fixed');
});

