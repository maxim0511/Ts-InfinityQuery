import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import LoginReducer from "./Reducers/LoginReducer"
import RegistrationReducer from "./Reducers/RegistrationReducer";
import AddImgReducer from "./Reducers/AddImg";
import AllContentReducer from "./Reducers/AllContentReducer";

let Reducers = combineReducers({
    newPage:AllContentReducer,
    popularPage:AllContentReducer,
    loginPage:LoginReducer,
    regPage:RegistrationReducer,
    addImgPage:AddImgReducer,
    form:formReducer
});


type RootReducerType = typeof Reducers;
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
//@ts-ignore
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const Store = createStore(Reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));
//@ts-ignore
window.Store= Store

export default Store;