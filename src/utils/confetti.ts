import confetti from "canvas-confetti";

/**
 * @function triggerFullScreenConfetti
 * @description Triggers a full-screen confetti animation.
 * It launches confetti from multiple origins to cover more of the screen.
 */
export const triggerFullScreenConfetti = () => {
  const duration = 3 * 1000; // 3 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: [
          "#f43f5e",
          "#3b82f6",
          "#22c55e",
          "#eab308",
          "#ec4899",
          "#8b5cf6",
          "#6366f1",
        ],
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: [
          "#f43f5e",
          "#3b82f6",
          "#22c55e",
          "#eab308",
          "#ec4899",
          "#8b5cf6",
          "#6366f1",
        ],
      }),
    );
  }, 250);
};

/**
 * @function triggerCelebrationConfetti
 * @description Triggers a more centralized, celebratory confetti burst.
 */
export const triggerCelebrationConfetti = () => {
  console.log("[confetti.ts] triggerCelebrationConfetti called");
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: [
      "#f43f5e",
      "#3b82f6",
      "#22c55e",
      "#eab308",
      "#ec4899",
      "#8b5cf6",
      "#6366f1",
    ],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
