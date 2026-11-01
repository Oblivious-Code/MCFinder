const musicChoices = [
  'https://files.catbox.moe/xmdojz.mp3',
  'https://files.catbox.moe/66353n.mp3',
];

const backgroundMusic = new Audio();
let currentMusicIndex = 0;
let isMusicInitialized = false;

function loadMusic(index = 0) {
  currentMusicIndex = index;
  backgroundMusic.src = musicChoices[index];
  backgroundMusic.load();
  backgroundMusic.loop = true;
  backgroundMusic.muted = true;
  backgroundMusic.volume = 0.5;
}

loadMusic();

function setMusicButtonState(isMuted) {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;

  musicToggle.dataset.muted = String(isMuted);
  musicToggle.textContent = isMuted ? '🔇 Music' : '🔊 Music';
}

async function toggleMusic() {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;

  const isMuted = musicToggle.dataset.muted === 'true';

  if (isMuted) {
    backgroundMusic.muted = false;
    try {
      await backgroundMusic.play();
      setMusicButtonState(false);
    } catch (error) {
      console.log('Music play blocked until user interaction:', error);
      backgroundMusic.muted = true;
      setMusicButtonState(true);
    }
  } else {
    backgroundMusic.muted = true;
    backgroundMusic.pause();
    setMusicButtonState(true);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;

  setMusicButtonState(true);
  musicToggle.addEventListener('click', toggleMusic);

  backgroundMusic.addEventListener('error', () => {
    const nextIndex = (currentMusicIndex + 1) % musicChoices.length;
    if (nextIndex !== currentMusicIndex) {
      loadMusic(nextIndex);
      if (musicToggle.dataset.muted === 'false') {
        backgroundMusic.muted = false;
        backgroundMusic.play().catch(() => {});
      }
    } else {
      console.log('All music sources failed to load.');
    }
  });
});
