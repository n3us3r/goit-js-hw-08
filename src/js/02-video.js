import throttle from 'lodash.throttle'
import VimeoPlayer from '@vimeo/player'

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);


if (localStorage.getItem('videoplayer-current-time')) {
	player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}

player.on('timeupdate', throttle(function(data) {
	localStorage.setItem('videoplayer-current-time', data.seconds);
}, 1000));
