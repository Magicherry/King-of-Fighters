import { AcGameObject } from '/static/js/ac_game_object/base.js';

export class Player extends AcGameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.id = info.id; //用id来判断左右
        this.x = info.x; //这里x指的是角色目前所在的位置
        this.y = info.y;
        this.width = info.width; //指角色宽度
        this.height = info.height; //指角色身高
        this.color = info.color;

        this.direction = 1;

        this.vx = 0;
        this.vy = 0;
        this.speedx = 500;//水平速度
        this.speedy = -1200;//跳起的初始速度

        this.gravity = 50;

        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.status = 3; //状态机 0:idle, 1：向前 3：跳跃, 4:攻击 ,  5:被打，6: 死亡
        this.animations = new Map();//将每一个动作存入map中
        this.frame_current_cnt = 0;//表示当前记录了多少帧

        this.hp = 100;
        this.bao = 0;
        this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id}>div`);//绑定标签
        this.$hp_div = this.$hp.find(`div`); //找到里面的div
        this.$bao = this.root.$kof.find(`.kof-bao-${this.id}>div`);//绑定标签
       // this.$bao_div = this.$bao.find('div');
    }

    start() {

    }

    update_control() { //操控函数
        let w, a, d, j, shift,k, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            j = this.pressed_keys.has('j');
            shift = this.pressed_keys.has('Shift');
            k = this.pressed_keys.has('k');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            j = this.pressed_keys.has('1');
            shift = this.pressed_keys.has('.');
            k = this.pressed_keys.has('2');
            space = this.pressed_keys.has('Enter');
        }

        if (this.status === 0 || this.status === 1) {
            if (j) {
                if(w){  //跳拳
                     this.status = 9;
                     if(this.direction > 0)
                     this.vx =  this.speedx;
                     else 
                     this.vx = - this.speedx;

                     this.frame_current_cnt = 0;
                     this.vy = this.speedy ;
                }else { 
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
                }
            } else if(k) {
                this.status = 8;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = - this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
          
            } else if(shift) {
                if (d || a) {

                if(this.direction > 0) {
                    this.vx = this.speedx * 1.5;
                }
                else {
                    this.vx =- this.speedx * 1.5;
                }
                this.status = 7;
                this.frame_current_cnt = 0;
            } 
            } 
            else if (d) {
                if(space && this.bao === 100) {
                    this.status = 10;
                    this.frame_current_cnt = 0;
                    this.vx = this.speedx;
                    this.vy = this.speedy;    
            } else {
                this.vx = this.speedx;
                this.status = 1;
            }

            } else if (a) {
                if(space && this.bao === 100) {
                    this.status = 10;
                    this.frame_current_cnt = 0;
                    this.vx = - this.speedx;
                    this.vy = this.speedy;  
                } else {
                    this.vx = - this.speedx;
                    this.status = 1;
                }

            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_move() {
        this.vy += this.gravity;
     

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        //实现推人效果
        // let [a, b] = this.root.players;
        // if(a !== this) [a,b] = [b, a];

        // let r1 = {
        //     x1: a.x,
        //     y1: a.y,
        //     x2: a.x + a.width,
        //     y2: a.y + a.height,
        // };
        // let r2 = {
        //     x1: b.x,
        //     y1: b.y,
        //     x2: b.x + b.width,
        //     y2: b.y + b.height,
        // };
        // if(this.is_collision(r1,r2)){ //可以站头上
        //     b.vy = 0;
        //     b.vy -= this.gravity ;
        // }
        // if(a.x > a.width && b.x < 1280 - b.width)
        // if(this.is_collision(r1,r2)) { //当重叠时，则开推
        //     // a.x -= this.vx * this.timedelta / 1000 / 2;
        //     // a.y -= this.vy * this.timedelta / 1000 / 2;
        //     this.vy = 0;
        //     b.x += this.vx * this.timedelta / 1000 ;
        //     b.y += this.vy * this.timedelta / 1000 ;
            
        //     if(this.status === 3) this.status = 0; 
        // }
        if (this.y > 450 ) {
            this.y = 450;
            this.vy = 0;
            if(this.status === 3  || this.status === 9)
            this.status = 0;//跳跃完成后变为静止状态
        }

        //控制不能走出地图
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }
    update_direction() {  //使玩家对称
        if(this.status === 6)  return;

        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }
    is_attack() { //被打函数
        if(this.status === 6)  return; //倒地后不能被攻击
        this.status = 5;
        this.frame_current_cnt = 0;

        this.hp = Math.max(this.hp - 5, 0);
        this.bao = Math.min(this.bao + 10, 100);

        //渐变函数animate,先变里面的div//改变血量,现有血量为父元素宽度乘以当前血的百分比
        this.$hp_div.animate({      
        width:this.$hp.parent().width() * this.hp / 100,
        },300); 

        this.$hp.animate({  //再变外面的div
        width:this.$hp.parent().width() * this.hp / 100,
        },800); 

        this.$bao.width(this.$bao.parent().width() * this.bao / 100);
    

        

        if (this.hp <= 0) {
            this.status = 6;
            this.frame_current_cnt = 0;
            this.vx = 0;
        }
    }
    //碰撞检测函数，即当水平和竖直方向同时有交集时
    is_collision(r1, r2) {
        if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
            return false;
        if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
            return false;
        return true;
    }
    update_attack() { //攻击函数
        if (this.status === 4 && this.frame_current_cnt === 18) { //18帧刚好挥出拳头
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = { //长方形的红色长条攻击
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 120 + 100,
                    y2: me.y + 40 + 20,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 100,
                    y1: me.y + 40,
                    x2: me.x + me.width - 120 - 100 + 100,
                    y2: me.y + 40 + 20,
                };
            }
            let r2 = {  //蓝色身体矩形
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };

            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        } else if(this.status === 8 && this.frame_current_cnt === 19) { //踢腿攻击
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = { //长方形的红色长条攻击
                    x1: me.x + 220,
                    y1: me.y + me.height - 40,
                    x2: me.x + 220 + 20,
                    y2: me.y + me.height  - 40 + 20,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 220 - 20,
                    y1: me.y + me.height - 40,
                    x2: me.x + me.width - 220 - 20 + 20,
                    y2: me.y + me.height - 40 + 20,
                };
            }
            let r2 = {  //蓝色身体矩形
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };

            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        } else if(this.status === 9 && this.frame_current_cnt === 18) { //飞拳攻击
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = { //长方形的红色长条攻击
                    x1: me.x + 120,
                    y1: me.y ,
                    x2: me.x + 120 + 80,
                    y2: me.y  + 60,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 80,
                    y1: me.y ,
                    x2: me.x + me.width - 120 - 80 + 80,
                    y2: me.y + 60,
                };
            }
            let r2 = {  //蓝色身体矩形
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };

            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        }else if(this.status === 10 && this.frame_current_cnt === 18) { //技能攻击
            let me = this, you = this.root.players[1 - this.id];
            let r1;
            if (this.direction > 0) {
                r1 = { 
                    x1: me.x - 80,
                    y1: me.y - 50,
                    x2: me.x + 120 + 280,
                    y2: me.y  + 250,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 80,
                    y1: me.y - 50,
                    x2: me.x + me.width - 120 - 80 + 280,
                    y2: me.y + 250,
                };
            }
            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };

            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        }
    }
    update() {

        this.update_control();
        this.update_move();
        this.update_direction();
        this.update_attack();
        this.render();
    }

    render() { //渲染两名角色
        //画出玩家长方体
        // this.ctx.fillStyle = 'blue';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // //画出攻击小方块
        // if (this.direction > 0) {
        //     this.ctx.fillStyle = 'red';
        //     this.ctx.fillRect(this.x + 200, this.y + 40, 20, 20); //手臂攻击
        //     this.ctx.fillRect(this.x + 220, this.y + this.height - 40, 20, 20); //踢腿攻击
        //     this.ctx.fillRect(this.x + 120, this.y , 80, 60); //飞拳攻击
        //     this.ctx.fillRect(this.x - 80, this.y - 50, 280,250); //技能攻击
        // } else {
        //     this.ctx.fillStyle = 'green';
        //     this.ctx.fillRect(this.x + this.width - 200 -20, this.y + 40, 20, 20);
        //     this.ctx.fillRect(this.x + this.width - 220 - 20, this.y + this.height - 40, 20, 20); //踢腿攻击
        //     this.ctx.fillRect(this.x + this.width - 120 - 80, this.y , 80, 60); //飞拳攻击
        //     this.ctx.fillRect(this.x + this.width - 120 - 80, this.y - 50, 280,250); //技能攻击
        // }
        let status = this.status;
        //设置后退动作
        if (this.status === 1 && this.direction * this.vx < 0) status = 2

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0) { //调整方向
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;//循环渲染
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x + obj.offset_x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save(); //保存配置
                this.ctx.scale(-1, 1); //翻转x轴
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);//y轴需要平移一个角色的宽度

                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;//循环渲染
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width + obj.offset_x , this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();//调换了坐标系后变换回来
            }
        }

        if (status === 4 || status === 5 || status === 6 || status === 7 || status === 8 || status === 9 || status === 10) //使挥完拳后,或被打后变为静止状态
        {
            if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1))
                if(status === 6) {
                    this.frame_current_cnt --;
                } else {
                    this.status = 0;
                }
               
        }
        this.frame_current_cnt++;
    }
}