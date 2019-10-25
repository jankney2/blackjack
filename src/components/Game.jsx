import React, { useState, useEffect } from "react";
import cards from "../deck";
import Card from "./Card";

const Game = () => {
  const [playerHand, updatePlayerHand] = useState([]);
  const [dealerHand, updateDealerHand] = useState([]);
  const [playerHandVal, updatePlayerHandVal] = useState(0);
  const [dealerHandVal, updateDealerHandVal] = useState(0);
  const [deck, d] = useState(cards);
  const [turn, switchTurn] = useState("player");
  const [playerScore, updatePlayerScore] = useState(0);
  const [dealerScore, updateDealerScore] = useState(0);

  const deal = () => {
    //generate 4 random cards from the deck

    let p1c1 = deck[Math.round(Math.random() * 52)];
    let p1c2 = deck[Math.round(Math.random() * 52)];
    let dc1 = deck[Math.round(Math.random() * 52)];
    let dc2 = deck[Math.round(Math.random() * 52)];

    updateDealerHand([dc1, dc2]);
    updatePlayerHand([p1c1, p1c2]);

    let allCards = [p1c1, p1c2, dc1, dc2];

    allCards.forEach(el => {
      if (el.value === "J" || el.value === "K" || el.value === "Q") {
        el.faceValue = el.value;
        el.value = 10;
      }

      if (el.value === "A") {
        el.value = 11;
        el.faceValue = "A";
      }
    });

    let initPlayerVal = p1c1.value + p1c2.value;
    let initDealerVal = dc1.value + dc2.value;
    updatePlayerHandVal(initPlayerVal);
    updateDealerHandVal(initDealerVal);

    if(initPlayerVal===21&&initDealerVal===21){
alert('push!')
    
    updatePlayerScore(playerScore++)
    updateDealerScore(dealerScore++)
    deal()

    }

    if(initPlayerVal===21){
        updatePlayerScore(playerScore+=2)
        deal()
    }
    if(initDealerVal===21){
        updatePlayerScore(dealerScore+=2)
        deal()
    }
  };

  const hit = () => {
    if (turn === "player") {
      console.log("hit if");
      let newCard = deck[Math.round(Math.random() * 52)];

      if (
        newCard.value === "J" ||
        newCard.value === "K" ||
        newCard.value === "Q"
      ) {
        newCard.faceValue = newCard.value;
        newCard.value = 10;
      }

      if (newCard.value === "A") {
        newCard.value = 11;
        newCard.faceValue = "A";
      }

      console.log(newCard, "newCard");
      let newVal = playerHandVal + newCard.value;


      if (newVal === 21) {
        alert("you won the hand!");
        updatePlayerScore(playerScore++);
        deal();
        return;
      }

      if (newVal > 21) {
        alert("bust :(");

        deal();
        return;
      }

      updatePlayerHandVal(newVal);
      updatePlayerHand([...playerHand, newCard]);

    }
  };
  useEffect(() => {
    deal();
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
      <div className="dealerHand">{dealerCardMapper}</div>

      <div className="message">
        <h2>Player, What would you like to do?</h2>

        <button
          onClick={() => {
            hit();
          }}
        >
          Hit
        </button>
        <button
          onClick={() => {
            switchTurn("dealer");
          }}
        >
          Hold
        </button>
      </div>

      <div className="playerHand">
        Player Hand
        {playerCardMapper}
        <p>Player hand Val: {playerHandVal}</p>
        <p>Player Score:{playerScore}</p>
      </div>
    </div>
  );
};

export default Game;
