// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
		    "jquery":               "js/lib/jquery.min",
        "jquery.tmpl":          "js/lib/jquery.tmpl",
		    "jquery.pjax":          "js/lib/jquery.pjax",
        "tooltip.min":          "js/plugins/tooltip.min",
        "validator":            "js/lib/validator",
        "notify":               "js/plugins/notify.min",
		    "uikit":                "js/lib/uikit",
        "knockout":             "js/lib/knockout",
        "knockout.validation":  "js/lib/knockout.validation.min",
        "crossroads":           "js/lib/crossroads.min",
        "hasher":               "js/lib/hasher.min",
        "knockout-projections": "js/lib/knockout-projections.min",
		    "knockout.mapping":     "js/lib/knockout.mapping",
        "signals":              "js/lib/signals.min",
        "text":                 "js/lib/text",
        "css":                  "js/lib/css.min"
    },
    shim: {
        "uikit": { deps: ["jquery"] },
        "jquery.pjax":{deps:["jquery"]},
        "knockout":{deps:["jquery","jquery.tmpl"]},
        "knockout.validation":{deps:["knockout"]},
        "notify":{ deps: ["uikit"] },
        "tooltip.min":{ deps: ["uikit","css!/css/plugins/tooltip.min"] }
    },
	urlArgs: "bust=" +  (new Date()).getTime()
};
