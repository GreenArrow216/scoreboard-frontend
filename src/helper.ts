import confetti from "canvas-confetti";

// Function to initialize and throw confetti
export function throwConfetti(winnerSide: "left" | "right") {
  const canvas = document.getElementById("my-canvas") as HTMLCanvasElement;

  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const end = Date.now() + 5 * 1000;

  (function frame() {
    if (winnerSide === "left") {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 100,
        origin: { x: 0 },
        colors: ["#0000ff", "#00ff00"],
      });
    } else {
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 100,
        origin: { x: 1 },
        colors: ["#ff0000","#00ff00"],
      });
    }

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function formatDate(isoDate:string) {
const date = new Date(isoDate);
console.log({date, isoDate})

// Extract parts of the date
const day = String(date.getUTCDate()).padStart(2, '0');
const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const year = date.getUTCFullYear();

const hours = date.getUTCHours() % 12 || 12; // Convert 24-hour time to 12-hour time
const minutes = String(date.getUTCMinutes()).padStart(2, '0');
const amPm = date.getUTCHours() >= 12 ? 'PM' : 'AM';

// Combine into desired format
 return `${day}/${month}/${year} - ${hours}:${minutes} ${amPm}`;
}
