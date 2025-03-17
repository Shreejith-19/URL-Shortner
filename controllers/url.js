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
                shortURL:shortid.generate(),
                history:[],
                clicks:0
            })
            return res.status(201).json({"message":"user created"})

        }catch(err){
            if(err.code == 11000){
                return res.status(409).json({"message":"duplicate key detected"})
            }else{
                return res.status(500).json({"message":"unexpected Error"})
            }
        }
    }
}

handleRedirection = async(req,res)=>{
    let id = req.params.shortId
    let target = await URL.findOneAndUpdate(
        {shortURL:id},
        {$push:{history:{visits:new Date().toLocaleString()}},
         $inc:{clicks:1}
        },
        {new:true}//returns document after update to target
    )
    if(target){
        return res.redirect(target.url)
    }else{
        return res.status(404).json({"errMessage":"id does not exist"})
    }
}
handleGetAnalytics = async (req,res)=>{
    let id = req.params.shortId
    let analytics = await URL.findOne({shortURL:id})
    console.log(analytics)
    if(analytics){
        return res.status(200).json(analytics) 
    }else{
        return res.status(404).json({"errMessage":"analytics not found"})
    }
}
module.exports = {welcomeUser,handleGenerateShortUrl,handleRedirection,handleGetAnalytics}