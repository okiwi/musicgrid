describe("Une cellule", function () {
  it("sait jouer son son quand elle est activée", function () {
    var systemeSon = { joueSon: jasmine.createSpy("joueSon") },
    	cellule = creeCellule(0, systemeSon);
    
    cellule.joueSiPossible();
    expect(systemeSon.joueSon).not.toHaveBeenCalled();
    
    cellule.bascule();
    cellule.joueSiPossible();
    expect(systemeSon.joueSon).toHaveBeenCalledWith(0);

    systemeSon.joueSon.calls.reset();
    cellule.bascule();
    cellule.joueSiPossible();
    expect(systemeSon.joueSon).not.toHaveBeenCalled();
  });
});
