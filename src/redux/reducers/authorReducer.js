export default function authorReducer( state = [], action ) {
    switch ( action.type ) {
        case "CREATE_AUTHOR":
            return [...state, { ...action.author }];

        default:
            return state;
    }
}