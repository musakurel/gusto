import { createContext } from "react";
import {User} from "./types/entities"


export const UserContext = createContext({id:0, firstName:"musa", lastName:"kurel", email:"deneme@gmail.com"}as User);