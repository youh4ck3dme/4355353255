
import { Home, Briefcase, Trash2, Sparkles, Box, Wrench, Truck, Piano } from 'lucide-react';

export const services = [
  {
    id: "stahovanie-bytov-domov",
    name: "Sťahovanie bytov a domov",
    icon: Home,
    shortDescription: "Bezstarostné sťahovanie bytov a domov v Bratislave a okolí.",
    description: "Či už sa sťahujete z garsónky alebo veľkého rodinného domu, náš tím je pripravený zabezpečiť hladký priebeh. Postaráme sa o demontáž, bezpečné zabalenie, prevoz a opätovnú montáž nábytku. S nami je sťahovanie hračka.",
    secondaryDescription: "Rýchlo, bezpečne a so zodpovednosťou",
    included: [
      "Bezplatná obhliadka a cenová ponuka",
      "Balenie nábytku a osobných vecí do ochranných fólií",
      "Demontáž a následná montáž nábytku",
      "Bezpečný prevoz modernými vozidlami",
      "Poistenie zodpovednosti za škodu do 50 000 €",
    ]
  },
  {
    id: "stahovanie-firiem",
    name: "Sťahovanie firiem a kancelárií",
    icon: Briefcase,
    shortDescription: "Efektívne sťahovanie firiem a kancelárií bez zdržania.",
    description: "Presťahujeme vašu kanceláriu, sklad alebo celú prevádzku s minimálnym dopadom na váš biznis. Vďaka dôkladnému plánovaniu a efektívnej logistike zabezpečíme rýchly a organizovaný presun.",
    secondaryDescription: "Efektívne plánovanie a spoľahlivá logistika",
    included: [
      "Flexibilné časovanie (víkendy, nočné hodiny)",
      "Logistické plánovanie na mieru podľa potrieb klienta",
      "Bezpečný prevoz IT techniky, serverov a dokumentov",
      "Diskrétnosť a profesionalita nášho tímu",
    ]
  },
  {
    id: "vypratavanie-likvidacia",
    name: "Vypratávanie a likvidácia",
    icon: Trash2,
    shortDescription: "Vypratávanie a ekologický odvoz odpadu – bez starostí.",
    description: "Potrebujete sa zbaviť starého nábytku alebo vypratať pivnicu? Zabezpečíme kompletné vypratanie bytov, domov, pivníc či garáží a postaráme sa o ekologickú likvidáciu všetkého nepotrebného odpadu.",
    secondaryDescription: "Rýchle riešenie pre váš priestor",
    included: [
      "Vypratávanie bytov, domov, pivníc, povál a garáží",
      "Odvoz starého nábytku, spotrebičov a stavebného odpadu",
      "Ekologická likvidácia odpadu na zbernom dvore",
      "Možnosť následného upratania priestorov",
    ]
  },
  {
    id: "stahovanie-tazkych-bremien-klavirov",
    name: "Sťahovanie ťažkých bremien / klavírov",
    icon: Piano,
    shortDescription: "Bezpečná manipulácia s klavírmi, trezormi a inými ťažkými predmetmi.",
    description: "Špecializujeme sa na bezpečnú a profesionálnu manipuláciu s predmetmi s vysokou hmotnosťou. S využitím špeciálnej techniky presťahujeme váš klavír, trezor, server alebo iné ťažké bremeno bezpečne a bez poškodenia.",
    secondaryDescription: "Sila, technika a precíznosť",
    included: [
      "Sťahovanie klavírov, pianín a krídel",
      "Manipulácia s trezormi a serverovými skriňami",
      "Použitie profesionálnych popruhov a techniky",
      "Poistenie aj pre predmety s vysokou hodnotou",
    ]
  },
  {
    id: 'balenie',
    name: 'Baliace služby a materiál',
    icon: Box,
    shortDescription: "Nechajte balenie na nás a ušetrite si čas a nervy.",
    description: 'Ponúkame kompletné baliace služby. Vaše veci profesionálne zabalíme do kvalitných materiálov, aby boli počas prepravy v úplnom bezpečí. Dodáme všetko potrebné – od krabíc až po bublinkové fólie.',
    secondaryDescription: 'Všetko bezpečne a organizovane zabalené',
    included: [
      'Dodanie baliaceho materiálu (krabice, fólie, pásky)',
      'Profesionálne zabalenie nábytku, skla a elektroniky',
      'Označenie krabíc pre jednoduchú orientáciu',
      'Šetrenie vášho času a energie',
    ],
  },
  {
    id: 'montaz-demontaz',
    name: 'Montáž a demontáž nábytku',
    icon: Wrench,
    shortDescription: "Odborná montáž a demontáž vášho nábytku.",
    description: 'Náš tím sa postará o odbornú demontáž nábytku pred sťahovaním a jeho následnú precíznu montáž v novom priestore. Zvládneme skrine, postele, kuchynské linky a iný nábytok.',
    secondaryDescription: 'Váš nábytok v správnych rukách',
    included: [
      'Rozobratie nábytku pred prepravou',
      'Bezpečné zabalenie všetkých komponentov a skrutiek',
      'Opätovné zloženie nábytku v cieli',
      'Skúsenosti so všetkými typmi nábytku',
    ],
  },
  {
    id: 'autodoprava-s-vodicom',
    name: 'Autodoprava s vodičom',
    icon: Truck,
    shortDescription: "Rýchla a spoľahlivá preprava tovaru alebo nábytku.",
    description: 'Potrebujete rýchlo a spoľahlivo prepraviť tovar, stavebný materiál alebo nábytok, ktorý sa vám nezmestí do auta? Ponúkame prenájom dodávky so skúseným a ochotným vodičom.',
    secondaryDescription: 'Vaše veci doručíme bezpečne a načas',
    included: [
      'Prenájom dodávky so skúseným vodičom',
      'Pomoc pri nakladaní a vykladaní',
      'Flexibilné časovanie podľa vašich potrieb',
      'Preprava v rámci Bratislavy aj celého Slovenska',
    ],
  },
  {
    id: 'profesionalne-upratovanie',
    name: "Profesionálne upratovacie práce",
    icon: Sparkles,
    shortDescription: "Čisté bývanie a pracovisko – pravidelne alebo jednorazovo.",
    description: "Ponúkame komplexné upratovacie služby pre domácnosti a firmy. Či už potrebujete jednorazové generálne upratovanie, pravidelnú údržbu, alebo upratovanie po sťahovaní, sme tu pre vás.",
    secondaryDescription: "Dokonalá čistota bez námahy",
    included: [
      "Jednorazové a pravidelné upratovanie",
      "Upratovanie po rekonštrukcii alebo maľovaní",
      "Umývanie okien, tepovanie kobercov a sedačiek",
      "Používanie profesionálnych a ekologických čistiacich prostriedkov"
    ]
  }
];
