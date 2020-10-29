/*------------Слайдер-----------*/
(function () {
    var $slides = document.querySelectorAll('.slide');
    var $controls = document.querySelectorAll('.slider__control');
    var numOfSlides = $slides.length;
    var slidingAT = 1300; // sync this with scss variable
    var slidingBlocked = false;

    [].slice.call($slides).forEach(function ($el, index) {
        var i = index + 1;
        $el.classList.add('slide-' + i);
        $el.dataset.slide = i;
    });

    [].slice.call($controls).forEach(function ($el) {
        $el.addEventListener('click', controlClickHandler);
    });

    let $ul = document.querySelector('main .main_banner>.count_wrapper>ul');
    for (let i = 0; i < numOfSlides; i++) {
        let li = document.createElement("li");
        if (i == 0) {
            li.classList.add('selected')
        }
        $ul.appendChild(li);
    }

    function controlClickHandler() {
        if (slidingBlocked) return;
        slidingBlocked = true;

        var $control = this;
        var isRight = $control.classList.contains('m--right');
        var $curActive = document.querySelector('.slide.s--active');
        let $li = document.querySelectorAll('main .main_banner>.count_wrapper>ul>li');

        var index = +$curActive.dataset.slide;

        $li[index - 1].classList.remove('selected');

        (isRight) ? index++ : index--;
        if (index < 1) index = numOfSlides;
        if (index > numOfSlides) index = 1;

        $li[index - 1].classList.add('selected');

        var $newActive = document.querySelector('.slide-' + index);

        $control.classList.add('a--rotation');
        $curActive.classList.remove('s--active', 's--active-prev');
        document.querySelector('.slide.s--prev').classList.remove('s--prev');

        $newActive.classList.add('s--active');
        if (!isRight) $newActive.classList.add('s--active-prev');


        var prevIndex = index - 1;
        if (prevIndex < 1) prevIndex = numOfSlides;

        document.querySelector('.slide-' + prevIndex).classList.add('s--prev');

        setTimeout(function () {
            $control.classList.remove('a--rotation');
            slidingBlocked = false;
        }, slidingAT * 0.75);
    };
}());
/*----------Древнее зло---------*/
/*------------Слайдер-----------*/

class MyGallery {
    constructor($s_gallery) {
        this.aDuration = 0.9;
        this.$categoriesUl = $('.category_selector ul', $s_gallery);
        this.$categoriesLi = $('.category_selector li', $s_gallery);
        this.ctgLength = this.$categoriesLi.length;

        this.$aside = $('aside', $s_gallery);
        this.$pCurrent = $('.progress .current', this.$aside);
        this.$pTotal = $('.progress .total', this.$aside);
        this.$pBar = $('.progress .bar', this.$aside);

        this.$arrow = $('.arrow', this.$aside);
        this.$arrow.on('click', this.arrowClick);
        let $_arrow = this.$arrow;

        this.$gWrapper = $('.gallery_wrapper', $s_gallery);

        this.$gTile = $('>li', this.$gWrapper);
        this.$gTileNew = $('>li[data-status-type="new"]', this.$gWrapper);
        this.$gTileSail = $('>li[data-status-type="sail"]', this.$gWrapper);
        this.$gTileTop = $('>li[data-status-type="top"]', this.$gWrapper);

        this.startStatusNew = $(this.$gTileNew[0]).index();
        this.startStatusSail = $(this.$gTileSail[0]).index();
        this.startStatusTop = $(this.$gTileTop[0]).index();


        let wRect = this.$gWrapper[0].getBoundingClientRect();
        let gWrapWidth = wRect.width;

        let tileRect = this.$gTile[0].getBoundingClientRect();
        this.tileWidth = tileRect.width;

        this.tileStep = Math.floor(gWrapWidth / (this.tileWidth - 70));
        this.currentStep = 0;
        this.tileLength = this.$gTile.length;

        this.tileInit();
        this.changeInfo();
        this.$pTotal.text(Math.ceil(this.tileLength / this.tileStep)
            .toString().padStart(2, "0"));// Преобразуем в строку и заполняем нулями


        this.timer = 7000;

        let slide = this.slide.bind(this);
        this.timerStep = function () {
            slide(1);
        }
        this.interval = setInterval(this.timerStep, this.timer)
    }

