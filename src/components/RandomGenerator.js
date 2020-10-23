import React from 'react';
const RandomGenerator = (props) => {
   
   var start=[
        "Ogromno, a morda, samo morda tudi iskrica upanja - tedenska rast 'dan-na-dan' je pod 100%. Razlogov za veselje ni veliko.",
        "Število potrjenih primerov raste; koliko ljudi bo hospitalizirano, koliko jih bo potrebovalo intenzivno terapijo,  koliko jih bo ozdravelo in... koliko jih ne bo? ",
        "Ukrepi delujejo samo, če jih uporabljamo in upoštevamo. ",
        "Vsaka številka je človek. Z enim življenjem. Ki je neprecenljivo. Naredimo vse, da preprečimo širjenje, obolevanje in umiranje zaradi covida-19 ter kolaterne škode, ki jo povzroča. Janez Poklukar, generalni direktor UKC Ljubljana: 'Zdravstveni delavci lahko pomagamo samo toliko, kot nam pomaga skupnost, ki stoji za nami.' ",
        "Rast novih primerov glede na prejšnji teden še ne obeta hitrega izboljšanja, saj se učinek ukrepov pozna šele s 7-14 dnevno zamudo. ",
        "Še ste že utrujeni od enih in istih številk vsak dan...pomislite na zaposlene v domovih za starejše občane ter zaposlene v zdravstvu, ki jih največji naval primerov žal šele čaka. ",
        "Davek izjemnih številk novih primerov iz tega tedna bomo v naslednjem plačevali v obliki hospitalizacij. Nikoli ni prepozno, da začnemo krivuljo obračati navzdol, kajti trenutno smo v fazi, ko lahko.... 'zdravstveni delavci pomagajo samo toliko, kot nam pomaga skupnost, ki stoji za nami.'",
        "'Epidemija je mora za vse, ampak mi, ki se vsak dan pogovarjamo o konkretnih bolnikih s covidom-19, niti v sanjah ne pomislimo, da bi nehali opravljati svoje delo – nam to lahko oprostite? Dr. Alojz Ihan, imunolog (Delo, 16.10.2020).",
        "Virus še naprej veselo uspeva tam, kjer namesto uporabe ukrepov o njih raje debatiramo; vseeno mu je tako za stroko, kot politiko.",
        "Ne čakajmo na ukrepe, pravne podlage in natančne zemljevide statističnih regij; dajmo po zdravi pameti, spoštujmo ukrepe in se izogibajmo druženju tudi v manjših skupinah, sploh v neprezračenih zaprtih prostorih, ter namestimo aplikacijo #ostanizdrav.",
    ]

   var end=[
        "Z gotovostjo lahko pričakujemo, da se bosta število hospitalizacij in obremenitev zdravstvenih delavcev v naslednjih dnevih še povečevala. ZDRAVA pamet narekuje, da jim pomagamo z odgovornim ravnanjem: uporabljajmo #OstaniZdrav, izogibajmo se zaprtih in neprezračenih prostorov, nepotrebnih stikov in druženja, če je le mogoče, delajmo od doma ali na daljavo. Pa sr(e)čno!",
        "Zdrava pamet v zdravem telesu.",
        "Zanikanje, iskanje izgovorov in izjem od pravil, jeza, depresija, ki jih še dodatno ojačujejo odmevi komuniciranja v medijih. Vsa ta čustva so NORMALEN odziv na stresne situacije, ki jih povzročajo epidemija, ukrepi in s tem povezane osebne stiske. Vzamite si čas zase. Najdite dnevno rutino (sprehod, pospravljanje stanovanja), začnite z novim hobijem (učenje jezika, origami, ..), pogovarjajte se z bližnjimi, pokličite prijatelje, ki jih že dolgo niste videli ali sosede, ki bi utegnili potrebovati pomoč in - vsaj za nekaj ur - se odklopite od medijev. Vse to nam bo pomagalo, da bomo te izzive prebrodili bolje in hitreje. ",
        "Če zdravnikom zaupamo naše zdravje vsak dan...potem bi to še bolj veljalo storiti tudi glede njihovih ocen prihodnjega časa. ",
        "Pazite nase in svoje bližnje.",
        "In prav nič ne bo narobe, če vljudno in strpno spodbudite še koga drugega k upoštevanju pravil ali prispevate k informiranju. Hvala 🙏.",
        "Pomembno: biti okuženi NI greh - zgodi se lahko vsakemu, še tako pazljivemu. Zato je dobro, da zmanjšamo svoje družabne stike na minimum, v primeru okužbe pa jih obvestimo, da se lahko samoizolirajo. ",
        "Moč solidarnosti je v tem, da z zelo malimi vložki posameznika dosežemo velike učinke – če smo solidarni vsi. (dr. Alojz Ihan).",
        "Uporaba ukrepov je kot varnostni pas v avtomobilu; ne škodi nikomur, lahko pa reši kako življenje. A ne vseh. Zakaj bi tvegali?",
        "Priložnost za druženje in protestiranje in podobne dejavnosti bo še več. A ne danes. ",
    ]

    


    return (
    <span>{(props.mode === "start")? start[Math.floor(Math.random() * Math.floor(10))]:end[Math.floor(Math.random() * Math.floor(10))]}</span>
    );
};
export default RandomGenerator;