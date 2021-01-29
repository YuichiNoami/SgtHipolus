enchant();

window.onload = function() {

    //ゲームオブジェクトを作成
    core = new Core(800, 800);

    //ゲームの初期化処理

    //fpsを設定
    core.fps = 16;

    //画像ファイルを指定
    core.preload('circle.png');

    //プリロード完了時の処理
    core.onload = function() {
        var usagi = 2;
        var hitsuji = 2;

        var label = "";
        var turntail = "組の攻撃";
        var team = "うさぎ";
        var hitlabel = new Label("うさぎHP" + usagi + "　ひつじHP" + hitsuji);
        var turnlabel = new Label("<br>" + team + turntail);
        core.rootScene.addChild(hitlabel);
        core.rootScene.addChild(turnlabel);

        /*ゲームのメイン処理
         **
         */
        //スプライトを作成
        var player = new Sprite(600, 600);
        //スプライトで表示する画像を設定
        player.image = core.assets['circle.png'];
        //表示するフレームの番号を設定
        player.frame = 0;
        //表示位置のx座標
        player.x = 120;
        //同じくy座標
        player.y = 50;

        function kaiten() {
            entity.degree += 8; // ワンフレーム毎に＋５ずつ角度が増える
            entity.rad = (Math.PI / 180) * entity.degree; // ラジアン = PI/180 * 角度
            entity.x = 400 + 180 * Math.cos(entity.rad); // 中心点 + (半径 * cos(ラジアン))
            entity.y = 350 + 180 * Math.sin(entity.rad); // 中心点 + (半径 * sin(ラジアン))

        }

        function callent() {
            entity.x = 400;
            entity.y = 350;
            entity.rad = 0; // ラジアン
            entity.degree = 0;
        }

        function turn(nowteam) {
            core.rootScene.removeChild(hitlabel);
            core.rootScene.removeChild(turnlabel);
            turntail = "組の攻撃";
            team = nowteam;
            hitlabel = new Label("うさぎHP" + usagi + "　ひつじHP" + hitsuji);
            turnlabel = new Label("<br>" + team + turntail);

            core.rootScene.addChild(hitlabel);
            core.rootScene.addChild(turnlabel);
        }

        function battleend() {
            entity.onenterframe = null;
            player.clearEventListener('touchstart');
            core.rootScene.removeChild(hitlabel);
            hitlabel = new Label("うさぎHP" + usagi + "　ひつじHP" + hitsuji);
            core.rootScene.addChild(hitlabel);
            var wincall = new Label("<br><br><br>" + team + "組の勝利！！");
            core.rootScene.addChild(wincall);
        }

        function hit() {
            entity.backgroundColor = "green";
            core.rootScene.removeChild(label);
            label = new Label("<br><br>あたり！");
            core.rootScene.addChild(label);
            callent();
            if (team == "うさぎ") {
                hitsuji--;
                if (hitsuji <= 0)
                    battleend();
                else {
                    turn("ひつじ");
                }

            } else {
                usagi--;
                if (usagi <= 0)
                    battleend();
                else {
                    turn("うさぎ");
                }

            }

        }

        function nothit() {
            entity.backgroundColor = "yellow";
            core.rootScene.removeChild(label);
            label = new Label("<br><br>はずれ…");
            core.rootScene.addChild(label);
            if (team == "うさぎ")
                turn("ひつじ");
            else
                turn("うさぎ");

            callent();
        }

        player.addEventListener('touchstart', function() {
            //entity.onenterframe = null;

            if (entity.x > 510 && entity.x < 595 && entity.y > 250 && entity.y < 335)
                hit();
            else
                nothit();
        });

        //rootSceneにスプライトを追加
        core.rootScene.addChild(player);

        // エンティティを生成, シーンに追加
        var entity = new Entity(); // 生成
        entity.width = 10; // 幅を設定
        entity.height = 10; // 高さを設定
        entity.backgroundColor = "blue"; // 背景色を設定
        core.rootScene.addChild(entity); // シーンに追加
        entity.x = 400;
        entity.y = 350;
        entity.rad = 0; // ラジアン
        entity.degree = 0; // 角度
        entity.onenterframe = function() {
            kaiten();
        };
    }

    //ゲームスタート
    core.start();
}　