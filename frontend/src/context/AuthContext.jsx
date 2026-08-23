import {createContext,
    useContext,
    useEffect,
    useState,
    useCallback} from "react";

    import {useQueryClient} from "@tanstack/react-query";
    import {authApi} from "@api/auth";

    const AuthContext = createContext(null);

    export function AuthProvider({children}){//this react component actually provide info to AuthContext 
        const [user,setUser]=useState(null);
        const [loading,setLoading]=useState(true);
        const queryClient=useQueryClient();//get acccess to tht client ,if we wanna logout we need to remove cached detail
    

  const refresh=useCallback(async()=>{
    try{
      const {user}= await authApi.me()// is user loggedi n if yes thn send details
      setUser(user);
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
    const{user}=await authApi.login(credentials);
    setUser(user);
    return user;
  },[])

  const register=useCallback(async (payload)=>{
    const {user}=await authApi.register(payload);
    setUser(user);
    return user;
  })

  const logout=useCallback(async()=>{
    try{
        await authApi.logout();

    }finally{
        setUser(null);
        queryClient.clear();

    }
  },[queryClient]);

  // const updateProfile= useCallback(async(payload)=>{
  //   const {user}= await authApi.updateProfile(payload);
  //   setUser(user);
  //   return user;
  // },[]);


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