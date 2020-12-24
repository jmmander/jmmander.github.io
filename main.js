

$(document).ready(function(){
    $('.header').height($(window).height());
    //$('.about').height($(window).height());
    //$('.projects').height($(window).height());

AOS.init({
  duration: 3000,
  useClassNames: true,
  initClassName: false,
  animatedClassName: 'aos-animate',
  easing: 'ease',
  once: true,
  anchorPlacement: 'center-bottom', 
  });

$(".lang").on('click', function() {
  let choice = $(this).attr("id");
  if (choice == "chinese") {
    $('.en').addClass('hideLang');
    $('.ch').removeClass('hideLang');
    $('.ch').addClass('showLang');
    $('.en').removeClass('showLang');
  }
  if (choice == "english") {
    $('.ch').addClass('hideLang');
    $('.en').removeClass('hideLang');
    $('.en').addClass('showLang');
    $('.ch').removeClass('showLang');
  }
});


//selects correct modal image based on user click event
const modal = document.getElementById('myModal');

$(".imgthumbnail").on("click", function(e) {
    const imgsrc = $(this).attr("id")
    if (imgsrc.slice(-3) === "png") {
        const caption =  $(this).attr("alt");
        $('#myModal').empty().append('<img class="modal-content " id="modalImg" /> <figcaption class="figure-caption"><figcaption>');
        $("#modalImg").attr("src", imgsrc);
        $('.figure-caption').text(caption);
        modal.style.display = "block";
        }
    else {
        ($('#myModal').empty().append('<video class="modal-content figure-img " id="video" controls></video> <figcaption class="figure-caption"></figcaption>'));
        ($("#video").append('<source id="vidSource" src="" type="video/mp4" ></source>'))
        $("#vidSource").attr("src", imgsrc)
        const caption =  $(this).attr("alt");
        $('.figure-caption').text(caption);
        modal.style.display = "block";
    }
})

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("modal")[0];

// When the user clicks on span, close the modal
span.onclick = function() { 
    modal.style.display = "none";
}

//updates projects displayed depending on tag clicked
$(".filter").on('click', function() {
  let filterTerm = $(this).attr("id");
  if (!$(this).hasClass("clicked")){
    $(this).addClass("clicked");
    $(".filter").each(function(){
      if ($(this).attr("id") === filterTerm) {
        $(this).css("cssText", " opacity: 1")
        console.log("here")
      }
      else{
        $(this).css("cssText", "opacity: 0.6")
      }
    });
    $(".imgdiv").each(function() {
      if (!$(this).hasClass(filterTerm)) {
          $(this).css("cssText", "display: none !important")
        }
      else {
        $(this).css("cssText", "display: show; opacity: 1");
        console.log("here")
      }
    })
  }
  else {
    $(this).removeClass("clicked");
    $("#" + filterTerm).css("cssText", "opacity: 0.6");
    $(".imgdiv").each(function() {
      if (!$(this).hasClass(filterTerm)) {
        $(this).css("cssText", "display: show; opacity: 1");
    }}
  )}
  })

//removes animated class after play
$(".progress-bar").on("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
  $(this).removeClass(function(index, className) {
    return (className.match (/(^|\s)animated\S+/g) || []).join(' ');
  });  
});

//progress bar plays animation on hover 
$(".progress-bar").hover(function(){
  const classes = ($(this).attr("class").split(/\s+/));
  if (classes.includes('level5'))
{
  $(this).addClass("animated5");        
}
if (classes.includes('level4'))
{
  $(this).addClass("animated4");  
}
if (classes.includes('level3'))
{
  $(this).addClass("animated3");  
}
if (classes.includes('level2'))
{
  $(this).addClass("animated2");  
}
if (classes.includes('level1'))
{
  $(this).addClass("animated1");  
}}
);

//progressbar plays on first view
let played = false;

$('.progress-bar').waypoint(function() {
if (!played)
{let progressBars = $('.progress-bar')
progressBars.each(function() {
  let classes = ($(this).attr("class").split(/\s+/));
  if (classes.includes('level5'))
  {
    $(this).addClass("animated5");        
  }
  if (classes.includes('level4'))
  {
    $(this).addClass("animated4");  
  }
  if (classes.includes('level3'))
  {
    $(this).addClass("animated3");  
  }
  if (classes.includes('level2'))
  {
    $(this).addClass("animated2");  
  }
  if (classes.includes('level1'))
  {
    $(this).addClass("animated1");  
  }
});
played = true;
}}, { offset: '100%' });




//send user a message in console
console.log("%c　∧＿∧\n（｡･ω･｡)つ━☆・*。\n⊂　　 ノ 　　　・゜+.\nしーＪ　   　　　・゜+.\n　　　     °。+ *´¨\n　　.· ´¸.·*´¨\n   ( .· ´¸.·*´¨) ´¸.·*´¨) ´¸.·*´¨) ¸.·*¨)\n (¸.·´  Welcome to the Console Nebula  ¸.·*¨)\n (¸.·´  We hope you enjoy your journey!  ¸.·*¨)\n (¸.·´  Here you can explore the code base  ¸.·*¨) \n (¸.·´  And inspect all our elements  ¸.·*¨)\n (¸.·´  Thank you for visiting  ¸.·*¨) \n (¸.·´  We hope to see you again! ¸.·*¨) \n (¸.·´ (¸.·’* (¸.·’* ¸.·*¨) ´¸.·*´¨) ´¸.·*´¨)", 'color:cyan ; fontsize:30px; text-align: center; font-weight: bold')



$('img').each( function() {
  let o = $(this);
  if( ! o.attr('title') && o.attr('alt') ) o.attr('title', o.attr('alt') );
});





  
  




})