// ============================================
// HAPPY BIRTHDAY KASHISH ❤️
// PREMIUM BIRTHDAY EXPERIENCE
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    const $ = (id) => document.getElementById(id);

    const pages = document.querySelectorAll(".page");
    const hearts = $("hearts");
    const confetti = $("confetti");

    const firstGift = $("firstGift");
    const giftInstruction = $("giftInstruction");
    const birthdayReveal = $("birthdayReveal");
    const startJourney = $("startJourney");

    const candle = $("candle");
    const flame = $("flame");
    const candleMessage = $("candleMessage");
    const blowCandle = $("blowCandle");
    const next3 = $("next3");

    const balloons = [...document.querySelectorAll(".balloon")];
    const balloonCounter = $("balloonCounter");
    const balloonMessage = $("balloonMessage");
    const balloonContinue = $("balloonContinue");

    const gift3 = $("gift3");
    const giftMessage = $("giftMessage");
    const next4 = $("next4");

    const scratchCard = $("scratchCard");
    const scratchCanvas = $("scratchCanvas");
    const myPhoto = $("myPhoto");
    const next5 = $("next5");
    const scratchHint = scratchCard
        ? scratchCard.querySelector(".scratch-hint")
        : null;

    const openLetter = $("openLetter");
    const letter = $("letter");
    const letterHint = $("letterHint");
    const letterText = $("letterText");
    const nextFinal = $("nextFinal");
    const restart = $("restart");

    const birthdayMusic = $("birthdayMusic");
    const musicToggle = $("musicToggle");
    const musicStatus = $("musicStatus");

    // Change this message whenever you want.
    const friendshipLetter =
