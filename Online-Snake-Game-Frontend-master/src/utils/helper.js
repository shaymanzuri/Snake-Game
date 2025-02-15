export const isUserLoggedIn =()=>{
    if(!sessionStorage.getItem('snake-user')){
        return false;
    }else{
        return true;
    }
}