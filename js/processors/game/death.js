define(function () {

    var DeathProcessor = function (manager, game) {
        this.manager = manager;
        this.game = game;

        this.init();
    };

    DeathProcessor.prototype.init = function () {
    };

    DeathProcessor.prototype.update = function () {
        // check player's life if someone is dead (or both)
        var life = this.manager.getComponentsData('Life');
        var reboot = false;
        var end = false;
        for (var entityId in life) {
            var currentLife = life[entityId];
            if (currentLife.value <= 0) {
                var player = this.manager.getComponentDataForEntity('Player', entityId);
                console.log('MORT du joueur n°' + player.number);
                // var wonGames = this.manager.getComponentDataForEntity('WonGames', entityId);
                // if (++wonGames.number >= 3) {
                //     end = true;
                // } else {
                    reboot = true;
                // }
            }
        }
        if (end) {
            console.log('FIN DE PARTIE');
            this.game.state.start('Boot');
        }
        else if (reboot) {
            console.log('Upgrade');
            this.game.state.start('Upgrade');
        }
    };

    return DeathProcessor;
});
