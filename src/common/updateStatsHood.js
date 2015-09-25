var mustache = require('mustache');

function updateStatsHood(template, data) {
	var hood = document.querySelectorAll('.stats-hood')[0];
	hood.innerHTML = mustache.render(template, data);
	hood.style.display = 'block';
}

module.exports = updateStatsHood;