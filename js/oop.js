const fighterOne = "fighterOne";
const fighterTwo = "fighterTwo";
const spriteAnimationLength = 800;

const oopClassList = {
    attack: "attack",
    fighterHit: "fighterHit",
    miss: "miss"
}

const restrictValue = (id) => {
    const fields = ["fOneAtk", "fOneDef", "fOneSpd"].includes(id) ? [
        "fOneAtk", "fOneDef", "fOneSpd"
    ] : ["fTwoAtk", "fTwoDef", "fTwoSpd"];
    const max = 100;
    const a = parseFloat(getByID(fields[0]).value) || 0;
    const b = parseFloat(getByID(fields[1]).value) || 0;
    const c = parseFloat(getByID(fields[2]).value) || 0;
    if((a + b + c > max) || (a < 0)){
        getByID(id).value = 0;
    }
}

const getFightStats = (isPlyOne) => {

    const [atk, def, spd] = isPlyOne ? [
        "fOneAtk", "fOneDef", "fOneSpd"
    ] : ["fTwoAtk", "fTwoDef", "fTwoSpd"];

    return {
        atk: parseFloat(getByID(atk).value || 0),
        def: parseFloat(getByID(def).value || 0),
        spd: parseFloat(getByID(spd).value || 0)
    }

}

const getSpriteDelay = (i, shifts) => {
    const shift = (spriteAnimationLength / shifts) * (i + 1);
    return shift;
}

const startBattle = () => {
    const fighterOneStats = getFightStats(true);
    const fighterTwoStats = getFightStats(false);

    const fighter = new Fighter(
        fighterOne,
        "fighterOneHp",
        fighterOneStats.atk,
        fighterOneStats.def,
        fighterOneStats.spd,
        "Player One"
    );

    const fighter2 = new Fighter(
        fighterTwo,
        "fighterTwoHp",
        fighterTwoStats.atk,
        fighterTwoStats.def,
        fighterTwoStats.spd,
        "Player Two"
    );

    const battle = new BattleField(fighter, fighter2);
    battle.fight(fighter, fighter2);
}

class Fighter {

    hp = 100;
    spriteWidth = 5.82;
    spriteImages = 17;
    constructor(id, hpId, atk, def, speed, name) {
        this.id = id;
        this.hpId = hpId;
        this.atk = atk;
        this.def = def;
        this.speed = speed;
        this.name = name;
    }

    positionSprite(accShift) {
        getByID(this.id).style.backgroundPosition = `${accShift}%`
    }

    positionFighterToAttack() {
        addClass(getByID(this.id), oopClassList.attack);
    }

    directHit() {
        addClass(getByID(
            this.id === fighterOne ? fighterTwo : fighterOne
        ), oopClassList.fighterHit);
    }

    animateHitMiss() {
        addClass(getByID(
            this.id === fighterOne ? fighterTwo : fighterOne
        ), oopClassList.miss);
    }

    retreatFighter() {
        setTimeout(() => {
            removeClass(getByID(this.id), oopClassList.attack);

            removeClass(getByID(
                this.id === fighterOne ? fighterTwo : fighterOne
            ), oopClassList.fighterHit);

            removeClass(getByID(
                this.id === fighterOne ? fighterTwo : fighterOne
            ), oopClassList.miss);

        }, 1000);
    }

    prepareAtk() {
        this.positionFighterToAttack();

        let accShift = this.spriteWidth;
        for (let i = 0; i < this.spriteImages; i++) {
            setTimeout(() => {
                this.positionSprite(accShift);
                accShift += this.spriteWidth;
            }, getSpriteDelay(i, this.spriteImages));
        }
    }

    animateAtk() {
        this.prepareAtk()

        setTimeout(() => {
            this.directHit();
        }, 300);
    }

    animateMiss() {
        this.prepareAtk();

        setTimeout(() => {
            this.animateHitMiss();
        }, 300);
    }
}

class BattleField {
    constructor(fighterOne, fighterTwo) {
        this.fighterOne = fighterOne;
        this.fighterTwo = fighterTwo;
    }

    wasHit(defender) {
        return Math.random() > (defender.speed / 100);
    }

    decreaseHitPoint(attacker, defender) {
        let diff = attacker.atk - defender.def;

        if (diff <= 0) {
            diff = 5;
        }

        defender.hp -= diff;

        setTimeout(() => {
            getByID(defender.hpId).innerText = defender.hp;
        }, 300);
    }

    fight(attacker, defender) {

        let complete = false;

        const wasHit = this.wasHit(defender);

        if (wasHit) {
            attacker.animateAtk();
            this.decreaseHitPoint(attacker, defender);

            if (defender.hp <= 0) {
                this.resetGame(attacker, defender);
                complete = true;
            }
        }

        else {
            attacker.animateMiss();
        }

        attacker.retreatFighter();

        if (complete == false) {

            setTimeout(() => {
                this.fight(defender, attacker);
            }, 1500);
        }
    }

    resetGame(attacker, defender) {
        setTimeout(() => {
            alert(`The winning player is ${attacker.name}`);
        }, 1000);

        setTimeout(() => {
            attacker.hp = 100;
            defender.hp = 100;

            getByID(attacker.hpId).innerText = attacker.hp;
            getByID(defender.hpId).innerText = defender.hp;
        }, 1100);

    }
}
