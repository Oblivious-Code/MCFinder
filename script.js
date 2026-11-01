const musicChoices = [
  'https://files.catbox.moe/xmdojz404.mp3',
  'https://files.catbox.moe/66353n404.mp3'
];

const backgroundMusic = new Audio();
let currentTrack = 0;

function loadTrack(index) {
  currentTrack = index;
  backgroundMusic.src = musicChoices[index];
  backgroundMusic.load();
  backgroundMusic.loop = true;
  backgroundMusic.muted = true;
  backgroundMusic.volume = 0.5;
}

function setMusicButtonState(isMuted) {
  const musicToggle = document.getElementById('musicToggle');
  if (!musicToggle) return;

  musicToggle.dataset.muted = String(isMuted);
  musicToggle.textContent = isMuted ? '🔇 Music' : '🔊 Music';
}

function nextTrack() {
  const nextIndex = (currentTrack + 1) % musicChoices.length;
  loadTrack(nextIndex);
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

  const startIndex = Math.floor(Math.random() * musicChoices.length);
  loadTrack(startIndex);

  if (!musicToggle.dataset.muted) {
    setMusicButtonState(true);
  } else {
    setMusicButtonState(musicToggle.dataset.muted === 'true');
  }

  musicToggle.addEventListener('click', toggleMusic);

  backgroundMusic.addEventListener('error', () => {
    nextTrack();

    if (musicToggle.dataset.muted === 'false') {
      backgroundMusic.muted = false;
      backgroundMusic.play().catch(() => {});
    }
  });
});
