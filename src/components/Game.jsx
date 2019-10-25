import React, { useState, useEffect } from "react";
import cards from "../deck";
import Card from "./Card";

const Game = () => {
  const [playerHand, updatePlayerHand] = useState([]);
  const [dealerHand, updateDealerHand] = useState([]);
  const [playerHandVal, updatePlayerHandVal]=useState(0)
  const [dealerHandVal, updateDealerHandVal]=useState(0)
  const [deck, d] = useState(cards);
  const [turn, switchTurn] = useState("player");
 const [playerScore, updatePlayerScore]=useState(0)
 const [dealerScore, updateDealerScore]=useState(0)


  const deal = () => {
    //generate 4 random cards from the deck

    let p1c1 = deck[Math.round(Math.random() * 52)];
    let p1c2 = deck[Math.round(Math.random() * 52)];
    let dc1 = deck[Math.round(Math.random() * 52)];
    let dc2 = deck[Math.round(Math.random() * 52)];

    updateDealerHand([dc1, dc2]);
    updatePlayerHand([p1c1, p1c2]);
    
    let allCards=[p1c1, p1c2, dc1, dc2]

    allCards.forEach(el=>{
        if(el.value==='J'||el.value==='K'||el.value==='Q'){
            el.faceValue=el.value
            el.value=10
        }

        if(el.value==='A'){
            el.value=11
            el.faceValue='A'
        }
    })



    let initPlayerScore=p1c1.value+p1c2.value
    let initiDealerScore=dc1.value+dc2.value
    updatePlayerHandVal(initPlayerScore)
    updateDealerHandVal(initiDealerScore)

  };

  useEffect(() => {
    deal()
  }, []);

  //using the index as the key in a .map is bad form, but the objects i'm using for the cards don't have an Id, so for simplicity's sake I'm using the index.
  let playerCardMapper = playerHand.map((el, i) => {
    return <Card suit={el.suit} key={i} val={el.value} />;
  });

  let dealerCardMapper = dealerHand.map((el, i) => {
    return <Card suit={el.suit} key={i} val={el.value} />;
  });

  return (
    <div>
      <button
        onClick={() => {
          console.log(playerHand, dealerHand);
        }}
      >
        click for state
      </button>

      <div className="dealerHand">{dealerCardMapper}</div>

      <div className="message">
        <h2>What would you like to do?</h2>

        <button>Hit</button>
        <button>Hold</button>
      </div>

      <div className="playerHand">
        Player Hand
        {playerCardMapper}
        <p>Player hand Val: {playerHandVal}</p>
      </div>
    </div>
  );
};

export default Game;
