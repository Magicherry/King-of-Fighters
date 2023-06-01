import { Player } from '/static/js/player/base.js';
import { GIF } from '/static/js/utils/gif.js';

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }


    init_animations() { //初始化动画
        let outer = this;
        let offsets = [0, -22, -22, -120, 0, 0, 0, 0, 0, -120, -180];
        let offsetsx = [0, 0, 0, 0, 0,  0, 0, 0, 0, 0, -70];
        for (let i = 0; i < 11; i++) {
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0,//存有多少帧数
                frame_rate: 5,//每5帧过度一次
                offset_y: offsets[i], //y方向偏移量
                offset_x: offsetsx[i],
                loaded: false,//是否加载完成，加载完成才能渲染
                scale: 2, //放大两倍
            });
            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
                if (i === 3) {
                    obj.frame_rate = 4;
                }
            }
        }
    }
}