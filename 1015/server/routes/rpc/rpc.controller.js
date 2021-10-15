const set = async (req,res) => {
    // console.log('hello world set(')
    res.json({msg:`hello world set()`})
}

const setTx = async (req,res) =>{
    // console.log('hello world set(')
    res.json({msg:`hello world setTx()`})
}

module.exports={
    set,
    setTx
}