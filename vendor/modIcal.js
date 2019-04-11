var request = require("request")
	, fs = require("fs")
	, moment = require("./moment-timezone-with-data");

// Processed/Filtered Data from http://unicode.org/repos/cldr/trunk/common/supplemental/windowsZones.xml
// Generally picked the first choice for timezones from the file.
// Changes to this:
//   India Standard Time  : Asia/Calcutta -> Asia/Kolkata

moment.tz.link([
	"Afghanistan Standard Time|Asia/Kabul",
	"Alaskan Standard Time|America/Anchorage",
	"Aleutian Standard Time|America/Adak",
	"Altai Standard Time|Asia/Barnaul",
	"Arabian Standard Time|Asia/Dubai",
	"Arabic Standard Time|Asia/Baghdad",
	"Arab Standard Time|Asia/Riyadh",
	"Argentina Standard Time|America/Buenos_Aires",
	"Astrakhan Standard Time|Europe/Astrakhan",
	"Atlantic Standard Time|America/Halifax",
	"AUS Central Standard Time|Australia/Darwin",
	"Aus Central W. Standard Time|Australia/Eucla",
	"AUS Eastern Standard Time|Australia/Sydney",
	"Azerbaijan Standard Time|Asia/Baku",
	"Azores Standard Time|Atlantic/Azores",
	"Bahia Standard Time|America/Bahia",
	"Bangladesh Standard Time|Asia/Dhaka",
	"Belarus Standard Time|Europe/Minsk",
	"Bougainville Standard Time|Pacific/Bougainville",
	"Canada Central Standard Time|America/Regina",
	"Cape Verde Standard Time|Atlantic/Cape_Verde",
	"Caucasus Standard Time|Asia/Yerevan",
	"Cen. Australia Standard Time|Australia/Adelaide",
	"Central America Standard Time|America/Guatemala",
	"Central Asia Standard Time|Asia/Almaty",
	"Central Brazilian Standard Time|America/Cuiaba",
	"Central European Standard Time|Europe/Warsaw",
	"Central Europe Standard Time|Europe/Budapest",
	"Central Pacific Standard Time|Pacific/Guadalcanal",
	"Central Standard Time|America/Chicago",
	"Central Standard Time (Mexico)|America/Mexico_City",
	"Chatham Islands Standard Time|Pacific/Chatham",
	"China Standard Time|Asia/Shanghai",
	"Cuba Standard Time|America/Havana",
	"Dateline Standard Time|Etc/GMT+12",
	"E. Africa Standard Time|Africa/Nairobi",
	"Easter Island Standard Time|Pacific/Easter",
	"Eastern Standard Time|America/New_York",
	"Eastern Standard Time (Mexico)|America/Cancun",
	"E. Australia Standard Time|Australia/Brisbane",
	"E. Europe Standard Time|Europe/Chisinau",
	"Egypt Standard Time|Africa/Cairo",
	"Ekaterinburg Standard Time|Asia/Yekaterinburg",
	"E. South America Standard Time|America/Sao_Paulo",
	"Fiji Standard Time|Pacific/Fiji",
	"FLE Standard Time|Europe/Kiev",
	"Georgian Standard Time|Asia/Tbilisi",
	"GMT Standard Time|Europe/London",
	"Greenland Standard Time|America/Godthab",
	"Greenwich Standard Time|Atlantic/Reykjavik",
	"GTB Standard Time|Europe/Bucharest",
	"Haiti Standard Time|America/Port-au-Prince",
	"Hawaiian Standard Time|Pacific/Honolulu",
	"India Standard Time|Asia/Kolkata",
	"Iran Standard Time|Asia/Tehran",
	"Israel Standard Time|Asia/Jerusalem",
	"Jordan Standard Time|Asia/Amman",
	"Kaliningrad Standard Time|Europe/Kaliningrad",
	"Korea Standard Time|Asia/Seoul",
	"Libya Standard Time|Africa/Tripoli",
	"Line Islands Standard Time|Pacific/Kiritimati",
	"Lord Howe Standard Time|Australia/Lord_Howe",
	"Magadan Standard Time|Asia/Magadan",
	"Magallanes Standard Time|America/Punta_Arenas",
	"Marquesas Standard Time|Pacific/Marquesas",
	"Mauritius Standard Time|Indian/Mauritius",
	"Middle East Standard Time|Asia/Beirut",
	"Montevideo Standard Time|America/Montevideo",
	"Morocco Standard Time|Africa/Casablanca",
	"Mountain Standard Time|America/Denver",
	"Mountain Standard Time (Mexico)|America/Chihuahua",
	"Myanmar Standard Time|Asia/Rangoon",
	"Namibia Standard Time|Africa/Windhoek",
	"N. Central Asia Standard Time|Asia/Novosibirsk",
	"Nepal Standard Time|Asia/Katmandu",
	"Newfoundland Standard Time|America/St_Johns",
	"New Zealand Standard Time|Pacific/Auckland",
	"Norfolk Standard Time|Pacific/Norfolk",
	"North Asia East Standard Time|Asia/Irkutsk",
	"North Asia Standard Time|Asia/Krasnoyarsk",
	"North Korea Standard Time|Asia/Pyongyang",
	"Omsk Standard Time|Asia/Omsk",
	"Pacific SA Standard Time|America/Santiago",
	"Pacific Standard Time|America/Los_Angeles",
	"Pacific Standard Time (Mexico)|America/Tijuana",
	"Pakistan Standard Time|Asia/Karachi",
	"Paraguay Standard Time|America/Asuncion",
	"Romance Standard Time|Europe/Paris",
	"Russian Standard Time|Europe/Moscow",
	"Russia Time Zone 10|Asia/Srednekolymsk",
	"Russia Time Zone 11|Asia/Kamchatka",
	"Russia Time Zone 3|Europe/Samara",
	"SA Eastern Standard Time|America/Cayenne",
	"Saint Pierre Standard Time|America/Miquelon",
	"Sakhalin Standard Time|Asia/Sakhalin",
	"Samoa Standard Time|Pacific/Apia",
	"Sao Tome Standard Time|Africa/Sao_Tome",
	"SA Pacific Standard Time|America/Bogota",
	"Saratov Standard Time|Europe/Saratov",
	"SA Western Standard Time|America/La_Paz",
	"SE Asia Standard Time|Asia/Bangkok",
	"Singapore Standard Time|Asia/Singapore",
	"South Africa Standard Time|Africa/Johannesburg",
	"Sri Lanka Standard Time|Asia/Colombo",
	"Sudan Standard Time|Africa/Khartoum",
	"Syria Standard Time|Asia/Damascus",
	"Taipei Standard Time|Asia/Taipei",
	"Tasmania Standard Time|Australia/Hobart",
	"Tocantins Standard Time|America/Araguaina",
	"Tokyo Standard Time|Asia/Tokyo",
	"Tomsk Standard Time|Asia/Tomsk",
	"Tonga Standard Time|Pacific/Tongatapu",
	"Transbaikal Standard Time|Asia/Chita",
	"Turkey Standard Time|Europe/Istanbul",
	"Turks And Caicos Standard Time|America/Grand_Turk",
	"Ulaanbaatar Standard Time|Asia/Ulaanbaatar",
	"US Eastern Standard Time|America/Indianapolis",
	"US Mountain Standard Time|America/Phoenix",
	"UTC-02|Etc/GMT+2",
	"UTC-08|Etc/GMT+8",
	"UTC-09|Etc/GMT+9",
	"UTC-11|Etc/GMT+11",
	"UTC+12|Etc/GMT-12",
	"UTC+13|Etc/GMT-13",
	"UTC|Etc/GMT",
	"Venezuela Standard Time|America/Caracas",
	"Vladivostok Standard Time|Asia/Vladivostok",
	"W. Australia Standard Time|Australia/Perth",
	"W. Central Africa Standard Time|Africa/Lagos",
	"West Asia Standard Time|Asia/Tashkent",
	"West Bank Standard Time|Asia/Hebron",
	"West Pacific Standard Time|Pacific/Port_Moresby",
	"W. Europe Standard Time|Europe/Berlin",
	"W. Mongolia Standard Time|Asia/Hovd",
	"Yakutsk Standard Time|Asia/Yakutsk"
])


