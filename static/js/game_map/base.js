import { AcGameObject } from '/static/js/ac_game_object/base.js';
import { Controller } from '/static/js/controller/base.js'
export class GameMap extends AcGameObject {
    constructor(root) {  //这里的root，是new GameMap类时引入的参数， 后面会在主base.js中创建对象，引入的参数是KOF对象
        super(); //这里的super表示父类构造函数
        //调用canvas， tabindex 用于聚焦
        this.root = root;
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');//jquery中的canvas是数组
        //用$kof索引标签，聚焦canvas , ctx是canvas的对象
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        this.controller = new Controller(this.$canvas);

        //初始化血条
        this.root.$kof.append($(`<div class="kof-head">
        <div class="kof-head-hp-0"><div><div></div></div></div>
        <div class="kof-head-timer">60</div>
        <div class="kof-head-hp-1"><div><div></div></div></div>
    </div>`));
        this.root.$kof.append($(`<div class ="kof-bao"> 
        <div class="kof-bao-0"><div></div></div>
        <div class="kof-bao-1"><div></div></div>
    </div>`));

        this.time_left = 120000; //毫秒
        this.$timer = this.root.$kof.find(".kof-head-timer");
    }

    start() {

    }

    update() {
        //更新时间
        this.time_left -= this.timedelta;
        if(this.time_left < 0){
             this.time_left = 0;
             
            let [a, b] = this.root.players; //若时间到了则都倒地
            if(a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
        }
        this.$timer.text(parseInt(this.time_left / 1000));
        this.render();
    }

    render() { //渲染地图
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //console.log(this.ctx.canvas.width);
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    }
}