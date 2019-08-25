$.getJSON("https://raw.githubusercontent.com/mhancoc7/OutOfContextTV/master/content/clips.json", function (data) {
    var clip_list = data;

    var TV = function (video_selector, interstitial_selector) {

        var _screen = $(video_selector);
        var _interstitial = $(interstitial_selector);
        var _self = this;
        var _next_interstitial = false;
        var _interstitial_start_time;
        var _clip_pos = 0;


        /**
         *
         * Based on:
         * HTML5 video stretch
         * http://coding.vdhdesign.co.nz/?p=29
         * The video tag usually enforces the aspect ratio, but... CSS transforms to the rescue!
         *
         * @constructor
         */
        this.resizeVideo = function (element) {
            var iOriginalVideoHeight = element.videoHeight;
            var iCurrentVideoHeight = _screen.height();
            var iVideoContainerHeight = $(element).parent().height();
            var iCurrentScale = iOriginalVideoHeight / iCurrentVideoHeight;
            var iScaleY = (iVideoContainerHeight / iOriginalVideoHeight) * iCurrentScale;


            //Important to note: Set the origin to the top left corner (0% 0%), or else the position of the video goes astray
            $(element).css({
                "transform-origin": "0% 0%",
                "transform": "scaleY(" + iScaleY + ")",
                "-ms-transform-origin": "0% 0% ", /* IE 9 */
                "-ms-transform": "scaleY(" + iScaleY + ")", /* IE 9 */
                "-moz-transform-origin": "0% 0%", /* Firefox */
                "-moz-transform": "scaleY(" + iScaleY + ")", /* Firefox */
                "-webkit-transform-origin": "0% 0%", /* Safari and Chrome */
                "-webkit-transform": "scaleY(" + iScaleY + ")", /* Safari and Chrome */
                "-o-transform-origin": "0% 0%", /* Opera */
                "-o-transform": "scaleY(" + iScaleY + ")" /* Opera */
            });
        };

        /**
         *
         * @param video_src
         */
        function playVideo(video_src) {
            _screen[0].src = "https://raw.githubusercontent.com/mhancoc7/OutOfContextTV/master/content/video/clips/" + video_src;
        }

        /**
         *
         */
        function loadNextVideo() {

            if ((new Date().getTime() - _interstitial_start_time) < 750) {
                setTimeout(loadNextVideo, 100);
                return;
            }

            var clip_num = Math.round(Math.random() * (clip_list.length - 1));

            _clip_pos++;

            playVideo(clip_list[_clip_pos % clip_list.length]);
            _next_interstitial = true;
            _self.resizeVideo(_interstitial[0]);
        }

        /**
         *
         */
        function playInterstitial() {
            _next_interstitial = false;
            _screen[0].pause();
            _interstitial[0].currentTime = 0;
            _interstitial[0].play();
            _interstitial.show();
            _interstitial_start_time = new Date().getTime();
            loadNextVideo();
        }

        /**
         *
         */
        this.onClipLoaded = function () {
            _interstitial[0].pause();
            _interstitial.hide();
            this.resizeVideo(_screen[0]);
        };

        /**
         * When we're playing an interstitial, this will
         */
        this.onClipFinished = function () {
            if (_next_interstitial == true) {
                playInterstitial();
            } else {
                loadNextVideo();
            }

        };

        /**
         * Shuffle an array
         * http://stackoverflow.com/a/6274381/14615
         * @param o
         * @returns {*}
         */
        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
            }
            return o;
        }

        function buildPlaylist() {
            shuffle(clip_list);
        }

        buildPlaylist();
        loadNextVideo();
    };

    /************************************************************
     * Main
     ************************************************************/
    $(document).ready(function () {
        tv = new TV("video.screen", "video.interstitial");
        $(".overlay").click(function () {
            tv.onClipFinished();
        });
    });

});