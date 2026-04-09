import { response } from "express";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";


// Error Handing can be done using try and catch but one better method is available using the util.js




// const healthCheck = async (req, res, next) => {
  
//   try{

//     const user = await getUserFromDB()
//     res.status(200).json(new ApiResponse(200, {message: "Server is running"}))
//   }
//   catch(error){
//     next(err)
//   }
// }

const healthCheck = asyncHandler (async(req, res) => {
  req.status(200).json(
    new ApiResponse(200, {message: "Server is running"})
  )
})

export { healthCheck }