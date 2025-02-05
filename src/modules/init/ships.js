import { Battleship } from "../../classes/Ship/Battleship.js";
import { Carrier } from "../../classes/Ship/Carrier.js";
import { Cruiser } from "../../classes/Ship/Cruiser.js";
import { Destroyer } from "../../classes/Ship/Destroyer.js";
import { Submarine } from "../../classes/Ship/Submarine.js";

export const Ships = {
  battleship: new Battleship(),
  carrier: new Carrier(),
  cruiser: new Cruiser(),
  destroyer: new Destroyer(),
  submarine: new Submarine(),
};
