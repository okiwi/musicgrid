(function (exports){
    exports.creeCellule = function (idCellule, systemeSon) {
        var active = false;
        return {
            joueSiPossible : function () {
                if (active)
                    systemeSon.joueSon(idCellule);
            },
            bascule : function () {
                active = !active;
            }
        }
    };
})(this);