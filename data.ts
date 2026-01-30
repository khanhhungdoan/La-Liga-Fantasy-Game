export const BUDGET = 100; 

export const league = {
  name: "La Liga Fantasy",
  description: "Build your dream squad with a 100M budget",
};

export const categories = ["All", "Goalkeepers", "Defenders", "Midfielders", "Forwards"];

export interface Player {
  id: number;
  name: string;
  club: string;
  position: "GK" | "DEF" | "MID" | "FWD";
  rating: number;
  price: number; 
  image: string;
}

export const players: Player[] = [
  { id: 1, name: "Raphinha", club: "Barcelona", position: "FWD", rating: 92, price: 12.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Raphael_Dias_Belloli_2023.jpg" },
  { id: 2, name: "Kylian Mbappé", club: "Real Madrid", position: "FWD", rating: 93, price: 12.5, image: "https://en.wikipedia.org/wiki/Special:FilePath/Picture_with_Mbapp%C3%A9_(cropped).jpg" },
  { id: 3, name: "Julian Alvarez", club: "Atletico Madrid", position: "FWD", rating: 90, price: 10.5, image: "https://en.wikipedia.org/wiki/Special:FilePath/Argentina_national_football_team_-_2_-_2022_(Juli%C3%A1n_%C3%81lvarez).jpg" },
  { id: 4, name: "Mikel Oyarzabal", club: "Real Sociedad", position: "FWD", rating: 86, price: 8.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/UEFA_EURO_qualifiers_Sweden_vs_Spain_20191015_108_(cropped).jpg"},
  { id: 5, name: "Pedri", club: "Barcelona", position: "MID", rating: 91, price: 9.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Pedri.jpg"},
  { id: 6, name: "Jude Bellingham", club: "Real Madrid", position: "MID", rating: 92, price: 9.5, image: "https://en.wikipedia.org/wiki/Special:FilePath/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190551-2_(cropped).jpg"},
  { id: 7, name: "Vinicius Jr", club: "Real Madrid", position: "FWD", rating: 92, price: 11.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Vinicius_Jr_2021.jpg"},
  { id: 8, name: "Juan Foyth", club: "Villarreal", position: "DEF", rating: 84, price: 5.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Juan_Foyth_2017.jpg" },
  { id: 9, name: "Jules Kounde", club: "Barcelona", position: "DEF", rating: 87, price: 6.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Jules_Kound%C3%A9_2020.jpg" },
  { id: 10, name: "Alvaro Carreras", club: "Real Madrid", position: "DEF", rating: 88, price: 7.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/%C3%81lvaroCarreras.jpg" },
  { id: 11, name: "Unai Simon", club: "Athletic Bilbao", position: "GK", rating: 86, price: 5.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Unai_Sim%C3%B3n_2025_(cropped).jpg" },
  { id: 12, name: "Jan Oblak", club: "Atletico Madrid", position: "GK", rating: 88, price: 6.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Jan_Oblak_2019.jpg" },
  { id: 13, name: "Antony", club: "Real Betis", position: "FWD", rating: 85, price: 7.5, image: "https://en.wikipedia.org/wiki/Special:FilePath/Antony_2022.jpg" },
  { id: 14, name: "Koke", club: "Atletico Madrid", position: "MID", rating: 86, price: 7.0, image: "https://en.wikipedia.org/wiki/Special:FilePath/Koke_2019.jpg" },
  { id: 15, name: "Nico Williams", club: "Athletic Bilbao", position: "MID", rating: 85, price: 7.5, image:"https://en.wikipedia.org/wiki/Special:FilePath/ATHLETIC-OSASUNA_SEMIFINAL._MAIDER_GOIKOETXEA_(168)_(cropped).jpg" },
];