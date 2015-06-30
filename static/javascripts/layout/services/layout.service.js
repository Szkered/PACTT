(function (){
    'use strict';
    
    angular
	.module('PACTT.layout.services')
	.factory('Columbus', Columbus);

    function Columbus() {
	var Columbus = {
	    calculateNumberOfColumns: calculateNumberOfColumns,
	    approximateShortestColumn: approximateShortestColumn,
	    render: render
	};

	return Columbus;


	function calculateNumberOfColumns() {
	    var width = $(window).width();

	    if (width >= 1200) {
		return 4;
	    } else if (width >= 992) {
		return 3;
	    } else if (width >= 768) {
		return 2;
	    } else {
		return 1;
	    }
	}

	function approximateShortestColumn(columns) {
	    var scores = columns.map(columnMapFn);

	    return scores.indexOf(Math.min.apply(this, scores));


	    function columnMapFn(column) {
		var lengths = column.map(function (element) {
		    return element.content.length;
		});

		return lengths.reduce(sum, 0) * column.length;
	    }

	    function sum(m, n) {
		return m + n;
	    }
	}

	function render(current, original) {
	    var columns = [];
	    if (current !== original) {
		// columns = [];

		for (var i = 0; i < calculateNumberOfColumns(); ++i) {
		    columns.push([]);
		}

		for(var i = 0; i < current.length; ++i) {
		    var column = approximateShortestColumn(columns);

		    columns[column].push(current[i]);
		}
	    }
	    return columns;
	}
    }
})();
