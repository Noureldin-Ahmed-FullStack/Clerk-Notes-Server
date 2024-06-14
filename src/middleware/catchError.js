export function catchError(func){
    return(req,res,next)=>{
        func(req,res,next).catch(err =>{res.status(404).json({ message: err })})
    }
} 