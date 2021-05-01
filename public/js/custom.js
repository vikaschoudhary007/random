$(document).ready(function () {
  //onscroll fixed header
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 50) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });

  //smoothscroll
  $('.homeNav a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    $(document).off("scroll");

    $("a").each(function () {
      $(this).removeClass("active");
    });
    $(this).addClass("active");

    var target = this.hash,
      menu = target;
    $target = $(target);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top - 0,
        },
        500,
        "swing",
        function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
        }
      );
  });
  $(document).on("scroll", onScroll);
  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".homeNav li a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".homeNav li a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  var navMain = $("#navbarSupportedContent");
  navMain.on("click", "a", null, function () {
    navMain.collapse("hide");
  });
  $(window).on("load", function () {
    $(".scrollBox").mCustomScrollbar();
  });
});
$(function () {
  //datepicker----------------------------------
  $(".date").datepicker({
    format: "dd/mm/yyyy",
    uiLibrary: "bootstrap4",
  });
});
