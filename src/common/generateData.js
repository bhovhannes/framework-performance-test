function generateData(rows, cols) {
	var data = new Array(rows),
		i, j, c = 0;
	for (i=0; i<rows; ++i) {
		data[i] = new Array(cols);
		for (j=0; j<cols; ++j) {
			data[i][j] = {
				index: c++,
				color: {
					r: Math.floor(Math.random() * 255),
					g: Math.floor(Math.random() * 255),
					b: Math.floor(Math.random() * 255)
				}
			};
		}
	}
	return data;
}

module.exports = generateData;