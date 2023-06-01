export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;

        this.pressed_keys = new Set();//用Set()来防止一个按键一直触发,判重
        this.start();
    }

    start() {
        let outer = this; //因为下面要用到this，而里面的this和外面的不同，故赋值
        this.$canvas.keydown(function (e) {
            //这里的this指向的是$canvas
            outer.pressed_keys.add(e.key);
            //console.log(this);
        });

        this.$canvas.keyup(function(e) { //按起后删除
            outer.pressed_keys.delete(e.key); 
        });
    }
}