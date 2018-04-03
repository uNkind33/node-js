function removeListeners(...events) {
    for(event of events) {
        this.removeAllListeners(event)   
    };
}

module.exports = {
    removeListeners
};
