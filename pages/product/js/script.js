

$('.rate input[type="radio"]').click(function () {
    let $thisLi = $($(this).closest('li'));
    let rateScore = $thisLi.index();

    let $ul = $($(this).closest('ul.rate'));
    let $lis = $('li', $ul);

    let $thisImg = $('img', $lis);

    let path = $thisImg.attr('data-path-to-icons');
    $thisImg.attr('src', path + 'StarEmpty.svg');

    for (let i = 0; i <= rateScore; i++) {
        let $el = $($lis[i]);

        let $img = $('img', $el);

        let path = $img.attr('data-path-to-icons');
        $img.attr('src', path + 'StarFill.svg');
    }
    return false;
});

$('.copy_link').click(function () {
    let $a = $('a', this);
    let href = $a.attr('href');

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(href).select();
    document.execCommand("copy");
    $temp.remove();
});

$('.share.slide_popup_btn').click(function () {
    $('.product_block .info_block .links').toggleClass('show');
});

$($('.sections>.nav ul>li')[0]).addClass('selected');

$('.sections>.nav ul>li').click(function () {
    let index = $(this).index();

    $('.sections>.nav ul>li').removeClass('selected');
    $(this).addClass('selected');

    $('.sections .section_wrapper>section').css('display', 'none');
    $($('.sections .section_wrapper>section')[index]).fadeIn();
});

$('#show_block_write_comment').click(function () {
    $(this).closest('.top.row').addClass('hide');
    $('.section_wrapper>.comments .write_comment').addClass('show');
});

/* GALLERY MAIN */
/* GALLERY MAIN */
/* GALLERY MAIN */
/* GALLERY MAIN */

$(document).ready(function () {
    let $productImage = $('#main-info .img_block>.img_wrapper img.new');
    let $galleryArrows = $('#main-info .img_block>.gallery .arrows');

    let $galleryWrapper = $('#main-info .img_block>.gallery .gallery_wrapper');

    let $ulGallery = $('#main-info .img_block>.gallery ul');
    let $ulLi = $('li', $ulGallery);

    $ulLi.removeClass('selected');
    $ulLi.first().addClass('selected');

    $productImage.attr('src', $('>li.selected img', $ulGallery).attr('src'));

    $ulLi.click(function (e) {
        changeMainImage(this);
    });

    $('.left_arrow', $galleryArrows).click(function (e) {
        let index = $('>li.selected', $ulGallery).index();

        let $firstLi = $ulLi.first();
        let widthOfLi = $ulLi[0].getBoundingClientRect().width;
        let wrapperWidth = $galleryWrapper[0].getBoundingClientRect().width;
        let visibleCount = Math.floor(wrapperWidth / widthOfLi);

        index--;
        if (index < 0) {
            index += $ulLi.length;

            let left = ($ulLi.length - visibleCount) * widthOfLi * -1;
            $firstLi.css('margin-left', left);

        } else if (index < $ulLi.length - visibleCount) {

            let left = parseFloat(
                $firstLi.css('margin-left')
            );
            left += widthOfLi;

            $firstLi.css('margin-left', left);
        }

        changeMainImage($ulLi[index]);
    });

    $('.right_arrow', $galleryArrows).click(function (e) {
        let index = $('>li.selected', $ulGallery).index();

        let $firstLi = $($ulLi[0]);
        let widthOfLi = $ulLi[0].getBoundingClientRect().width;
        let wrapperWidth = $galleryWrapper[0].getBoundingClientRect().width;
        let visibleCount = Math.floor(wrapperWidth / widthOfLi);

        index++;
        if (index >= $ulLi.length) {
            index = 0;

            $firstLi.css('margin-left', 0);
        } else if (index + 1 > visibleCount) {

            let left = parseFloat(
                $firstLi.css('margin-left')
            );
            left -= widthOfLi;

            $firstLi.css('margin-left', left);
        }

        changeMainImage($ulLi[index]);
    });

    function changeMainImage(li) {
        $(li).siblings('li.selected').removeClass('selected');
        $(li).addClass('selected');

        $productImage.addClass('show');
        setTimeout(function () {
            $productImage.removeClass('show');
        }, 10);

        $productImage.attr('src', $('img', li).attr('src'));

        setTimeout(function () {
            $productImage.siblings('img').attr('src', $('img', li).attr('src'));
        }, 300);
    }
});

