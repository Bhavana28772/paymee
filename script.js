/****************************
 * DATA
 ****************************/
const linesText = [
  "You were always playful and fun,never very serious",
  "I expected you to be same even now",
  "But you've grown a lot and taken on all responsibilities.",
  "Seeing how matured and responsible you are,makes me really happyyy!"
];

const birthdayMessage = "Happy Birthday!";

/****************************
 * ELEMENTS
 ****************************/
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const messageScreen = document.getElementById("messageScreen");
const linesDiv = document.getElementById("lines");
const birthdayText = document.getElementById("birthdayText");
const subText = document.getElementById("subText");
const continueBtn = document.getElementById("continueBtn");
const story = document.getElementById("story");

/****************************
 * START BUTTON
 ****************************/
startBtn.onclick = () => {
  startScreen.style.display = "none";
  messageScreen.classList.remove("hidden")

  // reset
  linesDiv.innerHTML = "";
  linesDiv.style.display = "block";
  birthdayText.classList.add("hidden");
  subText.classList.add("hidden");
  continueBtn.classList.add("hidden");

  typeLines(0);
};

/****************************
 * TYPE 4 LINES
 ****************************/
function typeLines(index) {
  if (index >= linesText.length) {

    // fade out all lines
    setTimeout(() => {
      linesDiv.classList.add("fade-out");
    }, 800);

    // remove lines & show birthday
    setTimeout(() => {
      linesDiv.innerHTML = "";
      linesDiv.style.display = "none";

      typeText(birthdayText, birthdayMessage, () => {
       createBlossoms(40);


        // SECOND LINE FADE IN
        setTimeout(() => {
          subText.classList.remove("hidden");
          subText.style.opacity = 0;
          subText.style.transition = "opacity 1.5s ease";

          requestAnimationFrame(() => {
            subText.style.opacity = 1;
          });
        }, 600);

        // BUTTON AFTER FADE
        setTimeout(() => {
          continueBtn.classList.remove("hidden");
        }, 2200);

      });

    }, 2000);

    return;
  }

  const p = document.createElement("p");
  p.className = "line lightning";
  linesDiv.appendChild(p);

  let i = 0;
  const typing = setInterval(() => {
    p.textContent += linesText[index][i];
    i++;

    if (i === linesText[index].length) {
      clearInterval(typing);
      setTimeout(() => typeLines(index + 1), 700);
    }
  }, 45);
}

/****************************
 * TYPING FUNCTION
 ****************************/
function typeText(element, text, callback) {
  element.classList.remove("hidden");
  element.textContent = "";
  element.style.opacity = 1;

  let i = 0;
  const typing = setInterval(() => {
    element.textContent += text[i];
    i++;

    if (i === text.length) {
      clearInterval(typing);
      if (callback) callback();
    }
  }, 70);
}

/****************************
 * CONTINUE BUTTON
 ****************************/
continueBtn.onclick = () => {
  messageScreen.style.display = "none";
  continueBtn.style.display = "none";
  story.classList.remove("hidden");

  // show story text first
  const intro = document.querySelector(".intro");
  intro.style.opacity = 0;
  intro.style.transition = "opacity 1.5s ease";

  setTimeout(() => {
    intro.style.opacity = 1;
  }, 300);

  const cards = document.querySelectorAll(".card");

  // hide cards initially
  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(50px)";
  });

  // show images after 2 seconds
  setTimeout(() => {
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }, i * 1400);
    });
  }, 2000);
};

/****************************
 * BLOSSOMS
 ****************************/
function createBlossoms(count) {
  const container = document.getElementById("blossoms");

  for (let i = 0; i < count; i++) {
    const blossom = document.createElement("div");
    blossom.className = "blossom";
    blossom.style.left = Math.random() * 100 + "vw";

    const size = Math.random() * 12 + 8;
    blossom.style.width = size + "px";
    blossom.style.height = size + "px";

    const duration = Math.random() * 3 + 4;
    blossom.style.animationDuration = duration + "s";

    container.appendChild(blossom);
    setTimeout(() => blossom.remove(), duration * 1000);
  }
}
let imageMusicPlayed = false;

function showImages() {
  const cards = document.querySelectorAll(".card");
  const music = document.getElementById("imageMusic");

  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(40px)";
  });

  setTimeout(() => {
    cards.forEach((card, index) => {
      setTimeout(() => {

        // 🎧 PLAY AUDIO ONLY ON FIRST IMAGE
        if (!imageMusicPlayed && music) {
          music.volume = 0.4;
          music.play();
          imageMusicPlayed = true;
        }

        card.style.opacity = 1;
        card.style.transform = "translateY(0)";

      }, index * 600);
    });
  }, 2000);
}
const thankYou = document.getElementById("thankYou");

continueBtn.onclick = () => {
  messageScreen.style.display = "none";
  continueBtn.style.display = "none";
  story.classList.remove("hidden");

  const intro = document.querySelector(".intro");
  setTimeout(() => intro.style.opacity = 1, 500);

  const cards = document.querySelectorAll(".card");

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, 1400 + i * 1400);
  });

  // Show Thank You after all cards
  const totalTime = 1400 + cards.length * 1400 + 1500;

  setTimeout(() => {
    thankYou.classList.remove("hidden");
thankYou.style.opacity = 1;
thankYou.scrollIntoView({ behavior: "smooth", block: "center" });

  }, totalTime);
};

