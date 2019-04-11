var request = require('request')
	, fs = require('fs')
	, moment = require('./moment-timezone-with-data');

	moment.tz.link([
		"Dateline Standard Time|Etc/GMT+12",
		"Aleutian Standard Time|America/Adak",
		"Hawaiian Standard Time|Pacific/Honolulu",
		"Marquesas Standard Time|Pacific/Marquesas",
		"Alaskan Standard Time|America/Anchorage",
		"Pacific Standard Time (Mexico)|America/Tijuana",
		"Pacific Standard Time|America/Tijuana",
		"US Mountain Standard Time|America/Phoenix",
		"Mountain Standard Time (Mexico)|America/Chihuahua",
		"Mountain Standard Time|America/Phoenix",
		"Central America Standard Time|America/Guatemala",
		"Central Standard Time|America/Chicago",
		"Easter Island Standard Time|Pacific/Easter",
		"Central Standard Time (Mexico)|America/Mexico_City",
		"Canada Central Standard Time|America/Regina",
		"SA Pacific Standard Time|America/Bogota",
		"Eastern Standard Time (Mexico)|America/Cancun",
		"Eastern Standard Time|America/Cancun",
		"Haiti Standard Time|America/Port-au-Prince",
		"Cuba Standard Time|America/Havana",
		"US Eastern Standard Time|America/Indianapolis",
		"Paraguay Standard Time|America/Asuncion",
		"Atlantic Standard Time|America/Halifax",
		"Venezuela Standard Time|America/Caracas",
		"Central Brazilian Standard Time|America/Cuiaba",
		"SA Western Standard Time|America/La_Paz",
		"Pacific SA Standard Time|America/Santiago",
		"Turks And Caicos Standard Time|America/Grand_Turk",
		"Newfoundland Standard Time|America/St_Johns",
		"Tocantins Standard Time|America/Araguaina",
		"E. South America Standard Time|America/Sao_Paulo",
		"SA Eastern Standard Time|America/Cayenne",
		"Argentina Standard Time|America/Buenos_Aires",
		"Greenland Standard Time|America/Godthab",
		"Montevideo Standard Time|America/Montevideo",
		"Magallanes Standard Time|America/Punta_Arenas",
		"Saint Pierre Standard Time|America/Miquelon",
		"Bahia Standard Time|America/Bahia",
		"Azores Standard Time|Atlantic/Azores",
		"Cape Verde Standard Time|Atlantic/Cape_Verde",
		"GMT Standard Time|Europe/London",
		"Greenwich Standard Time|Atlantic/Reykjavik",
		"W. Europe Standard Time|Europe/Berlin",
		"Central Europe Standard Time|Europe/Budapest",
		"Romance Standard Time|Europe/Paris",
		"Morocco Standard Time|Africa/Casablanca",
		"Sao Tome Standard Time|Africa/Sao_Tome",
		"Central European Standard Time|Europe/Warsaw",
		"W. Central Africa Standard Time|Africa/Lagos",
		"Jordan Standard Time|Asia/Amman",
		"GTB Standard Time|Europe/Bucharest",
		"Middle East Standard Time|Asia/Beirut",
		"Egypt Standard Time|Africa/Cairo",
		"E. Europe Standard Time|Europe/Chisinau",
		"Syria Standard Time|Asia/Damascus",
		"West Bank Standard Time|Asia/Hebron",
		"South Africa Standard Time|Africa/Johannesburg",
		"FLE Standard Time|Europe/Kiev",
		"Israel Standard Time|Asia/Jerusalem",
		"Kaliningrad Standard Time|Europe/Kaliningrad",
		"Sudan Standard Time|Africa/Khartoum",
		"Libya Standard Time|Africa/Tripoli",
		"Namibia Standard Time|Africa/Windhoek",
		"Arabic Standard Time|Asia/Baghdad",
		"Turkey Standard Time|Europe/Istanbul",
		"Arab Standard Time|Asia/Riyadh",
		"Belarus Standard Time|Europe/Minsk",
		"Russian Standard Time|Europe/Moscow",
		"E. Africa Standard Time|Africa/Nairobi",
		"Iran Standard Time|Asia/Tehran",
		"Arabian Standard Time|Asia/Dubai",
		"Astrakhan Standard Time|Europe/Astrakhan",
		"Azerbaijan Standard Time|Asia/Baku",
		"Russia Time Zone 3|Europe/Samara",
		"Mauritius Standard Time|Indian/Mauritius",
		"Saratov Standard Time|Europe/Saratov",
		"Georgian Standard Time|Asia/Tbilisi",
		"Caucasus Standard Time|Asia/Yerevan",
		"Afghanistan Standard Time|Asia/Kabul",
		"West Asia Standard Time|Asia/Tashkent",
		"Ekaterinburg Standard Time|Asia/Yekaterinburg",
		"Pakistan Standard Time|Asia/Karachi",
		"India Standard Time|Asia/Kolkata",
		"Sri Lanka Standard Time|Asia/Colombo",
		"Nepal Standard Time|Asia/Katmandu",
		"Central Asia Standard Time|Asia/Almaty",
		"Bangladesh Standard Time|Asia/Dhaka",
		"Omsk Standard Time|Asia/Omsk",
		"Myanmar Standard Time|Asia/Rangoon",
		"SE Asia Standard Time|Asia/Bangkok",
		"Altai Standard Time|Asia/Barnaul",
		"W. Mongolia Standard Time|Asia/Hovd",
		"North Asia Standard Time|Asia/Krasnoyarsk",
		"N. Central Asia Standard Time|Asia/Novosibirsk",
		"Tomsk Standard Time|Asia/Tomsk",
		"China Standard Time|Asia/Shanghai",
		"North Asia East Standard Time|Asia/Irkutsk",
		"Singapore Standard Time|Asia/Singapore",
		"W. Australia Standard Time|Australia/Perth",
		"Taipei Standard Time|Asia/Taipei",
		"Ulaanbaatar Standard Time|Asia/Ulaanbaatar",
		"Aus Central W. Standard Time|Australia/Eucla",
		"Transbaikal Standard Time|Asia/Chita",
		"Tokyo Standard Time|Asia/Tokyo",
		"North Korea Standard Time|Asia/Pyongyang",
		"Korea Standard Time|Asia/Pyongyang",
		"Yakutsk Standard Time|Asia/Yakutsk",
		"Cen. Australia Standard Time|Australia/Adelaide",
		"AUS Central Standard Time|Australia/Darwin",
		"E. Australia Standard Time|Australia/Brisbane",
		"AUS Eastern Standard Time|Australia/Sydney",
		"West Pacific Standard Time|Pacific/Port_Moresby",
		"Tasmania Standard Time|Australia/Hobart",
		"Vladivostok Standard Time|Asia/Vladivostok",
		"Lord Howe Standard Time|Australia/Lord_Howe",
		"Bougainville Standard Time|Pacific/Bougainville",
		"Russia Time Zone 10|Asia/Srednekolymsk",
		"Magadan Standard Time|Asia/Magadan",
		"Norfolk Standard Time|Pacific/Norfolk",
		"Sakhalin Standard Time|Asia/Sakhalin",
		"Central Pacific Standard Time|Pacific/Guadalcanal",
		"Russia Time Zone 11|Asia/Kamchatka",
		"New Zealand Standard Time|Pacific/Auckland",
		"Fiji Standard Time|Pacific/Fiji",
		"Chatham Islands Standard Time|Pacific/Chatham",
		"Tonga Standard Time|Pacific/Tongatapu",
		"Samoa Standard Time|Pacific/Apia",
		"Line Islands Standard Time|Pacific/Kiritimati"	
	])
	

	function text(t){
		t = t || "";
		return (t
			.replace(/\\\,/g, ',')
			.replace(/\\\;/g, ';')
			.replace(/\\[nN]/g, '\n')
			.replace(/\\\\/g, '\\')
		)
	}
	function parseParams(p){
		var out = {}
		for (var i = 0; i<p.length; i++){
			if (p[i].indexOf('=') > -1){
				var segs = p[i].split('=');
 
				out[segs[0]] = parseValue(segs.slice(1).join('='));
 
			}
		}
		return out || sp
	}
	function parseValue(val){
		if ('TRUE' === val)
			return true;
 
		if ('FALSE' === val)
			return false;
 
		var number = Number(val);
		if (!isNaN(number))
			return number;
 
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
				if (params && params.length && !(params.length == 1 && params[0] === 'CHARSET=utf-8')) {
						data = { params: parseParams(params), val: text(val) }
				}
				else
						data = text(val)

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
				date: '',
				dateOnly: false,
				tz: ''
			};

			var tzid
			if (params && params[0]){
				tzid = params[0].replace(/^.*?=/, '');
			}
			if (tzid == 'DATE'){
				tzid = '';
				newDate.dateOnly = true;
			}

			newDate.date = moment.tz(val, tzid).format();
			newDate.tz = tzid;

			/*
			 * 
			if (curr.uid == 'C97E7C7BBB8BD31A002583D8002DB43B-Lotus_Notes_Generated'){
				console.log('FUNCTION: dateParam')
				console.log("PARAMETER: name")
				console.log(name)
				console.log("PARAMETER: val")
				console.log(val)
				console.log("PARAMETER: params")
				console.log(params)
				console.log("PARAMETER: curr")
				console.log(curr)
				console.log("VARIABLE: newDate")
				console.log(newDate)
			}

			if (params && params[0] === "VALUE=DATE") {
				// Just Date

				var comps = /^(\d{4})(\d{2})(\d{2})$/.exec(val);
				if (comps !== null) {
					// No TZ info - assume same timezone as this computer
					newDate = new Date(
						comps[1],
						parseInt(comps[2], 10)-1,
						comps[3]
					);

					newDate = addTZ(newDate, params);
					newDate.dateOnly = true;

					// Store as string - worst case scenario
					return storeValParam(name)(newDate, curr)
				}
			}


			//typical RFC date-time format
			var comps = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(val);
			if (curr.uid == 'C97E7C7BBB8BD31A002583D8002DB43B-Lotus_Notes_Generated'){
				console.log(comps)
			}
			if (comps !== null) {
				if (comps[7] == 'Z'){ // GMT
					newDate = new Date(Date.UTC(
						parseInt(comps[1], 10),
						parseInt(comps[2], 10)-1,
						parseInt(comps[3], 10),
						parseInt(comps[4], 10),
						parseInt(comps[5], 10),
						parseInt(comps[6], 10 )
					));
					// TODO add tz
				} else {
					newDate = new Date(
						parseInt(comps[1], 10),
						parseInt(comps[2], 10)-1,
						parseInt(comps[3], 10),
						parseInt(comps[4], 10),
						parseInt(comps[5], 10),
						parseInt(comps[6], 10)
					);
				}
			}


					// Store as string - worst case scenario
			*/
			return storeValParam(name)(newDate, curr)
		}
	}
	function geoParam(name){
		return function(val, params, curr){
			storeParam(val, params, curr)
			var parts = val.split(';');
			curr[name] = {lat:Number(parts[0]), lon:Number(parts[1])};
			return curr
		}
	}
	function categoriesParam (name) {
		var separatorPattern = /\s*,\s*/g;
		return function (val, params, curr) {
			storeParam(val, params, curr)
			if (curr[name] === undefined)
				curr[name] = val ? val.split(separatorPattern) : []
			else
				if (val)
					curr[name] = curr[name].concat(val.split(separatorPattern))
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
							curr[name][exdate[name]['date'].substring(0, 10)] = exdate[name];
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
 
			var parts = val.split('/');
 
			['start', 'end'].forEach(function (name, index) {
				dateParam(name)(parts[index], params, fb);
			});
 
			return curr;
		}
	}