function text(t){
	t = t || "";
	return (t
		.replace(/\\\,/g, ",")
		.replace(/\\\;/g, ";")
		.replace(/\\[nN]/g, "\n")
		.replace(/\\\\/g, "\\")
	)
}
function parseParams(p){
	var out = {}
	for (var i = 0; i<p.length; i++){
		if (p[i].indexOf("=") > -1){
			var segs = p[i].split("=");

			out[segs[0]] = parseValue(segs.slice(1).join("="));

		}
	}
	return out || sp
}
function parseValue(val){
	if ("TRUE" === val){
		return true;
	}

	if ("FALSE" === val) {return false;}

	var number = Number(val);
	if (!isNaN(number)) {return number;}

	return val;
}
function storeValParam (name) {
	return function (val, curr) {
		var current = curr[name];
		if (Array.isArray(current)) {
			current.push(val);
			return curr;
		}

		if (current != null) {
			curr[name] = [current, val];
			return curr;
		}

		curr[name] = val;
		return curr
	}
}
function storeParam (name) {
	return function (val, params, curr) {
		var data;
		if (params && params.length && !(params.length == 1 && params[0] === "CHARSET=utf-8")) {
			data = { params: parseParams(params), val: text(val) }
		}
		else{
			data = text(val)
		}

		return storeValParam(name)(data, curr);
	}
}
function addTZ (dt, params) {
	var p = parseParams(params);

	if (params && p){
		dt.tz = p.TZID
	}

	return dt
}
function dateParam(name){
	return function (val, params, curr) {

		var newDate = {
			date: "",
			dateOnly: false,
			tz: ""
		};

		var tzid
		if (params && params[0]){
			tzid = params[0].replace(/^.*?=/, "");
		}
		if (tzid == "DATE"){
			tzid = "";
			newDate.dateOnly = true;
		}

		newDate.date = moment.tz(val, tzid).format();
		newDate.tz = tzid;

		return storeValParam(name)(newDate, curr)
	}
}
function geoParam(name){
	return function(val, params, curr){
		storeParam(val, params, curr)
		var parts = val.split(";");
		curr[name] = {lat:Number(parts[0]), lon:Number(parts[1])};
		return curr
	}
}
function categoriesParam (name) {
	var separatorPattern = /\s*,\s*/g;
	return function (val, params, curr) {
		storeParam(val, params, curr)
		if (curr[name] === undefined){
			curr[name] = val ? val.split(separatorPattern) : []
		}
		else if (val){
			curr[name] = curr[name].concat(val.split(separatorPattern))
		}
		return curr
	}
}
function exdateParam (name) {
	return function (val, params, curr) {
		var separatorPattern = /\s*,\s*/g;
		curr[name] = curr[name] || [];
		var dates = val ? val.split(separatorPattern) : [];
		dates.forEach(function (entry) {
			var exdate = new Array();
			dateParam(name)(entry, params, exdate);

			if (exdate[name])
			{
				curr[name][exdate[name]["date"].substring(0, 10)] = exdate[name];
			}
		}
		)
		return curr;
	}
}
function recurrenceParam (name) {
	return dateParam(name);
}
function addFBType (fb, params) {
	var p = parseParams(params);

	if (params && p){
		fb.type = p.FBTYPE || "BUSY"
	}

	return fb;
}
function freebusyParam (name) {
	return function(val, params, curr){
		var fb = addFBType({}, params);
		curr[name] = curr[name] || []
		curr[name].push(fb);

		storeParam(val, params, fb);

		var parts = val.split("/");

		["start", "end"].forEach(function (name, index) {
			dateParam(name)(parts[index], params, fb);
		});

		return curr;
	}
}