`Happy Birthday, Kashish! 💗

I hope this new year of your life brings you endless happiness, confidence, success and beautiful memories.

Thank you for being the person you are. May you always have reasons to smile, people who genuinely care about you, and dreams that keep getting bigger.

Never forget how special you are. Keep laughing at the silly things, keep chasing your dreams, and keep being your amazing self.

No matter how busy life gets, I hope we always make time for random talks, silly jokes and unforgettable memories.

Today is your day, so enjoy every little moment. You deserve all the good things life has to offer.

Happy Birthday once again, bestie! 🫶`;

    let giftOpened = false;
    let candleBlown = false;
    let poppedCount = 0;
    let surpriseOpened = false;
    let photoRevealed = false;
    let scratchReady = false;
    let isScratching = false;
    let scratchCount = 0;
    let lastX = null;
    let lastY = null;
    let typingTimer = null;
    let musicEnabled = false;

    // ============================================
    // PAGE NAVIGATION
    // ============================================

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove("active"));

        const target = $(pageId);

        if (!target) {
            console.error("Page not found:", pageId);
            return;
        }

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if (pageId === "page4") {
            requestAnimationFrame(() => {
                setupScratchCard();
            });
        }
    }

    // ============================================
    // HEARTS AND CONFETTI
    // ============================================

    function createHearts(amount = 10) {
        if (!hearts) return;

        const emojis = ["❤️", "💕", "💗", "💖", "💘"];

        for (let i = 0; i < amount; i++) {
            const heart = document.createElement("span");

            heart.textContent =
                emojis[Math.floor(Math.random() * emojis.length)];

            heart.style.position = "absolute";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.bottom = "-40px";
            heart.style.fontSize = (14 + Math.random() * 18) + "px";
            heart.style.pointerEvents = "none";
            heart.style.animation =
                `floatHeart ${4 + Math.random() * 4}s linear forwards`;

            hearts.appendChild(heart);

            setTimeout(() => heart.remove(), 9000);
        }
    }

    function createConfetti(amount = 60) {
        if (!confetti) return;

        const colors = [
            "#ff4f87",
            "#ffd166",
            "#c77dff",
            "#ff85a1",
            "#ffffff"
        ];

        for (let i = 0; i < amount; i++) {
            const piece = document.createElement("span");

            piece.style.position = "absolute";
            piece.style.left = Math.random() * 100 + "%";
            piece.style.top = "-20px";
            piece.style.width = "8px";
            piece.style.height = "12px";
            piece.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = "2px";
            piece.style.pointerEvents = "none";
            piece.style.animation =
                `fallConfetti ${2 + Math.random() * 3}s linear forwards`;

            confetti.appendChild(piece);

            setTimeout(() => piece.remove(), 5500);
        }
    }

    // ============================================
    // MUSIC PLAYER
    // ============================================

    if (birthdayMusic) {
        birthdayMusic.volume = 0.35;
    }

    if (musicToggle && birthdayMusic) {
        musicToggle.addEventListener("click", async () => {
            if (birthdayMusic.paused) {
                try {
                    await birthdayMusic.play();
                    musicEnabled = true;
                    musicToggle.classList.add("playing");
                    musicToggle.setAttribute("aria-label", "Pause background music");

                    if (musicStatus) {
                        musicStatus.textContent = "Music on";
                    }
                } catch (error) {
                    console.warn("Music could not play:", error);

                    if (musicStatus) {
                        musicStatus.textContent = "Check music file";
                    }
                }
            } else {
                birthdayMusic.pause();
                musicEnabled = false;
                musicToggle.classList.remove("playing");
                musicToggle.setAttribute("aria-label", "Play background music");

                if (musicStatus) {
                    musicStatus.textContent = "Music off";
                }
            }
        });
    }

    // ============================================
    // PAGE 1: CINEMATIC GIFT REVEAL
    // ============================================

    if (firstGift) {
        firstGift.addEventListener("click", () => {
            if (giftOpened) return;
            giftOpened = true;

            firstGift.style.display = "none";

            if (giftInstruction) {
                giftInstruction.style.display = "none";
            }

            const introLabel = document.querySelector("#page1 .intro-label");
            if (introLabel) {
                introLabel.style.display = "none";
            }

            if (birthdayReveal) {
                birthdayReveal.classList.add("show");
            }

            if (startJourney) {
                startJourney.classList.remove("hidden");
            }

            createConfetti(100);
            createHearts(18);

            // Start music after a direct user click.
            if (birthdayMusic && birthdayMusic.paused) {
                birthdayMusic.play()
                    .then(() => {
                        musicEnabled = true;

                        if (musicToggle) {
                            musicToggle.classList.add("playing");
                        }

                        if (musicStatus) {
                            musicStatus.textContent = "Music on";
                        }
                    })
                    .catch(() => {
                        // User can start music with the music button.
                    });
            }
        });
    }

    if (startJourney) {
        startJourney.addEventListener("click", () => {
            showPage("page2");
        });
    }

    // ============================================
    // PAGE 2: CANDLE AND CAKE
    // ============================================

    function blowOutCandle() {
        if (candleBlown) return;
        candleBlown = true;

        if (flame) {
            flame.classList.add("flame-out");
            flame.style.opacity = "0";
            flame.style.transform = "scale(0)";
            flame.style.pointerEvents = "none";
        }

        if (candleMessage) {
            candleMessage.classList.remove("hidden");
        }

        if (blowCandle) {
            blowCandle.classList.add("hidden");
        }

        if (next3) {
            next3.classList.remove("hidden");
        }

        createConfetti(60);
        createHearts(12);
    }

    if (candle) {
        candle.addEventListener("click", blowOutCandle);

        candle.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                blowOutCandle();
            }
        });
    }

    if (blowCandle) {
        blowCandle.addEventListener("click", blowOutCandle);
    }

    if (next3) {
        next3.addEventListener("click", () => {
            showPage("pageBalloon");
        });
    }

    // ============================================
    // BALLOON POP GAME
    // ============================================

    function updateBalloonCounter() {
        if (balloonCounter) {
            balloonCounter.textContent =
                `Balloons popped: ${poppedCount} / ${balloons.length}`;
        }
    }

    balloons.forEach(balloon => {
        balloon.addEventListener("click", () => {
            if (balloon.classList.contains("popped")) return;

            balloon.classList.add("popped");
            balloon.disabled = true;
            poppedCount++;

            updateBalloonCounter();

            if (balloonMessage) {
                balloonMessage.textContent =
                    balloon.dataset.message ||
                    "Happy Birthday, Kashish! ❤️";

                balloonMessage.classList.remove("hidden");
            }

            createHearts(4);

            if (poppedCount === balloons.length) {
                if (balloonMessage) {
                    balloonMessage.textContent =
                        "You popped them all! 🎉 Here's to laughter, friendship and beautiful memories!";
                }

                if (balloonContinue) {
                    balloonContinue.classList.remove("hidden");
                }

                createConfetti(100);
                createHearts(20);
            }
        });
    });

    updateBalloonCounter();

    if (balloonContinue) {
        balloonContinue.addEventListener("click", () => {
            showPage("page3");
        });
    }

    // ============================================
    // PAGE 3: MYSTERY GIFT
    // ============================================

    if (gift3) {
        gift3.addEventListener("click", () => {
            if (surpriseOpened) return;
            surpriseOpened = true;

            gift3.textContent = "💝";
            gift3.classList.add("opened");

            if (giftMessage) {
                giftMessage.classList.remove("hidden");
            }

            if (next4) {
                next4.classList.remove("hidden");
            }

            createHearts(15);
            createConfetti(60);
        });
    }

    if (next4) {
        next4.addEventListener("click", () => {
            showPage("page4");
        });
    }

    // ============================================
    // PAGE 4: SCRATCH-TO-REVEAL PHOTO
    // ============================================

    function setupScratchCard() {
        if (!scratchCanvas || !scratchCard || photoRevealed) return;

        const rect = scratchCard.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const dpr = window.devicePixelRatio || 1;

        scratchCanvas.width = Math.round(rect.width * dpr);
        scratchCanvas.height = Math.round(rect.height * dpr);

        scratchCanvas.style.width = rect.width + "px";
        scratchCanvas.style.height = rect.height + "px";
        scratchCanvas.style.opacity = "1";
        scratchCanvas.style.pointerEvents = "auto";
        scratchCanvas.style.transition = "none";

        const ctx = scratchCanvas.getContext("2d");
        if (!ctx) return;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const gradient = ctx.createLinearGradient(
            0, 0, rect.width, rect.height
        );

        gradient.addColorStop(0, "#ff91b5");
        gradient.addColorStop(0.5, "#ffc2d6");
        gradient.addColorStop(1, "#c77dff");

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 19px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Scratch to reveal ❤️", rect.width / 2, rect.height / 2);

        ctx.globalCompositeOperation = "destination-out";

        scratchReady = true;
        scratchCount = 0;
        isScratching = false;
        lastX = null;
        lastY = null;

        if (scratchHint) {
            scratchHint.style.display = "block";
        }

        if (next5) {
            next5.classList.add("hidden");
        }
    }

    function revealPhoto() {
        if (photoRevealed) return;

        photoRevealed = true;
        isScratching = false;

        if (scratchCanvas) {
            scratchCanvas.style.transition = "opacity .7s ease";
            scratchCanvas.style.opacity = "0";
            scratchCanvas.style.pointerEvents = "none";
        }

        if (scratchHint) {
            scratchHint.style.display = "none";
        }

        if (scratchCard) {
            scratchCard.classList.add("revealed");
        }

        if (next5) {
            next5.classList.remove("hidden");
        }

        createHearts(15);
        createConfetti(50);
    }

    function scratchAt(event) {
        if (!scratchReady || photoRevealed || !scratchCanvas) return;

        const ctx = scratchCanvas.getContext("2d");
        if (!ctx) return;

        const rect = scratchCanvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 38;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();

        if (lastX !== null && lastY !== null) {
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
        } else {
            ctx.arc(x, y, 19, 0, Math.PI * 2);
        }

        ctx.stroke();

        lastX = x;
        lastY = y;
        scratchCount++;

        // Check progress periodically instead of every pointer movement.
        if (scratchCount % 8 === 0) {
            checkScratchProgress();
        }
    }

    function checkScratchProgress() {
        if (!scratchCanvas || photoRevealed) return;

        const ctx = scratchCanvas.getContext("2d");
        if (!ctx) return;

        const width = scratchCanvas.width;
        const height = scratchCanvas.height;
        const imageData = ctx.getImageData(0, 0, width, height);

        let transparent = 0;
        let sampled = 0;

        for (let y = 0; y < height; y += 10) {
            for (let x = 0; x < width; x += 10) {
                const alpha = (y * width + x) * 4 + 3;
                sampled++;

                if (imageData.data[alpha] < 100) {
                    transparent++;
                }
            }
        }

        if (sampled && transparent / sampled > 0.35) {
            revealPhoto();
        }
    }

    if (scratchCanvas) {
        scratchCanvas.addEventListener("pointerdown", event => {
            if (!scratchReady) {
                setupScratchCard();
            }

            if (!scratchReady || photoRevealed) return;

            isScratching = true;
            lastX = null;
            lastY = null;

            if (scratchCanvas.setPointerCapture) {
                scratchCanvas.setPointerCapture(event.pointerId);
            }

            scratchAt(event);
            event.preventDefault();
        });

        scratchCanvas.addEventListener("pointermove", event => {
            if (!isScratching || photoRevealed) return;

            scratchAt(event);
            event.preventDefault();
        });

        const stopScratching = () => {
            isScratching = false;
            lastX = null;
            lastY = null;
        };

        scratchCanvas.addEventListener("pointerup", stopScratching);
        scratchCanvas.addEventListener("pointercancel", stopScratching);
        scratchCanvas.addEventListener("lostpointercapture", stopScratching);
    }

    if (myPhoto) {
        myPhoto.addEventListener("load", () => {
            if (scratchCard && scratchCard.getBoundingClientRect().width) {
                const page4 = $("page4");

                if (page4 && page4.classList.contains("active")) {
                    setupScratchCard();
                }
            }
        });
    }

    if (next5) {
        next5.addEventListener("click", () => {
            showPage("page5");
        });
    }

    // ============================================
    // PAGE 5: TYPING FRIENDSHIP LETTER
    // ============================================

    function typeLetter() {
        if (!letterText) return;

        if (typingTimer) {
            clearInterval(typingTimer);
            typingTimer = null;
        }

        letterText.textContent = "";
        let index = 0;

        typingTimer = setInterval(() => {
            letterText.textContent += friendshipLetter[index] || "";
            index++;

            if (index >= friendshipLetter.length) {
                clearInterval(typingTimer);
                typingTimer = null;

                if (nextFinal) {
                    nextFinal.classList.remove("hidden");
                }

                createHearts(12);
                createConfetti(30);
            }
        }, 22);
    }

    if (openLetter) {
        openLetter.addEventListener("click", () => {
            if (letter && !letter.classList.contains("hidden")) return;

            if (letter) {
                letter.classList.remove("hidden");
            }

            if (letterHint) {
                letterHint.textContent =
                    "A little birthday message for my best friend ❤️";
            }

            openLetter.textContent = "💖";
            openLetter.disabled = true;

            typeLetter();
            createHearts(15);
        });
    }

    // ============================================
    // SECRET FINAL SCREEN
    // ============================================

    if (nextFinal) {
        nextFinal.addEventListener("click", () => {
            showPage("pageFinal");
            createConfetti(120);
            createHearts(25);
        });
    }

    // ============================================
    // REPLAY EVERYTHING
    // ============================================

    if (restart) {
        restart.addEventListener("click", () => {

            // Stop any running letter animation.
            if (typingTimer) {
                clearInterval(typingTimer);
                typingTimer = null;
            }

            // Page 1
            giftOpened = false;

            if (firstGift) {
                firstGift.style.display = "";
            }

            if (giftInstruction) {
                giftInstruction.style.display = "";
            }

            const introLabel = document.querySelector("#page1 .intro-label");
            if (introLabel) {
                introLabel.style.display = "";
            }

            if (birthdayReveal) {
                birthdayReveal.classList.remove("show");
                birthdayReveal.style.opacity = "";
                birthdayReveal.style.visibility = "";
                birthdayReveal.style.transform = "";
            }

            if (startJourney) {
                startJourney.classList.add("hidden");
            }

            // Candle
            candleBlown = false;

            if (flame) {
                flame.classList.remove("flame-out");
                flame.style.opacity = "";
                flame.style.transform = "";
                flame.style.pointerEvents = "";
            }

            if (candleMessage) candleMessage.classList.add("hidden");
            if (blowCandle) blowCandle.classList.remove("hidden");
            if (next3) next3.classList.add("hidden");

            // Balloons
            poppedCount = 0;

            balloons.forEach(balloon => {
                balloon.classList.remove("popped");
                balloon.disabled = false;
            });

            updateBalloonCounter();

            if (balloonMessage) {
                balloonMessage.textContent = "";
                balloonMessage.classList.add("hidden");
            }

            if (balloonContinue) {
                balloonContinue.classList.add("hidden");
            }

            // Mystery gift
            surpriseOpened = false;

            if (gift3) {
                gift3.textContent = "🎁";
                gift3.classList.remove("opened");
            }

            if (giftMessage) giftMessage.classList.add("hidden");
            if (next4) next4.classList.add("hidden");

            // Scratch photo
            photoRevealed = false;
            scratchReady = false;
            isScratching = false;
            scratchCount = 0;
            lastX = null;
            lastY = null;

            if (scratchCard) {
                scratchCard.classList.remove("revealed");
            }

            if (scratchCanvas) {
                scratchCanvas.style.opacity = "1";
                scratchCanvas.style.pointerEvents = "auto";
                scratchCanvas.style.transition = "none";
            }

            if (scratchHint) {
                scratchHint.style.display = "block";
            }

            if (next5) next5.classList.add("hidden");

            // Letter
            if (letter) letter.classList.add("hidden");

            if (letterText) {
                letterText.textContent = "";
            }

            if (letterHint) {
                letterHint.textContent = "Tap the envelope to open your letter.";
            }

            if (openLetter) {
                openLetter.textContent = "💌";
                openLetter.disabled = false;
            }

            if (nextFinal) nextFinal.classList.add("hidden");

            // Return to the start
            showPage("page1");
        });
    }

    // ============================================
    // INITIAL SETUP
    // ============================================

    if (startJourney) startJourney.classList.add("hidden");
    if (next3) next3.classList.add("hidden");
    if (balloonContinue) balloonContinue.classList.add("hidden");
    if (giftMessage) giftMessage.classList.add("hidden");
    if (next4) next4.classList.add("hidden");
    if (next5) next5.classList.add("hidden");
    if (letter) letter.classList.add("hidden");
    if (nextFinal) nextFinal.classList.add("hidden");
    if (candleMessage) candleMessage.classList.add("hidden");

    showPage("page1");
    createHearts(12);

    setInterval(() => {
        if (document.visibilityState === "visible") {
            createHearts(2);
        }
    }, 5000);

});