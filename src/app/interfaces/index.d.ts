import { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express{
        interface Request {
            user?: JwtPayload;
            // add any additional properties that are needed in the request
        }
    }
}