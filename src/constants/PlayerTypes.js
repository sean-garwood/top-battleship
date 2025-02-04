const PlayerTypes = {
  HUMAN: "HUMAN",
  COMPUTER: "COMPUTER",
};

function validatePlayerType(type) {
  if (type !== PlayerTypes.HUMAN && type !== PlayerTypes.COMPUTER) {
    throw new Error("Invalid player type");
  }
  return type;
}

export { PlayerTypes, validatePlayerType };
