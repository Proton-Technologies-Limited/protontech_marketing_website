/**
 * Photography registry.
 * All photos are free-licence images from Unsplash (https://unsplash.com/license),
 * served through Unsplash's CDN. Swap these for your own project photography before launch.
 */
export type PhotoData = {
  id: string;
  alt: string;
  /** Dominant colour, shown while the image loads */
  color: string;
  width: number;
  height: number;
  credit: { name: string; url: string };
};

const credit = (name: string, slug: string) => ({ name, url: `https://unsplash.com/photos/${slug}` });

export const photos = {
  nordLiving: {
    id: "photo-1772797583328-f83bc3f94f80",
    alt: "Bright living room with oak shelving, a linen sofa and soft natural light",
    color: "#c0a68c",
    width: 2208,
    height: 2760,
    credit: credit("Puscas Adryan", "modern-living-room-with-natural-light-and-wooden-accents-2cfj0Y5ch00"),
  },
  nordStove: {
    id: "photo-1723748972084-4124765e0a55",
    alt: "Airy living room with a wood-burning stove, large windows and neutral furnishings",
    color: "#8c8c73",
    width: 3200,
    height: 2133,
    credit: credit("Clay Banks", "a-living-room-filled-with-furniture-and-a-fire-place-UTWRDWMMaag"),
  },
  oakKitchen: {
    id: "photo-1502005097973-6a7082348e28",
    alt: "Long galley kitchen with warm wood cabinetry opening onto a green garden",
    color: "#d9c0c0",
    width: 3648,
    height: 5472,
    credit: credit("Jason Briscoe", "white-wooden-kitchen-island-and-cupboard-cabinets-near-glass-panel-door-AQl-J19ocWE"),
  },
  lumiereDining: {
    id: "photo-1656403002413-2ac6137237d6",
    alt: "Dark wood-panelled dining room lit by a sculptural bubble chandelier",
    color: "#26260c",
    width: 3495,
    height: 3200,
    credit: credit("Kam Idris", "a-room-with-a-table-chairs-and-a-plant-with-lights-wMzpa3WsDkI"),
  },
  pendantDining: {
    id: "photo-1766603636578-1da99a6dd236",
    alt: "Open-plan dining room and kitchen with pendant lights and floor-to-ceiling windows",
    color: "#d9c0a6",
    width: 6000,
    height: 2571,
    credit: credit("Alef Morais", "modern-dining-room-and-kitchen-with-large-windows-b9gt2h6g-QY"),
  },
  hueRooms: {
    id: "photo-1721522283459-18c248c7861d",
    alt: "Freshly painted rooms in buttery yellow and deep blue connected by a doorway",
    color: "#c0c0c0",
    width: 6000,
    height: 4000,
    credit: credit("Lisa Anna", "a-living-room-with-yellow-walls-and-chairs-YAY5kldcdSg"),
  },
  hueMustard: {
    id: "photo-1597218868981-1b68e15f0065",
    alt: "Mustard yellow feature wall with a wooden bench, framed art and plants",
    color: "#d9a659",
    width: 2966,
    height: 4449,
    credit: credit("Julia", "wooden-bench-with-art-and-plants-60SnthS09Ao"),
  },
  hueBlue: {
    id: "photo-1721522285562-e7b6a9a83528",
    alt: "Dining room with calm blue walls, a wooden table and tall windows",
    color: "#c0c0c0",
    width: 6000,
    height: 4000,
    credit: credit("Lisa Anna", "a-dining-room-with-blue-walls-and-a-wooden-table-g74kuKmQmzE"),
  },
  swatches: {
    id: "photo-1601464723270-8867f191b1bf",
    alt: "Paint colour swatches and ceramic samples laid out on a table",
    color: "#c0c0c0",
    width: 6048,
    height: 4024,
    credit: credit("Karolina De Costa", "white-ceramic-bowl-on-brown-wooden-tray-ZLivh64UZt8"),
  },
  nordBedroom: {
    id: "photo-1633944095397-878622ebc01c",
    alt: "Minimal bedroom with a low oak bed and a gallery wall of framed prints",
    color: "#a68c8c",
    width: 5315,
    height: 3543,
    credit: credit("laura adai", "a-bed-sitting-in-a-bedroom-next-to-a-window-J60bPeDiR8A"),
  },
  lumiereLounge: {
    id: "photo-1603561128926-9a7ff92e77ad",
    alt: "Moody corner with a sage velvet armchair, woven basket and dried flowers",
    color: "#262626",
    width: 4000,
    height: 6000,
    credit: credit("Olena Bohovyk", "gray-padded-chair-beside-brown-woven-basket-DUDbViuozxg"),
  },
  sketching: {
    id: "photo-1599420187429-774dbfc6ba5d",
    alt: "Designer's desk with hand-drawn floor plans, pencils and a scale ruler",
    color: "#c0c0a6",
    width: 4000,
    height: 6000,
    credit: credit("Ryan Ancill", "white-printer-paper-beside-black-and-gray-calculator-eeuPtEVuofQ"),
  },
  archNook: {
    id: "photo-1788927775194-70e9b280dd79",
    alt: "Sunlit room with a daybed, a wooden chair and an arched plaster alcove",
    color: "#735940",
    width: 4029,
    height: 6044,
    credit: credit("Vincent Yap", "sunlit-room-with-arched-bathroom-alcove-Y7zup896jrI"),
  },
  archLiving: {
    id: "photo-1688646953306-5ec93eab8c06",
    alt: "Contemporary living room with arched openings and a large window",
    color: "#8c8c8c",
    width: 3689,
    height: 2760,
    credit: credit("amir hossein", "a-living-room-filled-with-furniture-and-a-large-window-bYqaOabPmTk"),
  },
  stoneBath: {
    id: "photo-1696987007764-7f8b85dd3033",
    alt: "Renovated bathroom with stone tiles, twin basins and a walk-in shower",
    color: "#d9d9d9",
    width: 3500,
    height: 2333,
    credit: credit("Clay Banks", "a-bathroom-with-two-sinks-a-toilet-and-a-shower-ckdoA-tv9uw"),
  },
  travertineBath: {
    id: "photo-1661107259637-4e1c55462428",
    alt: "Travertine bathroom with a dark vanity and a round mirror",
    color: "#c0a68c",
    width: 3982,
    height: 5985,
    credit: credit("serjan midili", "a-bathroom-with-a-large-mirror-mLx6oMw32PI"),
  },
} satisfies Record<string, PhotoData>;

export type PhotoKey = keyof typeof photos;

const UNSPLASH = "https://images.unsplash.com/";

export const photoSrc = (photo: PhotoData) => `${UNSPLASH}${photo.id}`;

/** Build a CDN URL at an explicit width (for SVG <image> and CSS backgrounds). */
export const photoUrl = (photo: PhotoData, width: number, quality = 70) =>
  `${photoSrc(photo)}?w=${width}&q=${quality}&auto=format&fit=crop`;
