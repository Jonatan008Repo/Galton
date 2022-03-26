GameStates.Game = function (game) {
};
var punto;
var sprite1;
var sprite2;
var sprite4;
var sprite5;
var altura;
var groupball;
var groups;
var button1;
var button;
var text;
var mask;
var sprite_4;
//var sprite_5;

espa = 13;
scalePoint = 20;
scaleBall = 20;
textControl = "Numero de pelotas = ";
noBolas = 10;
contadorBolas = 0;
velociadad = 700;//500
noNiveles = 8;
base = 37.5
ballMax = 100;
reiniciar = false;
GameStates.Game.prototype = {
    create: function () {
        this.add.image(0, 0, 'sky');
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.gravity.y = velociadad;
        this.physics.p2.friction = -300;
        sprite1 = this.add.sprite(570, 140, 'pared2');
        sprite2 = this.add.sprite(30, 140, 'pared2');
        sprite3 = this.add.sprite((this.game.world.width / 2) + 15, 220, 'pared4');
        sprite4 = this.add.sprite((this.game.world.width / 2) - 15, 220, 'pared4');
        //sprite_5 = this.add.sprite(330, 125, 'pared4');
        sprite_4 = this.add.sprite((this.game.world.width / 2), 125, 'pared4');
        sprite_4.anchor.set(0.5);
        //sprite_5.anchor.set(0.5);
        //this.add.tween(sprite_4).to({ angle: 80 }, 2000, "Linear", true, 0, -1);
        //this.physics.p2.enable(sprite_4);
        //sprite_4.body.setZeroDamping();
        ////sprite_4.body.fixedRotation = true;
        center = this.add.sprite((this.game.world.width / 2), 240, 'ball');
        center.anchor.set(0.5);
        center.height = 3;
        center.width = 3;
        this.physics.p2.enable([sprite2, sprite1, sprite3, sprite4, sprite_4]);
        //sprite_4.body.angle = 60;
        //sprite_5.body.angle = -60;
        sprite_4.body.static = true;
        sprite_4.body.collideWorldBounds = true;
        //sprite_5.body.collideWorldBounds = true;
        //sprite_5.body.static = true;

        sprite1.body.angle = 80;
        sprite1.body.collideWorldBounds = true;
        sprite1.body.static = true;
        sprite2.body.angle = -80;
        sprite2.body.collideWorldBounds = true;
        sprite2.body.static = true;
        sprite3.body.collideWorldBounds = true;
        //sprite3.height = 100;
        sprite3.body.static = true;
        sprite4.body.collideWorldBounds = true;
        sprite4.body.static = true;

        groups = this.add.group();
        //pelotas
        //groupball = this.add.physicsGroup(Phaser.Physics.P2JS);
        this.createBall();
        var puntos = this.add.physicsGroup(Phaser.Physics.P2JS);

        text = this.add.text(15, 300, textControl + noBolas + ";", { font: "Bold 100px Arial", fill: '#000000' });
        separacion2 = base * 2;
        desplameinto0 = (this.game.world.width / 2) - separacion2;
        xtablero = desplameinto0;
        desplameinto = 0;
        //piramide
        ytablero = 255;
        for (var i = 0; i < noNiveles; i++) {
            //console.log("i = " + i);
            //altura = base * (Math.sin(60));
            //altura = 17;
            altura = base * Math.sqrt(3) / 2;
            console.log(altura);
            ytablero = ytablero + altura;
            for (var j = 0; j <= i + 2; j++) {
                //console.log("j = " + j)
                xtablero = xtablero + base;
                //console.log("xtablero = " + xtablero);
                var punto = puntos.create(xtablero, ytablero, 'rampa');
                punto.body.setCircle(9.5);
                punto.height = scalePoint;
                punto.width = scalePoint;
                punto.body.allowGravity = false;
                punto.body.static = true;
            }
            desplameinto = desplameinto + base / 2;
            xtablero = desplameinto0 - desplameinto;
        }
        xposAD = this.game.world.width / espa;
        xpos = xposAD;
        var pardes = this.add.physicsGroup(Phaser.Physics.P2JS);
        //paredes
        for (var i = 0; i < espa; i++) {
            var pared = puntos.create(xpos, 700, 'pared');
            xpos = xpos + xposAD;
            pared.body.allowGravity = false;
            pared.body.static = true;
        }

        button1 = this.game.add.button(100, 10, 'clean', this.removeGroup, this, 2, 1, 0);
        button = this.game.add.button(10, 10, 'button', this.createBall, this, 2, 1, 0);
        button.width = 80;
        button.height = 80;
        //button1.inputEnabled = false;
        button1.width = 80;
        button1.height = 80;
        button.z = -1000;
        button1.z = -1000;

        mask = this.add.graphics(0, 0);
        mask.beginFill(0xffffff);
        mask.drawRect(0, 100, 600, 800);
        mask.drawRect(200, 0, 600, 100);
        //mask.drawRect(530, 0, 140, 200);

        groups.mask = mask;
        //this.game.world.moveUp(button1);
        //this.game.world.moveUp(button);
    },
    removeGroup: function () {
        if (reiniciar == true) {
            contadorBolas = 0;
            reiniciar = false;
            console.log("true");
            //this.game.cache.destroy();
            this.state.start('Game');
        }
    },
    createBall: function () {
        if (contadorBolas < ballMax) {
            var groups;
            groups = this.game.add.group();
            groupball = this.add.physicsGroup(Phaser.Physics.P2JS);
            for (var i = 0; i < noBolas; i++) {
                var ball = groupball.create(this.rnd.between(50, 550), this.rnd.between(0, 50), 'ball');
                ball.body.setCircle(8.5);
                ball.height = scaleBall;
                ball.width = scaleBall;
                ball.body.fixedRotation = false;
            }
            contadorBolas = contadorBolas + noBolas;
            if (contadorBolas > noBolas) {
                reiniciar = true;
            }
            groups.add(groupball);
            groups.mask = mask;
            console.log(contadorBolas);
        }
        else {
        }
    },
    update: function () {
        text.setText(textControl + contadorBolas + ";");
        sprite_4.body.angle += 1;
        //sprite_5.body.angle += -1;
    },
    render: function () {
        //this.game.debug.inputInfo(32, 32);
        //this.game.debug.spriteInputInfo(groupball, 300, 32);
    },
};