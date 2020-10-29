
function update() {
    let $ulLists = $('.compare .body.params ul');
    let $lis = $('li', $ulLists);
    let listsLength = $lis.length;

    let arrOfHeightLi = new Array(listsLength).fill(0);

    function pushIfBiggest(val, index) {
        let pVal = parseFloat(val);
        if (arrOfHeightLi[index] < pVal) {
            if (pVal > 400)
                console.log('alarm');
            arrOfHeightLi[index] = pVal;
        }
    }

    $ulLists.each(function () {
        let $elis = $('li', this);
        $elis.each(function (index) {
            let height = $(this).css('height');

            pushIfBiggest(height, index);
        });
    });

    $lis.each(function () {
        let i = $(this).index();
        $(this).css('height', arrOfHeightLi[i] + 'px');

        $(this).on('mouseover', function () {
            $(this).addClass('hover');

            for (let j = 0; j < $ulLists.length; j++) {
                $(
                    $('li', $ulLists[j])[i]
                ).addClass('hover');
            }
        });

        $(this).on('mouseleave', function () {
            $(this).removeClass('hover');

            for (let j = 0; j < $ulLists.length; j++) {
                $(
                    $('li', $ulLists[j])[i]
                ).removeClass('hover');
            }
        });
    });
}

update();


class SmGalleryCompareSlider {
    constructor() {
        this.$galleryWrapper = $('.compare>.right');
        this.$arrows = $('.compare .arrows');
        this.$leftArrow = $('.arrows>.left-arrow', this.$galleryWrapper);
        this.$rightArrow = $('.arrows>.right-arrow', this.$galleryWrapper);


        this.$gallery = this.$galleryWrapper;

        this.$tiles = $('.column', this.$gallery);
        this.$firstTile = $(this.$tiles[0]);

        let galleryRect = this.$gallery.get(0).getBoundingClientRect();
        let tileRect = this.$firstTile.get(0).getBoundingClientRect();

        this.tileWidth = tileRect.width;
        this.fullWidth = this.tileWidth * this.$tiles.length;

        this.galleryWidth = galleryRect.width;


        this.knobWidthInPer = this.galleryWidth / this.fullWidth * 100;

        this.oneTileWidthInPer = 100 / this.$tiles.length;
        this.maxLeftValueInPer = 100 - this.knobWidthInPer;

        this.koefSlider = this.fullWidth / this.galleryWidth;

        this.$arrows.css('width', this.galleryWidth);
        console.log(this);


        let endSlide = this.endSlide.bind(this);

        $(document).mouseup(endSlide);

        let startSlideByLiTouch = this.startSlideByLiTouch.bind(this);


        // this.$tiles.on('touchstart', startSlideByLiTouch);
        $(document.body).on('touchstart', startSlideByLiTouch);

        this.lastX = 0;

        let slideLeft = this.slideLeft.bind(this);
        let slideRight = this.slideRight.bind(this);

        this.$leftArrow.click(slideLeft);
        this.$rightArrow.click(slideRight);
    }


    endSlide(e) {
        $('body').off('mousemove');
    }

    endSlideTouch(e) {
        $('body').off('touchmove');
        $(document).off('touchend');
    }

    checkDir(x) {
        if (this.lastX < x) {
        }
        else {
        }
        this.lastX = x;
    }

    startSlideByLiTouch(e) {
        console.log('touched');
        let galleryMoveByLiTouch = this.galleryMoveByLiTouch.bind(this);
        this.clickX = e.touches[0].clientX;
        this.startLeftValue = parseFloat(this.$firstTile.css('marginLeft'));
        $('body').on('touchmove', galleryMoveByLiTouch);

        let endSlideLiTouch = this.endSlideLiTouch.bind(this);
        $(document).on('touchend', endSlideLiTouch);
    }

    endSlideLiTouch(e) {
        $('body').off('touchmove');
        $(document).off('touchend');
        this.endSlideLi();
    }

    galleryMoveByLiTouch(e) {

        this.dxInPx = e.touches[0].clientX - this.clickX;
        this.currentLeftValue = this.dxInPx + this.startLeftValue;

        let currentLeftValueInPer = this.currentLeftValue / this.fullWidth * 100;
        let xInPerForTile = currentLeftValueInPer * this.koefSlider;

        this.checkDir(e.touches[0].clientX);

        if (currentLeftValueInPer * -1 >= 0 && currentLeftValueInPer * -1 <= this.maxLeftValueInPer) {
            this.$firstTile.css('margin-left', xInPerForTile + '%');
        }
        else if (currentLeftValueInPer * -1 < 0) {
            this.$firstTile.css('margin-left', 0 + '%');
        }
        else if (currentLeftValueInPer * -1 > this.maxLeftValueInPer) {
            // this.$firstTile.css('margin-left', this.maxLeftValueInPer * -1 + '%');
        }
    }

    endSlideLi() {
        if (this.dxInPx < 0)
            this.endSlideLiLeft();
        else if (this.dxInPx > 0)
            this.endSlideLiRight();
    }

    endSlideLiLeft(e) {
        let curX = parseFloat(this.$firstTile.css('marginLeft'));
        let curXInPer = curX / this.galleryWidth * 100;

        let dxInPer = this.dxInPx / this.galleryWidth * 100;

        let xToEndSlideOneInPer = this.oneLiWidthInPer - Math.abs(dxInPer);

        let animateToXInPer = curXInPer - xToEndSlideOneInPer;

        if (animateToXInPer * -1 < 0)
            animateToXInPer = 0
        else if (animateToXInPer * -1 >= this.maxLeftValueInPer) {
            animateToXInPer = this.maxLeftValueInPer * -1;
        }

        this.$firstTile.animate(
            { marginLeft: animateToXInPer + '%' },
            {
                duration: 200
            });

    }

