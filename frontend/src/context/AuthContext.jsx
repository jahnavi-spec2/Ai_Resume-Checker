import {createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";

  import { loginApi, registerApi, getCurrentUserApi, logoutApi } from "../api/auth";

    const AuthContext = createContext(null);

    export const AuthProvider=({children})=>{//this react component actually provide info to AuthContext 
        const [user,setUser]=useState(null);
        const [loading,setLoading]=useState(true);
    
//check if user os loggesd in on page refresh
  const refresh=useCallback(async()=>{
    try{
      const response=await getCurrentUserApi();
      setUser(response.data.user);
    }
    catch{
      setUser(null);
    }
    finally{
      setLoading(false);
    }
  },[]);

  useEffect(()=>{
    refresh();
  },[refresh]);

  const login=useCallback(async(credentials)=>{
  const response= await loginApi(credentials);
  const loggedInUser= response.data.user;
  setUser(loggedInUser);
  return loggedInUser;
  },[]);

  const register=useCallback(async (payload)=>{
   const response=await registerApi(payload);
   const user=response.data.user;
   setUser(user);
   return user;
  },[])

  const logout=useCallback(async()=>{
    try{
        await logoutApi();

    }finally{
        setUser(null);
    }
  },[]);


  return (

    <AuthContext.Provider value={{user,loading,login,register,logout,refresh}}>
    {children}
    </AuthContext.Provider>
  );
}


export function  useAuth() {
    const ctx=useContext(AuthContext);//allows a user to access thw authacontext
    if(!ctx)
        throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}