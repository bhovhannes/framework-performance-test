var mustache = require('mustache');
var hoodTemplate = require('./hood.mustache.html');

function updateStatsHood(data) {
	var hood = document.querySelector('.stats-hood');
	hood.innerHTML = mustache.render(hoodTemplate, data);
	hood.style.display = 'block';
}

module.exports = updateStatsHood;