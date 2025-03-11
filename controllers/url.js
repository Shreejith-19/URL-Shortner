const shortid = require("shortid")
const URL = require("../models/url.js")

welcomeUser = (req,res)=>{
    res.write(`Hello User!, your at ${req.path}`)
}

handleGenerateShortUrl = async(req,res)=>{
    const body = req.body
    if(!body.url){
        return res.status(400).json({"message":"URL is required"})
    }else{
        try{
            await URL.create({
                url:body.url,
                shortURL:shortid.generate()
            })
            return res.status(201).json({"message":"user created"})

        }catch(err){
            if(err.code == 11000){
                return res.status(409).json({"message":"duplicate key detected"})
            }else{
                return res.status(404).json({"message":"unexpected Error"})
            }
        }
    }
}

handleRedirection = async(req,res)=>{
    let id = req.params.shortId
    let allUrls = URL.find({})
    let target = await allUrls.findOne({shortURL:id})
    console.log(target)
    if(target){
        return res.redirect(target.url)
    }else{
        return res.status(404).json({"errMessgae":"shortId does not exist"})
    }
}
module.exports = {welcomeUser,handleGenerateShortUrl,handleRedirection}