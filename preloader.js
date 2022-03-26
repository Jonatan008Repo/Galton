// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
    this.preloadBar = null;
}

GameStates.Preloader.prototype = {
    preload: function () {
        // common to add a loading bar sprite here...
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load all game assets
        // images, spritesheets, atlases, audio etc..
        this.load.image('ball', 'assets/ball.png');
        this.load.image('rampa', 'assets/rampa.png');
        this.load.image('pared', 'assets/pared.png');
        this.load.image('pared2', 'assets/pared2.png');
        this.load.image('pared3', 'assets/pared3.png');
        this.load.image('pared4', 'assets/pared4.png');
        this.load.image('sky', 'assets/vector.jpg');
        this.load.spritesheet('button', 'assets/mas.png', 600, 600, 0);
        this.load.spritesheet('clean', 'assets/clean.png', 600, 600, 0);    },

    create: function () {
        //call next state
        this.state.start('Game');
        //this.state.start('MainMenu');
    }
};