$(document).ready(function () {
    let colorsHeight = parseFloat($('.product_block .info_block .colors').css('height'));
    if (colorsHeight)
        $('.product_block .info_block .colors').addClass('fixed');
});


/*---------------------------------- GALLERY ----------------------------------*/
/*---------------------------------- GALLERY ----------------------------------*/
/*---------------------------------- GALLERY ----------------------------------*/
/*---------------------------------- GALLERY ----------------------------------*/

let mySlideGallery;
let myArrowGallery;
let my360ViewGallery;

$('#main-info>.img_block>.img_wrapper').click(function () {
    $('#img_gallery_pop').fadeIn();

    initGallery();
});

$('#main-info>.img_block>.tools .btn360').click(function () {
    $('#img_gallery_pop').fadeIn();

    initGallery();
});

function initGallery() {

    mySlideGallery = new MySlideGallery(
        $('#img_gallery_pop .row.back .gallery_wrapper'),
        $('#img_gallery_pop .row.back .gallery_wrapper ul')
    );

    myArrowGallery = new MyArrowGallery(
        $('#img_gallery_pop .body .img_wrapper'),
        $('#img_gallery_pop .arrows'),
        $('#img_gallery_pop .row.back .gallery_wrapper'),
        $('#img_gallery_pop .row.back .gallery_wrapper ul'),
        $('#img_gallery_pop .body .wrapper360')
    );

    my360ViewGallery = new My360ViewGallery(
        $('#img_gallery_pop .body .wrapper360'),
        $('#img_gallery_pop .body .arrows')
    );
}

class MySlideGallery {

    constructor($hideWrapper, $ul) {
        this.$hideWrapper = $hideWrapper;
        this.$ul = $ul;
        this.$lis = $('li', $ul);
        this.$firstLi = $(this.$lis[0]);

        let viewWidth = $hideWrapper.get(0).getBoundingClientRect().width;
        let trueWidth = $ul.get(0).getBoundingClientRect().width;

        this.maxLeftInPx = viewWidth - trueWidth;
        this.maxRightInPx = this.maxLeftInPx * -1;

        let startSlideByLiTouch = this.startSlideByLiTouch.bind(this);
        this.$lis.on('touchstart', startSlideByLiTouch);

        let startSlideLi = this.startSlideLi.bind(this);
        this.$lis.on('mousedown', startSlideLi);
    }

    startSlideLi(e) {
        this.clickX = e.clientX;
        this.clickX += parseFloat(this.$firstLi.css('marginLeft')) * -1;

        let moveLi = this.moveLi.bind(this);
        $(document).on('mousemove', moveLi);

        let endSlideLi = this.endSlideLi.bind(this);
        $(document).on('mouseup', endSlideLi);
    }

    moveLi(e) {
        let xVal = e.clientX - this.clickX;

        if (xVal > this.maxLeftInPx && xVal < 0)
            this.$firstLi.css('marginLeft', xVal + "px");
    }

    endSlideLi(e) {
        $(document).off('mousemove');
        $(document).off('mouseup');
    }

    startSlideByLiTouch(e) {
        this.clickX = e.touches[0].clientX;
        this.clickX += parseFloat(this.$firstLi.css('marginLeft')) * -1;

        let moveLiTouch = this.moveLiTouch.bind(this);
        $(document).on('touchmove', moveLiTouch);

        let endSlideLiTouch = this.endSlideLiTouch.bind(this);
        $(document).on('touchend', endSlideLiTouch);
    }

