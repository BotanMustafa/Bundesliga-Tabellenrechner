window.onload = pageLoaded;

const ergebniseingabe = document.getElementById("ergebniseingabe") as HTMLDivElement;
const tabelle = document.getElementById("tabelle") as HTMLTableElement;

function pageLoaded(){
  ergebnisseSpeichern();


  let spiele = ergebniseingabe.getElementsByClassName("spiel");

  for (const spiel of spiele) {
    let sp1plus = spiel.getElementsByClassName("sp1-plus")[0];
    let sp1minus = spiel.getElementsByClassName("sp1-minus")[0];
    let sp2plus = spiel.getElementsByClassName("sp2-plus")[0];
    let sp2minus = spiel.getElementsByClassName("sp2-minus")[0];

    sp1plus.addEventListener("click", function(){
      ergebnisBerechnen(sp1plus);
    });

    sp2plus.addEventListener("click", function(){
      ergebnisBerechnen(sp2plus);
    });

    sp1minus.addEventListener("click", function(){
      ergebnisBerechnen(sp1minus);
    });

    sp2minus.addEventListener("click", function(){
      ergebnisBerechnen(sp2minus);
    });

  }
}

function ergebnisseSpeichern(){
  let tore = document.getElementsByClassName("tore");

  for (const ergebnis of tore) {
    let html = ergebnis.innerHTML;

    let erg = html.replace(/<\/?[^>]+(>|$)/g, "");
    erg = erg.replace(/\s/g, '');

    ergebnis.innerHTML += '<div class="startergebnis">' + erg + '</div>';
  }

  let punkte = document.getElementsByClassName("punkte");

  for (const punkt of punkte) {
    let html = punkt.innerHTML;

    let erg = html.replace(/<\/?[^>]+(>|$)/g, "");
    erg = erg.replace(/\s/g, '');

    punkt.innerHTML += '<div class="startpunkte">' + erg + '</div>';
  }

}

function ergebnisBerechnen(button:any){
  let spiel = button.parentElement.parentElement;


  if(button.classList.contains("sp1-plus")){
    let erg = spiel.getElementsByClassName("sp1-ergebnis")[0];
    
    let ergebnis = erg.innerHTML;
    let ergebnisValue = parseInt(ergebnis);

    ergebnisValue += 1;

    erg.innerHTML = ergebnisValue;
  }
  else if(button.classList.contains("sp2-plus")){
    let erg = spiel.getElementsByClassName("sp2-ergebnis")[0];
    
    let ergebnis = erg.innerHTML;
    let ergebnisValue = parseInt(ergebnis);

    ergebnisValue += 1;

    erg.innerHTML = ergebnisValue;
  }
  else if(button.classList.contains("sp1-minus")){
    let erg = spiel.getElementsByClassName("sp1-ergebnis")[0];
    
    let ergebnis = erg.innerHTML;
    let ergebnisValue = parseInt(ergebnis);

    ergebnisValue -= 1;

    if(ergebnisValue < 0){
      ergebnisValue = 0;
    }

    erg.innerHTML = ergebnisValue;
  }
  else if(button.classList.contains("sp2-minus")){
    let erg = spiel.getElementsByClassName("sp2-ergebnis")[0];
    
    let ergebnis = erg.innerHTML;
    let ergebnisValue = parseInt(ergebnis);

    ergebnisValue -= 1;

    if(ergebnisValue < 0){
      ergebnisValue = 0;
    }

    erg.innerHTML = ergebnisValue;
  }

  ergebnisZuTabelle(spiel);
}

