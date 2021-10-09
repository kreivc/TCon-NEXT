function useAssert(toast, defaultDescription) {
    /**
	 * Makes sure the checking condition is satisfied
	 * @param {boolean} condition The condition that should be satisfied
	 * @param {string} errorMessage The message when condition is not satisfied
	 * @param {string} customDescription The custom message to be shown
	 * @returns {boolean} true if condition is satisfied. false otherwise.
	 */
	function assert(condition, errorMessage, customDescription) {
		if (condition) {
			return true;
		}
		return toast({
			title: errorMessage,
			description: "Unable to register.",
			status: "error",
			duration: 5000,
			isClosable: true,
		});
		return false;
	}
    return assert;
}

export default useAssert;
