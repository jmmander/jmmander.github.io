

$(document).ready(function(){
    $('.header').height($(window).height());
    //$('body').css( "maxWidth", ( $( window ).width())) 
    //$('.projects').height($(window).height());


//selects correct modal image based on user click event
var modal = document.getElementById('myModal');

$(".img-thumbnail").on("click", function(e) {
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

//updates projects displayed depending on tag clicked
$(".filter").on('click', function() {
  filterTerm = $(this).attr("id");
  if (!$(this).hasClass("clicked")){
    $(this).addClass("clicked");
    $(".filter").each(function(){
      if ($(this).attr("id") === filterTerm) {
        $(this).css("cssText", " opacity: 0.9")
        console.log("here")
      }
      else{
        $(this).css("cssText", "opacity: 0.7")
      }
    });
    $(".imgdiv").each(function() {
      if (!$(this).hasClass(filterTerm)) {
        $(this).css("cssText", "display: none !important")
      }
      else {
        $(this).css("cssText", "display: show; opacity: 0.9")
        console.log("here")
      }
    })
  }
else {
  $(this).removeClass("clicked");
  $("#" + filterTerm).css("cssText", "opacity: 0.7");
  $(".imgdiv").each(function() {
    if (!$(this).hasClass(filterTerm)) {
      $(this).css("cssText", "display: show; opacity: 0.9");
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
  var classes = ($(this).attr("class").split(/\s+/));
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
var played = false;

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
console.log("%cHi there! Thanks for checking out my source code. Got questions? Suggestions? Comments? Let me know!", 'color:cyan ; fontsize:30px; line-height: 25px; text-align: center; font-weight: bold')


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal")[0];

// When the user clicks on span, close the modal
span.onclick = function() { 
    modal.style.display = "none";
}

$('img').each( function() {
  var o = $(this);
  if( ! o.attr('title') && o.attr('alt') ) o.attr('title', o.attr('alt') );
});




  
  




})