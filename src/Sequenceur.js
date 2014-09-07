(function (exports) {
    exports.creeSequenceur = function (nbColonnes, colonnes) {
        var colonneCourante = -1,
            callbackSurChangementColonne = function () {};
        return {
            tick: function () {
                colonneCourante = (colonneCourante + 1) % nbColonnes;
                colonnes[colonneCourante].forEach(function (cellule) {
                    cellule.joueSiPossible();
                });
                callbackSurChangementColonne();
            },
            colonneCourante: function () {
                return colonneCourante;
            },
            surChangement: function (callback) {
                callbackSurChangementColonne = callback;
            },
            basculeCellule: function (colonne, ligne) {
                colonnes[colonne][ligne].bascule();
            }
        };
    };
})(this);
