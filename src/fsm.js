class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

    	if (!config) {
    		throw new Error();
    	}

    	this.initial = config.initial;
    	this.states = config.states;

    	this.currentState = config.initial;
    	this.transitionHistory = [config.initial];
    	this.currentHistoryIndex = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	for (let key in this.states) {
			if (key == state) {
				this.currentState = state;
				this.transitionHistory.length = this.currentHistoryIndex + 1;

				this.transitionHistory.push(this.currentState);
				this.currentHistoryIndex++;
				return;
			}
    	}
    	throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    	if (this.states[this.currentState].transitions[event]) {
    				
    				this.currentState = this.states[this.currentState].transitions[event];
    				this.transitionHistory.length = this.currentHistoryIndex + 1;
    			
    				this.transitionHistory.push(this.currentState);
    				this.currentHistoryIndex++;
    				return this;
			}
		throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	return this.currentState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	if (!event) {
    		let statesAssort = [];

    		for (let key in this.states) {
    			statesAssort.push(key);
    		}
    		return statesAssort;
    	}

    	if (event) {
    		let statesAssort = [];

    		for (let key in this.states) {
    			if (this.states[key].transitions[event]) {
    			statesAssort.push(key);
    			}
			}
			return statesAssort;
    	}
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if ( this.currentHistoryIndex == 0) {
        	return false;
        } else {
    		this.currentState = this.transitionHistory[this.currentHistoryIndex - 1];
    		this.currentHistoryIndex--;
    		return true;
    	}
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
    	if ( this.currentHistoryIndex == this.transitionHistory.length - 1) {
        	return false;
        } else {
    		this.currentState = this.transitionHistory[this.currentHistoryIndex + 1];
    		this.currentHistoryIndex++;
    		return true;
    	}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
		this.transitionHistory = this.transitionHistory.slice(this.currentHistoryIndex, this.currentHistoryIndex + 1);
    	this.currentHistoryIndex = 0;

    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