class iCal {
	constructor(){
		this.objectHandlers = {
			'BEGIN' : function(component, params, curr, stack){
					stack.push(curr)
	
					return {type:component, params:params}
				}
	
			, 'END' : function(component, params, curr, stack){
				// prevents the need to search the root of the tree for the VCALENDAR object
				if (component === "VCALENDAR") {
						//scan all high level object in curr and drop all strings
						var key,
								obj;
	
						for (key in curr) {
								if(curr.hasOwnProperty(key)) {
									 obj = curr[key];
									 if (typeof obj === 'string') {
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
								par[curr.uid].recurrences[moment(curr.recurrenceid['date']).utc().format().substring(0,10)] = recurrenceObj;
						}
	
					// One more specific fix - in the case that an RRULE entry shows up after a RECURRENCE-ID entry,
					// let's make sure to clear the recurrenceid off the parent field.
					if ((par[curr.uid].rrule != undefined) && (par[curr.uid].recurrenceid != undefined))
						{
						delete par[curr.uid].recurrenceid;
						}
	
				}
				else
					par[Math.random()*100000] = curr  // Randomly assign ID : TODO - use true GUID
	
				return par
			}
	
			, 'SUMMARY' : storeParam('summary')
			, 'DESCRIPTION' : storeParam('description')
			, 'URL' : storeParam('url')
			, 'UID' : storeParam('uid')
			, 'LOCATION' : storeParam('location')
			, 'DTSTART' : dateParam('start')
			, 'DTEND' : dateParam('end')
			, 'EXDATE' : exdateParam('exdate')
			,' CLASS' : storeParam('class')
			, 'TRANSP' : storeParam('transparency')
			, 'GEO' : geoParam('geo')
			, 'PERCENT-COMPLETE': storeParam('completion')
			, 'COMPLETED': dateParam('completed')
			, 'CATEGORIES': categoriesParam('categories')
			, 'FREEBUSY': freebusyParam('freebusy')
			, 'DTSTAMP': dateParam('dtstamp')
			, 'CREATED': dateParam('created')
			, 'LAST-MODIFIED': dateParam('lastmodified')
			, 'RECURRENCE-ID': recurrenceParam('recurrenceid')
	
		}
	}

	handleObject(name, val, params, ctx, stack, line){
		var self = this

		if(self.objectHandlers[name])
			return self.objectHandlers[name](val, params, ctx, stack, line)

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
  if (!cb)
    return;
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
  return ical.parseICS(fs.readFileSync(filename, 'utf8'))
}


var rrule = require('rrule').RRule

ical.objectHandlers['RRULE'] = function(val, params, curr, stack, line){
  curr.rrule = line;
  return curr
}
var originalEnd = ical.objectHandlers['END'];
ical.objectHandlers['END'] = function (val, params, curr, stack) {
	// Recurrence rules are only valid for VEVENT, VTODO, and VJOURNAL.
	// More specifically, we need to filter the VCALENDAR type because we might end up with a defined rrule 
	// due to the subtypes.
	if ((val === "VEVENT") || (val === "VTODO") || (val === "VJOURNAL")) {
		if (curr.rrule) {
			var rule = curr.rrule.replace('RRULE:', '');
			if (rule.indexOf('DTSTART') === -1) {
				try {
					rule += ';DTSTART=' + curr.start['date'].replace(/[+-]\d\d:\d\d$/g, '').replace(/[-:]/g, '');
				} catch (error) {
					console.error("ERROR when trying to convert to ISOString", error);
				}
			}
			curr.rrule = rrule.fromString(rule);
		}
	}
  return originalEnd.call(this, val, params, curr, stack);
}
