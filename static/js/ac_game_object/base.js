let AC_GAME_OBJECTS = [];/*用于存储该对象的所有元素*/

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.timedelta = 0; //存储当前这一帧距离上一帧的时间
        this.has_call_start = false;//用于表示当前对象有没有执行过start函数
    }

    start() { //初始化执行一次

    }

    update() { //每一帧执行一次

    }

    destroy() { //删除当前对象,即删除所有元素
        for (let i in AC_GAME_OBJECTS) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;/*用于记录上一帧在哪个时间*/

let AC_GAME_OBJECTS_FRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECTS) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
}
requestAnimationFrame(AC_GAME_OBJECTS_FRAME);

export {
    AcGameObject
}