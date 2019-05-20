module.exports = {
    Sequencer: (modules = [], callback, data = {}) => {

        if(!Array.isArray(modules) || typeof data != 'object') throw new Error('Wrong Parameter')

        ;(async ()=>{
            let sequenceNumber = 0
            async function Sequencer(module){

                let isSequenceSuccess = true
                try{
                    sequenceNumber++
                    if(typeof(module['default']) != 'undefined'){
                        await module.default(data)
                    }else{
                        await module(data)
                    }
                }catch(e){
                    isSequenceSuccess = false
                }

                if(typeof(callback) == 'function') await callback({
                    sequenceNumber,
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