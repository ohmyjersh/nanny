function registerResponse(state, response) {
    console.log(response);
}

function registeringRequest() {
    console.log('registering');
}

function reducers (state = {}, action) {
    switch(action) {
        case "REGISTER_REQUEST":
            return registeringRequest(state);
        case "REGISTER_RESPONSE":
            return registerResponse(state, action.response);
    }
    return state;
}

module.exports = reducers;