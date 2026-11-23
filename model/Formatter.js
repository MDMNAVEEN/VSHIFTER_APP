jQuery.sap.declare("VShifter_New.model.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.core.format.NumberFormat");

VShifter_New.model.Formatter = {

	fnValue: function(flag) {

		if (flag === 'X' || flag != '') {
			return 'Completed';
		} else if (flag === 'N' || flag === '') {
		return 'In-Progress';
		} else {
			return 'In-Progress';
		}

	},
	fnrelease: function(flag) {
		if (flag === 'X' || flag != '') {
			return 'PO Released';
		} else if (flag === 'N' || flag === '') {
		return 'Un Released';
		} else {
			return 'Un Released';
		}
	},
	// fnColor: function(flag) {
	// 	var lv_str;
	// 	if (flag === 'X') {
	// 		return "green";
	// 	} else if (flag === 'N') {
	// 		return "red";
	// 	} else {
	// 		return "red";
	// 	}
	// 	return lv_str;
	// },
	formatStyle: function(flag) {
		if (flag === 'X' || flag != '') {
			return "green";
		} else if (flag === 'N' || flag === '') {
			return "red";
		} else {
			return "red";
		}
	},
	fncreatepo: function(a) {
		if (a === "10") {
			return "true";
		} else if (a === "20") {
			return "false";
		}
	},
	fnDateFormat: function(value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "dd.MM.YYYY"
			});
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	}
	// fnerror: function(value) {
	// 	if ( value === "X") {
	// 		return "Error";
	// 	}
	// 	else {
	// 		return "Success";
	// 	}
	// }

};