class iCal {
	constructor(){
		this.objectHandlers = {
			"BEGIN" : function(component, params, curr, stack){
				stack.push(curr)

				return {type:component, params:params}
			}

			, "END" : function(component, params, curr, stack){
			// prevents the need to search the root of the tree for the VCALENDAR object
				if (component === "VCALENDAR") {
					//scan all high level object in curr and drop all strings
					var key,
						obj;

					for (key in curr) {
						if(curr.hasOwnProperty(key)) {
							obj = curr[key];
							if (typeof obj === "string") {
								delete curr[key];
							}
						}
					}

					return curr
				}

				var par = stack.pop()

				if (curr.uid)
				{
				// If this is the first time we run into this UID, just save it.
					if (par[curr.uid] === undefined)
					{
						par[curr.uid] = curr;
					}
					else
					{
						// If we have multiple ical entries with the same UID, it's either going to be a
						// modification to a recurrence (RECURRENCE-ID), and/or a significant modification
						// to the entry (SEQUENCE).

						// TODO: Look into proper sequence logic.

						if (curr.recurrenceid === undefined)
						{
							// If we have the same UID as an existing record, and it *isn't* a specific recurrence ID,
							// not quite sure what the correct behaviour should be.  For now, just take the new information
							// and merge it with the old record by overwriting only the fields that appear in the new record.
							var key;
							for (key in curr) {
								par[curr.uid][key] = curr[key];
							}

						}
					}

					// If we have recurrence-id entries, list them as an array of recurrences keyed off of recurrence-id.
					// To use - as you're running through the dates of an rrule, you can try looking it up in the recurrences
					// array.  If it exists, then use the data from the calendar object in the recurrence instead of the parent
					// for that day.

					// NOTE:  Sometimes the RECURRENCE-ID record will show up *before* the record with the RRULE entry.  In that
					// case, what happens is that the RECURRENCE-ID record ends up becoming both the parent record and an entry
					// in the recurrences array, and then when we process the RRULE entry later it overwrites the appropriate
					// fields in the parent record.

					if (curr.recurrenceid != null)
					{

						// TODO:  Is there ever a case where we have to worry about overwriting an existing entry here?

						// Create a copy of the current object to save in our recurrences array.  (We *could* just do par = curr,
						// except for the case that we get the RECURRENCE-ID record before the RRULE record.  In that case, we
						// would end up with a shared reference that would cause us to overwrite *both* records at the point
						// that we try and fix up the parent record.)
						var recurrenceObj = new Object();
						var key;
						for (key in curr) {
							recurrenceObj[key] = curr[key];
						}

						if (recurrenceObj.recurrences != undefined) {
							delete recurrenceObj.recurrences;
						}


						// If we don't have an array to store recurrences in yet, create it.
						if (par[curr.uid].recurrences === undefined) {
							par[curr.uid].recurrences = new Array();
						}

						// Save off our cloned recurrence object into the array, keyed by date but not time.
						// We key by date only to avoid timezone and "floating time" problems (where the time isn't associated with a timezone).
						// TODO: See if this causes a problem with events that have multiple recurrences per day.
						par[curr.uid].recurrences[moment(curr.recurrenceid["date"]).utc().format().substring(0,10)] = recurrenceObj;
					}

					// One more specific fix - in the case that an RRULE entry shows up after a RECURRENCE-ID entry,
					// let's make sure to clear the recurrenceid off the parent field.
					if ((par[curr.uid].rrule != undefined) && (par[curr.uid].recurrenceid != undefined))
					{
						delete par[curr.uid].recurrenceid;
					}

				}
				else {
					par[Math.random()*100000] = curr // Randomly assign ID : TODO - use true GUID
				}

				return par
			}

			, "SUMMARY" : storeParam("summary")
			, "DESCRIPTION" : storeParam("description")
			, "URL" : storeParam("url")
			, "UID" : storeParam("uid")
			, "LOCATION" : storeParam("location")
			, "DTSTART" : dateParam("start")
			, "DTEND" : dateParam("end")
			, "EXDATE" : exdateParam("exdate")
			," CLASS" : storeParam("class")
			, "TRANSP" : storeParam("transparency")
			, "GEO" : geoParam("geo")
			, "PERCENT-COMPLETE": storeParam("completion")
			, "COMPLETED": dateParam("completed")
			, "CATEGORIES": categoriesParam("categories")
			, "FREEBUSY": freebusyParam("freebusy")
			, "DTSTAMP": dateParam("dtstamp")
			, "CREATED": dateParam("created")
			, "LAST-MODIFIED": dateParam("lastmodified")
			, "RECURRENCE-ID": recurrenceParam("recurrenceid")

		}
	}

