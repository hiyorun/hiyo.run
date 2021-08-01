  var x = document.getElementById("full");
  var v = document.getElementById("navfocusid");
  var drop = document.getElementById("dropnavid");
  var nav = document.getElementById("navbarid");
  var op = 0;
  x.style.opacity = op;

  function loadweb() {
    var timevar = setTimeout(loadweb, 50);
    if (x.style.opacity > 1) {
      clearTimeout(timevar);
    }
    op += 0.05;
    x.style.opacity = op;
  }
  function openNav() {
    var v = document.getElementById("navfocusid");
    if (v.style.display === "block"){
        drop.style.right = "-40vh";
        nav.style.width = "8vh";
        drop.style.opacity = "1";
        v.style.display = "none";
    }

    else{
        drop.style.right = "0vh";
        nav.style.width = "40vh";
        drop.style.opacity = "1";
        v.style.display = "block";
    }
  }

  /* Fade imgs */

  document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener("scroll", function(event) {
        const animatedBoxes = document.getElementsByClassName("animated-box");
        const windowOffsetTop = window.innerHeight + window.scrollY;

        Array.prototype.forEach.call(animatedBoxes, (animatedBox) => {
            const animatedBoxOffsetTop = animatedBox.offsetTop;

            if (windowOffsetTop >= animatedBoxOffsetTop) {
                addClass(animatedBox, "fade-in");
            }
        });
    });
});

function addClass(element, className) {
    const arrayClasses = element.className.split(" ");
    if (arrayClasses.indexOf(className) === -1) {
        element.className += " " + className;
    }
}
