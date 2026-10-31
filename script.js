let player;
let isMuted = true;
let isPlayerReady = false;
let toggleButton = null;

function applyMusicState() {
  if (!player || !isPlayerReady) return;

  if (isMuted) {
    player.mute();
    player.pauseVideo();
    if (toggleButton) toggleButton.textContent = '🔇 Music';
  } else {
    player.unMute();
    player.playVideo();
    if (toggleButton) toggleButton.textContent = '🔊 Music';
  }
}

window.onYouTubeIframeAPIReady = function () {
  const playerEl = document.getElementById('youtube-player');
  if (!playerEl) return;

  player = new YT.Player('youtube-player', {
    videoId: 'lnTuk9s314s',
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      rel: 0,
      playsinline: 1,
      modestbranding: 1,
      mute: 1
    },
    events: {
      onReady: function () {
        isPlayerReady = true;
        applyMusicState();
      },
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          player.seekTo(0);
          player.playVideo();
        }
      }
    }
  });
};

document.addEventListener('DOMContentLoaded', function () {
  toggleButton = document.getElementById('musicToggle');

  if (!toggleButton) return;

  toggleButton.addEventListener('click', function () {
    isMuted = !isMuted;

    if (player && isPlayerReady) {
      applyMusicState();
    }
  });
});
