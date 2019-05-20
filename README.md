# async-sequencer

> 🌳 Pure javascript based lightweight sequencer module (support browser with webpack!)

> 😊 Typescript(.d.ts) Support! Fully Intellisensed

This module helps you easily create sequences that must be executed in sequence through Promise.

## Install

```bash
npm install --save async-sequencer
```

## Usage

### main.js

```js
const {Sequencer} = require(`async-sequencer`)

// Data shared between sequences
let data = {number : 1}

Sequencer(

    // List Of Sequence Function
    [
        require('./Sequence/a'),
        require('./Sequence/b'),
        require('./Sequence/c'),
        require('./Sequence/d')
    ],

    ({
        sequenceNumber,
        isSequenceSuccess,
        isEndOfSequence,
        sequenceResult
    })=>{

        // Callback Logic
    }

, data)
```

### ./Sequence/a

```jsx
const {Sequence} = require(`async-sequencer`)

module.exports = Sequence(({resolve, reject, data})=>{

    // Sequence Logic
    resolve()
})
```



## License

MIT Licensed.