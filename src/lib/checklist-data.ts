
export interface ChecklistItem {
    id: string;
    label: string;
}

export interface ChecklistCategory {
    id: string;
    title: string;
    items: ChecklistItem[];
}

export const checklistData: ChecklistCategory[] = [
    {
        id: 'month-before',
        title: 'Mesiac pred sťahovaním',
        items: [
            { id: 'm1', label: 'Vytvorte si rozpočet na sťahovanie.' },
            { id: 'm2', label: 'Objednajte si sťahovaciu firmu (ako VI&MO!).' },
            { id: 'm3', label: 'Začnite triediť veci – čo vyhodiť, darovať, predať.' },
            { id: 'm4', label: 'Zabezpečte si krabice a baliaci materiál.' },
            { id: 'm5', label: 'Informujte zamestnávateľa a požiadajte o voľno na deň sťahovania.' },
            { id: 'm6', label: 'Ak máte deti, začnite riešiť prepis do novej školy/škôlky.' },
        ]
    },
    {
        id: 'two-weeks-before',
        title: '2 týždne pred sťahovaním',
        items: [
            { id: 'w2-1', label: 'Začnite baliť veci, ktoré denne nepoužívate (knihy, sezónne oblečenie).' },
            { id: 'w2-2', label: 'Oznámte zmenu adresy na pošte (presmerovanie pošty).' },
            { id: 'w2-3', label: 'Zrušte alebo presuňte predplatné (časopisy, TV, internet).' },
            { id: 'w2-4', label: 'Spotrebujte potraviny z mrazničky a chladničky.' },
            { id: 'w2-5', label: 'Zmerajte rozmery nábytku a dverí v novom byte/dome.' },
        ]
    },
    {
        id: 'week-before',
        title: 'Týždeň pred sťahovaním',
        items: [
            { id: 'w1-1', label: 'Dobaľte väčšinu vecí. Označujte krabice podľa miestností.' },
            { id: 'w1-2', label: 'Potvrďte termín a čas so sťahovacou firmou.' },
            { id: 'w1-3', label: 'Zabezpečte si parkovacie miesto pre sťahovacie auto.' },
            { id: 'w1-4', label: 'Pripravte si "krabicu prvej noci" (toaletné potreby, lieky, nabíjačky, káva).' },
            { id: 'w1-5', label: 'Demontujte nábytok, ktorý sa bude sťahovať v rozloženom stave.' },
        ]
    },
    {
        id: 'day-before',
        title: 'Deň pred sťahovaním',
        items: [
            { id: 'd1-1', label: 'Odmrazte a vyčistite chladničku a mrazničku.' },
            { id: 'd1-2', label: 'Zbaľte posledné veci a osobné doklady si nechajte pri sebe.' },
            { id: 'd1-3', label: 'Nabite si mobilný telefón na 100%.' },
            { id: 'd1-4', label: 'Pripravte si hotovosť na zaplatenie sťahovania (ak je to potrebné).' },
            { id: 'd1-5', label: 'Dobre sa vyspite!' },
        ]
    },
    {
        id: 'moving-day',
        title: 'V deň sťahovania',
        items: [
            { id: 'd0-1', label: 'Urobte finálnu kontrolu bytu, či ste nič nezabudli.' },
            { id: 'd0-2', label: 'Ukážte sťahovákom, čo všetko sa má sťahovať.' },
            { id: 'd0-3', label: 'Odovzdajte kľúče od starého bytu.' },
            { id: 'd0-4', label: 'V novom byte usmernite sťahovákov, kam majú umiestniť nábytok a krabice.' },
            { id: 'd0-5', label: 'Po sťahovaní skontrolujte, či nič nechýba a nie je poškodené.' },
            { id: 'd0-6', label: 'Objednajte si pizzu a oslávte nový začiatok! 🎉' },
        ]
    }
];
