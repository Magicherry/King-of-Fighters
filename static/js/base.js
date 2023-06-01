import { GameMap } from '/static/js/game_map/base.js';
import { Kyo } from '/static/js/player/kyo.js';
class KOF {
    constructor(id) {
        this.$kof = $('#' + id);//用于索引div

        this.game_map = new GameMap(this);//创建地图
        this.players = [  //创建两名角色
            new Kyo(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 120,
                height: 200,
                color: 'blue',
            }),
            new Kyo(this, {
                id: 1,
                x: 900,
                y: 0,
                width: 120,
                height: 200,
                color: 'red',
            }),
        ];
    }
}

export {
    KOF
}