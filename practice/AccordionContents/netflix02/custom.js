$(function () {
  $('.accordion .content').eq(0).show()
  $(".accordion .title").click(function () {
    $(this).siblings('.accordion .content').slideUp();
    $(this).next().stop().slideToggle();
    $(this).siblings('.accordion .title').removeClass('active')
    $(this).toggleClass('active');
  });
});
