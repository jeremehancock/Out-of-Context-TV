/**
 * OutOfContextTV - Modern ES6+ Implementation
 */

class TV {
  constructor(videoSelector, interstitialSelector, clipList) {
    this.screen = document.querySelector(videoSelector);
    this.interstitial = document.querySelector(interstitialSelector);
    this.clipList = clipList;
    this.nextInterstitial = false;
    this.interstitialStartTime = null;
    this.clipPos = 0;

    this.init();
  }

  /**
   * Initialize event listeners and start playing
   */
  init() {
    this.screen.addEventListener("loadeddata", () => this.onClipLoaded());
    this.screen.addEventListener("ended", () => this.onClipFinished());
    this.interstitial.addEventListener("loadeddata", () => this.onClipLoaded());
    this.interstitial.addEventListener("ended", () => this.onClipFinished());

    this.buildPlaylist();
    this.loadNextVideo();
  }

  /**
   * Based on: HTML5 video stretch
   * http://coding.vdhdesign.co.nz/?p=29
   * The video tag usually enforces the aspect ratio, but... CSS transforms to the rescue!
   */
  resizeVideo(element) {
    const originalVideoHeight = element.videoHeight;
    const currentVideoHeight = this.screen.offsetHeight;
    const videoContainerHeight = element.parentElement.offsetHeight;
    const currentScale = originalVideoHeight / currentVideoHeight;
    const scaleY = (videoContainerHeight / originalVideoHeight) * currentScale;

    element.style.transformOrigin = "0% 0%";
    element.style.transform = `scaleY(${scaleY})`;
  }

  /**
   * Play a video from the clips directory
   */
  playVideo(videoSrc) {
    this.screen.src = `content/video/clips/${videoSrc}`;
  }

  /**
   * Load the next video in the playlist
   */
  loadNextVideo() {
    // Ensure minimum time between transitions
    if (
      this.interstitialStartTime &&
      Date.now() - this.interstitialStartTime < 750
    ) {
      setTimeout(() => this.loadNextVideo(), 100);
      return;
    }

    this.clipPos++;
    this.playVideo(this.clipList[this.clipPos % this.clipList.length]);
    this.nextInterstitial = true;
    this.resizeVideo(this.interstitial);
  }

  /**
   * Play the interstitial/static between clips
   */
  playInterstitial() {
    this.nextInterstitial = false;
    this.screen.pause();
    this.interstitial.currentTime = 0;
    this.interstitial.play();
    this.interstitial.style.display = "block";
    this.interstitialStartTime = Date.now();
    this.loadNextVideo();
  }

  /**
   * Handle video loaded event
   */
  onClipLoaded() {
    this.interstitial.pause();
    this.interstitial.style.display = "none";
    this.resizeVideo(this.screen);
  }

  /**
   * Handle video end event
   */
  onClipFinished() {
    if (this.nextInterstitial) {
      this.playInterstitial();
    } else {
      this.loadNextVideo();
    }
  }

  /**
   * Shuffle the playlist using Fisher-Yates algorithm
   */
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Build and shuffle the playlist
   */
  buildPlaylist() {
    this.clipList = this.shuffle(this.clipList);
  }
}

/**
 * Initialize the application
 */
async function initApp() {
  try {
    // Fetch clip list
    const response = await fetch("content/clips.json");
    const clipList = await response.json();

    // Initialize TV
    const tv = new TV("video.screen", "video.interstitial", clipList);

    // Setup event listeners
    document.querySelector(".overlay").addEventListener("click", () => {
      tv.onClipFinished();
    });

    document.querySelector("#dumb-circle").addEventListener("click", () => {
      window.open("https://dumbprojects.com", "_blank");
    });

    // Setup mute toggle
    const unmuteBtn = document.querySelector(".unmute");
    const trackVideo = document.querySelector("#track");
    const flipVideo = document.querySelector("#flip");

    unmuteBtn.addEventListener("click", () => {
      trackVideo.muted = !trackVideo.muted;
      flipVideo.muted = !flipVideo.muted;
      unmuteBtn.classList.toggle("mute");
    });
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
