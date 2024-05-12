import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 4000;

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

let items: Item[] = [
  { id: 1, name:  "Teddy Bear", description: "A soft and cuddly teddy bear perfect for snuggling.", price: "$10", image: "https://m.media-amazon.com/images/I/713kPKxiLtL._AC_UF894,1000_QL80_.jpg" },
  { id: 2, name:  "Building Blocks", description: "Colorful building blocks to spark creativity and motor skills.", price: "$20", image: "https://m.media-amazon.com/images/I/71jVEjU17nL._AC_UF894,1000_QL80_.jpg" },
  { id: 3, name:  "Magic Puzzle", description: "A challenging magic puzzle that offers hours of fun.", price: "$30", image: "https://m.media-amazon.com/images/I/51uIgz1ozqL._AC_.jpg" },
  { id: 4, name:  "Toy Train", description: "A classic toy train with colorful carriages to entertain young engineers.", price: "$40", image: "https://m.media-amazon.com/images/I/61KS0q8TMjL._AC_UF894,1000_QL80_.jpg" },
  { id: 5, name:  "Doll House", description: "An intricately designed doll house that inspires imaginative play.", price: "$50", image: "https://m.media-amazon.com/images/I/81O4i6DNBLL._AC_UF894,1000_QL80_.jpg" },
  { id: 6, name:  "Action Figure", description: "An action figure with movable joints for dynamic play.", price: "$60", image: "https://media.gamestop.com/i/gamestop/20005276?$pdp$" },
  { id: 7, name:  "Remote Control Car", description: "A fast-moving remote control car for thrilling races.", price: "$70", image: "https://m.media-amazon.com/images/I/71M0R2x-LUL._AC_UF894,1000_QL80_.jpg" },
  { id: 8, name:  "Dinosaur Model", description: "Realistic dinosaur model for prehistoric playtimes.", price: "$80", image: "https://m.media-amazon.com/images/I/91m8pU3fQKL.jpg" },
  { id: 9, name:  "Board Game", description: "A fun family board game that tests skills and luck.", price: "$90", image: "https://i5.walmartimages.com/seo/Monopoly-Chance-Fast-Paced-20-Minute-Board-Game-for-Kids-and-Family-Ages-8-and-Up-2-4-Players_2c6f8df0-33b5-4e68-ab6d-6f295f172729.d07b2d953f1432fe8076d87d552af2a6.jpeg" },
  { id: 10, name: "Superhero Cape", description: "A superhero cape to empower little heroes during playtime.", price: "$100", image: "https://m.media-amazon.com/images/I/51MU9AaZQUL._AC_UF894,1000_QL80_.jpg" },
  { id: 11, name: "Water Gun", description: "A super soaker water gun for epic outdoor battles.", price: "$110", image: "https://i5.walmartimages.com/asr/c86555e1-b62d-4982-8263-036ccc8a4958.1dddc83c7492cf59d92da17d05974351.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" },
  { id: 12, name: "Clay Modeling Set", description: "A set of colorful clays for crafting and learning.", price: "$120", image: "https://m.media-amazon.com/images/I/71x0-2FWnmL.jpg" },
  { id: 13, name: "Robot Kit", description: "A robot building kit to introduce kids to the basics of robotics.", price: "$130", image: "https://www.enginediy.com/cdn/shop/products/1_c57bb0eb-4272-4cfa-85f4-513429ae71c1_1600x.jpg?v=1640161951" },
  { id: 14, name: "Chess Set", description: "A classic chess set to help develop strategic thinking.", price: "$140", image: "https://m.media-amazon.com/images/I/71LcWbtiRBS._AC_UF894,1000_QL80_.jpg" },
  { id: 15, name: "Electronic Keyboard", description: "An electronic keyboard to spark a love for music.", price: "$150", image: "https://i.ebayimg.com/images/g/hEIAAOSws0RihBjz/s-l1200.jpg" },
  { id: 16, name: "Basketball Hoop", description: "A mini basketball hoop for budding athletes.", price: "$160", image: "https://www.goalrilla.com/cdn/shop/products/B8403W_Wallmount_Basketball_Hoop_-_54__NXT_MAIN_800x.jpg?v=1611439071" },
  { id: 17, name: "Space Rocket", description: "A toy space rocket for aspiring astronauts.", price: "$170", image: "https://cdn.dribbble.com/users/13673392/screenshots/19763964/space_rocket.jpg" },
  { id: 18, name: "Play Tent", description: "A play tent that serves as a castle, spaceship, or hidden fortress.", price: "$180", image: "https://m.media-amazon.com/images/I/81+0q5o4OqL.jpg" },
  { id: 19, name: "Puzzle Mat", description: "An interactive puzzle mat that teaches while it entertains.", price: "$190", image: "https://i5.walmartimages.com/seo/CAP-Barbell-High-Density-Interlocking-Puzzle-Mat-50-in-Thick-EVA-Foam-Exercise-Gym-Flooring-Black-6-Pieces-20-78-Sq-ft_c8c4ff86-626c-43fd-a637-0f81071ccb8a_2.21ed0184e4e41f89531b7181583dca0f.jpeg" },
  { id: 20, name: "Magic Kit", description: "A beginner's magic kit to amaze friends and family with tricks.", price: "$200", image: "https://i5.walmartimages.com/seo/NATIONAL-GEOGRAPHIC-Kids-Magic-Science-Set-45-Magic-Tricks-for-Unisex-Kids-to-Perform_aa1a4e39-5019-405c-9637-5df8be3714d3.8cb8bdd1a1870c444d6da6269385c9c2.jpeg" },
  { id: 21, name: "Flower bouquet", description: "A group of flowers that have been arranged in a creative way.", price: "$200", image: "https://cdn.atwilltech.com/flowerdatabase/a/amazing-day-bouquet-spring-flowers-VA08712.425.jpg" },
  { id: 22, name: "Pocket watch", description: "A timepiece carried in the pocket rather than worn on the wrist.", price: "$100", image: "https://m.media-amazon.com/images/I/71zNy1TugbL._AC_UF894,1000_QL80_.jpg" },
  { id: 23, name: "Cricket bat", description: "A paddle-shaped piece of equipment used by batters in cricket to hit the ball.", price: "$500", image: "https://www.willcraftsports.in/wp-content/uploads/2020/03/WillCraft-K20-Kashmir-Willow-Plain-Cricket-Bat.jpeg" },
  { id: 24, name: "Invitation card", description: "A card given to someone to invite them to something.", price: "$50", image: "https://i.ebayimg.com/images/g/-GMAAOSwOQpflkra/s-l400.jpg" },
  { id: 25, name: "Key Chain", description: "A device that is used to hold keys and that usually consists of a metal ring, a short chain, and a small decoration.", price: "$200", image: "https://www.sevenseason.store/cdn/shop/products/kate_spade_new_york_Monkey_King_Keychain-Seven_Season_4_1024x1024@2x.jpg?v=1576588653" },
  { id: 26, name: "Dinner Set", description: "A collection of dishes, plates, bowls, and other tableware items used for serving and eating food.", price: "$100", image: "https://m.media-amazon.com/images/I/61NUmFFLe0S.jpg" },
  { id: 27, name: "Speaker", description: "An electroacoustic transducer that converts an electrical audio signal into a corresponding sound.", price: "$500", image: "https://target.scene7.com/is/image/Target/GUEST_6b785e97-ac6e-4187-8e46-051cf7334be9?wid=488&hei=488&fmt=pjpeg" },
  { id: 28, name: "Office chair", description: "A type of chair that is designed for use at a desk in an office.", price: "$580", image: "https://www.techly.com/media/catalog/product/s/e/sedia_per_ufficio_con_schienale_alto_e_poggiatesta_regolabile_nero-techly-ica-ct_mc016-50715_3.jpg" },
  { id: 29, name: "Cake", description: "A sweet baked food made from a dough or thick batter usually containing flour and sugar and often shortening, eggs, and a raising agent.", price: "$50", image: "https://www.allrecipes.com/thmb/Huh-I63aYc_zZ0NbLECEpFD0BcI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/60564-StrawberryCakeFromScratch-ddfms-4X3-0291-1-cd8254e28ea14112b5fc49e25cd08ff6.jpg" },
  { id: 30, name: "Workout Dumbbell", description: "Exercise equipment with a narrow bar in the middle and two wider discs at each end.", price: "$300", image: "https://m.media-amazon.com/images/I/8135VokGvPL._AC_UF1000,1000_QL80_DpWeblab_.jpg" }
];

app.use(cors());
app.use(bodyParser.json());

app.get('/api/items', (req: Request, res: Response) => {
  const search: string = req.query.search as string;
  const offset: number = parseInt(req.query.offset as string) || 0;
  const limit: number = parseInt(req.query.limit as string) || 10;

  let filteredItems: Item[] = items;
    if (search && search.trim()) {
        const lowerCaseSearch = search.toLowerCase();
        filteredItems = items.filter(item =>
            item.name.toLowerCase().includes(lowerCaseSearch) ||
            item.description.toLowerCase().includes(lowerCaseSearch) ||
            item.price.toLowerCase().includes(lowerCaseSearch) 
        );
    }

    const paginatedItems: Item[] = filteredItems.slice(offset, offset + limit);

  res.json(paginatedItems);
});

app.post('/api/items', (req: Request, res: Response) => {
  const item: Item = req.body;
  items.push(item);
  res.status(201).send();
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
