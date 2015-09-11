// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
		"jquery":               "js/lib/jquery.min",
		"jquery.pjax":          "js/lib/jquery.pjax",
        "notify":               "js/plugins/notify",
		"uikit":                "js/lib/uikit",
        "knockout":             "js/lib/knockout",
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
        "notify":{ deps: ["uikit"] }
    },
	urlArgs: "bust=" +  (new Date()).getTime()
};


