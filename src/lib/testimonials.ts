
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  imageUrl: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Jana N.',
    location: 'Petržalka',
    rating: 5,
    text: 'Sťahovanie s VI&MO bolo absolútne bez stresu. Chalani boli rýchli, profesionálni a nesmierne ochotní. Všetko prebehlo hladko, nábytok bol bez jediného škrabanca. Odporúčam všetkými desiatimi!',
    imageUrl: 'https://picsum.photos/seed/testimonial1/100/100'
  },
  {
    id: 't2',
    name: 'Peter K.',
    location: 'Staré Mesto',
    rating: 5,
    text: 'Potreboval som presťahovať kanceláriu cez víkend s minimálnym dopadom na prevádzku. Tím VI&MO to zvládol na jednotku. V pondelok ráno sme mohli bez problémov fungovať. Perfektná komunikácia a plánovanie.',
    imageUrl: 'https://picsum.photos/seed/testimonial2/100/100'
  },
  {
    id: 't3',
    name: 'Rodina Horváthová',
    location: 'Ružinov',
    rating: 5,
    text: 'Veľké ďakujem za pomoc pri sťahovaní nášho 3-izbového bytu. Oceňujeme hlavne trpezlivosť a opatrnosť pri manipulácii s krehkými vecami. Cena bola férová a vopred dohodnutá. Určite využijeme znova.',
    imageUrl: 'https://picsum.photos/seed/testimonial3/100/100'
  },
  {
    id: 't4',
    name: 'Martin S.',
    location: 'Dúbravka',
    rating: 4,
    text: 'Využil som služby vypratávania pivnice. Práca bola odvedená rýchlo a presne podľa dohody. Jeden bodík dole dávam len za to, že meškali 15 minút, ale inak som bol veľmi spokojný.',
    imageUrl: 'https://picsum.photos/seed/testimonial4/100/100'
  }
];
