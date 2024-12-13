$(function(){
  $('.accordion-item .title').click(function(){
    $(this).next().stop().slideToggle(300);
    $(this).toggleClass('active')
  })
  $('.accordion-item .content').click(function(){
    $(this).stop().slideUp()
    $('.accordion-item .title').removeClass('active')
  })
})