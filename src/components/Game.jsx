import React, { Component } from "react";
import cards from "../deck";
import Card from "./Card";

export default class Game extends Component {
  state = {
    playerHand: [],
    dealerHand: [],
    playerHandVal: 0,
    dealerHandVal: 0,
    deck: cards,
    playerScore: 0,
    dealerScore: 0
  };

  deal = () => {
    //generate 4 random cards from the deck

    let p1c1 = this.state.deck[Math.floor(Math.random() * 52)];
    let p1c2 = this.state.deck[Math.floor(Math.random() * 52)];
    let dc1 = this.state.deck[Math.floor(Math.random() * 52)];
    let dc2 = this.state.deck[Math.floor(Math.random() * 52)];
    let initPlayerVal = p1c1.value + p1c2.value;
    let initDealerVal = dc1.value + dc2.value;

    this.setState({
      dealerHand: [dc1, dc2],
      playerHand: [p1c1, p1c2],
      dealerHandVal: initDealerVal,
      playerHandVal: initPlayerVal
    });
    console.log(
      this.state.playerHandVal,
      this.state.dealerHandVal,
      "init values"
    );
    if (this.state.playerHandVal === 21 && this.state.dealerHandVal === 21) {
      alert("push!");

      this.setState({
        playerScore: this.state.playerScore + 1,
        dealerScore: this.state.dealerScore + 1
      });
      this.deal();
    }

    if (initPlayerVal === 21) {
      this.setState({
        playerScore: this.state.playerScore + 2
      });

      this.deal();
    }
    if (initDealerVal === 21) {
      this.setState({
        dealerScore: this.state.dealerScore + 2
      });

      this.deal();
    }

    if (initPlayerVal > 21 && initDealerVal > 21) {
      alert("wash");
      this.deal();
    }
    if (initPlayerVal > 21) {
      alert("player bust");
      this.setState({
        dealerScore: this.state.dealerScore + 1
      });
      this.deal();
    }

    if (initDealerVal > 21) {
      alert("dealer bust");
      this.setState({
        playerScore: this.state.playerScore + 1
      });
    }
  };

  getNewCard = () => {
    let newCard = this.state.deck[Math.floor(Math.random() * 52)];

    return newCard;
  };
  dealerHit = async () => {
    let newCard = this.getNewCard();
    let newVal = this.state.dealerHandVal + newCard.value;

    if(newCard.faceValue==='A'&&newVal>21){
      newVal-=10
    }



    await this.setState({
      dealerHandVal: newVal,
      dealerHand: [...this.state.dealerHand, newCard]
    });
setTimeout(() => {
  this.winLogic("dealer");
  
}, 200);

    return;
  };

  hit = async type => {
    let newCard = this.getNewCard();
    if (type === "player") {
      let newVal = this.state.playerHandVal + newCard.value;
      if(newCard.faceValue==='A'&&newVal>21){
        newVal-=10
      }

      await this.setState({
        playerHand: [...this.state.playerHand, newCard],
        playerHandVal: newVal
      });
      console.log(this.state.playerHandVal, "phv");
      setTimeout(() => {
        this.winLogic("player");
      }, 200);
    }

    if (type === "dealer") {
      if(this.state.dealerHandVal===this.state.playerHandVal){
        this.winLogic('dealer')
        return
      }
      if(this.state.dealerHandVal>this.state.playerHandVal){
        this.winLogic('dealer')
        return
      }
      if (this.state.dealerHandVal === this.state.playerHandVal) {
        this.dealerHit();
        return;
      }

      if (this.state.dealerHandVal < this.state.playerHandVal) {
        this.dealerHit();
        return;
      }

      if (this.state.dealerHandVal < 17) {
        this.dealerHit();
        return;
      }

      if (this.state.dealerHandVal > this.state.playerHandVal) {
        this.winLogic("dealer");
        return;
      }
    }
  };

  winLogic = type => {
    //player wins
    if (type === "player") {
      if (this.state.playerHandVal === 21) {
        alert("you won the hand!");
        this.setState({
          playerScore: this.state.playerScore + 1
        });
        this.deal();
        return;
      }

      if (this.state.playerHandVal > 21) {
        alert("player bust :(");
        this.setState({
          dealerScore: this.state.dealerScore + 1
        });
        this.deal();
        return;
      } else {
        return;
      }
    }

    //dealer logic

    if (this.state.dealerHandVal > 21) {
      alert("dealer bust");
      this.setState({
        playerScore: this.state.playerScore + 1
      });

      this.deal();
      return;
    }
    if (this.state.dealerHandVal === 21) {
      alert("dealer Win");
      this.setState({
        dealerScore: this.state.dealerScore + 2
      });
      this.deal();
      return;
    }

    //when dealer is greater than it doesn't trigger a win

    if (
      this.state.dealerHandVal > this.state.playerHandVal &&
      type === "dealer"
    ) {
      alert("dealer win!");
      this.setState({
        dealerScore: this.state.dealerScore + 1
      });
      this.deal();
      return;
    }

    if (
      this.state.dealerHandVal <= 17 &&
      this.state.playerHandVal === this.state.dealerHandVal
    ) {
      this.hit("dealer");
      return;
    }

    if(this.state.dealerHandVal===this.state.playerHandVal){
      alert('dealer win!')
      this.setState({
        dealerScore:this.state.dealerScore+1
      })
      this.deal()
      return
    }

    if (this.state.dealerHandVal < this.state.playerHandVal) {
      this.hit("dealer");
      return;
    }
    return;
  };

  componentDidMount() {
    this.deal();
  }

  //using the index as the key in a .map is bad form, but the objects i'm using for the cards don't have an Id, so for simplicity's sake I'm using the index.

  render() {
    let playerCardMapper = this.state.playerHand.map((el, i) => {
      return <Card suit={el.suit} key={i} val={el.faceValue} />;
    });

    let dealerCardMapper = this.state.dealerHand.map((el, i) => {
      return <Card suit={el.suit} key={i} val={el.faceValue} />;
    });

    return (
      <div>
        <div className="hand">
          <div className="cardHolder">{dealerCardMapper}</div>
          <p>dealer hand Val: {this.state.dealerHandVal}</p>
          <p>Dealer Score:{this.state.dealerScore}</p>
        </div>

        <div className="hand">
          Player Hand
          <div className="cardHolder">{playerCardMapper}</div>
          <p>Your hand total: {this.state.playerHandVal}</p>
          <p>Your Score:{this.state.playerScore}</p>
        </div>

        <div className="message">
          <h2>What would you like to do?</h2>

          <button
            onClick={() => {
              this.hit("player");
            }}
          >
            Hit
          </button>
          <button
            onClick={() => {
              this.hit("dealer");
            }}
          >
            Hold
          </button>
        </div>
      </div>
    );
  }
}
