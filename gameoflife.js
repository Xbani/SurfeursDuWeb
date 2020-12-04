
function fixPrint(str){
	return str.replaceAll("1","&#x25FC;").replaceAll("0","&#x25FB;").replaceAll("\n","<br/>");
}

class Case{
    constructor(vivant) {
        this.vivant = vivant
        this.voisins = []
        this.compteur = 0
        this.temps = 0
    }

    print(){
        return (+this.vivant).toString()
    }

    ajouter_voisin(v){
        this.voisins.push(v)
    }

    iterer() {

        for (let i = 0; i < this.voisins.length; i++){
            if (this.voisins[i].temps === this.temps){
                this.compteur += this.voisins[i].vivant
                this.voisins[i].compteur += this.vivant
            }
        }
        if (!this.vivant && this.compteur === 3){
            this.vivant = true
        }
        else if (this.vivant && this.compteur !== 2 && this.compteur !== 3){
            this.vivant = false
        }
        this.compteur = 0
        this.temps = 1 - this.temps

        for (let i = 0; i < this.voisins.length; i++){
            if (this.voisins[i].temps !== this.temps){
                this.voisins[i].iterer()
            }
        }
    }
}

class Tableau{
    iterate(){this.T[0][0].iterer()}

    iterateN(n){
        for (let i = 0; i < n;i++){
            this.iterate()
        }
    }

    constructor(s) {
        // var reader = new FileReader();
        // reader.readAsText(new File(file))
        // let s = reader.result
        let lines = s.split("\n")
        let xmin = -Math.max()
        let xmax = -Math.min()
        let ymin = -Math.max()
        let ymax = -Math.min()
        let xList = []
        let yList = []
        for (let i=1; i < lines.length; i++){
            let line = lines[i]
            let temp = line.split(" ")
            let x = parseInt(temp[0])
            let y = parseInt(temp[1])
            if (x < xmin) xmin = x
            if (x > xmax) xmax = x
            if (y < ymin) ymin = y
            if (y > ymax) ymax = y
            xList.push(x)
            yList.push(y)
        }
        let length = xmax - xmin + 3
        let width = ymax - ymin + 3
        this.T = []

        for (let k = 0; k < length; k++){
            let tab = []
            for (let j = 0; j < width; j++){
                tab.push(false)
            }
            this.T.push(tab)
        }

        for (let i = 0; i < length; i++){
            for (let j = 0; j < width; j++){
                this.T[i][j] = false
                for (let k = 0; k < xList.length; k++){

                    if (((i + xmin) == xList[k]) && ((j + ymin) == yList[k])) {
                        this.T[i][j] = true
                    }
                }
            }
        }

        for (let i = 0; i < this.T.length; i++){
            for (let j = 0; j < this.T[0].length; j++){
                this.T[i][j] = new Case(this.T[i][j])
            }
        }

        for (let i = 0; i < this.T.length; i++){
            for (let j = 0; j < this.T[0].length; j++){
                for (let k = 0; k < 9; k++){
                    let x = Math.floor(k % 3 - 1)
                    let y = Math.floor(k/3) - 1
                    if (k !== 4) {

                        this.T[i][j].ajouter_voisin(this.T[(i - x + this.T.length) % this.T.length ][ (j - y + this.T[0].length) % this.T[0].length])
                    }
                }
            }
        }
    }

    print() {
        let string = ""
        for (let i = 0; i < this.T.length; i++) {
            for (let j = 0; j < this.T[0].length; j++) {
                string += this.T[i][j].print() + " "
            }
            string += "\n"
        }
        return string
    }
}



class ProgressBar{
    constructor(string, period){
        this.period = period
        this.current_iteration = 0
        this.table = new Tableau(string)
        this.seed = string
        this.progress = 0
    }
    reset(){
        this.progress = 0
        this.current_iteration = 0
        this.table = new Tableau(this.seed)
        return this.table.print()
    }
    barProgress(percent){
        this.progress += percent
        if ((this.progress < 0) ||(this.progress > 100)) {
            return null
        }
        this.table.iterateN(Math.floor(this.period * this.progress/100) - this.current_iteration)
        this.current_iteration = Math.floor(this.period * this.progress/100)
        return this.table.print()
    }
}


let glider = "efefzef\n" +
    "6 -4 \n" +
	"4 -3 \n" +
	"6 -3 \n" +
	"-6 -2 \n" +
	"-5 -2 \n" +
	"2 -2 \n" +
	"3 -2 \n" +
	"16 -2 \n" +
	"17 -2 \n" +
	"-7 -1 \n" +
	"-3 -1 \n" +
	"2 -1 \n" +
	"3 -1 \n" +
	"16 -1 \n" +
	"17 -1 \n" +
	"-18 0 \n" +
	"-17 0 \n" +
	"-8 0 \n" +
	"-2 0 \n" +
	"2 0 \n" +
	"3 0 \n" +
	"-18 1 \n" +
	"-17 1 \n" +
	"-8 1 \n" +
	"-4 1 \n" +
	"-2 1 \n" +
	"-1 1 \n" +
	"4 1 \n" +
	"6 1 \n" +
	"-8 2 \n" +
	"-2 2 \n" +
	"6 2 \n" +
	"-7 3 \n" +
	"-3 3 \n" +
	"-6 4 \n" +
	"0 40 \n" +
	"-5 4"

function runGameOfLife(quantumTemps, nbIteration){
	let tableau = new Tableau(glider)
	for(let i=0; i < nbIteration; ++i){
		setTimeout(() => { document.getElementById("loading").innerHTML=fixPrint(tableau.print());tableau.iterate();console.log(i); }, i*quantumTemps);
	}
}