    endSlideLiRight(e) {
        let curX = parseFloat(this.$firstTile.css('marginLeft'));
        let curXInPer = curX / this.galleryWidth * 100;

        let dxInPer = this.dxInPx / this.galleryWidth * 100;

        let xToEndSlideOneInPer = this.oneLiWidthInPer - Math.abs(dxInPer);

        let animateToXInPer = curXInPer + xToEndSlideOneInPer;

        if (animateToXInPer * -1 < 0)
            animateToXInPer = 0
        else if (animateToXInPer * -1 >= this.maxLeftValueInPer) {
            animateToXInPer = this.maxLeftValueInPer * -1;
        }


        this.$firstTile.animate(
            { marginLeft: animateToXInPer + '%' },
            {
                duration: 200
            });

    }

    endSlideLeft(e) {
        let curX = parseFloat(this.$firstTile.css('marginLeft'));
        let curXInPer = curX / this.galleryWidth * 100;

        let dxInPer = this.dxInPx / this.galleryWidth * 100;
        let modulo = Math.abs(dxInPer) % this.oneLiWidthInPer;

        let xToEndSlideOneInPer = this.oneLiWidthInPer - modulo;

        let animateToXInPer = curXInPer - xToEndSlideOneInPer;

        if (animateToXInPer * -1 < 0)
            animateToXInPer = 0
        else if (animateToXInPer * -1 >= this.maxLeftValueInPer) {
            animateToXInPer = this.maxLeftValueInPer * -1;
        }

        this.$firstTile.animate(
            { marginLeft: animateToXInPer + '%' },
            {
                duration: 200
            });
    }

    endSlideRight(e) {
        let curX = parseFloat(this.$firstTile.css('marginLeft'));
        let curXInPer = curX / this.galleryWidth * 100;

        let dxInPer = this.dxInPx / this.galleryWidth * 100;
        let modulo = Math.abs(dxInPer) % this.oneLiWidthInPer;

        let xToEndSlideOneInPer = this.oneLiWidthInPer - modulo;

        let animateToXInPer = curXInPer + xToEndSlideOneInPer;

        if (animateToXInPer * -1 < 0)
            animateToXInPer = 0
        else if (animateToXInPer * -1 >= this.maxLeftValueInPer) {
            animateToXInPer = this.maxLeftValueInPer * -1;
        }


        this.$firstTile.animate(
            { marginLeft: animateToXInPer + '%' },
            {
                duration: 200
            });
    }

    slideLeft(e) {

        let curXInPer = parseFloat(this.$firstTile.css('marginLeft')) / this.galleryWidth * 100;

        let animateToX = curXInPer;
        if (curXInPer + this.oneTileWidthInPer * this.koefSlider <= 0) {
            animateToX += this.oneTileWidthInPer * this.koefSlider;
        }
        else {
            animateToX = 0;
        }

        this.$firstTile.animate(
            { marginLeft: animateToX + '%' },
            {
                duration: 200
            });
    }

    slideRight(e) {

        let curXInPer = parseFloat(this.$firstTile.css('marginLeft')) / this.galleryWidth * 100;

        let animateToX = curXInPer - this.oneTileWidthInPer * this.koefSlider;

        if (animateToX <= this.maxLeftValueInPer * this.koefSlider * -1) {
            animateToX = this.maxLeftValueInPer * this.koefSlider * -1;
        }

        this.$firstTile.animate(
            { marginLeft: animateToX + '%' },
            {
                duration: 200
            });
    }
};

let GalleryCompareSlider1 = new SmGalleryCompareSlider();


$(document).ready(function () {
    $(document).on('scroll', function (e) {
        checkIfFixed(window.scrollY);
    });

    $('aside').addClass('fixed');
    $('.right>.column').addClass('fixed');

    let $header = $('aside>.header');
    let $body = $('aside>.body');

    let headerRect = $header[0].getBoundingClientRect();
    let bodyRect = $body[0].getBoundingClientRect();


    let marginTop = 122;

    let beginHeightToFix = $('.compare')[0].offsetTop * 0 + marginTop;

    console.log(beginHeightToFix);


    let mTop = $('.compare>.right').offset().top;
    let headerHeight = parseFloat($('.compare>aside>.header').css('height'));
    let topFixedRow = mTop + headerHeight - marginTop;
    let bTop = parseFloat($('.compare>.right').css('height'));

    let endHeightToFix = mTop - 450 + bTop;


    console.log(endHeightToFix);


    $('aside').removeClass('fixed');
    $('.right>.column').removeClass('fixed');


    function checkIfFixed(dY) {
        if (dY > beginHeightToFix && dY < endHeightToFix) {
            $('aside').addClass('fixed');
            $('.right>.column').addClass('fixed');
            $('.compare>.right').addClass('fixed');
            $('.fixed_row').addClass('fixed');
            $('.fixed_row').css('top', topFixedRow);
            $('.compare .right>.arrows').addClass('fixed');
        }
        else {
            $('aside').removeClass('fixed');
            $('.right>.column').removeClass('fixed');
            $('.compare .right>.arrows').removeClass('fixed');
            $('.fixed_row').removeClass('fixed');
            $('.fixed_row').attr('style', '');
        }
    }

    checkIfFixed(window.scrollY);

    $('.compare .right>.arrows').css('width', $('.compare>.right').css('width'));
});

