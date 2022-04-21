const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRoundSpecialAttack: 0,
            currentRoundHeal: 0,
            maxRoundSpecialAttack: getRandomValue(3, 5),
            maxRoundHeal: getRandomValue(2, 4),
            specialAttackClicked: false,
            healClicked: false,
            winner: null,
            battleLogs: [],
        };
    },
    computed: {
        monsterHealthStyle() {
            if (this.monsterHealth < 0) {
                return { width: 0 + '%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerHealthStyle() {
            if (this.playerHealth < 0) {
                return { width: 0 + '%' }
            }
            return { width: this.playerHealth + '%' }
        },
        specialAttackDisabled() {
            this.specialAttackClicked = false;
            if (this.currentRoundSpecialAttack >= this.maxRoundSpecialAttack) {
                if (this.specialAttackClicked) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        healDisabled() {
            this.healClicked = false;
            if (this.currentRoundHeal >= this.maxRoundHeal) {
                if (this.healClicked) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    },
    watch: {
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        },
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        }
    },
    methods: {
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRoundSpecialAttack = 0;
            this.currentRoundHeal = 0;
            this.maxRoundSpecialAttack = getRandomValue(3, 5);
            this.maxRoundHeal = getRandomValue(2, 4);
            this.specialAttackClicked = false;
            this.healClicked = false;
            this.winner = null;
            this.battleLogs = [];
        },
        attackMonster() {
            this.currentRoundSpecialAttack++;
            this.currentRoundHeal++;
            const attackValue = getRandomValue(6, 12);
            this.monsterHealth -= attackValue;
            this.battleLog('Player', 'Attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValueMonster = getRandomValue(10, 15);
            this.playerHealth -= attackValueMonster;
            this.battleLog('Monster', 'Attack', attackValueMonster);
        },
        healPlayer() {
            this.currentRoundHeal = 0;
            this.currentRoundSpecialAttack++;
            const healPlayer = getRandomValue(15, 25);
            this.maxRoundHeal = getRandomValue(2, 4);
            this.battleLog('Player', 'Heal', healPlayer);
            if (this.playerHealth + healPlayer > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healPlayer;
            }
            this.attackPlayer();
        },
        specialAttack() {
            this.currentRoundSpecialAttack = 0;
            this.currentRoundHeal++;
            this.maxRoundSpecialAttack = getRandomValue(3, 5);
            this.specialAttackClicked = true;
            const attackValue = getRandomValue(10, 24);
            this.monsterHealth -= attackValue;
            this.battleLog('Player', 'Special Attack', attackValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = "monster";
        },
        battleLog(who, type, value) {
            const log = {
                who: who,
                type: type,
                value: value
            }
            this.battleLogs.unshift(log);
        }
    },
})

app.mount('#game');