const musicChoices = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://files.catbox.moe/66353n.mp3'
];

const backgroundMusic = new Audio(musicChoices[Math.floor(Math.random() * musicChoices.length)]);
backgroundMusic.loop = true;
backgroundMusic.muted = true;
backgroundMusic.volume = 0.5;

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
    console.log('The selected music file failed to load.');
  });
});
