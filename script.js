const tracker = document.getElementById("tracker");
const proposalCard = document.querySelector(".proposal-card");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.querySelector(".escape-btn");
const celebration = document.getElementById("celebration");
const successImage = document.getElementById("successImage");
const hearts = document.querySelector(".hearts");
const leftBalloons = document.querySelector(".left-balloons");
const rightBalloons = document.querySelector(".right-balloons");
let trackingStarted = false;
let mouseX = 0;
let mouseY = 0;
let yesX = yesBtn.offsetLeft;
let yesY = yesBtn.offsetTop;
let noX = noBtn.offsetLeft;
let noY = noBtn.offsetTop;
proposalCard.addEventListener("mouseenter", () => {
    trackingStarted = true;
});
proposalCard.addEventListener("mousemove", (e) => {
    if (!trackingStarted) return;
    const rect = proposalCard.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});
function animateButtons() {
    if (trackingStarted) {
        const targetX = mouseX - yesBtn.offsetWidth / 2;
        const targetY = mouseY - yesBtn.offsetHeight / 2;
        yesX += (targetX - yesX) * 0.08;
        yesY += (targetY - yesY) * 0.08;
        yesX = Math.max(
            0,
            Math.min(
                proposalCard.clientWidth - yesBtn.offsetWidth,
                yesX
            )
        );
        yesY = Math.max(
            0,
            Math.min(
                proposalCard.clientHeight - yesBtn.offsetHeight,
                yesY
            )
        );
        yesBtn.style.left = yesX + "px";
        yesBtn.style.top = yesY + "px";
        const btnCenterX = noX + noBtn.offsetWidth / 2;
        const btnCenterY = noY + noBtn.offsetHeight / 2;

        const dx = mouseX - btnCenterX;
        const dy = mouseY - btnCenterY;

        const distance = Math.hypot(dx, dy);

        if (distance < 90) {

            const padding = 20;

            let randomX;
            let randomY;

            do {

                randomX =
                    Math.random() *
                    (proposalCard.clientWidth - noBtn.offsetWidth - padding * 2) +
                    padding;

                randomY =
                    Math.random() *
                    (proposalCard.clientHeight - noBtn.offsetHeight - padding * 2) +
                    padding;

            } while (

                Math.hypot(randomX - noX, randomY - noY) < 180 ||

                Math.hypot(randomX - mouseX, randomY - mouseY) < 220

            );

            noX = randomX;
            noY = randomY;

            noBtn.style.left = noX + "px";
            noBtn.style.top = noY + "px";

        }
    }
    requestAnimationFrame(animateButtons);
}
animateButtons();
yesBtn.addEventListener("click", () => {
    proposalCard.classList.add("fade-out");
    setTimeout(() => {
        tracker.style.display = "none";
        celebration.style.display = "flex";
        requestAnimationFrame(() => {
            successImage.style.opacity = "1";
            successImage.style.transform = "scale(1)";
        });
    }, 450);
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });
    const confettiInterval = setInterval(() => {
        confetti({
            particleCount: 8,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 8,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 300);
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 7000);
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = (4 + Math.random() * 3) + "s";
        hearts.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }, 300);
    setInterval(() => {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.innerHTML = Math.random() > 0.5 ? "🎈" : "🎉";
        balloon.style.left = Math.random() * 70 + "px";
        balloon.style.animationDuration = (5 + Math.random() * 2) + "s";
        leftBalloons.appendChild(balloon);
        setTimeout(() => {
            balloon.remove();
        }, 7000);
    }, 900);
    setInterval(() => {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.innerHTML = Math.random() > 0.8 ? "🎈" : "🎉";
        balloon.style.right = Math.random() * 150 + "px";
        balloon.style.animationDuration = (6 + Math.random() * 3) + "s";
        rightBalloons.appendChild(balloon);
        setTimeout(() => {
            balloon.remove();
        }, 1000);
    }, 900);
});