	handleObject(name, val, params, ctx, stack, line){
		var self = this

		if(self.objectHandlers[name]) {
			return self.objectHandlers[name](val, params, ctx, stack, line)
		}

		//handling custom properties
		if(name.match(/X\-[\w\-]+/) && stack.length > 0) {
			//trimming the leading and perform storeParam
			name = name.substring(2);
			return (storeParam(name))(val, params, ctx, stack, line);
		}

		return storeParam(name.toLowerCase())(val, params, ctx);
	}
	parseICS(str){
		var self = this
		var lines = str.split(/\r?\n/)
		var ctx = {}
		var stack = []

		for (var i = 0, ii = lines.length, l = lines[0]; i<ii; i++, l=lines[i]){
		//Unfold : RFC#3.1
			while (lines[i+1] && /[ \t]/.test(lines[i+1][0])) {
				l += lines[i+1].slice(1)
				i += 1
			}

			var kv = l.split(":")

			if (kv.length < 2){
			// Invalid line - must have k&v
				continue;
			}

			// Although the spec says that vals with colons should be quote wrapped
			// in practise nobody does, so we assume further colons are part of the
			// val
			var value = kv.slice(1).join(":")
				, kp = kv[0].split(";")
				, name = kp[0]
				, params = kp.slice(1)

			ctx = self.handleObject(name, value, params, ctx, stack, l) || {}
		}

		// type and params are added to the list of items, get rid of them.
		delete ctx.type
		delete ctx.params

		return ctx
	}
}

