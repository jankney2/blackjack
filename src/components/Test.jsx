import React, { Component } from 'react';

export default class Test extends Component {
    state = { 
        count:0
     }

    render() {
        return (
            <div>
                <button onClick={ ()=>{
                    console.log('before', this.state.count)
 this.setState({count:++this.state.count})
                    console.log('after', this.state.count)

                }}>click me to hate life</button>{this.state.count}
            </div>
        );
    }
}