function ergebnisZuTabelle(spiel:any){
  spiel = spiel.parentElement;

  let spieler1 = spiel.getElementsByClassName("spieler1")[0];
  let spieler2 = spiel.getElementsByClassName("spieler2")[0];

  let sp1 = spieler1.id;
  let sp2 = spieler2.id;

  let sp1ergebnis = spiel.getElementsByClassName("sp1-ergebnis")[0].innerHTML;
  let sp2ergebnis = spiel.getElementsByClassName("sp2-ergebnis")[0].innerHTML;

  let winner = 0;

  if( parseInt(sp1ergebnis) > parseInt(sp2ergebnis) ){
    // Spieler 1 gewinnt
    winner = 1;
  }
  else if( parseInt(sp1ergebnis) < parseInt(sp2ergebnis) ){
    // Spieler 2 gewinnt
    winner = 2;
  }
  if( parseInt(sp1ergebnis) == parseInt(sp2ergebnis) ){
    // Unentschieden
    winner = 0;
  }


  // Tabelle
  let sp1table = tabelle.querySelector("#" + sp1);
  let sp2table = tabelle.querySelector("#" + sp2);

  if(sp1table && sp2table){

    /*
    Sieg 3
    Unentsch 1
    Nied 0
    */

    let gTore1 = sp1table.getElementsByClassName("tore-geschossen")[0];
    let kTore1 = sp1table.getElementsByClassName("tore-kassiert")[0];

    let startergebnis1 = sp1table.getElementsByClassName("startergebnis")[0].innerHTML;
    let ergebnisse1 = startergebnis1.split(":");

    let geschosseneTore1 = parseInt( ergebnisse1[0] ) + parseInt(sp1ergebnis);
    gTore1.innerHTML = geschosseneTore1.toString();

    let kassierteTore1 = parseInt( ergebnisse1[1] ) + parseInt(sp2ergebnis);
    kTore1.innerHTML = kassierteTore1.toString();



    let gTore2 = sp2table.getElementsByClassName("tore-geschossen")[0];
    let kTore2 = sp2table.getElementsByClassName("tore-kassiert")[0];

    let startergebnis2 = sp2table.getElementsByClassName("startergebnis")[0].innerHTML;
    let ergebnisse2 = startergebnis2.split(":");

    let geschosseneTore2 = parseInt( ergebnisse2[0] ) + parseInt(sp2ergebnis);
    gTore2.innerHTML = geschosseneTore2.toString();

    let kassierteTore2 = parseInt( ergebnisse2[1] ) + parseInt(sp1ergebnis);
    kTore2.innerHTML = kassierteTore2.toString();


    // Punkte
    let punkte1 = sp1table.getElementsByClassName("punktestand")[0];
    let punkte2 = sp2table.getElementsByClassName("punktestand")[0];


    let startpunkte1 = sp1table.getElementsByClassName("startpunkte")[0].innerHTML;
    let startpunkte2 = sp2table.getElementsByClassName("startpunkte")[0].innerHTML;

    if(winner == 0){
      let punktestand1 = parseInt(startpunkte1) + 1;
      let punktestand2 = parseInt(startpunkte2) + 1;
      punkte1.innerHTML = punktestand1.toString();
      punkte2.innerHTML = punktestand2.toString();
    }
    
    if(winner == 1){
      let punktestand = parseInt(startpunkte1) + 3;
      punkte1.innerHTML = punktestand.toString();
      punkte2.innerHTML = startpunkte2;
    }
    
    if(winner == 2){
      let punktestand = parseInt(startpunkte2) + 3;
      punkte2.innerHTML = punktestand.toString();
      punkte1.innerHTML = startpunkte1;
    }
  }

  sortTable(sp1table, sp2table);
}

function sortTable(sp1:any, sp2:any){

  let punkte1 = sp1.getElementsByClassName("punktestand")[0].innerHTML;
  checkBefore(sp1, punkte1);

  let punkte2 = sp2.getElementsByClassName("punktestand")[0].innerHTML;
  checkBefore(sp2, punkte2);
}

function checkBefore(spieler:any, punkte:any){
  let playerBefore = spieler.previousElementSibling;
  let playerAfter = spieler.nextElementSibling;
  let pbPoints = playerBefore.getElementsByClassName("punktestand")[0].innerHTML;
  let paPoints = playerAfter.getElementsByClassName("punktestand")[0].innerHTML;



  if( parseInt(pbPoints) < punkte){
    playerBefore.outerHTML = spieler.outerHTML + playerBefore.outerHTML;
    spieler.outerHTML = "";
  }
  else if( parseInt(paPoints) > punkte){
    playerAfter.outerHTML = playerAfter.outerHTML + spieler.outerHTML;
    spieler.outerHTML = "";
  }

  checkPositionen();
}

function checkPositionen(){
  let vereine = document.getElementsByClassName("verein");

  for (let i=0; i<vereine.length; i++) {
    let platz = vereine[i].getElementsByClassName("platz")[0];
    platz.innerHTML = (i+1).toString();
  }
}