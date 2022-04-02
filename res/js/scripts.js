var grey = document.getElementById("loading");
var label = document.getElementById("explore");
var title = document.getElementById("title");
var logo = document.getElementById("logo");
var restweb = document.getElementById("rest");
var topmost = document.getElementById("topmost");
var floatnav = document.getElementById("floatingnav");
var illust = document.getElementById("illust");
var ongoing = document.getElementById("ongoing");
var termwin = document.getElementById("terms");
var illustimg = document.getElementsByClassName("illust");
var videog = logo.style.height;
var op = 1;
var open = 0;
var termopen = 0;
grey.style.opacity = op;

function loaded() {document.body.style.visibility = 'visible';loadweb();}
function hint() {
	logo.style.opacity = "1";
	logo.src="res/imgs/title.png";
	setTimeout(function(){label.style.opacity = "1";},3000);
}
function loadweb() {
    var timevar = setTimeout(loadweb, 5);
    if (grey.style.opacity < 0) {
		clearTimeout(timevar);
		grey.style.display = "none";
		hint();
    }
    op -= 0.01;
    grey.style.opacity = op;
  }
  
function showillust() {
	ongoing.style.opacity = "0";
	illust.style.display = "flex";
	setTimeout(function(){ongoing.style.display = "none";illust.style.opacity = "1";},10);
	}

function showongoing() {
	illust.style.opacity = "0";
	ongoing.style.display = "flex";
	setTimeout(function(){illust.style.display = "none";ongoing.style.opacity = "1";},10);
	}

function terms(){
	if(termopen == 0){
		termwin.style.display = "flex";
		setTimeout(function(){termwin.style.opacity = "1";},10);
		termopen = 1;
	}else{
		termwin.style.opacity = "0";
		setTimeout(function(){termwin.style.display = "none";},500);
		termopen = 0;
	}
}

//ObserverMainData
const numSteps = 20.0;
let boxElement;
let restRatio = 0.0;
let worksRatio = 0.0;
window.addEventListener("load", (event) => {
  restList = document.querySelector("#rest");
  worksList = document.querySelector("#works");
  	createObserver();
}, false);
function createObserver() {
  let observrest;
  let observworks;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };
  observrest = new IntersectionObserver(handleRest, options);
  observrest.observe(restList);
  observworks = new IntersectionObserver(handleWorks, options);
  observworks.observe(worksList);
}
function buildThresholdList() {
  let thresholds = [];
  let numSteps = 20;
  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}
//RestObserver
function handleRest(entries, observrest) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.25 && restRatio < entry.intersectionRatio) {
      label.style.opacity = "0";
      floatnav.style.opacity = "1";
      floatnav.style.bottom = "2vh";
    } 
    else if (entry.intersectionRatio < 0.35 && restRatio > entry.intersectionRatio) {
	  label.style.opacity = "1";
      floatnav.style.opacity = "0";
      floatnav.style.bottom = "-10vh";
    }
    restRatio = entry.intersectionRatio;
  });
}
//WorksObserver
function handleWorks(entries, observworks) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.3 && worksRatio < entry.intersectionRatio) {
    	var i = 0;                  //  set your counter to 1
		function myLoop() {         //  create a loop function
		  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
			illustimg[i].style.opacity = "1";  //  your code here
			i++;                    //  increment the counter
			if (i < illustimg.length) {           //  if the counter < 10, call the loop function
			  myLoop();             //  ..  again which will trigger another 
			}                       //  ..  setTimeout()
		  }, 200);
		}
		myLoop();
    }
    else if (entry.intersectionRatio < 0.1 && worksRatio > entry.intersectionRatio) {
		for(var i = 0; i<illustimg.length;i++){
		illustimg[i].style.opacity = "0";
		}
    }
    worksRatio = entry.intersectionRatio;
  });
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function getImg(thumblink,link){
	var list = document.getElementById("projects");
	var lichild = document.createElement("div");
	var ogSize = document.createElement("a");
	var childImg = document.createElement("img");
	ogSize.href = link;
	childImg.src = thumblink;
	lichild.appendChild(ogSize);
	lichild.appendChild(childImg);
	list.appendChild(lichild);
}

function getParsed(name,link){
	var list = document.getElementById("container");
	var lichild = document.createElement("a");
	var apname = document.createTextNode(name);
	lichild.href = link;
	lichild.appendChild(apname);
	list.insertBefore(lichild, list.childNodes[0]);
}

function getRaw(){
	firebase.database().ref('supporters').on('value',function(snapshot){
		document.getElementById("container").innerHTML = "";
		snapshot.forEach(
			function(ChildSnapshot){
				let nameraw = ChildSnapshot.key;
				let link = ChildSnapshot.val();
				getParsed(nameraw,link);
				}
			);
	});
}
getRaw();

function getImglink(){
	firebase.database().ref('supporters').on('value',function(snapshot){
		document.getElementById("container").innerHTML = "";
		snapshot.forEach(
			function(ChildSnapshot){
				let nameraw = ChildSnapshot.key;
				let link = ChildSnapshot.val();
				getParsed(nameraw,link);
				}
			);
	});
}
getRaw();