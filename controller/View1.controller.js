sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	'sap/m/ResponsivePopover',
	'sap/ui/core/Fragment',
	'sap/ui/unified/library',
	'sap/m/Button',
	'sap/ui/Device',
	'sap/m/MessagePopover',
	"VShifter_New/model/Formatter",
	'sap/viz/ui5/api/env/Format'
], function(jQuery, Controller, Filter, FilterOperator, JSONModel, MessageBox, ResponsivePopover, Fragment, unifiedLibrary, Button,
	Device, MessagePopover, Formatter) {
	"use strict";
	var oModel, busyDialog, dateFormat, lv_plant, lv_material, lv_profile, lv_qty, busyDialog, lv_ordertype, lv_entity, VTrid, VTrid1,
		yield1, scrap1, confirmok, VScarp, lv_shift, lv_notitype, lv_funloc, lv_equip, lv_shifth, lv_filter,
		Vrelease, oAsstrJson, time, clock, lv_order, temp_arr, lv_plnum, lv_temoProd, lv_breakConfirm, lv_flag;
	var lv_sdate, lv_sdatepl, lv_edatepl, lv_edate, lv_stime, lv_etime, lv_stime1, lv_etime1, lv_addby, lv_posdate, lv_poedate, lv_postime,
		lv_poetime, lv_brreason, lv_chplnpl, lv_chplnsdate, lv_chplnedate, lv_chplnqty, lv_orderno, lv_chordsdate, lv_chordedate, lv_shifthr,
		lv_operation, lv_rework, lv_workctr, lv_rw, lv_capct, lv_ctyp, lv_totalproqty, lv_reasonForscr, name1, sid1, shift1, good_order,
		total_order, lv_equipdata, tmp_flag_equip, lv_newEquip, lv_oldEquip, lv_expEquip, lv_dataEquip;
	var vId, lv_date, lv_xstring, lv_dateval;
	var oLabel, clock;
	var shift_rotation, work_name, work_id, sup_name, shift_time, shift_date, sup_id, shiftdate;
	var VPlantorder = 0,
		VProd = 0,
		VPlantorderRls = 0,
		VProdcd = 0,
		VProdpen = 0,
		Vbreak = 0;
	var plcnt1 = 0;
	var pdncnt1 = 0;
	var plcnt2 = 0;
	var pdncnt2 = 0;
	var plcnt3 = 0;
	var pdncnt3 = 0;
	var eq1 = 0;
	var eq2 = 0;
	var eq3 = 0;
	var eq4 = 0;
	var eq5 = 0;
	var index = "";
	var ot;
	var title = "";
	var gaugeOptions, gauge, gaugeData, lv_mostdam, lv_eqdes, s1_count, s2_count, s3_count;
	var loading, loading1, gl_data, lv_perform = 0,
		lv_oee = 0,
		lv_qual = 0,
		lv_avail = 0;
	// var this = that;
	// ===============image annotation================================
	var vPathImg;
	var vglobalClr = '#ffffff';
	var ColorPickerMode = unifiedLibrary.ColorPickerMode,
		ColorPickerDisplayMode = unifiedLibrary.ColorPickerDisplayMode;
	var oRouter, lv_canvas;
	var count = 0;
	// ========================================================================================================
	return Controller.extend("VShifter_New.controller.View1", {
		Formatter: Formatter,
		// _handleLogout: function(oEvent) { //Commmented By Naveen Kumar N on 23-11-2026 
		// 	$.ajax({
		// 		type: "GET",
		// 		url: "/sap/public/bc/icf/logoff", //Clear SSO cookies: SAP Provided service to do that  
		// 	}).done(function(data) { //Now clear the authentication header stored in the browser  
		// 		if (!document.execCommand("ClearAuthenticationCache")) {
		// 			//"ClearAuthenticationCache" will work only for IE. Below code for other browsers  
		// 			$.ajax({
		// 				type: "GET",
		// 				url: "/sap/public/bc/icf/logoff", //any URL to a Gateway service  
		// 				username: '', //dummy credentials: when request fails, will clear the authentication header  
		// 				password: '',
		// 				statusCode: {
		// 					401: function() {
		// 						//This empty handler function will prevent authentication pop-up in chrome/firefox  
		// 					}
		// 				},
		// 				error: function() {
		// 					//alert('reached error of wrong username password')  
		// 				}
		// 			}, 1000);
		// 		}
		// 	});
		// 	var myVar = setInterval(function(oEvent) {
		// 		window.location.replace("/sap/bc/ui5_ui5/sap/zvshifter/index.html");
		// 		window.dispatchEvent(new Event('resize'));
		// 	});
		// },
		_handleLogout: function() { //Added By Naveen Kumar N on 23-11-2026 for fiori logoff
			// Running inside Fiori Launchpad
			if (sap.ushell && sap.ushell.Container) {
				sap.ushell.Container.logout();
				return;
			}

			// Standalone link (your existing logic)
			$.ajax({
				type: "GET",
				url: "/sap/public/bc/icf/logoff"
			}).done(function() {
				if (!document.execCommand("ClearAuthenticationCache")) {
					$.ajax({
						type: "GET",
						url: "/sap/public/bc/icf/logoff",
						username: "",
						password: "",
						statusCode: {
							401: function() {}
						},
						error: function() {}
					});
				}
				setTimeout(function() {
					window.location.replace("/sap/bc/ui5_ui5/sap/zvshifter/index.html");
				}, 500);
			});
		},
		fnSettingPress: function() {
			// sap.m.MessageToast.show("Settings");
			// this.getView().byId("id_dia").setVisible(true);
			this.getView().byId("id_dia").open();
			// this.byId("id_dia").setVisible(false);
		},
	
_loadApexCharts: function() {

    return new Promise(function(resolve, reject) {

        if (window.ApexCharts) {
            resolve();
            return;
        }

        var attempts = 0;

        var checkApex = setInterval(function() {

            attempts++;

            if (window.ApexCharts) {
                clearInterval(checkApex);
                resolve();
            }

            if (attempts >= 50) {
                clearInterval(checkApex);
                reject(new Error("ApexCharts failed to load"));
            }

        }, 100);

    });
},

		onInit: function() {
			// var p1 = oEvent.oSource.oParent
			// var p2 = p1.oParent
			var that = this;
			var vPathImage = jQuery.sap.getModulePath("VShifter_New") + "/Image/";

			this.getView().setModel(
				new sap.ui.model.json.JSONModel({
					path: vPathImage
				}),
				"JM_ImageModel"
			);
			// this.byId("id_shiftdashboard").fireValidationSuccess();
			// window.dispatchEvent(new Event('resize'));
			// var oButton = this.getView().byId("id_shift_dash");

			// this.sap.ui.getCore().byId("id_shift_dash").firePress();
			// oButton.firePress();
			// oButton.setVisible(true);
			// 	setTimeout(function() {
			// 		this.oMP.openBy(oButton);
			// 	}.bind(this), 100);
			// window.dispatchEvent(new Event('resize'));

			this.getView().byId("id_dia").open();
			// ===================Below code for chart of half circle ===================
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_shift").setValue("");
			busyDialog = new sap.m.BusyDialog({
				text: '...please wait while the data is loading '
			});
			dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});

			oModel = this.getOwnerComponent().getModel();

			oLabel = this.getView().byId("appdate");
			var oLabel1 = this.getView().byId("appdat");

			setInterval(function() {
				var result = that.GetClock();
				oLabel.setText(result);

			}, 1000);

			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			if (mm <= 9) {
				mm = '0' + mm;
			}
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = dd + '-' + mm + '-' + yy;
			this.getView().byId("id_yest").setValue(finalDate);
			this.getView().byId("id_date").setText(finalDate);
			this.getView().byId("id_date1").setText(finalDate);
			this.getView().byId("id_date2").setText(finalDate);

			this.byId("id_dia").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_wrkcntr").setVisible(false);
			this.byId("id_typeqpmnt").setVisible(false);
			this.byId("id_mstusd").setVisible(false);
			this.byId("id_dashboard3").setVisible(false);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(false);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_reset").setVisible(false);
			this.byId("id_submit").setVisible(true);

			// var oButton = this.getView().byId("id_shift_dash");
			//oButton.firePress();

			// window.dispatchEvent(new Event('resize'));
			//Added By Naveen on 19-11-2026

			var that = this;

		
this._loadApexCharts()
.then(function() {

	var chartFunctions = [
		"localchart",
		"localchart1",
		"drawChart",
		"drawChartbar",
		"drawChart1",
		"drawChartBreak"
	];

	chartFunctions.forEach(function(fn) {

		try {
			that[fn]();
		} catch (error) {
			console.error(fn + " failed:", error);
		}

	});

})
.catch(function(error) {
	console.error("ApexCharts loading error:", error);
});


			//End By Naveen
			// var loadinglocal = google.charts.load('current', {
			// 	'packages': ['corechart']
			// });
			// loadinglocal.then(function() {
			// 	this.localchart();
			// }.bind(this));
			// var loadinglocal1 = google.charts.load('current', {
			// 	'packages': ['corechart', 'bar']
			// });
			// loadinglocal1.then(function() {
			// 	this.localchart1();
			// }.bind(this));
			// var loading = google.charts.load('current', {
			// 	'packages': ['corechart']
			// });
			// loading.then(function() {
			// 	this.drawChart();
			// }.bind(this));
			// this.drawChart();
			// var loading1 = google.charts.load('current', {
			// 	'packages': ['corechart', 'bar']
			// });
			// loading1.then(function() {
			// 	this.drawChartbar();
			// }.bind(this));
			// var loading2 = google.charts.load('current', {
			// 	'packages': ['corechart', 'bar']
			// });
			// loading2.then(function() {
			// 	this.drawChart1();
			// }.bind(this));
			// var loading3 = google.charts.load('current', {
			// 	'packages': ['corechart']
			// });
			// loading3.then(function() {
			// 	this.drawChartBreak();
			// }.bind(this));
			// this.equipmentpress();
			// this.shiftpress();
			// window.dispatchEvent(new Event('resize'));
			// this.fnPoScreen6();
			// this.fnPoScreen();
			// this.equipmentpress();
			// this.shiftpress();
			// window.dispatchEvent(new Event('resize'));

			var JMDownload = [{
				'Filename': 'Download Shift 1 Log 20-04-2023'
			}, {
				'Filename': 'Download Shift 2 Log 20-04-2023'
			}, {
				'Filename': 'Download Shift 3 Log 20-04-2023'
			}];

			var oModel = new sap.ui.model.json.JSONModel(JMDownload);
			this.getView().setModel(oModel, "JMDownload");

			shift_time = this.getView().byId("appdate").getText();
			var time = new Date();
			var hours = time.getHours();
			var minutes = time.getMinutes();
			var d = time.getDate();
			var m = (time.getMonth() + 1);
			var y = time.getFullYear();
			minutes = ((minutes < 10) ? "0" : "") + minutes;
			var seconds = time.getSeconds();
			seconds = ((seconds < 10) ? "0" : "") + seconds;
			clock = hours + ":" + minutes + ":" + seconds;
			this.getView().byId("appdate").setText(clock);
			return clock;

		},
		// onAfterRendering : function() {
		// 	sap.ui.getCore().byId( $('#navigation button').eq(0).attr("id_shift_dash")).firePress();
		// },

		// onAfterRendering :function(){

		// 	 var oButton = this.getView().byId("id_shift_dash");
		// 	oButton.firePress();
		// sap.ui.getCore().byId("id_shift_dash").firePress();
		// },

		// onPromotionEditPressed: function(){

		// 	sap.ui.getCore().byId("id_shift_dash").firePress();
		// 	return;

		// },

		// onBeforeRendering:function(){
		// 	this.getview().byId("id_shift_dash").firePress();
		// 	return;

		// },
		GetClock: function() {

			var tday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
			var tmonth = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
				"November",
				"December");
			var d = new Date();
			var nday = d.getDay(),
				nmonth = d.getMonth(),
				ndate = d.getDate(),
				nyear = d.getYear(),
				nhour = d.getHours(),

				nmin = d.getMinutes(),
				nsec = d.getSeconds(),
				ap;
			var slidernum = 0;
			if (nhour <= 7) {
				nhour = 7 - d.getHours();
				slidernum = nhour;
			} else if (nhour >= 8 && nhour <= 15) {
				nhour = 15 - d.getHours();
				slidernum = nhour;
			} else if (nhour >= 16 && nhour <= 23) {
				nhour = 23 - d.getHours();
				slidernum = nhour;
			}
			if (nhour === 0) {
				ap = " AM";
				nhour = 12;
			} else if (nhour < 12) {
				ap = " AM";
			} else if (nhour == 12) {
				ap = " PM";
			} else if (nhour > 12) {
				ap = " PM";
				nhour -= 12;
			}
			if (nyear < 1000) nyear += 1900;
			if (nmin <= 9) nmin = "0" + nmin;
			if (nsec <= 9) nsec = "0" + nsec;

			this.getView().byId("shifttime").setValue(slidernum);
			var result = nhour + ":" + nmin + ":" + nsec;
			result = result;
			return result;

		},
		localchart: function() {

			var options = {
				series: [{
					name: 'Planned Order',
					data: [1000, 1170, 660, 1030]
				}, {
					name: 'Production Order',
					data: [400, 460, 1120, 540]
				}],
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 1,
						inverseColors: false,
						opacityFrom: 0.35,
						opacityTo: 0.05,
						stops: [60]
					},
					pattern: {
						strokeWidth: 0.5
					}
				},
				chart: {
					background: '#fffff',
					toolbar: {
						show: false
					},
					height: 170,
					width: 420,
					type: 'area'
				},
				grid: {
					show: false
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: true,
					fontSize: '10px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400
				},
				markers: {
					size: [2.5, 2.5],
					colors: '#ffffff',
					strokeColor: ['#F4BEBF', '#7F8AFD']
				},
				stroke: {
					width: 1.7,
					curve: 'straight'
				},
				xaxis: {
					type: 'category',
					categories: ["Shift1", "Shift2", "Shift3", "Shift4"],
					label: {
						show: true,
						style: {
							fontSize: '3.5px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: 'apexcharts-yaxis-label'
						}
					},
					group: {
						style: {
							colors: ['#A2A2A2'],
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: ''
						}
					},

					title: {
						style: {
							colors: '#A2A2A2',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-title'
						}
					}
				},
				yaxis: {
					label: {
						show: true,
						style: {
							colors: '#A2A2A2',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label'
						}
					}
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					}
				},
				colors: ['#F4BEBF', '#7F8AFD']

			};

			var chart = new ApexCharts(document.querySelector("#chart1"), options);

			chart.render();
			window.dispatchEvent(new Event('resize'));
		},
		localchart1: function() {
			var options = {
				series: [{
					name: 'Planned Order',
					data: [8175000, 3792000, 2695000, 2099000]
				}, {
					name: 'Production Order',
					data: [8008000, 3694000, 2896000, 1953000]
				}],
				chart: {
					type: 'bar',
					height: 170,
					stacked: true,
					toolbar: {
						show: false
					}
				},
				responsive: [{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0
						}
					}
				}],
				plotOptions: {
					bar: {
						horizontal: true,
						borderRadius: 5,
						columnWidth: '20%',
						endingShape: 'rounded'
					}
				},
				grid: {
					show: false
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: true,
					fontSize: '10px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				xaxis: {
					type: 'category',
					categories: ["Shift4", "Shift3", "Shift2", "Shift1"],
					label: {
						show: true,
						style: {
							colors: '#E9E9E9',
							fontSize: '3.5px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: 'apexcharts-yaxis-label'
						}
					},
					group: {
						style: {
							colors: ['#E9E9E9'],
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: ''
						}
					},

					title: {
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-title'
						}
					}
				},
				yaxis: {
					label: {
						show: true,
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label'
						}
					}
				},
				fill: {
					opacity: 1
				},
				tooltip: {
					y: {
						formatter: function(val) {
							return val;
						}
					}
				},
				colors: ['#F4BEBF', '#E9E9E9']
			};

			var chart = new ApexCharts(document.querySelector("#chart3"), options);
			chart.render();
			window.dispatchEvent(new Event('resize'));
		},

		drawChart: function() {
			//-------------------- Man Power Utilisation ---------------------------
			// window.dispatchEvent(new Event('resize'));
			var that = this;

			// destroy the old chart so redraws don't stack up
			if (this._chart5) {
				this._chart5.destroy();
				this._chart5 = null;
			}

			var oEl = document.querySelector("#chart5");
			if (!oEl) {
				return;
			} // HTML control not rendered yet

			var bPhone = sap.ui.Device.resize.width < 600;

			var options = {
				series: [VPlantorder, VProd, VPlantorderRls, VProdcd],
				chart: {
					type: "donut",
					width: "100%",
					height: bPhone ? 260 : 176,
					parentHeightOffset: 0
				},
				plotOptions: {
					pie: {
						startAngle: -90,
						endAngle: 270,
						donut: {
							size: "70%",
							background: "#F0F1FF",
							borderColor: "#7C87FD",
							labels: {
								show: true,
								name: {
									fontSize: "11px",
									offsetY: -2
								},
								value: {
									fontSize: "18px",
									offsetY: 2
								},
								total: {
									show: true
								}
							}
						}
					}
				},
				dataLabels: {
					enabled: false
				},
				fill: {
					type: "gradient"
				},
				legend: {
					show: true,
					position: bPhone ? "bottom" : "right",
					fontSize: "12px",
					fontFamily: "Segoe UI Semibold",
					fontWeight: 400,
					formatter: function(val, opts) {
						return val + " - " + opts.w.globals.series[opts.seriesIndex];
					}
				},
				labels: ["Planned Orders", "Production Orders", "PO Released", "PO Closed"],
				colors: ["#B8BBEA", "#7A85FD", "#C2C4CF", "#F8CEA6"]
					// no "responsive" block: bPhone already handles it
			};

			this._chart5 = new ApexCharts(oEl, options);
			this._chart5.render();
			window.dispatchEvent(new Event('resize'));

			//------------------------- Production Order Planned Vs Actual --------------------------			
			var options = {
				series: [{
					name: 'Production Order Planned',
					data: [plcnt1, plcnt2, plcnt3]
				}, {
					name: 'Production Order Actual',
					data: [pdncnt1, pdncnt2, pdncnt3]
				}],
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 1,
						inverseColors: false,
						opacityFrom: 0.35,
						opacityTo: 0.05,
						stops: [60]
					},
					pattern: {
						strokeWidth: 0.5
					}
				},
				chart: {
					toolbar: {
						show: false
					},
					height: 170,
					width: 390,
					type: 'area'
				},
				grid: {
					show: false
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: true,
					fontSize: '10px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400
				},
				markers: {
					size: [2.5, 2.5],
					colors: '#ffffff',
					strokeColor: ['#F4BEBF', '#7F8AFD']
				},
				stroke: {
					width: 1.7,
					curve: 'smooth'
				},
				xaxis: {
					type: 'category',
					categories: ["Shift1", "Shift2", "Shift3"],
					label: {
						show: true,
						style: {
							fontSize: '3.5px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: 'apexcharts-yaxis-label'
						}
					},
					group: {
						style: {
							colors: ['#A2A2A2'],
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: ''
						}
					},
					title: {
						style: {
							colors: '#A2A2A2',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-title'
						}
					}
				},
				yaxis: {
					label: {
						show: true,
						style: {
							colors: '#A2A2A2',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label'
						}
					}
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					},
				},
				colors: ['#F4BEBF', '#7F8AFD']
			};
			var chart = new ApexCharts(document.querySelector("#chart"), options);
			chart.render();
			window.dispatchEvent(new Event('resize'));

			//------------------------- Quality Rejection ------------
			// var options = {
			// 	series: [{
			// 		name: 'Planned Order',
			// 		data: [1000, 1170, 660, 1030]
			// 	}, {
			// 		name: 'Production Order',
			// 		data: [400, 460, 1120, 540]
			// 	}],
			// 	fill: {
			// 		type: 'gradient',
			// 		gradient: {
			// 			shadeIntensity: 1,
			// 			inverseColors: false,
			// 			opacityFrom: 0.35,
			// 			opacityTo: 0.05,
			// 			stops: [60]
			// 		},
			// 		pattern: {
			// 			strokeWidth: 0.5
			// 		}
			// 	},
			// 	chart: {
			// 		background: '#fffff',
			// 		toolbar: {
			// 			show: false
			// 		},
			// 		height: 170,
			// 		width: 420,
			// 		type: 'area'
			// 	},
			// 	grid: {
			// 		show: false
			// 	},
			// 	dataLabels: {
			// 		enabled: false
			// 	},
			// 	legend: {
			// 		show: true,
			// 		fontSize: '10px',
			// 		fontFamily: 'Segoe UI Semibold',
			// 		fontWeight: 400
			// 	},
			// 	markers: {
			// 		size: [2.5, 2.5],
			// 		colors: '#ffffff',
			// 		strokeColor: ['#F4BEBF', '#7F8AFD']
			// 	},
			// 	stroke: {
			// 		width: 1.7,
			// 		curve: 'straight'
			// 	},
			// 	xaxis: {
			// 		type: 'category',
			// 		categories: ["Shift1", "Shift2", "Shift3", "Shift4"],
			// 		label: {
			// 			show: true,
			// 			style: {
			// 				fontSize: '3.5px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 100,
			// 				cssClass: 'apexcharts-yaxis-label'
			// 			}
			// 		},
			// 		group: {
			// 			style: {
			// 				colors: ['#A2A2A2'],
			// 				fontSize: '4px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 100,
			// 				cssClass: ''
			// 			}
			// 		},

			// 		title: {
			// 			style: {
			// 				colors: '#A2A2A2',
			// 				fontSize: '4px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 400,
			// 				cssClass: 'apexcharts-xaxis-title'
			// 			}
			// 		}
			// 	},
			// 	yaxis: {
			// 		label: {
			// 			show: true,
			// 			style: {
			// 				colors: '#A2A2A2',
			// 				fontSize: '4px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 400,
			// 				cssClass: 'apexcharts-yaxis-label'
			// 			}
			// 		}
			// 	},
			// 	tooltip: {
			// 		x: {
			// 			format: 'dd/MM/yy HH:mm'
			// 		}
			// 	},
			// 	colors: ['#F4BEBF', '#7F8AFD']

			// };

			// var chart = new ApexCharts(document.querySelector("#chart1"), options);

			// chart.render();
		},

		drawChartbar: function() {
			//--------------------------- Planned Order Vs Production Order -------------------------
			// window.dispatchEvent(new Event('resize'));
			var options = {
				series: [{
					name: 'Planned Order',
					data: [plcnt1, plcnt2, plcnt3]
				}, {
					name: 'Production Order',
					data: [pdncnt1, pdncnt2, pdncnt3]
				}],
				chart: {
					type: 'bar',
					height: 170,
					width: 400,
					toolbar: {
						show: false
					},
					padding: {
						top: 10
					}
				},
				responsive: [{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0
						}
					}
				}],
				plotOptions: {
					bar: {
						horizontal: false,
						borderRadius: 2,
						columnWidth: '35%',
						endingShape: 'rounded'
					}
				},
				grid: {
					show: true,
					borderColor: '#ffffff',
					strokeDashArray: 0,
					position: 'back',
					yaxis: {
						lines: {
							show: true
						}
					},
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: true,
					fontSize: '10px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				xaxis: {
					type: 'category',
					categories: ["Shift1", "Shift2", "Shift3"],
					label: {
						show: true,
						style: {
							colors: '#E9E9E9',
							fontSize: '3.5px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: 'apexcharts-yaxis-label'
						}
					},
					group: {
						style: {
							colors: ['#E9E9E9'],
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: ''
						}
					},
					title: {
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-title'
						}
					}
				},
				yaxis: {
					show: true,
					showAlways: true,
					showForNullSeries: true,
					seriesName: undefined,
					opposite: false,
					reversed: false,
					logarithmic: false,
					logBase: 4,
					forceNiceScale: false,
					floating: false,
					decimalsInFloat: undefined,
					label: {
						show: true,
						align: 'left',
						minWidth: 0,
						maxWidth: 160,
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label'
						}
					}
				},
				axisBorder: {
					show: true,
					color: '#78909C',
					offsetX: 0,
					offsetY: 0
				},
				axisTicks: {
					show: true,
					borderType: 'solid',
					color: '#78909C',
					width: 4,
					offsetX: 0,
					offsetY: 0
				},
				fill: {
					opacity: 1
				},
				crosshairs: {
					show: true,
					position: 'back',
					stroke: {
						color: '#E9E9E9',
						width: 1,
						dashArray: 0,
					},
				},
				tooltip: {
					y: {
						formatter: function(val) {
							return val;
						}
					}
				},
				colors: ['#F4BEBF', '#E9E9E9']
			};

			var chart = new ApexCharts(document.querySelector("#chart2"), options);
			chart.render();
			window.dispatchEvent(new Event('resize'));

			//-------------------- Production Loss ------------------
			// var options = {
			// 	series: [{
			// 		name: 'Planned Order',
			// 		data: [8175000, 3792000, 2695000, 2099000]
			// 	}, {
			// 		name: 'Production Order',
			// 		data: [8008000, 3694000, 2896000, 1953000]
			// 	}],
			// 	chart: {
			// 		type: 'bar',
			// 		height: 170,
			// 		stacked: true,
			// 		toolbar: {
			// 			show: false
			// 		}
			// 	},
			// 	responsive: [{
			// 		breakpoint: 480,
			// 		options: {
			// 			legend: {
			// 				position: 'bottom',
			// 				offsetX: -10,
			// 				offsetY: 0
			// 			}
			// 		}
			// 	}],
			// 	plotOptions: {
			// 		bar: {
			// 			horizontal: true,
			// 			borderRadius: 5,
			// 			columnWidth: '20%',
			// 			endingShape: 'rounded'
			// 		}
			// 	},
			// 	grid: {
			// 		show: false
			// 	},
			// 	dataLabels: {
			// 		enabled: false
			// 	},
			// 	legend: {
			// 		show: true,
			// 		fontSize: '10px',
			// 		fontFamily: 'Segoe UI Semibold',
			// 		fontWeight: 400
			// 	},
			// 	stroke: {
			// 		show: true,
			// 		width: 2,
			// 		colors: ['transparent']
			// 	},
			// 	xaxis: {
			// 		type: 'category',
			// 		categories: ["Shift4", "Shift3", "Shift2", "Shift1"],
			// 		label: {
			// 			show: true,
			// 			style: {
			// 				colors: '#E9E9E9',
			// 				fontSize: '3.5px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 100,
			// 				cssClass: 'apexcharts-yaxis-label'
			// 			}
			// 		},
			// 		group: {
			// 			style: {
			// 				colors: ['#E9E9E9'],
			// 				fontSize: '4px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 100,
			// 				cssClass: ''
			// 			}
			// 		},

			// 		title: {
			// 			style: {
			// 				colors: '#E9E9E9',
			// 				fontSize: '4px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 400,
			// 				cssClass: 'apexcharts-xaxis-title'
			// 			}
			// 		}
			// 	},
			// 	yaxis: {
			// 		label: {
			// 			show: true,
			// 			style: {
			// 				colors: '#E9E9E9',
			// 				fontSize: '4px',
			// 				fontFamily: 'Segoe UI Semibold',
			// 				fontWeight: 400,
			// 				cssClass: 'apexcharts-yaxis-label'
			// 			}
			// 		}
			// 	},
			// 	fill: {
			// 		opacity: 1
			// 	},
			// 	tooltip: {
			// 		y: {
			// 			formatter: function(val) {
			// 				return val;
			// 			}
			// 		}
			// 	},
			// 	colors: ['#F4BEBF', '#E9E9E9']
			// };

			// var chart = new ApexCharts(document.querySelector("#chart3"), options);
			// chart.render();

			//---------------------------- Breakdown Status -------------------
			var options = {
				series: [{
					name: 'Planned Order',
					data: [plcnt1, plcnt2, plcnt3]
				}, {
					name: 'Production Order',
					data: [pdncnt1, pdncnt2, pdncnt3]
				}],
				chart: {
					type: 'bar',
					height: 170,
					stacked: true,
					toolbar: {
						show: false
					}
				},
				responsive: [{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0
						}
					}
				}],
				plotOptions: {
					bar: {
						horizontal: false,
						borderRadius: 4,
						columnWidth: '25%',
						endingShape: 'rounded'
					}
				},
				grid: {
					show: false
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: true,
					fontSize: '10px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				xaxis: {
					type: 'category',
					categories: ["Shift1", "Shift2", "Shift3"],
					label: {
						show: true,
						style: {
							colors: '#E9E9E9',
							fontSize: '3.5px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: 'apexcharts-yaxis-label'
						}
					},
					group: {
						style: {
							colors: ['#E9E9E9'],
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: ''
						}
					},
					title: {
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-title'
						}
					}
				},
				yaxis: {
					label: {
						show: true,
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label'
						}
					}
				},
				fill: {
					opacity: 1
				},
				tooltip: {
					y: {
						formatter: function(val) {
							return val;
						}
					}
				},
				colors: ['#CACBDA', '#E9E9E9']
			};
			var chart = new ApexCharts(document.querySelector("#chart4"), options);
			chart.render();
			window.dispatchEvent(new Event('resize'));

		},

		drawChart1: function() {
			//--------------------- Equipment Dashboard ( Equipment Efficiency )--------------------------
			// window.dispatchEvent(new Event('resize'));
			var options = {
				series: [VPlantorder, VProd, VPlantorderRls, VProdcd, Vbreak, VProdpen],
				chart: {
					width: 400,
					height: 200,
					type: 'donut'
				},
				plotOptions: {
					pie: {
						startAngle: 10,
						offsetX: -20, // moves only the donut to the left
						offsetY: -15,
						donut: {
							size: '80%',
							background: '#F0F1FF',
							labels: {
								show: true,
								total: {
									show: true
								}
							}
						}
					}
				},
				dataLabels: {
					enabled: false
				},
				fill: {
					// type: 'gradient'
				},
				legend: {
					show: true,
					position: 'right',
					offsetX: 15, // this creates the gap between the donut and the legend
					fontSize: '12px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400,
					itemMargin: {
						horizontal: 0,
						vertical: 4
					},
					markers: {
						offsetX: -4
					},
					formatter: function(val, opts) {
						// return val + " - " + opts.w.globals.series[opts.seriesIndex];
						return val;
					}
				},
				title: {

				},
				labels: ['Planned Orders', 'Production Orders', 'PO Reease', 'PO Closed', 'Breakdowns', 'PO Pending'],
				responsive: [{
					breakpoint: 480,
					options: {
						chart: {
							width: '100%'
						},
						plotOptions: {
							pie: {
								offsetX: 0
							}
						},
						legend: {
							position: 'bottom',
							offsetX: 0
						}
					}
				}],
				colors: ['#F4BEBF', '#7F8AFD', '#8F93BC', '#F9D3AE', '#B9BCEA', '#C3C1CD']
			};

			var chart = new ApexCharts(document.querySelector("#chart6"), options);
			chart.render();
			window.dispatchEvent(new Event('resize'));

		},

		equipmentpress: function() {
			// window.dispatchEvent(new Event('resize'));
			this._loadGoogleCharts()
				.then(function() {
					this.drawChart1();
				}.bind(this))
				.catch(function(error) {
					console.error("Google Charts loading failed:", error);
				}.bind(this));
			var vPathImage = this.getView()
				.getModel("JM_ImageModel")
				.getProperty("/path");
			// window.dispatchEvent(new Event('resize'));
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_wrkcntr").setVisible(true);
			this.byId("id_typeqpmnt").setVisible(true);
			this.byId("id_mstusd").setVisible(true);
			this.byId("id_equipmentdashboard").setVisible(true);
			this.byId("id_equip_dash").setIcon(
				vPathImage + "EquipmentDashboardW.svg"
			);

			this.byId("id_shift_dash").setIcon(
				vPathImage + "Shift_Dashboard.svg"
			);
			var JMChart = [{
				'Orders': 'Planned Orders',
				'Efficiency': '10'
			}, {
				'Orders': 'Production Orders',
				'Efficiency': '30'
			}, {
				'Orders': 'PO Pending',
				'Efficiency': '20'
			}, {
				'Orders': 'PO Release',
				'Efficiency': '20'
			}, {
				'Orders': 'PO Closed',
				'Efficiency': '20'
			}];
			var oModel = new sap.ui.model.json.JSONModel(JMChart);
			this.getView().setModel(oModel, "JMChart");
			var JMBar = [{
				'Machine': 'E1',
				'Breakdown': '300'
			}, {
				'Machine': 'E2',
				'Breakdown': '280'
			}, {
				'Machine': 'E3',
				'Breakdown': '260'
			}, {
				'Machine': 'E4',
				'Breakdown': '240'
			}, {
				'Machine': 'E5',
				'Breakdown': '220'
			}, {
				'Machine': 'E6',
				'Breakdown': '200'
			}, {
				'Machine': 'E7',
				'Breakdown': '180'
			}, {
				'Machine': 'E8',
				'Breakdown': '160'
			}, {
				'Machine': 'E9',
				'Breakdown': '140'
			}, {
				'Machine': 'E10',
				'Breakdown': '100'
			}, {
				'Machine': 'E1',
				'Breakdown': '300'
			}];
			var oModel1 = new sap.ui.model.json.JSONModel(JMBar);
			this.getView().setModel(oModel1, "JMBar");

			//--------------------- Equipment Dashboard ( Total Breakdown ) ------------------------------
			var options = {
				series: [{
					name: 'Breakdown',
					data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
				}],
				chart: {
					type: 'bar',
					height: 170,
					toolbar: {
						show: false
					}
				},
				responsive: [{
					breakpoint: 480,
					options: {
						legend: {
							position: 'bottom',
							offsetX: -10,
							offsetY: 0
						}
					}
				}],
				plotOptions: {
					bar: {
						horizontal: false,
						borderRadius: 2,
						columnWidth: '40%',
						endingShape: 'rounded'
					}
				},
				grid: {
					show: false
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: false,
					fontSize: '10px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				xaxis: {
					type: 'category',
					categories: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10"],
					label: {
						show: true,
						style: {
							colors: '#E9E9E9',
							fontSize: '3.5px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: 'apexcharts-yaxis-label'
						}
					},
					group: {
						style: {
							colors: ['#E9E9E9'],
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: ''
						}
					},
					title: {
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-title'
						}
					}
				},
				yaxis: {
					label: {
						show: true,
						style: {
							colors: '#E9E9E9',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label'
						}
					}
				},
				fill: {
					opacity: 1
				},
				tooltip: {
					y: {
						formatter: function(val) {
							return val;
						}
					}
				},
				colors: ['#E9E9E9']
			};
			var chart = new ApexCharts(document.querySelector("#chart7"), options);
			chart.render();
			window.dispatchEvent(new Event('resize'));

			var JMOverall = [{
				'Equipments': 'Machine 01',
				'Production': '80%',
				'Maintenance': '20%',
				'Breakdowns': '305'
			}, {
				'Equipments': 'Machine 02',
				'Production': '70%',
				'Maintenance': '30%',
				'Breakdowns': '247'
			}, {
				'Equipments': 'Machine 03',
				'Production': '60%',
				'Maintenance': '40%',
				'Breakdowns': '202'
			}, {
				'Equipments': 'Machine 04',
				'Production': '50%',
				'Maintenance': '50%',
				'Breakdowns': '186'

			}];

			var oModel2 = new sap.ui.model.json.JSONModel(JMOverall);
			this.getView().setModel(oModel2, "JMOverall");
		},
		_loadGoogleCharts: function() {

			return new Promise(function(resolve, reject) {

				if (window.google &&
					window.google.visualization) {
					resolve();
					return;
				}

				var script = document.getElementById("googleChartsLoader");

				if (!script) {

					script = document.createElement("script");
					script.id = "googleChartsLoader";
					script.src = "https://www.gstatic.com/charts/loader.js";
					script.async = true;

					script.onload = function() {

						google.charts.load("current", {
							packages: ["corechart", "bar"]
						}).then(resolve).catch(reject);

					};

					script.onerror = function() {
						reject(new Error("Google Charts loader failed"));
					};

					document.head.appendChild(script);

				} else {

					if (window.google && window.google.charts) {

						google.charts.load("current", {
							packages: ["corechart", "bar"]
						}).then(resolve).catch(reject);

					} else {

						script.addEventListener("load", function() {

							google.charts.load("current", {
								packages: ["corechart", "bar"]
							}).then(resolve).catch(reject);

						}, {
							once: true
						});

					}
				}
			});
		},
		shiftpress: function() {
			var vPathImage = this.getView()
				.getModel("JM_ImageModel")
				.getProperty("/path");
			this.byId("id_shiftdashboard").setVisible(true);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_wrkcntr").setVisible(false);
			this.byId("id_typeqpmnt").setVisible(false);
			this.byId("id_mstusd").setVisible(false);
			this.byId("id_equip_dash").setIcon(
				vPathImage + "EquipmentDashboardW.svg"
			);

			this.byId("id_shift_dash").setIcon(
				vPathImage + "Shift_Dashboard.svg"
			);

			// window.dispatchEvent(new Event('resize'));
			this._loadGoogleCharts()
				.then(function() {

					this.drawChart();

					this.localchart();

					this.localchart1();

					this.drawChartbar();

				}.bind(this))
				.catch(function(error) {
					console.error("Google Charts loading failed:", error);
				});
			window.dispatchEvent(new Event('resize'));

		},
		drawChartBreak: function() {
			//------------------------- High Breakdown ------------
			window.dispatchEvent(new Event('resize'));
			var options = {
				series: [{
					name: 'Equipment Count',
					data: [eq3, eq4, eq1, eq5, eq2]
				}],
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 1,
						inverseColors: false,
						opacityFrom: 0.45,
						opacityTo: 0.05,
						stops: [60]
					},
					pattern: {
						strokeWidth: 0.5
					}
				},
				chart: {
					background: '#fffff',
					toolbar: {
						show: false
					},
					height: 135,
					width: 280,
					type: 'area'
				},
				grid: {
					show: false
				},
				dataLabels: {
					enabled: false
				},
				legend: {
					show: false,
					fontSize: '10px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 400
				},
				// markers: {
				//     size: [2.5, 2.5],
				//     colors: '#ffffff',
				//     strokeColor: ['#F4BEBF']
				// },
				stroke: {
					width: 1.2,
					curve: 'straight'
				},
				xaxis: {
					type: 'category',
					categories: ["E1", "E2", "E3", "E4", "E5"],
					label: {
						show: true,
						style: {
							fontSize: '3.5px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: 'apexcharts-yaxis-label'
						}
					},
					group: {
						style: {
							colors: ['#A2A2A2'],
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 100,
							cssClass: ''
						}
					},

					title: {
						style: {
							colors: '#A2A2A2',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-title'
						}
					}
				},
				yaxis: {
					label: {
						show: true,
						style: {
							colors: '#A2A2A2',
							fontSize: '4px',
							fontFamily: 'Segoe UI Semibold',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label'
						}
					}
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					}
				},
				colors: ['#F4BEBF']

			};

			var chart = new ApexCharts(document.querySelector("#chart8"), options);

			chart.render();
			window.dispatchEvent(new Event('resize'));

			//---------------------------- Less Breakdown -------------------------------
			var options = {
				series: [{
					data: [eq2, eq5, eq1, eq4, eq3],
				}],
				chart: {
					type: 'bar',
					width: 280,
					height: 135,
					toolbar: {
						show: false
					}
				},
				grid: {
					show: false
				},
				fill: {
					type: 'gradient',
					gradient: {
						shadeIntensity: 0,
						inverseColors: false,
						opacityFrom: 1,
						opacityTo: 0.7,
						stops: [20, 100, 100, 100]
					}
				},
				plotOptions: {
					bar: {
						// borderRadius: 4,
						horizontal: true,
						columnWidth: '10%'
					}
				},
				dataLabels: {
					enabled: false
				},
				xaxis: {
					categories: ["E1", "E2", "E3", "E4", "E5"],
				},
				colors: ['#9594FD']
			};

			var chart = new ApexCharts(document.querySelector("#chart9"), options);
			chart.render();

			//---------------------------- Total Breakdown --------------------------- 
			var options = {
				series: [eq1, eq2, eq3, eq4, eq5],
				chart: {
					width: 350,
					type: 'donut',
					height: 135
						// width: '100%',
						// offsetX: 50
				},
				plotOptions: {
					pie: {
						startAngle: 10,
						// endAngle: 270,
						size: 50,
						donut: {
							size: '85%',
							background: '#F0F1FF',
							// border:'#7C87FD',
							labels: {
								show: true,
								total: {
									show: true
								}
							}
						}
					}
				},
				dataLabels: {
					enabled: false
				},
				fill: {
					// type: 'gradient'
				},
				legend: {
					show: true,
					fontSize: '9px',
					fontFamily: 'Segoe UI Semibold',
					fontWeight: 800,
					formatter: function(val, opts) {
						// return val + " - " + opts.w.globals.series[opts.seriesIndex];
						return val;
					}
				},

				title: {},
				labels: ["chuck", "Grinding wheel", "wheels", "steel", "laptops"],
				responsive: [{
					breakpoint: 400,
					options: {
						chart: {
							width: 10
						},
						legend: {
							position: 'top'
						},
						legendGroup: {
							layout: {
								position: 'top'
							}
						}
					}
				}],
				colors: ['#F4BEBF', '#CEF1D9', '#7F8AFD', '#8F93BC', '#D8DAE6', '#F9D3AE', '#F8D8D8', '#B9BCEA']
			};
			var chart = new ApexCharts(document.querySelector("#chart10"), options);
			chart.render();
			window.dispatchEvent(new Event('resize'));

		},
		showBusyIndicator: function(iDuration, iDelay) {
			BusyIndicator.show(iDelay);
			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					clearTimeout(this._sTimeoutId);
					this._sTimeoutId = null;
				}
				this._sTimeoutId = setTimeout(function() {
					this.hideBusyIndicator();
				}.bind(this), iDuration);
			}
		},
		hideBusyIndicator: function() {
			BusyIndicator.hide();
		},
		fnPoScreen: function() {
			busyDialog.open();
			window.dispatchEvent(new Event('resize'));
			this._loadGoogleCharts()
				.then(function() {

					this.drawChart();

					this.localchart();

					this.localchart1();

					this.drawChartbar();

				}.bind(this))
				.catch(function(error) {
					console.error("Google Charts loading failed:", error);
				});
			window.dispatchEvent(new Event('resize'));
			this.byId("id_shiftdashboard").setVisible(true);
			// this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_wrkcntr").setVisible(false);
			this.byId("id_typeqpmnt").setVisible(false);
			this.byId("id_mstusd").setVisible(false);
			this.byId("id_dashboard1").setVisible(true);
			this.byId("id_dashboard2").setVisible(true);
			this.byId("id_dashboard02").setVisible(true);
			this.byId("id_dashboard3").setVisible(false);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(false);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxP");
			this.byId("id_hboxD").addStyleClass("cl_hboxD");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPl").addStyleClass("cl_hboxP");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPr").addStyleClass("cl_hboxP");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPro").addStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxP");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPb").addStyleClass("cl_hboxP");
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			busyDialog.close();
		},
		fnPoScreen1: function() {
			busyDialog.open();
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_dashboard1").setVisible(false);
			this.byId("id_dashboard2").setVisible(false);
			this.byId("id_dashboard02").setVisible(false);
			this.byId("id_dashboard3").setVisible(false);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(true);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(true);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_planned_order_create").setVisible(true);
			this.byId("id_table").setVisible(true);
			// this.byId("id_table5").setVisible(false);
			this.byId("id_table02").setVisible(false);
			this.byId("id_table03").setVisible(false);
			this.byId("id_TablePOclose").setVisible(false);
			this.byId("id_table05").setVisible(false);
			// this.byId("id_table06").setVisible(false);
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxD");
			this.byId("id_hboxD").addStyleClass("cl_hboxP");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxP");
			this.byId("id_hboxPl").addStyleClass("cl_hboxD");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPr").addStyleClass("cl_hboxP");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPro").addStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxP");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPb").addStyleClass("cl_hboxP");
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			busyDialog.close();
		},
		fnPoScreen2: function() {
			busyDialog.open();
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_dashboard1").setVisible(false);
			this.byId("id_dashboard2").setVisible(false);
			this.byId("id_dashboard02").setVisible(false);
			this.byId("id_dashboard3").setVisible(false);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(true);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(true);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_planned_order_create").setVisible(false);
			this.byId("id_table").setVisible(false);
			// this.byId("id_table5").setVisible(false);
			this.byId("id_table02").setVisible(true);
			this.byId("id_table03").setVisible(false);
			this.byId("id_TablePOclose").setVisible(false);
			this.byId("id_table05").setVisible(false);
			// this.byId("id_table06").setVisible(false);
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxD");
			this.byId("id_hboxD").addStyleClass("cl_hboxP");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPl").addStyleClass("cl_hboxP");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxP");
			this.byId("id_hboxPr").addStyleClass("cl_hboxD");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPro").addStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxP");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPb").addStyleClass("cl_hboxP");
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			busyDialog.close();
		},
		fnPoScreen3: function() {
			busyDialog.open();
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_dashboard1").setVisible(false);
			this.byId("id_dashboard2").setVisible(false);
			this.byId("id_dashboard02").setVisible(false);
			this.byId("id_dashboard3").setVisible(false);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(true);
			this.byId("id_planned2").setVisible(true);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_planned_order_create").setVisible(false);
			this.byId("id_table").setVisible(false);
			// this.byId("id_table5").setVisible(false);
			this.byId("id_table02").setVisible(false);
			this.byId("id_table03").setVisible(true);
			this.byId("id_TablePOclose").setVisible(false);
			this.byId("id_table05").setVisible(false);
			// this.byId("id_table06").setVisible(false);
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxD");
			this.byId("id_hboxD").addStyleClass("cl_hboxP");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPl").addStyleClass("cl_hboxP");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPr").addStyleClass("cl_hboxP");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxP");
			this.byId("id_hboxPro").addStyleClass("cl_hboxD");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxP");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPb").addStyleClass("cl_hboxP");
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			busyDialog.close();
		},
		fnPoScreen4: function() {
			var vPathImage = this.getView()
				.getModel("JM_ImageModel")
				.getProperty("/path");
			busyDialog.open();
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_dashboard1").setVisible(false);
			this.byId("id_dashboard2").setVisible(false);
			this.byId("id_dashboard02").setVisible(false);
			this.byId("id_dashboard3").setVisible(true);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(true);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_planned_order_create").setVisible(false);
			this.byId("id_table").setVisible(false);
			// this.byId("id_table5").setVisible(false);
			this.byId("id_table02").setVisible(false);
			this.byId("id_table03").setVisible(false);
			this.byId("id_TablePOclose").setVisible(true);
			this.byId("id_table05").setVisible(false);
			// this.byId("id_table06").setVisible(false);
			this.byId("id_confirmation_dash").setVisible(true);
			this.byId("id_close_dash").setVisible(true);
			// this.byId("id_cancel_dash").setVisible(true);
			this.byId("id_confirmation_dash").setIcon(
				vPathImage + "Confirmation.svg"
			);

			this.byId("id_close_dash").setIcon(
				vPathImage + "CloseW.svg"
			);
			// this.byId("id_cancel_dash").setIcon("Image/CancelW.svg");
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxD");
			this.byId("id_hboxD").addStyleClass("cl_hboxP");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPl").addStyleClass("cl_hboxP");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPr").addStyleClass("cl_hboxP");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPro").addStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxD");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPb").addStyleClass("cl_hboxP");
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			busyDialog.close();
		},
		confirmation: function() {
			busyDialog.open();
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_dashboard1").setVisible(false);
			this.byId("id_dashboard2").setVisible(false);
			this.byId("id_dashboard02").setVisible(false);
			this.byId("id_dashboard3").setVisible(true);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(true);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_planned_order_create").setVisible(false);
			this.byId("id_table").setVisible(false);
			// this.byId("id_table5").setVisible(false);
			this.byId("id_table02").setVisible(false);
			this.byId("id_table03").setVisible(false);
			this.byId("id_TablePOclose").setVisible(true);
			this.byId("id_table05").setVisible(false);
			// this.byId("id_table06").setVisible(false);
			this.byId("id_confirmation_dash").setIcon("Image/Confirmation.svg");
			this.byId("id_close_dash").setIcon("Image/CloseW.svg");
			// this.byId("id_cancel_dash").setIcon("Image/CancelW.svg");
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxD");
			this.byId("id_hboxD").addStyleClass("cl_hboxP");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPl").addStyleClass("cl_hboxP");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPr").addStyleClass("cl_hboxP");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPro").addStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxD");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPb").addStyleClass("cl_hboxP");
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			busyDialog.close();
		},
		orderclose: function() {
			var vPathImage = this.getView()
				.getModel("JM_ImageModel")
				.getProperty("/path");
			busyDialog.open();
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_dashboard1").setVisible(false);
			this.byId("id_dashboard2").setVisible(false);
			this.byId("id_dashboard02").setVisible(false);
			this.byId("id_dashboard3").setVisible(true);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(true);
			this.byId("id_planned3").setVisible(false);
			this.byId("id_planned_order_create").setVisible(false);
			this.byId("id_table").setVisible(false);
			// this.byId("id_table5").setVisible(false);
			this.byId("id_table02").setVisible(false);
			this.byId("id_table03").setVisible(false);
			this.byId("id_TablePOclose").setVisible(false);
			this.byId("id_table05").setVisible(true);
			// this.byId("id_table06").setVisible(false);
			this.byId("id_confirmation_dash").setIcon(
				vPathImage + "Confirmation.svg"
			);

			this.byId("id_close_dash").setIcon(
				vPathImage + "CloseW.svg"
			);
			// this.byId("id_cancel_dash").setIcon("Image/CancelW.svg");
			this.byId("id_breakdown").setVisible(false);
			this.byId("id_breakdown1").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxD");
			this.byId("id_hboxD").addStyleClass("cl_hboxP");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPl").addStyleClass("cl_hboxP");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPr").addStyleClass("cl_hboxP");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPro").addStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxD");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPb").addStyleClass("cl_hboxP");
			this.byId("id_dia").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			busyDialog.close();
		},
		// ordercancel: function() {
		// 	busyDialog.open();
		// 	this.byId("id_shiftdashboard").setVisible(false);
		// 	this.byId("id_equipmentdashboard").setVisible(false);
		// 	this.byId("id_dashboard1").setVisible(false);
		// 	this.byId("id_dashboard2").setVisible(false);
		// 	this.byId("id_dashboard02").setVisible(false);
		// 	this.byId("id_dashboard3").setVisible(true);
		// 	// this.byId("id_dashboard006").setVisible(true);
		// 	this.byId("id_planned1").setVisible(false);
		// 	this.byId("id_production").setVisible(false);
		// 	this.byId("id_Release").setVisible(false);
		// 	this.byId("id_planned2").setVisible(true);
		// 	this.byId("id_planned3").setVisible(false);
		// 	this.byId("id_planned_order_create").setVisible(false);
		// 	this.byId("id_table").setVisible(false);
		// 	// this.byId("id_table5").setVisible(true);
		// 	this.byId("id_table02").setVisible(false);
		// 	this.byId("id_table03").setVisible(false);
		// 	this.byId("id_TablePOclose").setVisible(false);
		// 	this.byId("id_table05").setVisible(false);
		// 	// this.byId("id_table06").setVisible(true);
		// 	this.byId("id_breakdown").setVisible(false);
		// 	this.byId("id_breakdown1").setVisible(false);
		// 	this.byId("id_confirmation_dash").setIcon("Image/ConfirmationW.svg");
		// 	this.byId("id_close_dash").setIcon("Image/CloseW.svg");
		// 	// this.byId("id_cancel_dash").setIcon("Image/Cancel.svg");
		// 	this.byId("id_hboxD").removeStyleClass("cl_hboxD");
		// 	this.byId("id_hboxD").addStyleClass("cl_hboxP");
		// 	this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
		// 	this.byId("id_hboxPl").addStyleClass("cl_hboxP");
		// 	this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
		// 	this.byId("id_hboxPr").addStyleClass("cl_hboxP");
		// 	this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
		// 	this.byId("id_hboxPro").addStyleClass("cl_hboxP");
		// 	this.byId("id_hboxPrc").removeStyleClass("cl_hboxP");
		// 	this.byId("id_hboxPrc").addStyleClass("cl_hboxD");
		// 	this.byId("id_hboxPb").removeStyleClass("cl_hboxD");
		// 	this.byId("id_hboxPb").addStyleClass("cl_hboxP");
		// 	this.byId("id_dia").setVisible(false);
		// 	this.getView().byId("id_imgAnnPanel").setVisible(false);
		// 	busyDialog.close();
		// },
		fnPoScreen6: function() {
			busyDialog.open();
			window.dispatchEvent(new Event('resize'));
			var loading3 = google.charts.load('current', {
				'packages': ['corechart']
			});
			loading3.then(function() {
				this.drawChartBreak();
			}.bind(this));
			window.dispatchEvent(new Event('resize'));
			this.byId("id_shiftdashboard").setVisible(false);
			this.byId("id_equipmentdashboard").setVisible(false);
			this.byId("id_dashboard1").setVisible(false);
			this.byId("id_dashboard2").setVisible(false);
			this.byId("id_dashboard02").setVisible(false);
			this.byId("id_dashboard3").setVisible(false);
			// this.byId("id_dashboard006").setVisible(false);
			this.byId("id_planned1").setVisible(false);
			this.byId("id_production").setVisible(false);
			this.byId("id_Release").setVisible(false);
			this.byId("id_planned2").setVisible(false);
			this.byId("id_planned3").setVisible(true);
			this.byId("id_breakdown").setVisible(true);
			this.byId("id_breakdown1").setVisible(true);
			this.byId("id_planned_order_create").setVisible(false);
			this.byId("id_table").setVisible(false);
			// this.byId("id_table5").setVisible(false);
			this.byId("id_table02").setVisible(false);
			this.byId("id_table03").setVisible(false);
			this.byId("id_TablePOclose").setVisible(false);
			this.byId("id_table05").setVisible(false);
			// this.byId("id_table06").setVisible(false);
			this.byId("id_confirmation_dash").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(false);
			this.byId("id_close_dash").setVisible(false);
			// this.byId("id_cancel_dash").setVisible(false);
			this.byId("id_hboxD").removeStyleClass("cl_hboxD");
			this.byId("id_hboxD").addStyleClass("cl_hboxP");
			this.byId("id_hboxPl").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPl").addStyleClass("cl_hboxP");
			this.byId("id_hboxPr").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPr").addStyleClass("cl_hboxP");
			this.byId("id_hboxPro").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPro").addStyleClass("cl_hboxP");
			this.byId("id_hboxPrc").removeStyleClass("cl_hboxD");
			this.byId("id_hboxPrc").addStyleClass("cl_hboxP");
			this.byId("id_hboxPb").removeStyleClass("cl_hboxP");
			this.byId("id_hboxPb").addStyleClass("cl_hboxD");
			this.byId("id_dia").setVisible(false);
			busyDialog.close();
		},

		//----------------------- 21-06-2023 --------------------------------//

		fnSavePlanord: function() {
			var tmp_ot = "",
				tmp_plant = "",
				tmp_mat = "";
			// ,lv_edatepl = "",lv_sdatepl = "",lv_stime = "",lv_etime = "";
			tmp_ot = sap.ui.getCore().byId("id_otyp").getValue();
			tmp_plant = sap.ui.getCore().byId("id_pl").getValue();
			tmp_mat = sap.ui.getCore().byId("id_mat").getValue();
			lv_edatepl = sap.ui.getCore().byId("id_pled").getValue();
			lv_sdatepl = sap.ui.getCore().byId("id_plsd").getValue();
			lv_stime = sap.ui.getCore().byId("id_plst").getValue();
			lv_etime = sap.ui.getCore().byId("id_plet").getValue();
			// lv_sdate = sap.ui.getCore().byId("id_pled").getValue();dateFormat.format(new Date()) + "T00:00:00"
			// if (tmp_mat === "" && tmp_plant === "" && tmp_ot === "") {
			// 	sap.m.MessageBox.error("Please Enter Mandatory Fields");
			// } else {
			lv_entity = "";
			if (tmp_ot === "" || tmp_plant === "" || tmp_mat === "" || lv_edatepl === "" || lv_sdatepl === "" || lv_stime === "" || lv_etime ===
				"") {
				sap.m.MessageBox.error("Please fill all the details");
			} else {
				this.fncreatePo();
			}

			// }

		},
		fnCloseBtnPlanOrd: function() {
			this.fnclearplan();
			this.fnAdd().close();
			this._oDialog1.destroy();
			this._oDialog1 = null;
		},
		fnProfileF4: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.ProfilevalueHelpDialog) {
				this.ProfilevalueHelpDialog = sap.ui.xmlfragment(
					"VShifter_New.Fragment.Profile",
					this
				);
				this.getView().addDependent(this.ProfilevalueHelpDialog);
			}
			this.ProfilevalueHelpDialog.open();
		},
		fnPlantFrg: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.PlantvalueHelpDialog) {
				this.PlantvalueHelpDialog = sap.ui.xmlfragment(
					"VShifter_New.Fragment.Plantf4",
					this
				);
				this.getView().addDependent(this.PlantvalueHelpDialog);
			}
			this.PlantvalueHelpDialog.open();
		},
		fnPlantF4: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.PlantvalueHelpDialog1) {
				this.PlantvalueHelpDialog1 = sap.ui.xmlfragment(
					"VShifter_New.Fragment.Plant",
					this
				);
				this.getView().addDependent(this.PlantvalueHelpDialog1);
			}
			this.PlantvalueHelpDialog1.open();
		},
		fnplantlive: function() {
			var plant = this.getView().byId("id_plant").getValue();
			if (plant === "") {
				// this.getView().byId("id_planttext").setValue("");
				var userid = this.getView().byId("id_table");
				var userid1 = this.getView().byId("id_table02");
				var userid2 = this.getView().byId("id_table03");
				var userid3 = this.getView().byId("id_TablePOclose");
				var userid4 = this.getView().byId("id_table05");
				userid.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.All, plant));
				userid1.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.All, plant));
				userid2.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.All, plant));
				userid3.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.All, plant));
				userid4.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.All, plant));

			}

		},
		fnMaterialF4: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.MaterialvalueHelpDialog) {
				this.MaterialvalueHelpDialog = sap.ui.xmlfragment(
					"VShifter_New.Fragment.Material",
					this
				);
				this.getView().addDependent(this.MaterialvalueHelpDialog);
			}
			this.MaterialvalueHelpDialog.open();
		},
		fnMatlive: function() {
			var mat = this.getView().byId("id_material").getValue();
			if (mat === "") {
				// this.getView().byId("id_materialtext").setValue("");
				var userid = this.getView().byId("id_table");
				var userid1 = this.getView().byId("id_table02");
				var userid2 = this.getView().byId("id_table03");
				var userid3 = this.getView().byId("id_TablePOclose");
				var userid4 = this.getView().byId("id_table05");
				userid.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.All, mat));
				userid1.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.All, mat));
				userid2.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.All, mat));
				userid3.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.All, mat));
				userid4.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.All, mat));

			}
		},
		fnMaterialFrg: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.OrdervalueHelpDialog11) {
				this.OrdervalueHelpDialog1 = sap.ui.xmlfragment(
					"VShifter_New.Fragment.MaterialF4",
					this
				);
				this.getView().addDependent(this.OrdervalueHelpDialog1);
			}
			this.OrdervalueHelpDialog1.open();
		},
		fnSalesF4: function(oEvent) {
			this.inputId = oEvent.getSource().getId();
			if (!this.SalesvalueHelpDialog1) {
				this.SalesvalueHelpDialog1 = sap.ui.xmlfragment(
					"VShifter_New.Fragment.Sales",
					this
				);
				this.getView().addDependent(this.SalesvalueHelpDialog1);
			}
			this.SalesvalueHelpDialog1.open();
		},
		fnSalelive: function() {
			var sal = this.getView().byId("id_sales").getValue();
			if (sal === "") {
				// this.getView().byId("id_materialtext").setValue("");
				var userid = this.getView().byId("id_table");
				var userid1 = this.getView().byId("id_table02");
				var userid2 = this.getView().byId("id_table03");
				var userid3 = this.getView().byId("id_TablePOclose");
				var userid4 = this.getView().byId("id_table05");
				// userid.getBinding().filter(new sap.ui.model.Filter("Ekorg", sap.ui.model.FilterOperator.All, mat));
				// userid1.getBinding().filter(new sap.ui.model.Filter("Ekorg", sap.ui.model.FilterOperator.All, mat));
				// userid2.getBinding().filter(new sap.ui.model.Filter("Ekorg", sap.ui.model.FilterOperator.All, mat));
				// userid3.getBinding().filter(new sap.ui.model.Filter("Ekorg", sap.ui.model.FilterOperator.All, mat));
				// userid4.getBinding().filter(new sap.ui.model.Filter("Ekorg", sap.ui.model.FilterOperator.All, mat));
			}
		},
		fncancel: function() {
			this.initialLoad();
			sup_name = "";
			shift_rotation = "";
			shift_date = "";
			sup_id = "";
			shift_time = "";
			var cd, shift_time1;
			lv_entity = 'SD';
			shift_date = dateFormat.format(new Date());
			cd = new Date();
			shift_time1 = cd.getHours();
			if (shift_time1 >= 4 && shift_time1 <= 12) {
				shift_rotation = 'SHIFT-1';
			} else if (shift_time1 > 12 && shift_time1 <= 20) {
				shift_rotation = 'SHIFT-2';
			} else {
				shift_rotation = 'SHIFT-3';
			}
			this.fncreatePo();
			this.getView().byId("id_dia").close();
		},
		fnDiaclose: function() {
			this.initialLoad();
			lv_entity = 'SD';
			work_id = "";
			shift_rotation = "";
			sup_name = "";
			sup_id = "";
			shift_rotation = this.getView().byId("id_shift").getValue();
			sup_name = this.getView().byId("id_name").getValue();
			shift_time = this.getView().byId("appdate").getText();
			sup_id = this.getView().byId("id_supid").getValue();
			shift_date = this.getView().byId("DP2").getValue();
			lv_shifth = shift_rotation;

			if (sup_id !== "" && sup_name !== "" && shift_rotation !== "") {

				this.fncreatePo();

				this.getView().byId("id_dia").close();

			} else {
				sap.m.MessageBox.error("Please enter all details");
			}
			window.dispatchEvent(new Event('resize'));
			this._loadGoogleCharts()
				.then(function() {

					this.drawChart();

					this.drawChartbar();

					this.drawChart1();

					this.drawChartBreak();

				}.bind(this))
				.catch(function(error) {
					console.error("Google Charts loading failed:", error);
				});

		},
		fnSupnameVal: function() {
			var val = this.getView().byId("id_name").getValue();
			if (!(isNaN(val))) {
				sap.m.MessageToast.show("Please Enter String Only")
			}
		},
		fndatevalidation: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_plsd").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (date1 !== finalDate) {
				sap.m.MessageToast.show("Start Date Should be a Current Date");
				// sap.ui.getCore().byId("id_plsd").setValue(finalDate);
				sap.ui.getCore().byId("id_plsd").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_plsd").addStyleClass("cl_input_tr");
			} else if (date1 === finalDate) {
				sap.ui.getCore().byId("id_plsd").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_plsd").addStyleClass("cl_input_t");
			} else {
				sap.ui.getCore().byId("id_plsd").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_plsd").addStyleClass("cl_input_t");
			}
		},
		fndatevalidation1: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_pled").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (finalDate === date1) {
				sap.ui.getCore().byId("id_pled").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_pled").addStyleClass("cl_input_t");
			} else if (lv_dateval > dateval) {
				sap.m.MessageToast.show("End Date Should not be Previous Date");
				sap.ui.getCore().byId("id_pled").setValue("");
				sap.ui.getCore().byId("id_pled").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_pled").addStyleClass("cl_input_tr");
			} else {
				sap.ui.getCore().byId("id_pled").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_pled").addStyleClass("cl_input_t");
			}
		},
		fnvalidatedate: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_changepl_sdate").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (date1 !== finalDate) {
				sap.m.MessageToast.show("Please Select Current Date Only");
				// sap.ui.getCore().byId("id_changepl_sdate").setValue(finalDate);
				sap.ui.getCore().byId("id_changepl_sdate").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_changepl_sdate").addStyleClass("cl_input_tr");
			} else if (date1 === finalDate) {
				sap.ui.getCore().byId("id_changepl_sdate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changepl_sdate").addStyleClass("cl_input_t");
			} else {
				sap.ui.getCore().byId("id_changepl_sdate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changepl_sdate").addStyleClass("cl_input_t");
			}
		},
		fnvalidatedate1: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_changepl_edate").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (finalDate === date1) {
				sap.ui.getCore().byId("id_changepl_edate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changepl_edate").addStyleClass("cl_input_t");
			} else if (lv_dateval > dateval) {
				sap.m.MessageToast.show("End Date Should not be Previous Date");
				sap.ui.getCore().byId("id_changepl_edate").setValue("");
				sap.ui.getCore().byId("id_changepl_edate").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_changepl_edate").addStyleClass("cl_input_tr");
			} else {
				sap.ui.getCore().byId("id_changepl_edate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changepl_edate").addStyleClass("cl_input_t");
			}
		},
		fndatevalid: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_changeordersdate").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (date1 !== finalDate) {
				sap.m.MessageToast.show("Please Select Current Date Only");
				// sap.ui.getCore().byId("id_changeordersdate").setValue(finalDate);
				sap.ui.getCore().byId("id_changeordersdate").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_changeordersdate").addStyleClass("cl_input_tr");
			} else if (date1 === finalDate) {
				sap.ui.getCore().byId("id_changeordersdate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changeordersdate").addStyleClass("cl_input_t");
			} else {
				sap.ui.getCore().byId("id_changeordersdate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changeordersdate").addStyleClass("cl_input_t");
			}
		},
		fndatevalid1: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_changeorderedate").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (finalDate === date1) {
				sap.ui.getCore().byId("id_changeorderedate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changeorderedate").addStyleClass("cl_input_t");
			} else if (lv_dateval > dateval) {
				sap.m.MessageToast.show("End Date Should not be Previous Date");
				sap.ui.getCore().byId("id_changeorderedate").setValue("");
				sap.ui.getCore().byId("id_changeorderedate").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_changeorderedate").addStyleClass("cl_input_tr");
			} else {
				sap.ui.getCore().byId("id_changeorderedate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_changeorderedate").addStyleClass("cl_input_t");
			}
		},
		fnvaliddate: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_sdate").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (date1 !== finalDate) {
				sap.m.MessageToast.show("Please Select Current Date Only");
				// sap.ui.getCore().byId("id_sdate").setValue(finalDate);
				sap.ui.getCore().byId("id_sdate").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_sdate").addStyleClass("cl_input_tr");
			} else if (date1 === finalDate) {
				sap.ui.getCore().byId("id_sdate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_sdate").addStyleClass("cl_input_t");
			} else {
				sap.ui.getCore().byId("id_sdate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_sdate").addStyleClass("cl_input_t");
			}
		},
		fnvaliddate1: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_edate").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (finalDate === date1) {
				sap.ui.getCore().byId("id_edate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_edate").addStyleClass("cl_input_t");
			} else if (lv_dateval > dateval) {
				sap.m.MessageToast.show("End Date Should not be Previous Date");
				sap.ui.getCore().byId("id_edate").setValue("");
				sap.ui.getCore().byId("id_edate").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_edate").addStyleClass("cl_input_tr");
			} else {
				sap.ui.getCore().byId("id_edate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_edate").addStyleClass("cl_input_t");
			}
		},
		fndatevalidate: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = sap.ui.getCore().byId("id_poedate").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (finalDate === date1) {
				sap.ui.getCore().byId("id_poedate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_poedate").addStyleClass("cl_input_t");
			} else if (lv_dateval > dateval) {
				sap.m.MessageToast.show("End Date Should not be Previous Date");
				sap.ui.getCore().byId("id_poedate").setValue("");
				sap.ui.getCore().byId("id_poedate").removeStyleClass("cl_input_t");
				sap.ui.getCore().byId("id_poedate").addStyleClass("cl_input_tr");
			} else {
				sap.ui.getCore().byId("id_poedate").removeStyleClass("cl_input_tr");
				sap.ui.getCore().byId("id_poedate").addStyleClass("cl_input_t");
			}
		},
		handleChangeDate: function() {
			var value;
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = this.getView().byId("DP1").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (date1 !== finalDate) {
				sap.m.MessageToast.show("Start Date Should be a Current Date");
				// this.getView().byId("DP1").setValue(finalDate);
				this.byId("DP1").removeStyleClass("cl_input_t");
				this.byId("DP1").addStyleClass("cl_input_tr");
			} else if (date1 === finalDate) {
				this.byId("DP1").removeStyleClass("cl_input_tr");
				this.byId("DP1").addStyleClass("cl_input_t");
			} else {
				this.byId("DP1").removeStyleClass("cl_input_tr");
				this.byId("DP1").addStyleClass("cl_input_t");
			}
		},
		handleChangeDate1: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = yy + '-' + mm + '-' + dd;
			var dateval = this.getView().byId("DP2").getDateValue();
			var MM = dateval.getMonth() + 1;
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = YY + '-' + MM + '-' + DD;
			if (finalDate === date1) {
				this.byId("DP2").removeStyleClass("cl_input_tr");
				this.byId("DP2").addStyleClass("cl_input_t");
			} else if (lv_dateval >= dateval) {
				sap.m.MessageToast.show("End Date Should not be Previous Date");
				this.getView().byId("DP2").setValue("");
				this.byId("DP2").removeStyleClass("cl_input_t");
				this.byId("DP2").addStyleClass("cl_input_tr");
			} else {
				this.byId("DP2").removeStyleClass("cl_input_tr");
				this.byId("DP2").addStyleClass("cl_input_t");
			}
		},
		handleChangeDate2: function() {
			lv_dateval = new Date();
			var mm = lv_dateval.getMonth() + 1;
			if (mm <= 9) {
				mm = '0' + mm;
			}
			var dd = lv_dateval.getDate();
			var yy = lv_dateval.getFullYear();
			var finalDate = dd + '-' + mm + '-' + yy;
			var dateval = this.getView().byId("id_yest").getDateValue();
			var MM = dateval.getMonth() + 1;
			if (MM <= 9) {
				MM = '0' + MM;
			}
			var DD = dateval.getDate();
			var YY = dateval.getFullYear();
			var date1 = DD + '-' + MM + '-' + YY;

			if (finalDate === date1) {
				this.byId("id_yest").removeStyleClass("cl_input_tr");
				this.byId("id_yest").addStyleClass("cl_input_t");
				this.getView().byId("id_date").setText(finalDate);
				this.getView().byId("id_date1").setText(finalDate);
				this.getView().byId("id_date2").setText(finalDate);
			} else if (lv_dateval <= dateval) {
				sap.m.MessageBox.error("Future Date selection not allowed");
				// sap.m.MessageToast.show("Future Date selection not allowed");
				this.getView().byId("id_yest").setValue("");
				this.byId("id_yest").removeStyleClass("cl_input_t");
				this.byId("id_yest").addStyleClass("cl_input_tr");
				this.getView().byId("id_date").setText(finalDate);
				this.getView().byId("id_date1").setText(finalDate);
				this.getView().byId("id_date2").setText(finalDate);
			} else {
				this.byId("id_yest").removeStyleClass("cl_input_tr");
				this.byId("id_yest").addStyleClass("cl_input_t");
				this.getView().byId("id_date").setText(date1);
				this.getView().byId("id_date1").setText(date1);
				this.getView().byId("id_date2").setText(date1);
			}
		},
		fncreatePo: function() {
			var that = this;
			var readUrl = "/PlantorderSet";
			var Ventitypo = {};
			var Vplannedorder = {};
			var Varrpo = [];
			var temp_shift = [];
			var lv_enti;
			// lv
			// var today = new Date();
			// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			// lv_ordertype = "PP01";

			if (lv_entity === 'PP') {
				if (VTrid !== '' && lv_ordertype !== "") {
					Vplannedorder = {
						// "Aufnr": VTrid1,
						"Plnum": VTrid,
						"Auart": lv_ordertype,
						"Shift": shift_rotation,
						// "Activity1": lv_sdate,
						// "Activity2":lv_edate
						// "Auart": 'PP01'
						// "Aufnr": VTrid1,
						// "Plnum": '501',
						// "Auart": lv_ordertype
						// "Auart": 'PP01'
					};

				}
			}
			if (lv_entity === 'CL') {
				Vplannedorder = {
					"Aufnr": VTrid1
				};
			}
			if (lv_entity === 'CO') {
				Vplannedorder = {
					"Aufnr": lv_orderno,
					"PoSdate": lv_chordsdate,
					"PoEdate": lv_chordedate

				};
			}
			if (lv_entity === 'RF') {
				if (VTrid1 !== '') {
					Vplannedorder = {
						"Aufnr": VTrid1,

					};
				}
			}
			if (lv_entity === 'BD') {
				var str1, str2, str3, str;
				str = lv_sdate.split('-');
				lv_sdate = str[0] + str[1] + str[2];
				str = "";
				str = lv_edate.split('-');
				lv_edate = str[0] + str[1] + str[2];
				str = "";
				str = lv_stime1.split(':');
				lv_stime1 = str[0] + str[1] + str[2];
				str = "";
				str = lv_etime1.split(':');
				lv_etime1 = str[0] + str[1] + str[2];

				lv_shift = lv_notitype + "," + lv_equip + "," + lv_sdate + "," + lv_edate + "," + lv_stime1 + "," + lv_etime1 + "," + lv_addby +
					"," + lv_brreason;
				// + lv_stime + "," + lv_etime 
				Vplannedorder = {
					// "Shift": lv_shift
					"Returnmsg": lv_shift,
					"Plnum": VTrid,
					"Aufnr": lv_temoProd,

				};
			}
			if (lv_entity === 'SD') {
				var str;
				if (shift_date !== "") {
					str = shift_date.split('.');
					shift_date = shift_date + "T00:00:00";
				}
				if (shift_time !== "") {
					str = "";
					str = shift_time.split(':');
					if (str[2].length < 2) {
						str[2] = "0" + str[2];
					}
					if (str[1].length < 2) {
						str[1] = "0" + str[1];
					}
					if (str[0].length < 2) {
						str[0] = "0" + str[0];
					}
					shift_time = str[0] + str[1] + str[2];
				}

				Vplannedorder = {

					"SupName": sup_name,
					"Shift": shift_rotation,
					"ShiftDate": shift_date,
					"Msg": shift_time,
					"SupId": sup_id

				};
				temp_shift.push(Vplannedorder);
				Vplannedorder = {};
			}
			if (lv_entity === 'POCN') {
				var str, str1;
				str = lv_posdate.split('.')
				lv_posdate = str[2] + "-" + str[1] + "-" + str[0];
				lv_posdate = lv_posdate + "T00:00:00";
				lv_poedate = lv_poedate + "T00:00:00";
				str = "";
				str = lv_postime.split(':');
				lv_postime = str[0] + str[1] + str[2];
				// lv_postime = "PT" + str[0] + "H" +str[1] + "M" + str[2] + "S";
				str = lv_poetime.split(':');
				lv_poetime = str[0] + str[1] + str[2];
				// lv_poetime =  str[0] + str[1] + str[2];
				str1 = "";
				// lv_poetime = "PT" + str[0] + "H" +str[1] + "M" + str[2] + "S";

				if (VTrid1 !== '') {
					Vplannedorder = {
						"Plnum": VTrid,
						"Aufnr": VTrid1,
						"Yield": yield1,
						"scarp": VScarp,
						"Plant": lv_plant,
						"Shift": shift_rotation,
						"PoSdate": lv_posdate,
						"PoEdate": lv_poedate,
						// "PoStime":lv_postime,
						// "PoEtime":lv_poetime
						"Activity2": lv_postime,
						"Activity1": lv_poetime,
						"Reason": lv_reasonForscr,
						"Operation": lv_operation,
						"ConType": lv_ctyp,
						// "CapCat": lv_capct,
						"Rework": lv_rw,

					};
				} else {
					Vplannedorder = {
						"Plnum": VTrid,
						"Aufnr": VTrid1,
						"Yield": yield1,
						"scarp": yield1,
						"Plant": lv_plant,
						"Shift": lv_shift,
						"Activity2": lv_stime,
						"Activity1": lv_etime,
						"Auart": lv_order
					};
				}

			}

			Ventitypo.PldordProfile = lv_profile;
			// Ventitypo.Shift = "Shift-3";
			Ventitypo.Material = lv_material;
			Ventitypo.PlanPlant = lv_plant;
			if (lv_entity !== "POCN") {
				if (lv_entity === 'PP' || lv_entity === 'RF' || lv_entity === 'CL' || lv_entity === 'POCN' || lv_entity === 'CO' || lv_entity ===
					'BD' || lv_entity ===
					'SD' || lv_entity ===
					'CP') {
					Ventitypo.TotalPlordQty = '0.000';
					// Ventitypo.TotalPlordQty = sap.ui.getCore().byId("id_qty").getValue();
				} else {
					Ventitypo.TotalPlordQty = sap.ui.getCore().byId("id_qty").getValue();
					lv_entity = "";
					// Ventitypo.TotalPlordQty = '0.000';
				}
			}

			Ventitypo.FixedScrapQty = "0.000";
			Ventitypo.OrderStartDate = lv_sdatepl;
			Ventitypo.OrderFinDate = lv_edatepl;
			Ventitypo.Version = lv_entity;
			if (lv_entity === 'CP') { //change planned order
				Ventitypo.PlanPlant = lv_chplnpl;
				if (lv_chplnsdate !== "") {
					Ventitypo.OrderStartDate = lv_chplnsdate;
				}
				if (lv_chplnedate !== "") {
					Ventitypo.OrderFinDate = lv_chplnedate;
				}
				if (lv_chplnqty !== "") {
					Ventitypo.TotalPlordQty = lv_chplnqty;
				}

				Vplannedorder = {
					"Plnum": VTrid,
					"PoSdate": lv_chplnsdate,
					"PoEdate": lv_chplnedate

				};
			}
			// if(Vplannedorder === null){
			Varrpo.push(Vplannedorder);
			// }

			Ventitypo.Navpp = Varrpo;
			Ventitypo.Navshift = [];
			Ventitypo.Navsh = [];
			Ventitypo.Shift = temp_shift;
			// ventitypo.break = [];
			busyDialog.open();
			oModel.create(readUrl, Ventitypo, {
				success: function(oData, Response) {
					if (lv_entity !== 'PP' && lv_entity !== 'RF' && lv_entity !== 'CL' && lv_entity !== 'CO' && lv_entity !== 'SD' && lv_entity !==
						'CP' && lv_entity !==
						'POCN' && lv_entity !==
						'BD') {
						if (oData.Navsh.results[0].Plnum !== "") {
							// sap.m.MessageBox.success(oData.Navsh.results[0].Plnum + ' ' + that.getView().getModel('i18n').getProperty('Plannedcreate'), {
							sap.m.MessageBox.success(oData.Navsh.results[0].Plnum + ' ' + "Planned Order has been created Successfully", {
								Action: ['ok'],
								onClose: function(sAction) {}
							});
							busyDialog.close();
							// that.fnclear();
							that.fnclearplan();
							that.fnCloseBtnPlanOrd();
						} else {
							sap.m.MessageBox.error("Planned Order Not Created");
						}

					} else if (lv_entity === 'CL') {
						busyDialog.close();
						if (oData.Navsh.results[0].PoClose === 'X') {
							sap.m.MessageBox.success(" Production order " + oData.Navsh.results[0].Aufnr + " Closed");
						} else {
							sap.m.MessageBox.error(oData.Navsh.results[0].Returnmsg);
						}
						that.fnLoadDeatailH();
						// that.fnclearorderchange();
						// that.fnchpofrag().close();
					} else if (lv_entity === 'CO') {
						busyDialog.close();
						if (oData.Navsh.results[0].Activity2 === 'S' || oData.Navsh.results[0].Activity2 === 'I') {
							sap.m.MessageBox.success(" Production order " + oData.Navsh.results[0].Aufnr + " changed");
						} else if (oData.Navsh.results[0].Activity2 === 'E') {
							sap.m.MessageBox.error(oData.Navsh.results[0].Returnmsg);
						} else {
							sap.m.MessageBox.error(oData.Navsh.results[0].Returnmsg);
						}
						that.fnLoadDeatailH();
						that.fnclearorderchange();
						that.fnchpofrag().close();

					} else if (lv_entity === 'CP') {
						busyDialog.close();
						if (oData.Navsh.results[0].Activity1 === 'S' || oData.Navsh.results[0].Activity1 === 'I') {
							sap.m.MessageBox.success(" Planned order " + oData.Navsh.results[0].Plnum + " changed");
						} else {
							sap.m.MessageBox.error(oData.Navsh.results[0].Returnmsg);
						}

						that.fnLoadDeatailH();
						that.fnclearplchange();
						that.fnchaplfrag().close();

					} else if (lv_entity === 'PP') {
						// busyDialog.close();
						if (oData.Navsh.results[0].Returnmsg !== "PPE") {
							if (oData.Navsh.results[0].Aufnr !== "") {
								sap.m.MessageBox.success("Production Order " + oData.Navsh.results[0].Aufnr + ' ' + " has been created Successfully", {
									Action: ['ok'],
									onClose: function(sAction) {}
								});

							} else {
								// "Planned order has not been found"
								sap.m.MessageBox.error(oData.Navsh.results[0].Returnmsg, {
									Action: ['ok'],
									onClose: function(sAction) {}
								});

							}
						} else {
							sap.m.MessageBox.error("Planned Order was not created", {
								Action: ['ok'],
								onClose: function(sAction) {}
							});
						}

						// lv_entity = '';
					} else if (lv_entity === 'BD') {
						busyDialog.close();
						if (oData.Navsh.results[0].BrConfirm !== "") {
							sap.m.MessageBox.success("Breakdown Notification " + oData.Navsh.results[0].NotifNo + ' ' +
								" has been created Successfully", {
									Action: ['ok'],
									onClose: function(sAction) {}
								});
							that.fnLoadDeatailH();
							that.fnBreakClose();
						} else {
							// "Planned order has not been found"
							sap.m.MessageBox.error("Breakdown Status Can Not Be Added", {
								Action: ['ok'],
								onClose: function(sAction) {}
							});

						}

						// that.fnLoadDeatailH();
						// that.fnBreakClose();
					} else if (lv_entity === 'SD') {

						busyDialog.close();

						// var n1 = 
						name1 = oData.Shift.results[0].SupName;
						sid1 = oData.Shift.results[0].SupId;
						shift1 = oData.Shift.results[0].Shift;

						that.fnSetShiftdet(name1, sid1, shift1);

						// that.setMod(temp_arr);
						//
					}
					// lv_entity = '';
					else if (lv_entity === 'RF') {
						busyDialog.close();
						// if (oData.Navsh.results[0].ReleaseConf !== '') {
						if (oData.Navsh.results[0].ReleaseConf.includes("released")) {
							sap.m.MessageBox.success(oData.Navsh.results[0].ReleaseConf, {
								Action: ['ok'],
								onClose: function(sAction) {}
							});
						} else {
							// sap.m.MessageBox.error(oData.Navsh.results[0].Aufnr + " " + "is not released", {
							sap.m.MessageBox.error(oData.Navsh.results[0].ReleaseConf, {
								Action: ['ok'],
								onClose: function(sAction) {}
							});
							lv_entity = '';
						}
						// lv_entity = '';
					} else if (lv_entity === 'POCN') {
						// if()
						// that.Division.close();

						busyDialog.close();
						if (oData.Navsh.results[0].Confirmation === 'X') {
							sap.m.MessageBox.success("Production Order " + VTrid1 + '  ' + " has been Confirmed", {
								// sap.m.MessageBox.success(oData.Navsh.results[0].Returnmsg, {
								Action: ['ok'],
								onClose: function(sAction) {}
							});
							that.fnLoadDeatailH();
							that.fncloseBtn();
						} else if (oData.Navsh.results[0].Confirmation === 'N') {
							sap.m.MessageBox.success("Production Order " + VTrid1 + '  ' + " has partially confirmed", {
								// sap.m.MessageBox.success(oData.Navsh.results[0].Returnmsg, {
								Action: ['ok'],
								onClose: function(sAction) {}
							});
							that.fnLoadDeatailH();
							that.fncloseBtn();
						} else {
							sap.m.MessageBox.error(oData.Navsh.results[0].Returnmsg, {
								Action: ['ok'],
								onClose: function(sAction) {}
							});
							that.fncloseBtn();
						}
						this.fnclearpo();
						this.PoConfirm().close();
						that.fnClear();
						// that.Division.destroy();
						// sap.m.MessageBox.success("Production Order " + VTrid1 + '  ' + " has been Confirmed", {
						// 	// sap.m.MessageBox.success(oData.Navsh.results[0].Returnmsg, {
						// 	Action: ['ok'],
						// 	onClose: function(sAction) {}
						// });
					}
					// busyDialog.close();
					busyDialog.close();
					that.fnLoadDeatailH();
					Ventitypo = {};
					Vplannedorder = {};
					Varrpo = [];

					// that.fnclosepop();
				},
				error: function(oResponse) {
					// oBusyDialog.close();
					busyDialog.close();
					Ventitypo = {};
					Vplannedorder = {};
					Varrpo = [];
				}

			});
			// busyDialog.close();

		},
		fnchartload: function() {
			var oButton = this.getView().byId("id_shift_dash");
			oButton.firePress();

			window.dispatchEvent(new Event('resize'));
		},
		initialLoad: function() {
			busyDialog = new sap.m.BusyDialog({
				text: '...please wait while the data is loading '
			});

			dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});

			lv_date = new Date();
			var mm = lv_date.getMonth();
			var dd = lv_date.getDate();
			var yy = lv_date.getFullYear();
			var finalDate = mm + '/' + dd + '/' + yy;
			this.getView().byId("DP2").setValue(dateFormat.format(new Date(lv_date)));
			this.getView().byId("DP1").setValue(dateFormat.format(new Date(lv_date)));

			busyDialog.open();
			oModel = this.getOwnerComponent().getModel();
			this.fnLoadEquip(); //In Sap select restricted with upto 100rows
			this.fnLoadPlant();
			this.fnLoadMaterial(); //In Sap select restricted with upto 250rows
			this.fnLoadProfile();
			this.fnLoadDeatailH();
			this.fnLoadOrdertype();
			this.fnloadshift();
			this.fnchartload();
			// this.fndetailshift();

			busyDialog.close();

			// this.fnloadChart();

			oLabel = this.getView().byId("appdate");
			var oLabel1 = this.getView().byId("appdat");

			var oTable1 = this.getView().byId("id_table");
			var oTable = this.getView().byId("id_table02");
			var oTable2 = this.getView().byId("id_table03");
			var oTable3 = this.getView().byId("id_TablePOclose");
			var oTable4 = this.getView().byId("id_table07");
			var oTable5 = this.getView().byId("id_table05");

			oTable1.setSelectionMode(sap.ui.table.SelectionMode.None);
			oTable.setSelectionMode(sap.ui.table.SelectionMode.None);
			oTable2.setSelectionMode(sap.ui.table.SelectionMode.None);
			oTable3.setSelectionMode(sap.ui.table.SelectionMode.None);
			oTable4.setSelectionMode(sap.ui.table.SelectionMode.None);
			oTable5.setSelectionMode(sap.ui.table.SelectionMode.None);

			this.fngraph();

			var that = this;

			setInterval(function() {
				var result = that.GetClock();
				oLabel.setText(result);
			}, 1000);
			// ==================Code for time format ====================
			var a1 = [{
				"format": "HH:mm:ss",
				"support2400": true,
				"value": "23:40:50",
				"placeholder": "Enter End Time"

			}];

			var oModel12 = new sap.ui.model.json.JSONModel();
			oModel12.setData(a1);
			this.getView().setModel(oModel12, 'timeModel');

		},
		fnLoadEquip: function() {
			var that = this;
			// var readUrl1 = "/equipmentSet?$expand=EQUIPMAS,EQUIPHEAD";

			oModel.read("/Equip_headSet", {

				success: function(oData) {
					var oDetailJson = new sap.ui.model.json.JSONModel();
					oDetailJson.setData(oData.results);
					that.getView().setModel(oDetailJson, "JMEquip");
					var arr = oData.results;
					lv_equipdata = arr;
					var dateFormat1 = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "dd-MM-yyyy"
					});
					for (var i = 0; i < arr.length; i++) {
						arr[i].Erdat = dateFormat1.format(new Date(arr[i].Erdat));
					}
				},
				error: function(oError) {
					sap.m.MessageBox.error("Error");
				}
			});

		},
		fnLoadPlant: function() {
			var that = this;
			var readUrl = "/PlantSet";
			oModel.read(readUrl, {
				success: function(odata, Response) {
					var oJsonPlant = new sap.ui.model.json.JSONModel();
					oJsonPlant.setData(odata.results);
					oJsonPlant.setSizeLimit(odata.results.length);
					that.getView().setModel(oJsonPlant, "JMPlant");
					// sap.m.MessageToast.show("hi");
				},
				error: function(oResponse) {
					sap.m.MessageToast.show("Plant load error");

				}
			});
		},
		fnLoadMaterial: function() {
			var that = this;
			var readUrl = "/MaterialSet";
			oModel.read(readUrl, {

				success: function(odata, Response) {

					var oJsonMaterial = new sap.ui.model.json.JSONModel();
					oJsonMaterial.setData(odata.results);
					oJsonMaterial.setSizeLimit(odata.results.length);
					that.getView().setModel(oJsonMaterial, "JMMat");
				},
				error: function(oResponse) {
					sap.m.MessageToast.show("Material load error");
				}
			});
		},
		fnLoadProfile: function() {
			var that = this;
			var readUrl = "/OrderprofileSet";
			oModel.read(readUrl, {

				success: function(odata, Response) {

					var oJsonProfile = new sap.ui.model.json.JSONModel();
					oJsonProfile.setData(odata.results);
					oJsonProfile.setSizeLimit(odata.results.length);
					that.getView().setModel(oJsonProfile, "JMProfile");
				},
				error: function(oResponse) {
					sap.m.MessageToast.show("Profile load error");
				}
			});
		},
		fnLoadDeatailH: function() {
			var that = this;
			var readUrl = "/ReturnSet";
			// busyDialog.open();
			oModel.read(readUrl, {
				success: function(odata, Response) {

					var arr = odata.results;
					var arr1 = [];
					for (var i = 0; i < arr.length; i++) {
						var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
							pattern: "    dd.MM.yyyy"
						});
						if (arr[i].BrStarttim.ms === 0 && arr[i].BrEndtim.ms === 0) {
							arr[i].BrStarttim = "";
							arr[i].BrEndtim = "";
						}
						if (arr[i].Aufnr !== "") {
							arr1.push(arr[i]);
						}
						var rel_flag = arr[i].Releaseflag;
					}
					var oDetailJson1 = new sap.ui.model.json.JSONModel();
					oDetailJson1.setData(arr1);
					that.getView().setModel(oDetailJson1, "JMDetailRF");
					// var data = that.getView().getModel("JMDetailH").getData();

					var oDetailJson = new sap.ui.model.json.JSONModel();
					oDetailJson.setData(arr);
					that.getView().setModel(oDetailJson, "JMDetailH");
					var data = that.getView().getModel("JMDetailH").getData();
					s1_count = 0;
					s2_count = 0;
					s3_count = 0;
					for (var i = 0; i < data.length; i++) {
						if (data[i].BrConfirm === 'X' && data[i].Shift === 'SHIFT-1') {
							s1_count = s1_count + 1;
						}
						if (data[i].BrConfirm === 'X' && data[i].Shift === 'SHIFT-2') {
							s2_count = s2_count + 1;
						}
						if (data[i].BrConfirm === 'X' && data[i].Shift === 'SHIFT-3') {
							s3_count = s3_count + 1;
						}
					}

					total_order = 0;
					good_order = 0;
					// Quality calculation
					total_order = data.length;
					for (var i = 0; i < data.length; i++) {
						if (data[i].NotifNo === "") {
							good_order = good_order + 1;
						}
					}
					lv_qual = 0;

					lv_qual = good_order / total_order;

					// Performance calculation
					lv_shifthr = 8;
					lv_perform = 0;
					lv_perform = 1 * total_order;
					lv_perform = lv_perform / 480; // 480 means shift hour in minitues

					//Availability calculation
					// lv_avail = 0;
					// lv_avail = total_order;

					// lv_oee = (lv_perform * lv_qual * lv_avail) / 3;
					// lv_oee = lv_oee * 10;
					// lv_oee = Math.round(lv_oee);

					// lv_perform = lv_perform * 100;
					// lv_perform = Math.round(lv_perform);

					// lv_qual = lv_qual * 100;
					// lv_qual = Math.round(lv_qual);

					// that.getView().byId("id_gdord").setText("Good Order -" + good_order);
					// that.getView().byId("id_toord").setText("Total Order -" + total_order);
					// that.getView().byId("id_qua").setText("Quality -" + lv_qual + "%");

					// that.getView().byId("id_shifthr").setText("Shift Hour -" + lv_shifthr + "Hr");
					// that.getView().byId("id_totalord").setText("Total Order -" + total_order);
					// that.getView().byId("id_per").setText("Performance -" + lv_perform + "%");

					// that.getView().byId("id_avaiord").setText("Total Order -" + total_order);
					// that.getView().byId("id_availper").setText("Availability -" + lv_avail + "%");

					// that.getView().byId("id_oeeper").setText("Equipment -" + lv_oee + "%");

					// //Equipment damaged calculation
					var occurrences = {},
						a = 0;

					for (var i = 0, j = data.length; i < j; i++) {
						if (a !== data[i].EquipNo) {
							a = data[i].EquipNo;
						}
						occurrences[data[i].EquipNo] = (occurrences[data[i].EquipNo] || 0) + 1;
					}

					var a1 = occurrences;

					lv_mostdam = "";
					var count = 0;
					for (var [key, value] of Object.entries(a1)) {
						if (count < value && key !== "") {
							count = value;
							lv_mostdam = key;
						}
					}

					var eqarr = that.getView().getModel('JMEquip').getData();
					// lv_equipdata;
					// = that.getView().getModel('JMEquip').getData();

					for (var i = 0; i < eqarr.length; i++) {
						if (eqarr[i].Equnr === lv_mostdam) {
							lv_eqdes = eqarr[i].Eqktx;
							break;
						}
					}

					for (var i = 0; i < odata.results.length; i++) {
						if (eqarr[i].Eqktx === 'Chuck' || eqarr[i].Eqktu === 'CHUCK') {
							eq1++;
						}
						if (eqarr[i].Eqktx === 'Grinding Wheel' || eqarr[i].Eqktu === 'GRINDING WHEEL') {
							eq2++;
						}
						if (eqarr[i].Eqktx === 'Wheels' || eqarr[i].Eqktu === 'WHEELS') {
							eq3++;
						}
						if (eqarr[i].Eqktx === 'Steel' || eqarr[i].Eqktu === 'STEEL') {
							eq4++;
						}
						if (eqarr[i].Eqktx === 'Laptop' || eqarr[i].Eqktu === 'LAPTOP') {
							eq5++;
						}
					}

					VPlantorder = 0;
					VProd = 0;
					VPlantorderRls = 0;
					VProdcd = 0;
					VProdpen = 0;
					Vbreak = 0;
					for (var i = 0; i < odata.results.length; i++) {
						// if(oData.TruckReqNav.results[i].Ekotx === Vprd){
						if (data[i].Plnum !== "") {
							VPlantorder++;

						}
						if (data[i].Aufnr !== '') {
							VProd++;

						}
						if (odata.results[i].Releaseflag !== "") {

							VPlantorderRls++;
						}
						if (data[i].Confirmation !== "") {
							VProdcd++;
						}
						if (data[i].Plnum === "") {
							VProdpen++;
						}
						if (odata.results[i].BrConfirm !== "") {
							Vbreak++;
						}

					}
					var len = odata.results.length;
					var con = "(" + len + ")";
					that.getView().byId("id_potxt").setText(con);
					var con1 = "(" + VProd + ")";
					that.getView().byId("id_prdor").setText(con1);
					// that.getView().byId("id_poconfirm").setText(VProdcd);
					var con2 = "(" + VPlantorderRls + ")";
					that.getView().byId("id_porelease").setText(con2);
					// that.getView().byId("id_prgIndtxt1").setText(VPlantorderRls);
					// that.getView().byId("id_prgind1").setValue(VPlantorderRls);
					// that.getView().byId("id_prgind2").setValue(VPlantorderRls);
					// that.getView().byId("id_prgind3").setValue(VPlantorderRls);
					// that.getView().byId("id_rework").setText(Vbreak)

					var VAssPlanned = {
						"VTotalAss": [{
							"Status": "Plantorder",
							"Total": VPlantorder,
							"Val1": 20,
							"val2": 30
						}, {
							"Status": "Production orderr",
							"Total": VProd,
							"Val1": 20,
							"val2": 30
						}, {
							"Status": "PO Released",
							"Total": VPlantorderRls,
							"Val1": 10,
							"val2": 10
						}, {
							"Status": "PO Closed",
							"Total": VProdcd,
							"Val1": 20,
							"val2": 30
						}, {
							"Status": "Pending",
							"Total": VProdpen,
							"Val1": 40,
							"val2": 60
						}]
					};
					oAsstrJson = new sap.ui.model.json.JSONModel();
					oAsstrJson.setData(VAssPlanned);
					that.getView().setModel(oAsstrJson, "ADetail");
					for (var i = 0; i < odata.results.length; i++) {
						if (data[i].Plnum !== "" && data[i].Shift === 'SHIFT-1') {
							plcnt1++;
						}
						if (data[i].Aufnr !== "" && data[i].Shift === 'SHIFT-1') {
							pdncnt1++;
						}
						if (data[i].Plnum !== "" && data[i].Shift === 'SHIFT-2') {
							plcnt2++;
						}
						if (data[i].Aufnr !== "" && data[i].Shift === 'SHIFT-2') {
							pdncnt2++;
						}
						if (data[i].Plnum !== "" && data[i].Shift === 'SHIFT-3') {
							plcnt3++;
						}
						if (data[i].Aufnr !== "" && data[i].Shift === 'SHIFT-3') {
							pdncnt3++;
						}

					}

					// busyDialog.close();
				},
				error: function(oResponse) {

				}
			});
		},
		fnLoadOrdertype: function() {
			var that = this;
			var readUrl = "/OrdertypeSet";
			oModel.read(readUrl, {
				success: function(odata, Response) {
					var oDetailJson = new sap.ui.model.json.JSONModel();
					oDetailJson.setData(odata.results);
					that.getView().setModel(oDetailJson, "JMOrder");
				},
				error: function(oResponse) {

				}
			});
		},
		fnclearplan: function() {
			sap.ui.getCore().byId("id_otyp").setValue("");
			sap.ui.getCore().byId("id_pl").setValue("");
			sap.ui.getCore().byId("id_mat").setValue("");
			sap.ui.getCore().byId("id_plsd").setValue("");
			sap.ui.getCore().byId("id_plst").setValue("");
			sap.ui.getCore().byId("id_pled").setValue("");
			sap.ui.getCore().byId("id_plet").setValue("");
			sap.ui.getCore().byId("id_qty").setValue("");
		},
		fnAdd: function() {
			if (!this._oDialog1) {
				this._oDialog1 = sap.ui.xmlfragment("VShifter_New.Fragment.Create", this);
				// sap.ui.core.addDependent(this._oDialog1);
				this.getView().addDependent(this._oDialog1);
			}
			return this._oDialog1;
		},
		fnClosePlant: function(evt) {
			var that = this;
			var vValue = "";
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				vValue = oSelectedItem.getTitle();
				that.getView().byId("id_plant").setValue(oSelectedItem.getTitle());
				// that.getView().byId("id_planttext").setValue(oSelectedItem.getInfo());
			}
			evt.getSource().getBinding("items").filter([]);
			//Added 
			// if (vValue !== "") {
			// 	var userid = this.getView().byId("id_table");
			// 	var userid1 = this.getView().byId("id_table02");
			// 	var userid2 = this.getView().byId("id_table03");
			// 	var userid3 = this.getView().byId("id_TablePOclose");
			// 	var userid4 = this.getView().byId("id_table05");
			// 	userid.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, vValue));
			// 	userid1.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, vValue));
			// 	userid2.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, vValue));
			// 	userid3.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, vValue));
			// 	userid4.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, vValue));
			// }
			// userid.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, vValue));
			// //End
		},
		fnCloseMaterial: function(evt) {
			var that = this;
			var vValueMat = "";
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				vValueMat = oSelectedItem.getTitle();
				that.getView().byId("id_material").setValue(oSelectedItem.getTitle());
				// that.getView().byId("id_materialtext").setValue(oSelectedItem.getInfo());
			}

			evt.getSource().getBinding("items").filter([]);
			// if (vValueMat !== "") {
			// 	var userid = this.getView().byId("id_table");
			// 	var userid1 = this.getView().byId("id_table02");
			// 	var userid2 = this.getView().byId("id_table03");
			// 	var userid3 = this.getView().byId("id_TablePOclose");
			// 	var userid4 = this.getView().byId("id_table05");

			// 	userid.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, vValueMat));
			// 	userid1.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, vValueMat));
			// 	userid2.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, vValueMat));
			// 	userid3.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, vValueMat));
			// 	userid4.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, vValueMat));
			// }

		},
		fnCloseSales: function(evt) {
			var that = this;
			var vValue = "";
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				vValue = oSelectedItem.getTitle();
				that.getView().byId("id_sales").setValue(oSelectedItem.getTitle());
				// that.getView().byId("id_planttext").setValue(oSelectedItem.getInfo());
			}
			evt.getSource().getBinding("items").filter([]);
		},
		fnCloseProfile: function(evt) {
			var that = this;
			var oSelectedItem = evt.getParameter("selectedItem");
			// var oSelectedItem = evt.getParameters().selectedItem.getTitle();
			if (oSelectedItem) {

				sap.ui.getCore().byId("id_otyp").setValue(oSelectedItem.getTitle());

			}
			evt.getSource().getBinding("items").filter([]);
			lv_profile = oSelectedItem.getTitle();
		},
		fnClosePlantFrg: function(evt) {
			var that = this;
			var flag;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				if (flag === 'CP') {
					sap.ui.getCore().byId("id_changepl").setValue(oSelectedItem.getTitle() + "-" + oSelectedItem.getInfo());
				} else {
					sap.ui.getCore().byId("id_pl").setValue(oSelectedItem.getTitle() + "-" + oSelectedItem.getInfo());
				}

			}
			evt.getSource().getBinding("items").filter([]);
			lv_plant = oSelectedItem.getTitle();
		},
		fnCloseMatFrg: function(evt) {
			var that = this;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				sap.ui.getCore().byId("id_mat").setValue(oSelectedItem.getTitle() + "-" + oSelectedItem.getInfo());

			}
			evt.getSource().getBinding("items").filter([]);
			lv_material = oSelectedItem.getTitle();
		},
		fnPlannedF4: function(oEvent) {
			// flag = "";

			this.fnAdd().open();

		},
		fn_changepl: function(oEvent) {
			// flag = 'CP';
			var tmp_plant = "",
				fromdate, todate, qty;
			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailH').getData()[index1];

			if (data.Aufnr !== "") {
				sap.m.MessageBox.information("Order has moved to production");
			} else {

				VTrid = data.Plnum;
				fromdate = dateFormat.format(new Date(data.PlanStrtdate));
				todate = dateFormat.format(new Date(data.PlanEnddate));
				qty = data.PlanQty.trim();

				var arr = [{
					"plant": data.Plant,
					"fromDate": fromdate,
					"toDate": todate,
					"qty": qty
				}];
				this.setMod(arr);
				this.fnchaplfrag().open();

			}

		},
		fnchaplfrag: function() {
			if (!this.oChangepl) {
				this.oChangepl = sap.ui.xmlfragment("VShifter_New.Fragment.Edit", this);
				this.getView().addDependent(this.oChangepl);
			}
			return this.oChangepl;
		},
		fnsaveplanchange: function() {
			lv_entity = "CP"; //change planned order

			lv_chplnpl = sap.ui.getCore().byId("id_changepl").getValue();
			//lv_chplnsdate = sap.ui.getCore().byId("id_changepl_sdate").getDateValue();
			//lv_chplnedate = sap.ui.getCore().byId("id_changepl_edate").getDateValue();
			lv_chplnsdate = sap.ui.getCore().byId("id_changepl_sdate").getValue();
			lv_chplnedate = sap.ui.getCore().byId("id_changepl_edate").getValue();
			lv_chplnqty = sap.ui.getCore().byId("id_changepl_qty").getValue();
			lv_chplnedate = lv_chplnedate + "T00:00:00";
			lv_chplnsdate = lv_chplnsdate + "T00:00:00";

			if (lv_chplnpl !== "" && lv_chplnqty !== "" && lv_chplnqty !== "") {
				if (lv_chplnsdate === "") {
					// lv_chplnsdate = "";
				}
				if (lv_chplnedate === "") {
					// lv_chplnedate = "";
				}
				if (lv_chplnpl !== "") {
					// var a = lv_chplnpl.split('-');
					// lv_chplnpl = a[0];
				}
				this.fncreatePo();
			} else {
				sap.m.MessageBox.error("Please fill any of the field")
			}
			this.fnclearplchange();
		},
		fnclearplchange: function() {
			sap.ui.getCore().byId("id_changepl_qty").setValue("");
			sap.ui.getCore().byId("id_changepl_sdate").setValue("");
			sap.ui.getCore().byId("id_changepl_edate").setValue("");

		},
		fnCloseplanchange: function() {
			// this.fnclearplchange();
			this.fnchaplfrag().close();
			this.oChangepl.destroy();
			this.oChangepl = null;

		},
		setMod: function(arr) {
			this.getView().getModel("tempModel").setData(arr);
		},
		fnconvert: function(oEvent) {

			// var oRow = oEvent.mParameters.rowIndex;
			// "Commented BY mAni"
			// var vTempId = oEvent.oSource.oParent.oParent.sId.split("-");
			// var vNumber = vTempId[vTempId.length - 1].match(/\d+/g);
			// var oRow = parseInt(vNumber, 10);
			// "End of Commented"

			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailRF.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailRF').getData()[index1];
			// var oRow = oEvent.mParameters.rowIndex;
			var oTable = this.getView().byId("id_TablePOclose");

			var oRow = index1;

			var oTable = this.getView().byId("id_table");
			VTrid = data.Plnum;
			// oTable.getContextByIndex(oRow).getObject("Plnum");
			VTrid1 = data.Aufnr;
			// oTable.getContextByIndex(oRow).getObject("Aufnr");
			Vrelease = data.Releaseflag;
			// oTable.getContextByIndex(oRow).getObject("Releaseflag");

			// Commented bymani
			if (VTrid1 === '') {
				// if (!this.TruckHelpDialog) {
				// 	this.TruckHelpDialog = sap.ui.xmlfragment(
				// 		"Zshifthandover.fragment.Prodorder",
				// 		this
				// 	);
				// 	this.getView().addDependent(this.TruckHelpDialog);
				// }
				// sap.ui.getCore().byId("id_planned").setValue(VTrid);

				// this.TruckHelpDialog.open();
				sap.m.MessageBox.information("Production Order Does Not Exit");
			} else if (VTrid1 !== '' && Vrelease !== "") {
				// if (!this.TimeHelpDialog) {
				// 	this.TimeHelpDialog = sap.ui.xmlfragment("Zshifthandover.fragment.Timeproposal", this);
				// 	this.getView().addDependent(this.TimeHelpDialog);
				// }
				// this.TimeHelpDialog.open();
				sap.m.MessageBox.information("Order Released Already");
			} else if (VTrid1 !== '' && Vrelease === "") {
				var that = this;
				sap.m.MessageBox.confirm("Are you sure you want to Release the palnned order " + VTrid1 + "?", {
					title: "Confirmation",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							lv_entity = '';
							lv_entity = 'RF';
							that.fncreatePo();
						} else {
							sap.m.MessageToast.show("Action Canceled by User");
						}
					}
				});

			} else if (VTrid1 === '' && Vrelease === "") {
				sap.m.MessageBox.error("Production order is not Created , Please create", {
					Action: ['ok'],
					onClose: function(sAction) {}
				});
			}

			// "Commented By Mani"
			// this.onpress();
		},
		fnPOclosedDia: function(oEvent) {

			// var index = oEvent.oSource._image.oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			// var index1 = parseInt(index[1]) + 1;
			// var data = this.getView().getModel('JMDetailH').getData()[index1];
			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailRF.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailRF').getData()[index1];
			// var oRow = oEvent.mParameters.rowIndex;
			var oTable = this.getView().byId("id_TablePOclose");

			var oRow = index1;
			var po_flag;
			po_flag = data.Confirmation;
			// oTable.getContextByIndex(oRow).getObject("Confirmation");
			VTrid = data.Plnum;
			// oTable.getContextByIndex(oRow).getObject("Plnum");
			VTrid1 = data.Aufnr;
			// oTable.getContextByIndex(oRow).getObject("Aufnr");
			// VYield = oTable.getContextByIndex(oRow).getObject("PlanQty");
			lv_material = data.Matnr;
			// oTable.getContextByIndex(oRow).getObject("Matnr");
			lv_plant = data.Plant;
			// oTable.getContextByIndex(oRow).getObject("Plant");
			lv_workctr = data.WorkCenter;
			// oTable.getContextByIndex(oRow).getObject("WorkCenter");
			lv_totalproqty = data.PlanQty;
			// oTable.getContextByIndex(oRow).getObject("PlanQty");
			lv_totalproqty = lv_totalproqty.trim();
			// var confirmcount = "";
			// confirmcount = this.getView().byId("idfragyield").getValue();

			var date = data.PlanStrtdate;
			// oTable.getContextByIndex(oRow).getObject("PlanStrtdate");

			var dateFormat01 = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "dd.MM.yyyy"
			});
			date = dateFormat01.format(new Date(date));
			scrap1 = data.scarp;
			confirmok = data.PlanQty;
			confirmok = confirmok.trim();
			yield1 = data.Yield;
			yield1 = yield1 + '.000';
			// oTable.getContextByIndex(oRow).getObject("PlanQty");
			lv_order = data.Auart;
			// oTable.getContextByIndex(oRow).getObject('Auart');
			lv_shift = this.getView().byId("id_shiftNo").getText();
			var that = this;
			// var a = that.start(clock);
			var tmm = lv_date.getMinutes();

			var tss = lv_date.getSeconds();
			var thh = lv_date.getHours();
			if (tmm < 10) {
				tmm = '0' + tmm;
			}
			if (tss < 10) {
				tss = '0' + tss;
			}
			var final_time = thh + ":" + tmm + ":" + tss;

			temp_arr = [{
				"material": lv_material,
				"prodno": VTrid1,
				// "sdate1": a,
				"sdate": date,
				"edate": date,
				"yield": yield1,
				"scarp": scrap1,
				"final_time": final_time,
				"shift": lv_shift,
				"workctr": lv_workctr,
				"totalqty": lv_totalproqty
			}];

			this.setMod(temp_arr);
			if (po_flag !== 'N' && po_flag !== 'Confirmation') {
				this.PoConfirm().open();
			} else if (po_flag === 'N') {
				if (confirmok !== yield1) {
					this.PoConfirm().open();
				} else {
					sap.m.MessageBox.information("Already order has confirmed");
				}
			}

		},
		fncreatePoClose: function(oEvent) {
			var p1 = oEvent.oSource.oParent
			var p2 = p1.oParent
				// var c =  p2.mAggregations.content[2].mAggregations.items[0].mAggregations.items[5].mAggregations.items[1]
			var lv_shift = p2.mAggregations.items[1].mAggregations.items[0].mAggregations.items[0].mAggregations.items[0].mAggregations.content[
					2].mProperties.value
				// c.getValue();
				// var q1 = oEvent.oSource.oParent.oParent.mAggregations.content[2].mAggregations.items[0].mAggregations.items[3].mAggregations.items[1];
			var lv_stime = p2.mAggregations.items[1].mAggregations.items[0].mAggregations.items[0].mAggregations.items[3].mAggregations.content[
					2].mProperties.value
				// q1.getValue();
				// var q2 = oEvent.oSource.oParent.oParent.mAggregations.content[2].mAggregations.items[1].mAggregations.items[3].mAggregations.items[1];
			var lv_etime = p2.mAggregations.items[1].mAggregations.items[0].mAggregations.items[0].mAggregations.items[5].mAggregations.content[
					2].mProperties.value
				// q2.getValue();
			lv_entity = 'POCN';
			yield1 = sap.ui.getCore().byId("idfragyield").getValue();
			VScarp = sap.ui.getCore().byId("id_fragscarp").getValue();
			lv_posdate = sap.ui.getCore().byId("id_fragstartdate").getValue();
			lv_poedate = sap.ui.getCore().byId("id_poedate").getValue();
			lv_postime = sap.ui.getCore().byId("id_fragstart1date").getValue();
			lv_poetime = sap.ui.getCore().byId("id_poetime").getValue();
			lv_rw = sap.ui.getCore().byId("id_porw").getValue();
			lv_reasonForscr = sap.ui.getCore().byId("id_reasonForscr").getValue();
			lv_ctyp = sap.ui.getCore().byId("id_ctyp").getValue();
			// lv_capct = sap.ui.getCore().byId("id_capcat").getValue();
			// lv_operation = sap.ui.getCore().byId("id_matfrg").setText("1010");
			lv_operation = "1010";
			lv_shift = sap.ui.getCore().byId("select").getValue();
			if (lv_operation !== "" && lv_poedate !== "" && lv_poetime !== "" && lv_ctyp !== "" && yield1 !== "" && VScarp !== "" &&
				lv_reasonForscr !== "" && lv_rw !== "") {
				this.fncreatePo();
			} else {
				sap.m.MessageBox.error("Please enter all the details");
			}

		},
		fncloseBtn: function() {
			this.fnclearpo();
			this.PoConfirm().close();
			this._poHelpRequest.destroy();
			this._poHelpRequest = null;
		},
		fnclearpo: function() {
			sap.ui.getCore().byId("idfragyield").setValue("");
			sap.ui.getCore().byId("id_poedate").setValue("");
			sap.ui.getCore().byId("id_poetime").setValue("");
			sap.ui.getCore().byId("id_fragscarp").setValue("");
			// sap.ui.getCore().byId("id_matfrg").setValue("");
			// sap.ui.getCore().byId("id_capcat").setValue("");
			sap.ui.getCore().byId("id_ctyp").setValue("");
			sap.ui.getCore().byId("id_reasonForscr").setValue("");
			sap.ui.getCore().byId("id_porw").setValue("");
		},
		PoConfirm: function() {
			if (!this._poHelpRequest) {
				this._poHelpRequest = sap.ui.xmlfragment("VShifter_New.Fragment.Confirm", this);
				this.getView().addDependent(this._poHelpRequest);
			}
			return this._poHelpRequest;
			// _oDialog = null; 
		},
		fnSetShiftdet: function(name, id, shift) {
			var lname = this.getView().byId("id_lname");
			// var sname = this.getView().byId("id_supName");
			// var shiftNo = this.getView().byId("id_shiftNo");
			// var supid = this.getView().byId("id_supId");
			var lid = this.getView().byId("id_lid");
			lname.setText(name);
			// sname.setText(name);
			// shiftNo.setText(shift);
			// supid.setText(id);
			lid.setText(id);
		},
		fnClosepo: function(oEvent) {
			lv_entity = "CL"; //close order
			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailRF.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailRF').getData()[index1];
			if (data.Aufnr !== "") {
				VTrid1 = data.Aufnr;
				this.fncreatePo();
			} else {
				sap.m.MessageBox.error("Order does not exit");
			}
			// this.fnLoadDeatailH();
		},
		fnSearchPlant: function(oEvt) {
			var sValue = oEvt.getParameter("value");

			var oFilter = new Filter(
				"Werks",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvt.getSource().getBinding("items").filter([oFilter]);

		},

		fnSearchMaterial: function(oEvt) {
			var sValue = oEvt.getParameter("value");

			var oFilter = new Filter(
				"Matnr",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvt.getSource().getBinding("items").filter([oFilter]);

		},
		fnSearchSales: function(oEvt) {
			var sValue = oEvt.getParameter("value");

			var oFilter = new Filter(
				"VKORG",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvt.getSource().getBinding("items").filter([oFilter]);

		},
		fnOrdertypef4: function() {
			if (!this.fraorder) {
				this.fraorder = sap.ui.xmlfragment("VShifter_New.Fragment.Plant", this);
				this.getView().addDependent(this.fraorder);
			}
			this.fraorder.open();
		},
		fnpdfOpen: function() {
			if (!this._pdfGetopen) {
				this._pdfGetopen = sap.ui.xmlfragment("VShifter_New.Fragment.Pdf", this);
				this.getView().addDependent(this._pdfGetopen);
			}
			return this._pdfGetopen;
		},
		fnGetPDF: function(vQID) {
			// if (!this.fnpdf) {
			// 	this.fnpdf = sap.ui.xmlfragment("Zshifthandover.fragment.Pdf", this);
			// 	this.getView().addDependent(this.fnpdf);
			// }
			// this.fnpdf.open();
			// shift_rotation = this.getView().byId("id_shiftNo").getText();
			shift_rotation = "SHIFT-1"
				// shiftdate = this.getView().byId("id_date").getText();
			lv_date = new Date();
			var dateval = this.getView().byId("id_yest").getValue();
			if (dateval <= lv_date) {
				var MM = dateval.getMonth() + 1;
				if (MM <= 9) {
					MM = '0' + MM;
				}
				var DD = dateval.getDate();
				var YY = dateval.getFullYear();
				var date1 = YY + "-" + MM + "-" + DD;
				// var date1 = DD + MM + YY;
				date1 = date1 + "T00:00:00";
			} else {
				lv_date = new Date();
				var mm = lv_date.getMonth() + 1;
				var dd = lv_date.getDate();
				var yy = lv_date.getFullYear();
				// var date1 = dd  + mm  + yy;
				var date1 = yy + "-" + mm + "-" + dd;
				date1 = date1 + "T00:00:00";
			}
			this.fnpdfOpen().open();
			lv_entity = "GP";
			var that = this;
			var readUrl = "/PlantorderSet";
			var Ventitypo = {};
			var Vplannedorder = {};
			// Vplannedorder = {

			// 	"Shift": shift_rotation,
			// 	"PlanStrtdate": date1

			// };
			Ventitypo.Version = "GP";
			Ventitypo.OrderStartDate = date1;
			if (lv_entity === 'GP') { //change planned order
				if (date1 !== "") {
					Ventitypo.OrderStartDate = date1;
				}
				Vplannedorder = {
					"Shift": shift_rotation,
					"PoSdate": date1
						// "PoEdate": lv_chplnedate

				};
			}
			var Varrpo = [];
			var temp_shift = [];
			Varrpo.push(Vplannedorder);
			Ventitypo.Navpp = Varrpo;
			Ventitypo.Navshift = [];
			Ventitypo.Navsh = [];
			Ventitypo.Shift = [];
			busyDialog.open();

			oModel.create(readUrl, Ventitypo, {
				success: function(oData, Response) {
					lv_xstring = oData.Navsh.results[0].Xstring;

					var oScrl = sap.ui.getCore().byId("id_Image");

					var oHtml = new sap.ui.core.HTML({});
					oScrl.destroyContent();
					oScrl.addContent(oHtml);
					var oContent = "<div><iframe src=data:application/pdf;base64," + lv_xstring + " width='800px' height='700px'></iframe></div>";
					oHtml.setContent(oContent);
					busyDialog.close();

				},
				error: function(oResponse) {
					// oBusyDialog.close();
					busyDialog.close();
					Ventitypo = {};
					Vplannedorder = {};
					Varrpo = [];
				}

			});

			// var Url = "/sap/opu/odata/sap/ZSHIFT_HO_SRV/GetPdfSet(Plant='')/$value";
			// var oScrl = sap.ui.getCore().byId("id_Image");
			// Url = "/sap/opu/odata/sap/ZSHIFT_HO_SRV/GetPdfSet(Plant='')/$value";
			// var oHtml = new sap.ui.core.HTML({});
			// oScrl.addContent(oHtml);
			// var oContent = "<div><iframe src=" + Url + " width='800px' height='700px'></iframe></div>";
			// oHtml.setContent(oContent);

		},
		fnGetPDF1: function(vQID) {
			shift_rotation = "SHIFT-2"
			lv_date = new Date();
			var dateval = this.getView().byId("id_yest").getValue();
			if (dateval <= lv_date) {
				var MM = dateval.getMonth() + 1;
				if (MM <= 9) {
					MM = '0' + MM;
				}
				var DD = dateval.getDate();
				var YY = dateval.getFullYear();
				var date1 = YY + "-" + MM + "-" + DD;
				// var date1 = DD + MM + YY;
				date1 = date1 + "T00:00:00";
			} else {
				lv_date = new Date();
				var mm = lv_date.getMonth() + 1;
				var dd = lv_date.getDate();
				var yy = lv_date.getFullYear();
				// var date1 = dd  + mm  + yy;
				var date1 = yy + "-" + mm + "-" + dd;
				date1 = date1 + "T00:00:00";
			}
			this.fnpdfOpen().open();
			lv_entity = "GP";
			var that = this;
			var readUrl = "/PlantorderSet";
			var Ventitypo = {};
			var Vplannedorder = {};
			// Vplannedorder = {

			// 	"Shift": shift_rotation,
			// 	"PlanStrtdate": date1

			// };
			Ventitypo.Version = "GP";
			Ventitypo.OrderStartDate = date1;
			if (lv_entity === 'GP') { //change planned order
				if (date1 !== "") {
					Ventitypo.OrderStartDate = date1;
				}
				Vplannedorder = {
					"Shift": shift_rotation,
					"PoSdate": date1
						// "PoEdate": lv_chplnedate

				};
			}
			var Varrpo = [];
			var temp_shift = [];
			Varrpo.push(Vplannedorder);
			Ventitypo.Navpp = Varrpo;
			Ventitypo.Navshift = [];
			Ventitypo.Navsh = [];
			Ventitypo.Shift = [];
			busyDialog.open();

			oModel.create(readUrl, Ventitypo, {
				success: function(oData, Response) {
					lv_xstring = oData.Navsh.results[0].Xstring;

					var oScrl = sap.ui.getCore().byId("id_Image");

					var oHtml = new sap.ui.core.HTML({});
					oScrl.destroyContent();
					oScrl.addContent(oHtml);
					var oContent = "<div><iframe src=data:application/pdf;base64," + lv_xstring + " width='800px' height='700px'></iframe></div>";
					oHtml.setContent(oContent);
					busyDialog.close();

				},
				error: function(oResponse) {
					// oBusyDialog.close();
					busyDialog.close();
					Ventitypo = {};
					Vplannedorder = {};
					Varrpo = [];
				}

			});
		},
		fnGetPDF2: function(vQID) {
			shift_rotation = "SHIFT-3"
			lv_date = new Date();
			var dateval = this.getView().byId("id_yest").getValue();
			if (dateval <= lv_date) {
				var MM = dateval.getMonth() + 1;
				if (MM <= 9) {
					MM = '0' + MM;
				}
				var DD = dateval.getDate();
				var YY = dateval.getFullYear();
				var date1 = YY + "-" + MM + "-" + DD;
				// var date1 = DD + MM + YY;
				date1 = date1 + "T00:00:00";
			} else {
				lv_date = new Date();
				var mm = lv_date.getMonth() + 1;
				var dd = lv_date.getDate();
				var yy = lv_date.getFullYear();
				// var date1 = dd  + mm  + yy;
				var date1 = yy + "-" + mm + "-" + dd;
				date1 = date1 + "T00:00:00";
			}
			this.fnpdfOpen().open();
			lv_entity = "GP";
			var that = this;
			var readUrl = "/PlantorderSet";
			var Ventitypo = {};
			var Vplannedorder = {};
			// Vplannedorder = {

			// 	"Shift": shift_rotation,
			// 	"PlanStrtdate": date1

			// };
			Ventitypo.Version = "GP";
			Ventitypo.OrderStartDate = date1;
			if (lv_entity === 'GP') { //change planned order
				if (date1 !== "") {
					Ventitypo.OrderStartDate = date1;
				}
				Vplannedorder = {
					"Shift": shift_rotation,
					"PoSdate": date1
						// "PoEdate": lv_chplnedate

				};
			}
			var Varrpo = [];
			var temp_shift = [];
			Varrpo.push(Vplannedorder);
			Ventitypo.Navpp = Varrpo;
			Ventitypo.Navshift = [];
			Ventitypo.Navsh = [];
			Ventitypo.Shift = [];
			busyDialog.open();

			oModel.create(readUrl, Ventitypo, {
				success: function(oData, Response) {
					lv_xstring = oData.Navsh.results[0].Xstring;

					var oScrl = sap.ui.getCore().byId("id_Image");

					var oHtml = new sap.ui.core.HTML({});
					oScrl.destroyContent();
					oScrl.addContent(oHtml);
					var oContent = "<div><iframe src=data:application/pdf;base64," + lv_xstring + " width='800px' height='700px'></iframe></div>";
					oHtml.setContent(oContent);
					busyDialog.close();

				},
				error: function(oResponse) {
					// oBusyDialog.close();
					busyDialog.close();
					Ventitypo = {};
					Vplannedorder = {};
					Varrpo = [];
				}

			});
		},
		fn_closepdf: function() {
			this.fnpdfOpen().close();
			this._pdfGetopen.destroy();
			this._pdfGetopen = null;
		},
		fngraph: function() {
			var that = this;
			// var oVizchart = that.getView().byId("idVizChart");
			// var oVizchart1 = that.getView().byId("idVizChart1");
			// oVizchart.setVizProperties({
			// 	title: {
			// 		// text: 'Total Shift Details',
			// 		// that.getView().getModel('i18n').getProperty('TLC')
			// 		visible: false
			// 	},
			// 	plotArea: {

			// 		dataPointSize: {
			// 			min: 30,
			// 			max: 30
			// 		},
			// 		innerRadiusRatio: 0.6,
			// 		radius: 0.37,

			// 		dataLabel: {

			// 			visible: true,
			// 			type: "value",
			// 			hideWhenOverlap: true

			// 		},

			// 		// colorPalette: ['#0ab1f2', '#fa905b', '#f97432'],
			// 		colorPalette: ['#F4BEBF', '#7F8AFD', '#8F93BC', '#F9D3AE', '#B9BCEA'],

			// 		drawingEffect: "glossy"
			// 	},

			// 	valueAxis: {
			// 		label: {
			// 			visible: true
			// 		},
			// 		title: {
			// 			visible: true
			// 		}
			// 	},
			// 	categoryAxis: {
			// 		label: {
			// 			visible: true
			// 		},
			// 		title: {
			// 			visible: true
			// 		}
			// 	},

			// 	legend: {
			// 		right: '5px',
			// 		label: {
			// 			style: {
			// 				color: "#2C3F5E",
			// 				fontFamily: "Segoe UI Semibold",
			// 				fontSize: "10px"
			// 			}
			// 		}
			// 	},
			// 	legendGroup: {
			// 		layout: {
			// 			// 	position: "bottom"
			// 			width: "40%",
			// 			height: "10%",
			// 			alignment: 'center'
			// 		},
			// 		type: "BubbleColorLegend"
			// 	},
			// 	tooltip: {
			// 		visible: true
			// 	}
			// });

			// oVizchart1.setVizProperties({
			// 	title: {
			// 		// text: 'Total Shift Details',
			// 		// that.getView().getModel('i18n').getProperty('TLC')
			// 		visible: false
			// 	},
			// 	plotArea: {

			// 		dataPointSize: {
			// 			min: 30,
			// 			max: 30
			// 		},
			// 		innerRadiusRatio: 0.6,
			// 		radius: 0.37,

			// 		dataLabel: {

			// 			visible: false,
			// 			type: "value",
			// 			hideWhenOverlap: true

			// 		},

			// 		// colorPalette: ['#0ab1f2', '#fa905b', '#f97432'],
			// 		colorPalette: ['#F4BEBF', '#7F8AFD', '#8F93BC', '#F9D3AE', '#B9BCEA'],

			// 		drawingEffect: "glossy"
			// 	},

			// 	valueAxis: {
			// 		label: {
			// 			visible: true
			// 		},
			// 		title: {
			// 			visible: true
			// 		}
			// 	},
			// 	categoryAxis: {
			// 		label: {
			// 			visible: true
			// 		},
			// 		title: {
			// 			visible: true
			// 		}
			// 	},

			// 	legend: {
			// 		right: '5px',
			// 		label: {
			// 			style: {
			// 				color: "#2C3F5E",
			// 				fontFamily: "Segoe UI Semibold",
			// 				fontSize: "10px"
			// 			}
			// 		}
			// 	},
			// 	legendGroup: {
			// 		layout: {
			// 			// 	position: "bottom"
			// 			width: "40%",
			// 			height: "10%",
			// 			alignment: 'center'
			// 		},
			// 		type: "BubbleColorLegend"
			// 	},
			// 	tooltip: {
			// 		visible: true
			// 	}
			// });
		},
		fnordertypeF4: function(oEvent) {
			var vTempId = oEvent.oSource.oParent.sId.split("-");
			var vNumber = vTempId[vTempId.length - 1].match(/\d+/g);
			index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			vId = parseInt(vNumber, 10);
			// 	var oTable = this.getView().byId("id_ordertype");
			// var oRow = oTable.getSelectedIndex() + 1;
			this.inputId = oEvent.getSource().getId();
			if (!this.OrdervalueHelpDialog2) {
				this.OrdervalueHelpDialog2 = sap.ui.xmlfragment(
					"VShifter_New.Fragment.Ordertype",
					this
				);
				this.getView().addDependent(this.OrdervalueHelpDialog2);
			}
			this.OrdervalueHelpDialog2.open();
		},
		fnSearchOrdertype: function(oEvt) {
			var sValue = oEvt.getParameter("value");
			var oFilter = new Filter(
				"Auart",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvt.getSource().getBinding("items").filter([oFilter]);
		},
		fnCloseOrdertype: function(evt) {
			var that = this;
			var oRow = evt.mParameters.selectedItems[0].oBindingContexts.JMOrder.sPath;
			var oTableOrT = this.getView().byId("id_table02");
			var oSelectedItem = evt.getParameter("selectedItem");
			// evt.mParameters.selectedItem.mProperties.title;
			if (oSelectedItem) {
				// var title = oSelectedItem.getTitle();
				title = oSelectedItem.getTitle();

				// sap.ui.getCore().byId("id_ordertype").setValue(title);
				// that.getView().byId("id_ordertype").setValue(title);
				this.getView().byId("id_table02").getColumns()[6]._aTemplateClones[vId].setValue(title);
			}
			evt.getSource().getBinding("items").filter([]);
			lv_ordertype = oSelectedItem.getTitle();

		},
		fnpressAddPrOr: function(oEvent) {
			lv_entity = 'PP';
			var index0 = "",
				index1 = "",
				data = "",
				oTable = "",
				oRow = "";

			index0 = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			index1 = parseInt(index0.slice(1));
			data = this.getView().getModel('JMDetailH').getData()[index1];
			// var oRow = oEvent.mParameters.rowIndex;
			oTable = this.getView().byId("id_TablePOclose");
			oRow = index1;

			VTrid = data.Plnum;
			// oTable.getContextByIndex(oRow).getObject("Plnum");
			VTrid1 = data.Aufnr;
			// oTable.getContextByIndex(oRow).getObject("Aufnr");

			if (VTrid1 !== "") {
				this.getView().byId("id_table02").getColumns()[6]._aTemplateClones[vId].setValue("");
				sap.m.MessageBox.information("Order has created already");
			} else {
				if (title !== "" && index !== index0) {
					sap.m.MessageBox.error("Please Enter Order Type in the selected line item");
				} else if (title !== "" && index === index0) {
					title = "";
					this.fncreatePo();
					this.getView().byId("id_table02").getColumns()[6]._aTemplateClones[vId].setValue(title);
				} else {
					sap.m.MessageBox.error("Please Enter Order Type");
				}
			}

			// this.onpress();
			// this.fncreatePo();

		},

		fnpresschangepo: function(oEvent) {
			var tmp_order = "",
				fromDate, toDate;
			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailH').getData()[index1];
			fromDate = dateFormat.format(new Date(data.PlanStrtdate));
			toDate = dateFormat.format(new Date(data.PlanEnddate));
			if (data.Aufnr !== "") {
				this.fnchpofrag().open();
				tmp_order = data.Aufnr;
				var arr = [{
					"order": tmp_order,
					"fromDate": fromDate,
					"toDate": toDate
				}];
				this.setMod(arr);
			} else {
				sap.m.MessageBox.error("Production order was not created");
			}
		},
		fnchpofrag: function() {
			if (!this.oChangePO) {
				this.oChangePO = sap.ui.xmlfragment("VShifter_New.Fragment.changeOrder", this);
				// sap.ui.core.addDependent(this._oDialog1);
				this.getView().addDependent(this.oChangePO);
			}
			return this.oChangePO;
		},
		fnsaveorderchange: function() {
			lv_entity = "CO";
			lv_orderno = sap.ui.getCore().byId("id_chorderno").getValue();
			// lv_chordsdate = sap.ui.getCore().byId("id_changeordersdate").getDateValue();
			// lv_chordedate = sap.ui.getCore().byId("id_changeorderedate").getDateValue();
			lv_chordsdate = sap.ui.getCore().byId("id_changeordersdate").getValue();
			lv_chordedate = sap.ui.getCore().byId("id_changeorderedate").getValue();
			lv_chordsdate = lv_chordsdate + "T00:00:00";
			lv_chordedate = lv_chordedate + "T00:00:00";
			if (lv_orderno !== "" && lv_chordsdate !== "" && lv_chordedate !== "") {
				this.fncreatePo();
			} else {
				sap.m.MessageBox.error("Please enter all the details");
			}
		},
		fncloseOrderchange: function() {
			this.fnclearorderchange();
			this.fnchpofrag().close();
		},
		fnclearorderchange: function() {
			sap.ui.getCore().byId("id_changeordersdate").setValue("");
			sap.ui.getCore().byId("id_changeorderedate").setValue("");
			// sap.ui.getCore().byId("id_changepl_qty").setValue("");
		},
		fnBreakAddPress: function(oEvent) {
			var vTempId = oEvent.oSource.oParent.sId.split("-");
			var vNumber = vTempId[vTempId.length - 1].match(/\d+/g);
			var vId = parseInt(vNumber, 10);
			var oTable = this.getView().byId("id_table07");
			var oRow = oTable.getSelectedIndex() + 1;
			var oRow = parseInt(vNumber, 10);

			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailH').getData()[index1];
			var oRow = index1;

			var oTable = this.getView().byId("id_table07");

			VTrid = data.Plnum;
			// oTable.getContextByIndex(oRow).getObject("Plnum");
			VTrid1 = data.Aufnr;
			// oTable.getContextByIndex(oRow).getObject("Aufnr");

			var lv_no = "";
			lv_no = data.NotifNo;
			var lv_pocheck = "";
			lv_pocheck = data.Aufnr;
			// oTable.getContextByIndex(oRow).getObject("NotifNo");
			if (lv_no === "" && lv_pocheck !== "") {
				this.fnOpenBDfrag().open();
			}
			if (lv_no !== "" && lv_pocheck !== "") {
				sap.m.MessageBox.information("Already notification created");

			}
			if (lv_no === "" && lv_pocheck === "") {
				sap.m.MessageBox.information("Production order not created");
			}

		},
		fnOpenBDfrag: function() {
			// oView = this.getView();

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("VShifter_New.Fragment.Breakdown", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;

		},
		fnEquipF4: function() {
			this.fnEquip().open();
		},
		fnEquip: function() {
			if (!this.oEquipopen) {
				this.oEquipopen = sap.ui.xmlfragment("VShifter_New.Fragment.equip", this);
				// sap.ui.core.addDependent(this._oDialog1);
				this.getView().addDependent(this.oEquipopen);
			}
			return this.oEquipopen;
		},
		handleMessagePopoverPress: function(oEvent) {
			var temp_arr = "";
			var oRow = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMEquip.sPath;
			oRow = parseInt(oRow.replace('/', ''));
			var data = this.getView().getModel("JMEquip").getData();
			var dia = this.byId("id_diaEquip");
			dia.setVisible(true);
			temp_arr = [{
				"equipno": data[oRow].Equnr,
				"equipdes": data[oRow].Eqktx,
				"creton": data[oRow].Erdat,
				"cretby": data[oRow].Ernam,
				"equiptyp": data[oRow].Eqtyp,
				"equipmno": data[oRow].Typbz,
				"manufacno": data[oRow].Serge
			}];
			this.setMod(temp_arr);
			dia.open();
		},
		fncloseDiaEquip: function() {
			var dia = this.byId("id_diaEquip");
			dia.setVisible(false);
			dia.close();
		},
		fnBreakSave: function(oEvent) {
			//     var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			// var index1 = parseInt(index.slice(1));
			// var data = this.getView().getModel('JMDetailH').getData()[index1];

			var that = this;
			var lv_tmp_str;
			lv_entity = "BD";

			lv_notitype = sap.ui.getCore().byId("id_nttyp").getValue();
			lv_funloc = '1';
			// lv_plnum = sap.ui.getCore().byId("");
			lv_equip = sap.ui.getCore().byId("id_equipf4").getValue();
			lv_tmp_str = lv_equip.split('-');
			lv_equip = lv_tmp_str[0];
			lv_sdate = sap.ui.getCore().byId("id_sdate").getValue();
			lv_edate = sap.ui.getCore().byId("id_edate").getValue();
			lv_stime1 = sap.ui.getCore().byId("id_stime").getValue();
			lv_etime1 = sap.ui.getCore().byId("id_etime").getValue();
			lv_addby = sap.ui.getCore().byId("id_addby").getValue();
			lv_brreason = sap.ui.getCore().byId("id_brreason").getValue();

			if (lv_equip === "" || lv_funloc === "" || lv_notitype === "" || lv_sdate === "" || lv_edate === "" || lv_stime1 === "" ||
				lv_etime1 === "" || lv_addby === "") {
				sap.m.MessageBox.error("Please enter all the fields");
			} else {
				if (lv_breakConfirm === 'X') {
					sap.m.MessageToast.show("Already breakdown status added");
					this.fnBreakClose();
				} else {
					sap.m.MessageBox.confirm("Are you sure you want to raise breakdown?", {
						title: "Confirmation",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function(oAction) {
							if (oAction === sap.m.MessageBox.Action.YES) {

								that.fncreatePo();
							} else {
								sap.m.MessageToast.show("Action Canceled by User");
							}
						}
					});
				}

			}
			// this.fncreatePo();
			this.fnclearbreak();
		},
		fnclearbreak: function() {
			// var that = this;
			sap.ui.getCore().byId("id_nttyp").setValue("");
			sap.ui.getCore().byId("id_equipf4").setValue("");
			sap.ui.getCore().byId("id_sdate").setValue("");
			sap.ui.getCore().byId("id_edate").setValue("");
			sap.ui.getCore().byId("id_stime").setValue("");
			sap.ui.getCore().byId("id_etime").setValue("");
			sap.ui.getCore().byId("id_addby").setValue("");
			sap.ui.getCore().byId("id_brreason").setValue("");
		},
		fnBreakClose: function() {
			this.fnOpenBDfrag().close();
			this._oDialog.destroy();
			this._oDialog = null;
			this.fnclearbreak();
		},
		fnUpload: function(oEvent) {

			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailH').getData()[index1];
			// var oRow = oEvent.mParameters.rowIndex;

			var oRow = index1;

			var oTable = this.getView().byId("id_table07");
			// VTrid = oTable.getContextByIndex(oRow).getObject("Plnum");
			VTrid1 = oTable.getContextByIndex(oRow).getObject("Aufnr");

			this.getView().byId("id_planned3").setVisible(false);
			this.getView().byId("id_breakdown").setVisible(false);
			this.getView().byId("id_imgAnnPanel").setVisible(true);

			// }

		},
		fnImagePress: function(oEvent) {
			var index = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMDetailH.sPath;
			var index1 = parseInt(index.slice(1));
			var data = this.getView().getModel('JMDetailH').getData()[index1];
			if (data.Filecontent !== "") {
				this.fnImgOpen().open();

				var oHtml = new sap.ui.core.HTML({});
				var oScrl = sap.ui.getCore().byId("id_Image1");
				oScrl.destroyContent();
				var pdfDia = sap.ui.getCore().byId("id_imgFragtxt");
				pdfDia.setText("Breakdown Image")
				oScrl.addContent(oHtml);
				var oContent = "<div><iframe src=" + data.Filecontent + " width='800' height='700'></iframe></div>";
				oHtml.setContent(oContent);
			} else {
				sap.m.MessageBox.error("Image does not exit")
			}

		},
		fnsearchEquip: function(oEvt) {

			var sValue = oEvt.getParameter("value");

			var oFilter = new Filter(
				"Equnr",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvt.getSource().getBinding("items").filter([oFilter]);

		},
		fnCloseEquip: function(evt) {

			var that = this;
			var des;
			tmp_flag_equip = 'X';
			var oRow = evt.mParameters.selectedContexts[0].sPath;

			oRow = parseInt(oRow.replace('/', ''));
			var oSel = evt.getParameter("selectedItem");

			var data = this.getView().getModel("JMEquip").getData();
			sap.ui.getCore().byId("id_equipf4").setValue(data[oRow].Equnr + "-" + data[oRow].Eqktx);

			var oFilter = new Filter(
				"Equnr",
				sap.ui.model.FilterOperator.Contains, ""
			);
			evt.getSource().getBinding("items").filter([oFilter]);

		},
		fnBack: function() {

			this.fnClear();
			path = "";
			vPathImg = "";
			this.fnPoScreen6();
			this.getView().byId("id_fileup").setValue("");
			canvas.style.background = 'url("")';
		},
		fnUpload1: function() {
			if (path === "") {
				sap.m.MessageBox.error("Please select a file");
			} else {
				var htmlcon = this.getView().byId("html").getContent();
				this.getView().byId('color').setVisible(false);
				this.getView().byId("color").setContent(
					"<div class='demo' id='colors_demo'><div class='tools'><a href='#colors_sketch' data-download='png' style='float: right; width: 100px;'></a></div></div>"
				);
				vPathImg = URL.createObjectURL(path);
				var canvas = document.getElementById('colors_sketch');
				lv_canvas = canvas;
				canvas.style.background = 'url(' + vPathImg + ')';
				$(function() {
					$('#colors_sketch').sketch();
				});
			}
		},
		fnTypeMismatch: function(oEvent) {
			var flag = false;
			var fileTypes = ["jpg", "jpeg", "png"];

			for (var i = 0; i < fileTypes.length; i++) {
				if (oEvent.getParameter("fileType") === fileTypes[i]) {
					flag = true;
				}
			}

			if (!flag) {
				sap.m.MessageBox.error(oEvent.getParameter("fileType") + " format is unsupported. Please select an Image !");
				path = "";
			}

		},
		fnImgUploadComplete: function(oEvent) {
			var oView = this.getView();
			this.vFileName = oEvent.getParameter("newValue");
			var sResponse = oEvent.getParameter("response");

			var file = oEvent.getSource().oFileUpload.files[0];
			path = file;
		},

		fnClear: function() {

			var canvas = document.getElementById('colors_sketch');
			canvas.getContext('2d').clearRect(0, 0, 1920, 2000);
			$('#colors_sketch').sketch('actions', []);

		},
		download_as_image: function() {

			var c = document.createElement('canvas');
			var canvas = document.getElementById("colors_sketch");

			var _via_current_image = new Image();
			_via_current_image.src = vPathImg;

			// ensures that downloaded image is scaled at current zoom level
			c.width = canvas.width;
			c.height = canvas.height;

			var ct = c.getContext('2d');
			// draw current image
			ct.drawImage(_via_current_image, 0, 0, canvas.width, canvas.height);
			// draw current regions
			ct.drawImage(canvas, 0, 0);

			var cur_img_mime = 'image/jpeg';

			// extract image data from canvas
			var saved_img = c.toDataURL();

			saved_img = c.toDataURL(cur_img_mime);

			saved_img.replace(cur_img_mime, "image/octet-stream");
			imgContent = saved_img;
			this.fnCreatepo1();

		},
		fnCreatepo1: function() {
			var that = this;
			var readUrl = "/PlantorderSet";
			var Ventitypo = {};
			var Vplannedorder = {};
			var Varrpo = [];
			var temp_shift = [];
			var lv_entity = "IU";

			Vplannedorder = {

				"Aufnr": VTrid1,
				"Filecontent": imgContent

			};

			Varrpo.push(Vplannedorder);

			Ventitypo.Version = lv_entity;

			Ventitypo.Navpp = Varrpo;
			Ventitypo.Navshift = [];
			Ventitypo.Navsh = [];
			Ventitypo.Shift = [];
			var oModel = this.getView().getModel();
			oModel.create(readUrl, Ventitypo, {
				success: function(oData, Response) {
					//if (lv_entity === 'UI') {
					sap.m.MessageBox.success("Image Uploaded Successfully", {
						Action: ['ok'],
						onClose: function(sAction) {}
					});

					that.fnLoadDeatailH();
					// that.getView().byId("id_Rework").setVisible(true);
					that.getView().byId("id_imgAnnPanel").setVisible(false);
					// that.getView().byId("id_CreateItem_Document").setValue("");
					// that.fnRework();
					that.fnPoScreen6();
					that.fnClear();
					that.getView().byId("id_fileup").setValue("");
					var canvas = document.getElementById('colors_sketch');
					canvas.style.background = 'url("")';

				},
				error: function(oError) {
					sap.m.MessageBox.error("Image not uploaded");
				}
			});
		},
		fncancelup: function() {
			this.getView().byId("id_updia").close();
			this.getView().byId("id_CreateItem_Document").setValue("");
		},
		fnImgOpen: function() {
			if (!this._imgOpen) {
				this._imgOpen = sap.ui.xmlfragment("VShifter_New.Fragment.imgFrag", this);
				this.getView().addDependent(this._imgOpen);
			}
			return this._imgOpen;
		},
		fn_closeimg: function() {
			this.fnImgOpen().close();
			this._imgOpen.destroy();
			this._imgOpen = null;
		},
		handleMessagePopoverPress: function(oEvent) {
			var temp_arr = "";
			var oRow = oEvent.getSource().oPropagatedProperties.oBindingContexts.JMEquip.sPath;
			oRow = parseInt(oRow.replace('/', ''));
			var data = this.getView().getModel("JMEquip").getData();
			var dia = this.byId("id_diaEquip");
			dia.setVisible(true);
			temp_arr = [{
				"equipno": data[oRow].Equnr,
				"equipdes": data[oRow].Eqktx,
				"creton": data[oRow].Erdat,
				"cretby": data[oRow].Ernam,
				"equiptyp": data[oRow].Eqtyp,
				"equipmno": data[oRow].Typbz,
				"manufacno": data[oRow].Serge
			}];
			this.setMod(temp_arr);
			dia.open();
		},
		fncloseDiaEquip: function() {
			var dia = this.byId("id_diaEquip");
			dia.setVisible(false);
			dia.close();
		},
		fnloadshift: function() {
			var that = this;
			oModel.read("/shiftdetSet", {
				success: function(odata, Response) {
					var arr = odata.results;
					var arr1 = [];
					var shift1count = 0;
					var shift2count = 0;
					var shift3count = 0;
					for (var i = 0; i < odata.results.length; i++) {
						if (arr[i].Shift === 'SHIFT-1') {
							shift1count++;
						} else if (arr[i].Shift === 'SHIFT-2') {
							shift2count++;
						} else if (arr[i].Shift === 'SHIFT-3') {
							shift3count++;
						} else {}
					}
					that.getView().byId("id_prgind1").setValue(shift1count);
					that.getView().byId("id_prgind2").setValue(shift2count);
					that.getView().byId("id_prgind3").setValue(shift3count);
					that.getView().byId("id_prgIndtxt1").setText(shift1count);
					that.getView().byId("id_prgIndtxt2").setText(shift2count);
					that.getView().byId("id_prgIndtxt3").setText(shift3count);

					for (var i = 0; i < arr.length; i++) {
						var mm = arr[i].ShiftDate.getMonth() + 1;
						if (mm <= 9) {
							mm = '0' + mm;
						}
						var dd = arr[i].ShiftDate.getDate();
						var yy = arr[i].ShiftDate.getFullYear();
						var Shiftdat = dd + '-' + mm + '-' + yy;
						lv_dateval = new Date();
						var mm = lv_dateval.getMonth() + 1;
						if (mm <= 9) {
							mm = '0' + mm;
						}
						var dd = lv_dateval.getDate();
						var yy = lv_dateval.getFullYear();
						var finalDate = dd + '-' + mm + '-' + yy;

						if (arr[i].Shift === 'SHIFT-1' && Shiftdat === finalDate) {
							that.getView().byId("id_shiftNo").setText("SHIFT-1");
							that.getView().byId("id_supId").setText(arr[i].SupId);
							that.getView().byId("id_supName").setText(arr[i].SupName);
						} else if (arr[i].Shift === 'SHIFT-2' && Shiftdat === finalDate) {
							that.getView().byId("id_shiftNo1").setText("SHIFT-2");
							that.getView().byId("id_supId1").setText(arr[i].SupId);
							that.getView().byId("id_supName1").setText(arr[i].SupName);
						} else if (arr[i].Shift === 'SHIFT-3' && Shiftdat === finalDate) {
							that.getView().byId("id_shiftNo2").setText("SHIFT-3");
							that.getView().byId("id_supId2").setText(arr[i].SupId);
							that.getView().byId("id_supName2").setText(arr[i].SupName);
						} else {}
					}
				},
				error: function(oResponse) {}
			});
		},
		// fndetailshift: function() {
		// 	var that = this;
		// 	// var readurl = "/shiftdetSet";
		// 	oModel.read("/shiftdetSet", {
		// 		success: function(odata, Response) {
		// 			var arr = odata.result;
		// 			var arr1 = [];
		// 			lv_dateval = new Date();
		// 			var mm = lv_dateval.getMonth() + 1;
		// 			if (mm <= 9) {
		// 				mm = '0' + mm;
		// 			}
		// 			var dd = lv_dateval.getDate();
		// 			var yy = lv_dateval.getFullYear();
		// 			var finalDate = dd + '-' + mm + '-' + yy;
		// 			for (var i = 0; i < odata.results.length; i++) {
		// 				if (arr[i].Shift === 'SHIFT-1' && arr[i].ShiftDate === finalDate) {
		// 					that.getView().byId("id_shiftNo").setText(arr[i].shift);
		// 					that.getView().byId("id_supId").setText(arr[i].SupId);
		// 					that.getView().byId("id_supName").setText(arr[i].SupName);
		// 				}
		// 				else if (arr[i].Shift === 'SHIFT-2' && arr[i].ShiftDate === finalDate){
		// 					that.getView().byId("id_shiftNo1").setText(arr[i].shift);
		// 					that.getView().byId("id_supId1").setText(arr[i].SupId);
		// 					that.getView().byId("id_supName1").setText(arr[i].SupName);
		// 				}
		// 				else {
		// 					that.getView().byId("id_shiftNo2").setText(arr[i].shift);
		// 					that.getView().byId("id_supId2").setText(arr[i].SupId);
		// 					that.getView().byId("id_supName2").setText(arr[i].SupName);
		// 				}
		// 			}

		// 		},
		// 		error: function(oResponse) {}
		// 	});
		// },
		fnChangeColor: function(oEvent) {
			var vClrs = ['#000000', '#03a8a0', '#039c4b', '#66d312', '#fedf17', '#ff0984', '#21409a', '#0b03ff', '#03adff', '#f16623',
				'#e48873', '#f44446',
				'#ff0306', '#c1039b', '#9803c3', '#ff5a03', '#fefdfe'
			];
			var a = oEvent.getSource().aCustomStyleClasses[0];
			var n = parseInt(a.slice(6));
			vGlobColor = vClrs[n];
			// $.each([vGlobColor]);
			$('#colors_sketch').sketch();
		},
		fngetPlant: function() {
			var plant = this.getView().byId("id_plant").getValue();
			if (plant !== "") {
				// this.getView().byId("id_planttext").setValue("");
				var userid = this.getView().byId("id_table");
				var userid1 = this.getView().byId("id_table02");
				var userid2 = this.getView().byId("id_table03");
				var userid3 = this.getView().byId("id_TablePOclose");
				var userid4 = this.getView().byId("id_table05");
				userid.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plant));
				userid1.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plant));
				userid2.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plant));
				userid3.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plant));
				userid4.getBinding().filter(new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plant));

			}
		},
		fngetMaterial: function() {
			var mat = this.getView().byId("id_material").getValue();
			if (mat !== "") {
				// this.getView().byId("id_materialtext").setValue("");
				var userid = this.getView().byId("id_table");
				var userid1 = this.getView().byId("id_table02");
				var userid2 = this.getView().byId("id_table03");
				var userid3 = this.getView().byId("id_TablePOclose");
				var userid4 = this.getView().byId("id_table05");
				userid.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, mat));
				userid1.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, mat));
				userid2.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, mat));
				userid3.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, mat));
				userid4.getBinding().filter(new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, mat));

			}
		},
		fndate: function() {
			var sdate = this.getView().byId("DP1").getValue();
			var ldate = this.getView().byId("DP2").getValue();
			// var ldate = new Date(new Date().getTime() + (1 * 24 * 60 * 60 * 1000));

			var userid = this.getView().byId("id_table");
			var userid1 = this.getView().byId("id_table02");
			var userid2 = this.getView().byId("id_table03");
			var userid3 = this.getView().byId("id_TablePOclose");
			var userid4 = this.getView().byId("id_table05");
			var userid5 = this.getView().byId("id_table07");

			userid.getBinding().filter(new sap.ui.model.Filter("PlanStrtdate", sap.ui.model.FilterOperator.BT, sdate, ldate));
			userid1.getBinding().filter(new sap.ui.model.Filter("PlanStrtdate", sap.ui.model.FilterOperator.BT, sdate, ldate));
			userid2.getBinding().filter(new sap.ui.model.Filter("PlanStrtdate", sap.ui.model.FilterOperator.BT, sdate, ldate));
			userid3.getBinding().filter(new sap.ui.model.Filter("PoSdate", sap.ui.model.FilterOperator.BT, sdate, ldate));
			userid4.getBinding().filter(new sap.ui.model.Filter("PlanStrtdate", sap.ui.model.FilterOperator.BT, sdate, ldate));
			userid5.getBinding().filter(new sap.ui.model.Filter("BrStartdat", sap.ui.model.FilterOperator.BT, sdate, ldate));
		},
		fnclearFilter: function() {
			var a = this.getView().byId("id_plant").getValue();
			var b = this.getView().byId("id_material").getValue();
			var c = this.getView().byId("id_sales").getValue();
			if (a === "" && b === "" && c === "") {
				sap.m.MessageToast.show("You didn't Enter any Values to Clear");
			} else {
				busyDialog.open();
				this.getView().byId("id_plant").setValue("");
				this.getView().byId("id_material").setValue("");
				this.getView().byId("id_sales").setValue("");
				this.fnplantlive();
				this.fnMatlive();
				this.fnSalelive();
				this.byId("id_submit").setVisible(true);
				this.byId("id_reset").setVisible(false);
				busyDialog.close();
			}
		},
		fnapplyFilter: function() {
			var a = this.getView().byId("id_plant").getValue();
			var b = this.getView().byId("id_material").getValue();
			var c = this.getView().byId("id_sales").getValue();
			if (a !== "" && b !== "" && c !== "") {
				busyDialog.open();
				this.fngetPlant();
				this.fngetMaterial();
				// this.fndate();
				this.byId("id_submit").setVisible(false);
				this.byId("id_reset").setVisible(true);
				busyDialog.close();
			} else if (a !== "" && b === "" && c === "") {
				busyDialog.open();
				this.fngetPlant();
				// this.fndate();
				this.byId("id_submit").setVisible(false);
				this.byId("id_reset").setVisible(true);
				busyDialog.close();
			} else if (a === "" && b !== "" && c === "") {
				busyDialog.open();
				this.fngetMaterial();
				// this.fndate();
				this.byId("id_submit").setVisible(false);
				this.byId("id_reset").setVisible(true);
				busyDialog.close();
			} else if (a === "" && b === "" && c !== "") {
				busyDialog.open();
				this.fngetMaterial();
				// this.fndate();
				this.byId("id_submit").setVisible(false);
				this.byId("id_reset").setVisible(true);
				busyDialog.close();
			} else if (a !== "" && b !== "" && c === "") {
				busyDialog.open();
				this.fngetPlant();
				this.fngetMaterial();
				// this.fndate();
				this.byId("id_submit").setVisible(false);
				this.byId("id_reset").setVisible(true);
				busyDialog.close();
			} else {
				sap.m.MessageToast.show("Please Enter Filter Values to Filter the Table Datas");
			}
		},
	});
});