    moveLiTouch(e) {
        let xVal = e.touches[0].clientX - this.clickX;

        if (xVal > this.maxLeftInPx && xVal < 0)
            this.$firstLi.css('marginLeft', xVal + "px");
    }

    endSlideLiTouch(e) {
        $(document).off('touchmove');
        $(document).off('touchend');
    }

}


class MyArrowGallery {
    constructor($mainImgWrapper, $arrows, $hideWrapper, $ul, $w360) {
        this.$w360 = $w360;
        this.$mainImg = $('img', $mainImgWrapper);

        this.$lArr = $('.left_arrow', $arrows);
        this.$rArr = $('.right_arrow', $arrows);

        this.$hideWrapper = $hideWrapper;

        this.$ul = $ul;
        this.$lis = $('li', $ul);
        this.$firstLi = $(this.$lis[0]);

        let viewWidth = $hideWrapper.get(0).getBoundingClientRect().width;
        let trueWidth = $ul.get(0).getBoundingClientRect().width;

        if (viewWidth >= trueWidth) {
            $('.arrow', $hideWrapper).css('display', 'none');
        }

        this.maxLeftInPx = viewWidth - trueWidth;
        this.maxRightInPx = this.maxLeftInPx * -1;

        let clickArrow = this.clickArrow.bind(this);
        this.$lArr.on('click', clickArrow);
        this.$rArr.on('click', clickArrow);

        let clickLi = this.clickLi.bind(this);
        this.$lis.on('click', clickLi);

        this.$firstLi.addClass('selected');
        let src = $('img', this.$firstLi).attr('src');
        this.$mainImg.attr('src', src);
    }

    clickArrow(e) {
        let dx = 1; //прирост вправо (+ индекс)

        let condition1 = $(e.target).parents('.left_arrow').length != 0; //имеет родителя с классом
        let condition2 = $(e.target).hasClass('left_arrow'); // сам с классом
        if (condition1 || condition2) { // если левая кнопка, то отнимать будем
            dx = -1;
        }

        let $oldSelected = $('li.selected', this.$ul);
        let index = $oldSelected.index();

        index += dx;
        if (index >= this.$lis.length)
            index = 0;
        else if (index < 0)
            index = this.$lis.length - 1;

        $oldSelected.removeClass('selected');
        let $curSelected = $(this.$lis[index]);
        $curSelected.addClass('selected');


        this.checkLi($curSelected);


        let src = $('img', $curSelected).attr('src');
        this.$mainImg.attr('src', src);
    }

    clickLi(e) {
        let $li;

        let condition1 = $(e.target).closest('li', this.$ul).length != 0; //имеет родителя с классом
        let condition2 = $(e.target).hasClass('left_arrow'); // сам с классом

        if (condition1) {
            $li = $($(e.target).closest('li'));
        } else if (condition2) {
            $li = $(e.target);
        }


        this.checkLi($li);


        this.$lis.removeClass('selected');
        $li.addClass('selected');

        let src = $('img', $li).attr('src');
        this.$mainImg.attr('src', src);
    }

    checkLi($li) {
        if ($li.hasClass('view360')) {
            this.$w360.fadeIn();
            this.$mainImg.hide();
        }
        else {
            this.$w360.hide();
            this.$mainImg.fadeIn();
        }
    }
}


class My360ViewGallery {
    constructor($w360, $arrows) {
        this.$w360 = $w360;
        this.$mainImg = $('.img_wrap img', this.$w360);


        this.$lArr = $('.left_arrow', $arrows);
        this.$rArr = $('.right_arrow', $arrows);

        this.$buffer = $('.buffer', this.$w360);
        this.initPictures();
        this.$bufferImgs = $('img', this.$buffer);

        this.interval = this.$w360.attr('data-interval-milliseconds');

        this.imgCount = this.$bufferImgs.length;
        this.slideDir = 1;
        this.curIndex = 0;

        let slideFunc = this.slide.bind(this);
        setInterval(slideFunc, this.interval);

        let startMoveByTouch = this.startMoveByTouch.bind(this);
        this.$w360.on('touchstart', startMoveByTouch);

        let startMoveByMouse = this.startMoveByMouse.bind(this);
        this.$w360.on('mousedown', startMoveByMouse);

        let dblclick = this.dblclick.bind(this);
        this.$w360.dblclick(function () {
            dblclick();
        });
    }

