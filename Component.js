var vGlobColor = "#000000";
var path = "";
var imgContent = "";
var ordno = "";
var chart_flag = "";
var flag = "";
var oMessagePopover;
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"VShifter_New/model/models",
	"VShifter_New/model/Formatter",
	"VShifter_New/js/sketch"
], function(UIComponent, Device, models, sketch) {
	"use strict";

	return UIComponent.extend("VShifter_New.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// this.getRouter().initialize();
		}
	});
});