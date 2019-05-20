declare module 'async-sequencer' {

    const main: {
        Sequencer: (
            modules: ((data) => void)[], 
            callback: {
                sequenceNumber: number
                isSequenceSuccess: boolean
                isEndOfSequence: boolean
            },
            data) => void

        Sequence: (
            option: {
                resolve: () => void
                reject: () => void
                data
            }) => void
    }

    export = main
}