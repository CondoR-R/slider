"use strict";

// DOM-элементы на которые можно кликать
const btnLeft = document.querySelector(".btn-left"),
  btnRight = document.querySelector(".btn-right"),
  circles = document.querySelectorAll(".circle");

// DOM-элементы, подвергающиеся изменению или необходимы для вычислений
const images = document.querySelectorAll(".img"),
  imgBox = document.querySelector(".img-box");

// вычисляемые входные данные
const sliderLength = images.length - 1,
  imageWidth = +getComputedStyle(images[0]).width.slice(0, -3),
  widthBetweenImages = +getComputedStyle(imgBox).columnGap.slice(0, -3);

// отслеживание текущей позиции
let position = 0;

function stepRight(pos) {
  const currentPosition =
    pos === -(imageWidth + widthBetweenImages) * sliderLength
      ? 0
      : pos - (imageWidth + widthBetweenImages);
  images.forEach(
    (img) => (img.style.transform = `translateX(${currentPosition}rem)`)
  );
  return currentPosition;
}

function stepLeft(pos) {
  const currentPosition =
    pos === 0
      ? -(imageWidth + widthBetweenImages) * sliderLength
      : pos + (imageWidth + widthBetweenImages);
  images.forEach(
    (img) => (img.style.transform = `translateX(${currentPosition}rem)`)
  );
  return currentPosition;
}

function changeImage(i) {
  const currentPosition = -(imageWidth + widthBetweenImages) * i;
  images.forEach(
    (img) => (img.style.transform = `translateX(${currentPosition}rem)`)
  );
  return currentPosition;
}

function changeCircle(pos) {
  const circleIndex = Math.abs(pos) / (imageWidth + widthBetweenImages);
  document.querySelector(".current-circle").classList.remove("current-circle");
  circles[circleIndex].classList.add("current-circle");
}

function clickRight() {
  position = stepRight(position);
  changeCircle(position);
}

function clickLeft() {
  position = stepLeft(position);
  changeCircle(position);
}

function clickCircle(i) {
  position = changeImage(i);
  changeCircle(position);
}

circles.forEach((circle, index) => {
  circle.addEventListener("click", () => clickCircle(index));
});

btnRight.addEventListener("click", clickRight);
btnLeft.addEventListener("click", clickLeft);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      clickLeft();
      break;
    case "ArrowRight":
      clickRight();
      break;
  }
});
