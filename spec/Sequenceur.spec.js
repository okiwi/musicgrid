describe("Un sequenceur", function () {
    it("connaît la colonne courante", function () {
        var cellule0 = creeCellule(0, {}),
            cellule1 = creeCellule(1, {}),
            sequenceur = creeSequenceur(2, {0: [cellule0], 1: [cellule1]});

        sequenceur.tick();
        expect(sequenceur.colonneCourante()).toEqual(0);

        sequenceur.tick();
        expect(sequenceur.colonneCourante()).toEqual(1);
    });

    it("notifie les cases de la colonne suivante au tic suivant", function () {
        var cellule0 = { joueSiPossible: jasmine.createSpy("joueSiPossible cellule0") },
            cellule1 = { joueSiPossible: jasmine.createSpy("joueSiPossible cellule1") },
            sequenceur = creeSequenceur(2, {0: [cellule0], 1: [cellule1]});

        sequenceur.tick();
        expect(cellule0.joueSiPossible).toHaveBeenCalled();
        expect(cellule1.joueSiPossible).not.toHaveBeenCalled();

        sequenceur.tick();
        expect(cellule1.joueSiPossible).toHaveBeenCalled();
    });

    it("recommence à la première colonne une fois arrivé à la fin de la séquence", function () {
        var cellule0 = { joueSiPossible: jasmine.createSpy("joueSiPossible cellule0") },
            cellule1 = { joueSiPossible: jasmine.createSpy("joueSiPossible cellule1") },
            sequenceur = creeSequenceur(2, {0: [cellule0], 1: [cellule1]});

        sequenceur.tick();
        sequenceur.tick();
        sequenceur.tick();

        expect(sequenceur.colonneCourante()).toEqual(0);
    });

    it("notifie ses abonnés quand il change d'état", function () {
        var cellule0 = { joueSiPossible: function () {} },
            sequenceur = creeSequenceur(1, {0: [cellule0]}),
            aEteNotifie = false;

        sequenceur.surChangement(function () {
            aEteNotifie = true;
        });

        sequenceur.tick();

        expect(aEteNotifie).toBeTruthy();
    });

    it("peut basculer une cellule non active en active", function () {
        var cellule = {bascule: jasmine.createSpy('bascule')},
            sequenceur = creeSequenceur(1, {0: [cellule]});

        sequenceur.basculeCellule(0, 0);

        expect(cellule.bascule).toHaveBeenCalled()
    });
});
