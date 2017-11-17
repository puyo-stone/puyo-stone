// codeship build dummy test

module.exports = {
	test: function(input) {
		if (input) { return 'input is true' }
		else { return 'input is false' }
	}
}