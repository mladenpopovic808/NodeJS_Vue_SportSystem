'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      //samo jedan aboutUs,ne treba nam vise instanca
      let data=[]
      data.push({
        text:"Istorija tenisa na našim prostorima ne zaostaje mnogo za počecima tenisa u svetu,<br><br> čak štaviše, samo nekoliko godina kako je nova pomodna igra sa reketima zaokupila pažnju dvorova Engleske, Francuske i Austorugarske, a prvi reketi već su stigli na Balkan.<br><br>Austrougarski oficiri i engleski industrijalci počeli su da igraju tenis na prostorima Balkana početkom 80-tih godina 19.<br><br>veka, a ostaje zabeleženo i na fotografijama da je gradić Priboj na reci Lim dobio prvi teniski teren, u okviru vojne kasarne austrougarske vojske, koja je tada boravila u ovom delu jugozapadne teritorije carevine štiteći granicu prema Turskoj.<br><br>Nedugo zatim terenini za novu igru niču kao pečurke, sasvim prirodno na Paliću već 1878 godine, jer je blizina Beča i Budimpešte uticala da sve sto je novo najpre stigne u krajeve koji su geografski bliži prestonici Austrougarske.<br><br> Te, pomenute 1878 godine održana su i prva nadmetanja, takmičenje pod nazivom Segedinski vinogradi, i pored tenisa sportisti su se nadmetali u mačevanju, jahanju, trčanju i rvanju.Od tada, pa sve do danas, na Paliću, kao i Subotici, tenis ima bogatu tradiciju, a beli sport se širio i u ostale delove zemlje, nalazeći nove poklonike gde god se pojavio.<br><br>Veliko interesovanje za ovaj sport, naročito posle završetka Prvog svetskog rata, nametnuo je potrebu da se osnuje jedno vrhovno telo koje će okupiti sve klubove i sekcije na jedno mesto i organizovati jake turnire i takmičenje širom zemlje. Osnivačka skupština održana je 27.avgusta 1922 godine u Zagrebu, u kafani Zlatna kruna u Gajevoj ulici, broj 12.<br><br> Za sedište JUGOSLOVENSKOG TENISKOG SAVEZA odabran je Zagreb, tada najači centar tenisa u Jugoslaviji.Skupštini je prisustvovalo 8 klubova, a kako je ustanovljeno, kompetencije novog Saveza ticale su se praćenja pravilne primene pravila tenisa na takmičenjima u zemlji, zatim saradnja sa inostranstvom i održavanje veza, stvaranje reprezentacija i odlučivanje o svim bitnim pitanjima za teniski sport.<br><br>Već 1926 godine Savez je prijavio reprezentaciju za igranje u Dejvis kupu, pa istorija beleži da je Jugoslavija svoj prvi meč igrala u maju 1927. godine protiv Indije u Zagrebu. Naši prvi Dejvis kup igrači Đorđe Dunđerski (Novi Sad) I Ivan Balaš (Bečkerek / danas Zrenjanin) izgubili su singl mečeve prvog dana, zatim i dubl, pa je ekipa Inidje predala trećeg dana oba meča jer nisu imala takmičarski karakter, kako bi njihova delegacija stigla do Đenove na vreme da se ukrca na brod i otputuje u Delhi.<br><br>Iako ekipa bez velikog iskustva, Jugoslavija je u periodu od 1936 – 1948 imala pet igranja u finalu Dejvis kupa, a 1939. godine u finalu je nadigrana Nemačka (!!!) – 3:2.  Ova pobeda odjeknula je kao svetska senzacija jer u to vreme igrači našeg renomiranog protivnu i.",
        
        createdAt: new Date(),
        updatedAt: new Date()
      })
    
    return queryInterface.bulkInsert('AboutUs', data,{});
  },

  async down (queryInterface, Sequelize) {
      
      return queryInterface.bulkDelete('AboutUs', null, {});
  }
};
