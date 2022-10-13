export function checkType(data) {
    return Object.prototype.toString.call(data)
}

// 歌词分割
export function formatLyric(lyrics) {
    let arr;
    if (lyrics.lyric) {
        // [00:00.000] xxxxx
        arr = lyrics.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
            let min = item.slice(item.indexOf("[") + 1, item.indexOf(":"));
            let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
            let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
            let lrc = item.slice(item.indexOf("]") + 1, item.length);
            let time = parseInt(min) * 60 + parseInt(sec) + parseInt(mill) / 1000;
            // console.log(min,sec,Number(mill),lrc);
            return { min, sec, mill, time, lrc };
        });

        arr.forEach((item, i) => {
            if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                item.pre = 100000;
            } else {
                item.pre = arr[i + 1].time;
            }
        });
    }
    // console.log(arr);
    return arr;
}

// 格式化时间年
export function formatTime(val){
    if (!val) {
        return ''
    }
    let date = new Date(val);
    let today = new Date();
    let year = date.getFullYear();
    let mon = date.getMonth()+1;
    let age = today.getFullYear() - year;
    let create = year+'年'+mon+'月';
    return {age:age,create:create};
}

// 性别
export function formatGender(val){

    if (val === 1) {
        return '男'
    }else if (val === 0) {
        return '女'
    }
    else {
        return 'error'
    }
}

export const replaceStar = (str) => {
    if (!str) { 
      return str;
    }
    let reg = /(\d{3})\d{4}(\d{4})/
    return str.replace(reg,'$1****$2')
  };

