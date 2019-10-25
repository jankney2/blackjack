import React, { useState, useEffect } from "react";
import cards from "../deck";

const Game = () => {
  const [playerHand, updatePlayerHand] = useState([]);
  const [dealerHand, updateDealerHand] = useState([]);
  const [deck, d]=useState(cards)

    deal:()=>{
        //generate 4 random cards from the deck

        let p=deck[0]
        return p
    }

  useEffect(() => {
    console.log(deck);
  }, []);

  return <div>game</div>;
};

export default Game;
