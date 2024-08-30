import { createContext, useState } from "react";






export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    let [login, setLogin] = useState("")
   useState(()=>{
    if (localStorage.getItem('userToken')) {
        setLogin(localStorage.getItem('userToken'))
    }
   },[])

    return <AuthContext.Provider value={{ login, setLogin }}>
        {children}
    </AuthContext.Provider>
}