    dblclick() {
        this.slideDir = 1;
    }

    initPictures() {
        this.namePrefix = this.$w360.attr('data-name-prefix');
        this.nameSuffix = this.$w360.attr('data-name-suffix');
        this.imgCount = this.$w360.attr('data-count');
        this.maxCount = this.$w360.attr('data-max-count');
        this.step = this.maxCount / this.imgCount;

        for (let i = 0; i < this.maxCount; i += this.step) {
            let index = Math.floor(i).toString().padStart(3, "0");
            let img = $('<img></img>');
            img.attr('src', this.namePrefix + index + this.nameSuffix);
            this.$buffer.append(img);
        }
    }

    slide() {
        if (this.$mainImg.is(':visible')) {
            this.$mainImg.attr('src',
                $(this.$bufferImgs[Math.floor(this.curIndex)]).attr('src')
            );
            this.curIndex += this.slideDir;

            if (this.curIndex >= this.imgCount)
                this.curIndex = 0;
            else if (this.curIndex < 0)
                this.curIndex = this.imgCount - 1;

            this.updatePointer();
        }
    }

    updatePointer() {
        if (this.slideDir < 0) {
            this.$w360.addClass('r');
            this.$w360.removeClass('l');
        }
        else {
            this.$w360.removeClass('r');
            this.$w360.addClass('l');
        }
    }

    updateDir(curX) {
        let xVal = this.oldClickX - curX;

        let controlWay = 300;

        let amplitude = (this.clickX - curX);
        if (amplitude > controlWay * 1.2)
            amplitude = controlWay;
        else if (amplitude < -controlWay * 1.2)
            amplitude = -controlWay;

        let step = amplitude / controlWay;
        this.slideDir = step;

        this.updateArrows();

        this.oldClickX = curX;
    }

    updateArrows() {
        if (this.slideDir >= 1) {
            this.$lArr.addClass('active');
            this.$rArr.removeClass('active');
        }
        else if (this.slideDir <= -1) {
            this.$lArr.removeClass('active');
            this.$rArr.addClass('active');
        }
        else {
            this.$lArr.removeClass('active');
            this.$rArr.removeClass('active');
        }

    }

    startMoveByMouse(e) {
        this.clickX = e.clientX;
        this.oldClickX = this.clickX;

        let moveMouse = this.moveMouse.bind(this);
        $(document).on('mousemove', moveMouse);

        let endMoveMouse = this.endMoveMouse.bind(this);
        $(document).on('mouseup', endMoveMouse);

        this.slideDir = 0;
    }

    moveMouse(e) {
        this.updateDir(e.clientX);
    }

    endMoveMouse(e) {
        $(document).off('mousemove');
        $(document).off('mouseup');

        this.checkDirByEndMove();
    }

    startMoveByTouch(e) {
        this.clickX = e.touches[0].clientX;
        this.oldClickX = this.clickX;

        let moveByTouch = this.moveByTouch.bind(this);
        $(document).on('touchmove', moveByTouch);

        let endMoveByTouch = this.endMoveByTouch.bind(this);
        $(document).on('touchend', endMoveByTouch);

        this.slideDir = 0;
    }

    moveByTouch(e) {
        this.updateDir(e.touches[0].clientX);
    }

    endMoveByTouch(e) {
        $(document).off('touchmove');
        $(document).off('touchend');

        this.checkDirByEndMove();
    }

    checkDirByEndMove() {
        if (Math.abs(this.slideDir) < 1)
            this.slideDir = 0;
    }
}


