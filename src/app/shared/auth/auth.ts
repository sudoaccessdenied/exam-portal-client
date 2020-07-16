import { Observable } from 'rxjs';
import { User } from '../user';


export interface Auth {
    login(username: string , password : string , role : boolean):Observable<void |User>;
    logout():boolean;
    isAuth():boolean;
    forgetPassword(username: string);
    registorUser( newUser :any):Observable<void |any>;

}
