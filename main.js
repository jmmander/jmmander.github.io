

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
        ($('#myModal').empty().append('<video class="modal-content figure-img " id="video" autoplay></video> <figcaption class="figure-caption"></figcaption>'));
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

//send user a message in console
console.log("%cHi there! Thanks for checking out my source code. Got questions? Suggestions? Comments? Let me know!", 'color:cyan ; fontsize:30px; line-height: 25px; text-align: center; font-weight: bold')


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal")[0];

// When the user clicks on span, close the modal
span.onclick = function() { 
    modal.style.display = "none";
}




  
  




})