    arrowClick = (function (e) {
        clearInterval(this.interval);
        this.interval = setInterval(this.timerStep, this.timer);
        //RESET TIMER А
        // -----------|

        let $arrow = this.getElemFromTarget(e.target, '.arrow');

        let direction = 1;
        if ($arrow.hasClass('left_arrow'))
            direction = -1;

        this.slide(direction);
    }).bind(this);

    slide(direction) {
        if (direction < 0) {
            /*Hide*/
            for (let i = this.currentStep; i < this.currentStep + this.tileStep; i++) {
                let $el = $(this.$gTile[i]);

                setTimeout(function () {
                    $el.addClass('to_left');
                }, 100 * i);
            }

            /*Show NEXT*/
            this.currentStep -= this.tileStep;

            if (this.currentStep < 0)
                this.currentStep += this.tileLength;

            for (let i = this.currentStep; i < this.currentStep + this.tileStep; i++) {
                let $el = $(this.$gTile[i]);

                this.$gTile.css('animationDuration', 0 + 's');
                $el.removeAttr('class');
                $el.addClass('to_right');
                this.$gTile.css('animationDuration', this.aDuration + 's');

            }
            this.tileShowFromTo(this.currentStep, this.currentStep + this.tileStep);

        } else if (direction > 0) {
            /*Hide*/
            for (let i = this.currentStep; i < this.currentStep + this.tileStep; i++) {
                let $el = $(this.$gTile[i]);

                setTimeout(function () {
                    $el.addClass('to_right');
                }, 100 * i);
            }

            /*Show NEXT*/
            this.currentStep += this.tileStep;
            if (this.currentStep + this.tileStep > this.tileLength)
                this.currentStep -= this.tileLength;

            for (let i = this.currentStep; i < this.currentStep + this.tileStep; i++) {
                let $el = $(this.$gTile[i]);

                this.$gTile.css('animationDuration', 0 + 's');
                $el.removeAttr('class');
                $el.addClass('to_left');
                this.$gTile.css('animationDuration', this.aDuration + 's');

            }
            this.tileShowFromTo(this.currentStep, this.currentStep + this.tileStep);
        }

        this.changeInfo();
    }

    getElemFromTarget(target, selector) {
        let $parent = $(target).closest(selector);
        let $this = $(target);

        if ($this.is(selector))
            return $this;
        else if ($parent.length != 0)
            return $parent;
        else
            return undefined;
    }

    tileInit() {
        this.$gTile.css('animationDuration', this.aDuration + 's');

        for (let i = 0; i < this.tileLength; i++) {
            let $el = $(this.$gTile[i]);

            $el.css('left', i * this.tileWidth);
        }
    }

    tileShowFromTo(from, to) {
        for (let i = from, j = 0; i < to; i++, j++) {
            let $el = $(this.$gTile[i]);

            $el.css('left', j * this.tileWidth);

            setTimeout(function () {
                $el.removeAttr('class');
            }, (this.aDuration * 1000 - this.aDuration * 1000 * 0.3) + 100 * j);
            //На 30% меньше задержка
        }

    }
    changeInfo() {
        this.$pCurrent.text(Math.ceil(this.currentStep / this.tileStep + 1)
            .toString().padStart(2, "0")); //Преобразуем в строку и заполняем нулями

        this.$pBar.css('width', (this.currentStep + this.tileStep)
            / this.tileLength * 100 + '%');

        if (this.currentStep >= this.startStatusTop) {

            this.$categoriesLi.removeClass('selected');
            $('li.top', this.$categoriesUl).addClass('selected');
            this.$aside.removeAttr('class');
            this.$aside.addClass('top');

        } else if (this.currentStep >= this.startStatusSail) {

            this.$categoriesLi.removeClass('selected');
            $('li.sail', this.$categoriesUl).addClass('selected');
            this.$aside.removeAttr('class');
            this.$aside.addClass('sail');

        } else if (this.currentStep >= this.startStatusNew) {

            this.$categoriesLi.removeClass('selected');
            $('li.new', this.$categoriesUl).addClass('selected');
            this.$aside.removeAttr('class');
            this.$aside.addClass('new');

        }
    }
}

let myGallery = new MyGallery();