var ical = new iCal();

exports.fromURL = function(url, opts, cb){
	if (!cb) {return;}
	request(url, opts, function(err, r, data){
		if (err)
		{
			return cb(err, null);
		}
		else if (r.statusCode != 200)
		{
			return cb(r.statusCode + ": " + r.statusMessage, null);
		}

		cb(undefined, ical.parseICS(data));
	})
}

exports.parseFile = function(filename){
	return ical.parseICS(fs.readFileSync(filename, "utf8"))
}


var rrule = require("rrule").RRule

ical.objectHandlers["RRULE"] = function(val, params, curr, stack, line){
	curr.rrule = line;
	return curr
}
var originalEnd = ical.objectHandlers["END"];
ical.objectHandlers["END"] = function (val, params, curr, stack) {
	// Recurrence rules are only valid for VEVENT, VTODO, and VJOURNAL.
	// More specifically, we need to filter the VCALENDAR type because we might end up with a defined rrule
	// due to the subtypes.
	if ((val === "VEVENT") || (val === "VTODO") || (val === "VJOURNAL")) {
		if (curr.rrule) {
			var rule = curr.rrule.replace("RRULE:", "");
			if (rule.indexOf("DTSTART") === -1) {
				try {
					var mrule = "";
					// Work around recurring meetings started before/after the DST change.
					var tzOffsetAtCreation = moment.tz(curr.start["date"], curr.start["tz"]).format().replace(/.*?[+](\d\d):(\d\d)/, "$1");
					var tzOffsetNow = moment.tz(moment().format(), curr.start["tz"]).format().replace(/.*?[+](\d\d):(\d\d)/, "$1");

					if (tzOffsetAtCreation !== tzOffsetNow){
						mrule = moment(curr.start["date"]).add(parseInt(tzOffsetAtCreation) - parseInt(tzOffsetNow), "hours").utc().format().replace(/[-:]/g, "")
					}
					else {
						mrule = moment(curr.start["date"]).utc().format().replace(/[-:]/g, "");
					}

					rule += ";DTSTART=" + mrule;
				} catch (error) {
					console.error("ERROR when trying to convert to ISOString", error);
				}
			}
			curr.rrule = rrule.fromString(rule);
		}
	}
	return originalEnd.call(this, val, params, curr, stack);
}
