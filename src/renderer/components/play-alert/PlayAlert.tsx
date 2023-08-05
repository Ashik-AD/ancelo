
export default function PlayAlert(){

  return(
  <audio id="task__completed-alert" 
      aria-label="Play success alert when task is complete" 
      aria-hidden="true"
      aria-live="assertive">
      <source src="http://127.0.0.1:6699/static/alerts/alert2.mp3" />
  </audio>
  )
}

export const playAlert = (() => {
  let player = document.querySelector('audio#task__completed-alert') as HTMLAudioElement;

  return {
    play: () => {
  player = document.querySelector('audio#task__completed-alert') as HTMLAudioElement;
      player?.play()
    },

    pause: () => {
  player = document.querySelector('audio#task__completed-alert') as HTMLAudioElement;
      player.pause()
    }
  }
})()
