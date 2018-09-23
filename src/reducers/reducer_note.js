export default function(state=[], action){
    switch(action.type){
        case "SET_NOTE":
            return [...state,action.payload];
    }

return state;

}