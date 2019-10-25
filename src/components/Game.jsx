import React, { useState, useEffect } from "react";
import cards from "../deck";
import Card from "./Card";


const Game = () => {
  let [playerHand, updatePlayerHand] = useState([]);
  let [dealerHand, updateDealerHand] = useState([]);
  let [playerHandVal, updatePlayerHandVal] = useState(0);
  let [dealerHandVal, updateDealerHandVal] = useState(0);
  let [deck, d] = useState(cards);
  let [turn, switchTurn] = useState("player");
  let [playerScore, updatePlayerScore] = useState(0);
  let [dealerScore, updateDealerScore] = useState(0);
let [count, setCount]=useState(0)

  const deal = () => {
    //generate 4 random cards from the deck

    let p1c1 = deck[Math.floor(Math.random() * 52)];
    let p1c2 = deck[Math.floor(Math.random() * 52)];
    let dc1 = deck[Math.floor(Math.random() * 52)];
    let dc2 = deck[Math.floor(Math.random() * 52)];

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

    if (initPlayerVal === 21 && initDealerVal === 21) {
      alert("push!");

      updatePlayerScore(playerScore++);
      updateDealerScore(dealerScore++);
      deal();
    }

    if (initPlayerVal === 21) {
      updatePlayerScore((playerScore += 2));
      deal();
    }
    if (initDealerVal === 21) {
      updatePlayerScore((dealerScore += 2));
      deal();
    }
  };



  const getNewCard = () => {
    let newCard = deck[Math.floor(Math.random() * 52)];
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
    return newCard;
  };
  const dealerHit =  () => {
      let newCard = getNewCard();
      let newVal = dealerHandVal + newCard.value;
      console.log(dealerHandVal, 'before')
      updateDealerHandVal(newVal);
 
    winLogic(newVal)
    updateDealerHand([...dealerHand, newCard]);

    
    if (newVal < 17) {
        hit("dealer");
        winLogic(newVal)

    }



    if (playerHandVal > newVal && newVal >= 17) {

      hit("dealer");
      winLogic(newVal)

    }


    
  };

  const hit = type => {
    let newCard = getNewCard()

    if (type === "player") {
      console.log("hit player");
      let newVal = playerHandVal + newCard.value;
      if (newVal === 21) {
        alert("you won the hand!");
        updatePlayerScore(playerScore++);
        deal();
        return;
      }

      if (newVal > 21) {
        alert("player bust :(");
        updateDealerScore(++dealerScore);
        deal();
        return;
      }

      updatePlayerHandVal(newVal);
      updatePlayerHand([...playerHand, newCard]);
    }

    if (type === "dealer") {
      console.log("dealer hit fawiojfe");

        dealerHit();

    }
  };

  const winLogic = (dealer) => {

      console.log('dealerhand', dealerHandVal, dealer)
    if (dealer > 21) {
      alert("dealer bust");
      updatePlayerScore(++playerScore);
      deal();
      return;
    }
    if (dealer === 21) {
      alert("dealer Win");
      updateDealerScore((dealerScore += 2));
      deal();
      return;
    }
    if (playerHandVal === dealer) {
      alert("dealer win");
      updateDealerScore(dealerScore++);
      deal();
      return;
    }

    if (dealer >= 17) {
      if (dealer > playerHandVal) {
        alert("dealer win");
        updateDealerScore(++dealerScore);
        deal();
        return;
      } else {
        alert("player win");
        updatePlayerScore(++playerScore);
        deal();
        return;
      }
    }

    if(dealer>playerHandVal){
        alert('dealer win')
        updateDealerScore(++dealerScore)
        deal()
        return
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
      <div className="hand">
          <div className="cardHolder">
        {dealerCardMapper}

          </div>
        <p>dealer hand Val: {dealerHandVal}</p>
        <p>Dealer Score:{dealerScore}</p>
      </div>

      <div className="message">
        <h2>Player, What would you like to do?</h2>

        <button
          onClick={() => {
            hit("player");
          }}
        >
          Hit
        </button>
        <button
          onClick={() => {
            hit("dealer");
          }}
        >
          Hold
        </button>
      </div>

      <div className="hand">
        Player Hand

        <div className="cardHolder">
        {playerCardMapper}

        </div>
        <p>Player hand Val: {playerHandVal}</p>
        <p>Player Score:{playerScore}</p>
      </div>
   
      <button onClick={()=>{
          console.log(count, 'before')
          setCount(35)
          console.log(count, 'after')
      }}>Set Count {count}</button>



    </div>
  );
};

export default Game;
