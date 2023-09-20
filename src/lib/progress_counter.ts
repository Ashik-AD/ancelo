export interface ProgressCountCb {
  hour: number;
  minute: number;
  second: number;
  progress: number;
}
const count = {
  hour: 0,
  minute: 0,
  second: 0,
  progress: 0,
};

let timer: any;
let callBack: any;

export default Object.freeze({
  getProgress: () => count,
  startProgress: (cb: (value: ProgressCountCb) => void) => {
    callBack = cb;
    
    if (!timer) {
      timer = setInterval(calcProgress, 1000);
    }

    function calcProgress() {
      if (count.second >= 59) {
        count.second = 0;
        count.minute += 1;
      } else {
        count.second++;
      }

      if (count.minute > 59) {
        count.minute = 0;
        count.hour += 1;
      }
      count.progress++;

      callBack({
        hour: count.hour,
        second: count.second,
        minute: count.minute,
        progress: count.progress,
      });
    }
  },
  stop: () => {
    if(timer) {
      clearInterval(timer);
      timer = null;
    }  
  },

  reset: () => {
    count.hour = 0;
    count.minute = 0;
    count.second = 0;
    count.progress = 0;
  }
});
