let player;
let isMuted = true;

function onYouTubeIframeAPIReady() {
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
        player.playVideo();
        player.mute();
      },
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.ENDED) {
          player.seekTo(0);
          player.playVideo();
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('musicToggle');

  if (!toggleButton) return;

  toggleButton.addEventListener('click', function () {
    if (!player) return;

    if (isMuted) {
      player.unMute();
      toggleButton.textContent = '🔊 Music';
    } else {
      player.mute();
      toggleButton.textContent = '🔇 Music';
    }

    isMuted = !isMuted;
  });
});
