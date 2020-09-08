/*

  SKETCH.JS
  Code for the website using p5.js library.

*/

let canvas;
let font;
let pencil;
let yellow;

class Poem {
  constructor() {
    // display in random posiitons
    this.rectSize = 300;
    this.minDegree = -20;
    this.maxDegree = 20;
    this.randomDegree = Math.floor(Math.random() * (this.maxDegree - this.minDegree)) + this.minDegree;
    this.maxTextWidth = 275;
  }

  display() {
    createPoem();

    // display poem within card
    translate(mouseX-70, mouseY-70);
    angleMode(DEGREES);
    rotate(this.randomDegree);

    fill(0); 
    rect(1.5, 1.5, this.rectSize, this.rectSize);
    fill(yellow); 
    strokeWeight(1.5);
    rect(0, 0, this.rectSize, this.rectSize);

    translate(25, 130); 
    fill(0);
    textAlign(LEFT);
    textFont(font, 17);
    text(poemText, 0, 0, this.maxTextWidth);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

// "Info" tab
$(document).ready(function() {

  let info = document.querySelector(".info");
  let infoBackground = document.querySelector(".info-background");
  let close = document.querySelector(".close");

  function toggleModal() { 
    infoBackground.classList.toggle("info-background-show");
  }

  info.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);
});

///////////////////////////////////////////////////////////////////////////////////////////

function preload() {
  font = loadFont("fonts/OverpassMono-Regular.ttf"); 
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  yellow = color(255, 248, 207);
  background(yellow); 

  // function to create fade out effect on text "Click anywhere to generate poem" (html element)
  $("#splash-desktop").fadeOut(4000);
  $("#splash-mobile").fadeOut(4000);

  getTweets(); 
  getGuardian(); 
  getWikipedia(); 
}

function mousePressed() {
  getTweets(); 
  getGuardian(); 
  getWikipedia();

  let poem = new Poem();
  poem.display();
}