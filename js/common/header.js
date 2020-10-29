// let $navPagesLi = $('header ul.page-nav>li');

// if (document.documentElement.clientWidth < 481 && $navPagesLi.length > 2) {
//     $('header ul.page-nav>li').css('display', 'none');

//     $('header ul.page-nav>li:nth-last-child(-n+2)')
//         .css('display', 'list-item');
//     $('header ul.page-nav>li:first-child')
//         .css('display', 'list-item');

//     $navPagesLi.css('max-width', '48%');
//     $('header ul.page-nav>li:first-child').append("...");
// }

$('.down_list').click(function (e) {
   let $pop = $('.popup_down', this);

   if ($pop.is(':hidden')) {
      $(this).addClass('selected');
      $pop.slideDown();
   }
   else {
      $(this).removeClass('selected');
      $pop.slideUp();
   }

   e.stopPropagation();
   return false;
});

$('.down_list .popup_down').click(function (e) {
   e.stopPropagation();
   return false;
});

$('body').on('click', function (e) {
   if ($(e.target).parents('.down_list').length == 0) {
      let $popBtn = $('.down_list');
      for (let i = 0; i < $popBtn.length; i++) {
         let $el = $($popBtn[i]);

         let $popup = $('.popup_down', $popBtn[i]);

         $el.removeClass('selected');

         if ($popup.is(":visible"))
            $popup.slideUp();
      }
   }
});

$('.search_btn').click(function () {
   let btn = this;
   $(btn).addClass('selected');

   setTimeout(function () {
      $('label', btn).attr('for', 'hSearchBtn');
   }, 40);
});

let $headerFooter = $('header .footer.row')


function moveHeaderFooter() {
   let headerHeight = parseFloat($('header').css('height'));
   $headerFooter.css('top', headerHeight - window.scrollY);
}
moveHeaderFooter();
$(document).on('scroll', moveHeaderFooter);



