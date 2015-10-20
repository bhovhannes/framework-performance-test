require('./index-styles.less');

var navigateBtn = document.getElementById('navigateBtn'),
	selectEl = document.querySelector('.nav-options'),
	demoFrame = document.querySelector('.demo-frame'),
	navTitleEl = document.querySelector('.nav-title'),
	navTitleSelection = document.querySelector('.nav-title-selection');

selectEl.addEventListener('change', handleSelectChange);

var lastSelectedIndex = window.sessionStorage.getItem('lastSelectedIndex');
if (lastSelectedIndex) {
	selectEl.selectedIndex = lastSelectedIndex;
	handleSelectChange();
}

function handleSelectChange() {
	var selectedOption = selectEl.options[selectEl.selectedIndex];
	window.sessionStorage.setItem('lastSelectedIndex', selectEl.selectedIndex);
	demoFrame.src = selectedOption.value;
	if (selectedOption.value) {
		navTitleSelection.textContent = selectedOption.textContent;
		document.title = selectedOption.textContent + ' - ' + navTitleEl.textContent;
	}
	else {
		navTitleSelection.textContent = '';
		document.title = selectedOption.textContent;
	}
}


