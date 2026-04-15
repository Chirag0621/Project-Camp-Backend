import { User } from "../models/user.models.js"
import { ApiError} from "../utils/api-error.js"
import { asyncHandler } from "../utils/async-handler.js"

export const verifyJWT = asyncHandler( async(req, res, next) => 
  {
    // ? is for optional we are able to access the access token we can access it
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

    if(!token){
      throw new ApiError(401, "Unauthorized request")
    }

    try{
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      const user = await User.findById(decodeToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

      if(!user){
        throw new ApiError(401, "Invalid access token")
      }
      req.user = user
      next()
    }
    catch{
      throw new ApiError(401, "Invalid access token")
    }
  }
)