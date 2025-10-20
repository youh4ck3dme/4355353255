
export interface Location {
    id: string;
    name: string;
    x: number; // SVG coordinate
    y: number; // SVG coordinate
    slug?: string; // Link to blog post
}

export const locations: Location[] = [
    // Bratislava Districts
    { id: "stare-mesto", name: "Staré Mesto", x: 200, y: 250, slug: 'stahovanie-stare-mesto-parkovacie-povolenia' },
    { id: "ruzinov", name: "Ružinov", x: 230, y: 260, slug: 'stahovanie-ruzinov-moderne-sidliska' },
    { id: "nove-mesto", name: "Nové Mesto", x: 220, y: 230, slug: 'stahovanie-nove-mesto-mlada-energia' },
    { id: "petrzalka", name: "Petržalka", x: 190, y: 280, slug: 'stahovanie-petrzalka-kompletny-sprievodca' },
    { id: "karlova-ves", name: "Karlova Ves", x: 170, y: 240, slug: 'stahovanie-karlova-ves-zelena-oaza' },
    { id: "dubravka", name: "Dúbravka", x: 160, y: 215, slug: 'stahovanie-dubravka-panelaky-rodinne-domy' },
    { id: "lamac", name: "Lamač", x: 180, y: 200, slug: 'stahovanie-lamac-komorna-cast-mesta' },
    { id: "devin", name: "Devín", x: 140, y: 250, slug: 'stahovanie-devin-malebna-lokalita' },
    { id: "devinska", name: "Devínska N. Ves", x: 150, y: 190, slug: 'stahovanie-devinska-nova-ves-dunaj-a-priemysel' },
    { id: "zahorska", name: "Záhorská Bystrica", x: 180, y: 170, slug: 'stahovanie-zahorska-bystrica-pod-karpatmi' },
    { id: "raca", name: "Rača", x: 250, y: 210, slug: 'stahovanie-raca-tipy-pre-rodiny' },
    { id: "vajnory", name: "Vajnory", x: 265, y: 230, slug: 'vypratavanie-vajnory-letiskovy-charakter' },
    { id: "vrakuna", name: "Vrakuňa", x: 245, y: 285, slug: 'stahovanie-vrakuna-nova-bratislava' },
    { id: "biskupice", name: "Pod. Biskupice", x: 240, y: 310, slug: 'stahovanie-podunajske-biskupice-mesto-a-vidiek' },
    { id: "jarovce", name: "Jarovce", x: 180, y: 310, slug: 'stahovanie-jarovce-juzna-cast-bratislavy' },
    { id: "rusovce", name: "Rusovce", x: 200, y: 330, slug: 'rychle-stahovanie-rusovce' },
    
    // Surrounding Towns
    { id: "senec", name: "Senec", x: 320, y: 240 },
    { id: "pezinok", name: "Pezinok", x: 280, y: 180 },
    { id: "malacky", name: "Malacky", x: 160, y: 120 },
    { id: "samorin", name: "Šamorín", x: 270, y: 350 },
    { id: "stupava", name: "Stupava", x: 160, y: 160 },
];
