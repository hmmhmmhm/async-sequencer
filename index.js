module.exports = {
    Sequencer: (modules = [], callback, data = {}) => {

        if(!Array.isArray(modules) || typeof data != 'object') throw new Error('Wrong Parameter')

        ;(async ()=>{
            let sequenceNumber = 0
            async function Sequencer(module){

                let isSequenceSuccess = true
                let sequenceResult = undefined
                try{
                    sequenceNumber++
                    if(typeof(module['default']) != 'undefined'){
                        sequenceResult = await module.default(data)
                    }else{
                        sequenceResult = await module(data)
                    }
                }catch(e){
                    isSequenceSuccess = false
                }

                if(typeof(callback) == 'function') await callback({
                    sequenceNumber,
                    sequenceResult,
                    isSequenceSuccess,
                    isEndOfSequence: modules.length == sequenceNumber
                })
            }

            for(let module of modules)
                await Sequencer(module)
        })()
    },

    Sequence: (callback)=>{
        return (data)=>{
            return new Promise((resolve, reject)=>{
                if(typeof(callback) == 'function')
                    callback({data, resolve, reject})
            })
        }
    }
}