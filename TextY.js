/**
 * TextY v0.1
 *
 * @author Diono CORBEL
 * http://www.diono.fr/
 * http://www.dionofolio.com/
 * http://www.dionoportfolio.com/
 */

;
(function(win, undefined) {

	// ==================================================
	//
	//                    PRIVATE API
	//
	// ==================================================

	// accelerate access to the document
	var doc = win.document,

		// recover the value of NaN execution engine javascript for validations
		nan = parseInt(null, 10).toString(),

		// retrieve the type of functions for validation
		tyFct = typeof

		function() {},

		// retrieve the type of DOM objects for validations
		tyDom = typeof doc,

		// retrieve the type of objects for validations
		tyObj = typeof {},

		// renderer TextY
		TEXTY = {

			// ==================================================
			// DEFINITIONS
			// ==================================================

			// list of definitions for each registered policy (selection of the most used)
			fonts: {
				"arial": [10, , , , /(['ijl]|%27)/, /([ !,\.\/:;I\[\\\]ft\| ,]|%(20|21|2C|2F|3A|3B|5B|5C|5D|7C|20|2C))/, /(["\(\)\-`r\{\}]|%(22|28|29|60|7B|7D))/, /[\*]/, /([\^x]|%5E)/, /([#\$0123456789\?JL_abcdeghknopqsuvyz]|%(23|24|3F))/, /([\+<=>FTZ~]|%(2B|3C|3D|3E|7E))/, /([&ABEKPSVXY]|%26)/, /[CDHNRUw]/, /[GOQ]/, /[Mm]/, /(%|%25)/, /W/, /(@|%40)/],
				"arial black": [11, , , , , /(['\/\\\|]|%(27|2F|5C|7C))/, /([ !,\-\.:;`ijl ,]|%(20|21|2C|3A|3B|60|20|2C))/, /([\(\)I\[\]f\{\}]|%(28|29|5B|5D|7B|7D))/, /[rt]/, /(["\*_z]|%22)/, /([\?svy]|%3F)/, /([#\$\+0123456789<=>FJL\^abcdeghknopqux~]|%(23|24|2B|3C|3D|3E|5E|7E))/, /([@EPSTZ]|%40)/, /[ABCDRVXY]/, /[GHKNOQU]/, /(&|%26)/, /[Mw]/, /([%Wm]|%25)/],
				"arial narrow": [8, , , /(['ijl]|%27)/, /([ !,\.\/:;I\[\\\]ft\| ,]|%(20|21|2C|2F|3A|3B|5B|5C|5D|7C|20|2C))/, /(["\(\)\-`r\{\}]|%(22|28|29|60|7B|7D))/, /[\*]/, /([J\^cksvxyz]|%5E)/, /([#\$\+0123456789<=>\?L_abdeghnopqu~]|%(23|24|2B|3C|3D|3E|3F|7E))/, /([&ABEFKPSTVXYZ]|%26)/, /[CDHNRUw]/, /[GMOQm]/, /(%|%25)/, /W/, /(@|%40)/],
				"arial rounded mt bold": [10, , , , /('|%27)/, /([ \/\\ijl\| ]|%(20|2F|5C|7C|20))/, /([!\(\),\-\.:;I\[\]`ft,]|%(21|28|29|2C|3A|3B|5B|5D|60|2C))/, /([\{\}]|%(7B|7D))/, /(["\*r]|%22)/, /([#_svxyz]|%23)/, /([\$\+0123456789<=>\?FJLX\^acehknou~]|%(24|2B|3C|3D|3E|3F|5E|7E))/, /[EPSTYZbdgpq]/, /[ABCDKRV]/, /([&GHNOQU]|%26)/, /([%Mw]|%25)/, /m/, /([@W]|%40)/],
				"bookman old style": [10, , , , /('|%27)/, /([!\(\)\[\]ijl\{\}]|%(21|28|29|5B|5D|7B|7D))/, /([ ,\.:;I`f ,]|%(20|2C|3A|3B|60|20|2C))/, /(["\-t]|%22)/, /[\*rz]/, /([\?_cegsvy]|%3F)/, /([#\$\+\/0123456789<=>JLPT\\\^abdkopqx\|~]|%(23|24|2B|2F|3C|3D|3E|5C|5E|7C|7E))/, /[AFSYZhnu]/, /[BCEKNRVX]/, /([&DGHOQUw]|%26)/, /(@|%40)/, /([%M]|%25)/, /[Wm]/],
				"bradley hand itc": [10, , , , /('|%27)/, /([ !",\.:;IJijl ,]|%(20|21|22|2C|3A|3B|20|2C))/, /[\-et]/, /([\(\)\/\?\[\\\]_cfor\{\}]|%(28|29|2F|3F|5B|5C|5D|7B|7D))/, /[1abpsvx]/, /([\*089FP`dhz\|]|%(60|7C))/, /([#&2356CELTgkqu]|%(23|26))/, /([\$47BDVXYnwy]|%24)/, /([%@AGHKOQRSU]|%(25|40))/, /N/, /([\+<=>Mm~]|%(2B|3C|3D|3E|7E))/, /Z/, /W/, /([\^]|%5E)/],
				"century": [10, , , , /('|%27)/, /([ !,\.\/:;j ,]|%(20|21|2C|2F|3A|3B|20|2C))/, /([\(\)\-\[\]`fil\{\}]|%(28|29|5B|5D|60|7B|7D))/, /(["It]|%22)/, /([\?crsz]|%3F)/, /([#\$\*0123456789J_abegoqvxy]|%(23|24))/, /([\+<=>Z\\\^dhknpu\|~]|%(2B|3C|3D|3E|5C|5E|7C|7E))/, /[FLPST]/, /([@ABCERVXY]|%40)/, /[DGKOQw]/, /([%&HNU]|%(25|26))/, /m/, /[MW]/],
				"century gothic": [10, , , , /(['Iijl]|%27)/, /([ !",\.:;r ,]|%(20|21|22|2C|3A|3B|20|2C))/, /([\(\)\-\[\]ft\{\}]|%(28|29|5B|5D|7B|7D))/, /([\*T`sz]|%60)/, /([\/FJLZx]|%2F)/, /([\$0123456789ES_kvy]|%24)/, /([\+<=>\?BKPRXY\\hnu~]|%(2B|3C|3D|3E|3F|5C|7E))/, /([HU\^abcegopq\|]|%(5E|7C))/, /([#ADNVd]|%23)/, /([%&]|%(25|26))/, /([@COQw]|%40)/, /[GM]/, /[Wm]/],
				"comic sans ms": [10, , , , /([!\.]|%21)/, /([ ,:;il ,]|%(20|2C|3A|3B|20|2C))/, /([\(\)\{\}]|%(28|29|7B|7D))/, /(["'\-<>\[\]j\|]|%(22|27|3C|3E|5B|5D|7C))/, /([\+1rstv]|%2B)/, /([\*\/=\?ILP\\`acefgknopquyz]|%(2F|3D|3F|5C|60))/, /([023456789CFK\^bdhx~]|%(5E|7E))/, /([&BEGJRTVY_w]|%26)/, /([\$ADSUXZ]|%24)/, /[HNOm]/, /([#%]|%(23|25))/, /([@MQ]|%40)/, , /W/],
				"courier": [10, , , , , , , , , , /([ !"#\$%&'\(\)\*\+,\-\.\/0123456789:;<=>\?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz\{\|\}~ ,]|%(20|21|22|23|24|25|26|27|28|29|2B|2C|2F|3A|3B|3C|3D|3E|3F|40|5B|5C|5D|5E|60|7B|7C|7D|7E|20|2C))/],
				"courier new": [10, , , , , , , , , , /([ !"#\$%&'\(\)\*\+,\-\.\/0123456789:;<=>\?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz\{\|\}~ ,]|%(20|21|22|23|24|25|26|27|28|29|2B|2C|2F|3A|3B|3C|3D|3E|3F|40|5B|5C|5D|5E|60|7B|7C|7D|7E|20|2C))/],
				"cursive": [10, , , , /([!\.]|%21)/, /([ ,:;il ,]|%(20|2C|3A|3B|20|2C))/, /([\(\)\{\}]|%(28|29|7B|7D))/, /(["'\-<>\[\]j\|]|%(22|27|3C|3E|5B|5D|7C))/, /([\+1rstv]|%2B)/, /([\*\/=\?ILP\\`acefgknopquyz]|%(2F|3D|3F|5C|60))/, /([023456789CFK\^bdhx~]|%(5E|7E))/, /([&BEGJRTVY_w]|%26)/, /([\$ADSUXZ]|%24)/, /[HNOm]/, /([#%]|%(23|25))/, /([@MQ]|%40)/, , /W/],
				"default": [8, , , /([ , ,]|%(20|2C|20|2C))/, /(['\.:;]|%(27|3A|3B))/, /([!\*\-I\[\]fijlt\|]|%(21|5B|5D|7C))/, /(["\(\)J`rz\{\}]|%(22|28|29|60|7B|7D))/, /([\/17EFLZ\\x]|%(2F|5C))/, /([TXY\^cksvy]|%5E)/, /([\$\+02345689<=>\?ABCDGHKNOPQRSUV_abdeghnopqu~]|%(24|2B|3C|3D|3E|3F|7E))/, /(&|%26)/, /([#w]|%23)/, /([%M]|%25)/, /([@m]|%40)/, /W/],
				"fantasy": [8, , , /([ , ,]|%(20|2C|20|2C))/, /(['\.:;]|%(27|3A|3B))/, /([!\*\-I\[\]fijlt\|]|%(21|5B|5D|7C))/, /(["\(\)J`rz\{\}]|%(22|28|29|60|7B|7D))/, /([\/17EFLZ\\x]|%(2F|5C))/, /([TXY\^cksvy]|%5E)/, /([\$\+02345689<=>\?ABCDGHKNOPQRSUV_abdeghnopqu~]|%(24|2B|3C|3D|3E|3F|7E))/, /(&|%26)/, /([#w]|%23)/, /([%M]|%25)/, /([@m]|%40)/, /W/],
				"gentium": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"georgia": [10, , , , /([ ' ]|%(20|27|20))/, /([,\.ijl,]|%(2C|2C))/, /([!:;ft]|%(21|3A|3B))/, /(["\(\)\-1I\[\]rs\{\|\}]|%(22|28|29|5B|5D|7B|7C|7D))/, /([\*\/\?\\cevyz]|%(2F|3F|5C))/, /([2357J`agkox]|%60)/, /([\$04689FLPSTYZbdhnpqu]|%24)/, /([#\+<=>ABCEV\^_~]|%(23|2B|3C|3D|3E|5E|7E))/, /([&GKOQRXw]|%26)/, /[DNU]/, /([%H]|%25)/, /([@Mm]|%40)/, /W/],
				"impact": [8, , , /([ , ,]|%(20|2C|20|2C))/, /(['\.:;]|%(27|3A|3B))/, /([!\*\-I\[\]fijlt\|]|%(21|5B|5D|7C))/, /(["\(\)J`rz\{\}]|%(22|28|29|60|7B|7D))/, /([\/17EFLZ\\x]|%(2F|5C))/, /([TXY\^cksvy]|%5E)/, /([\$\+02345689<=>\?ABCDGHKNOPQRSUV_abdeghnopqu~]|%(24|2B|3C|3D|3E|3F|7E))/, /(&|%26)/, /([#w]|%23)/, /([%M]|%25)/, /([@m]|%40)/, /W/],
				"king": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"lalit": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"lucida console": [10, , , , , , , , , , /([ !"#\$%&'\(\)\*\+,\-\.\/0123456789:;<=>\?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz\{\|\}~ ,]|%(20|21|22|23|24|25|26|27|28|29|2B|2C|2F|3A|3B|3C|3D|3E|3F|40|5B|5C|5D|5E|60|7B|7C|7D|7E|20|2C))/],
				"modena": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"monospace": [10, , , , , , , , , , /([ !"#\$%&'\(\)\*\+,\-\.\/0123456789:;<=>\?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz\{\|\}~ ,]|%(20|21|22|23|24|25|26|27|28|29|2B|2C|2F|3A|3B|3C|3D|3E|3F|40|5B|5C|5D|5E|60|7B|7C|7D|7E|20|2C))/],
				"monotype corsiva": [9, , , /('|%27)/, /([ "\),\.;\[`ijl\{\} ,]|%(20|22|29|2C|3B|5B|60|7B|7D|20|2C))/, /([!\(\-:r]|%(21|28|3A))/, /([\/\]cefst]|%(2F|5D))/, /([\*\?IJabgoqxy]|%3F)/, /([\$0123456789S\\dhknpuvz]|%(24|5C))/, /([\+<=>CPT\^_\|~]|%(2B|3C|3D|3E|5E|7C|7E))/, /[ABEFGLOQRXYZm]/, /([#%HKVw]|%(23|25))/, /([@DNU]|%40)/, /(&|%26)/, /M/, /W/],
				"papyrus": [11, , , , /([ !',\.:;ijl ,]|%(20|21|27|2C|3A|3B|20|2C))/, /I/, /(["\(\)\*\-\[\]frt]|%(22|28|29|5B|5D))/, /([\?`vxz\{\}]|%(3F|60|7B|7D))/, /[cks]/, /[aeghnquy]/, /([#\$\+\/0123456789<=>\\\^_bdopw\|~]|%(23|24|2B|2F|3C|3D|3E|5C|5E|7C|7E))/, /([%&JPm]|%(25|26))/, /L/, /([@FRVX]|%40)/, /[YZ]/, /K/, /[ABDEHNST]/, /[CGMU]/, /[OW]/, /Q/],
				"sans-serif": [10, , , , /(['ijl]|%27)/, /([ !,\.\/:;I\[\\\]ft\| ,]|%(20|21|2C|2F|3A|3B|5B|5C|5D|7C|20|2C))/, /(["\(\)\-`r\{\}]|%(22|28|29|60|7B|7D))/, /[\*]/, /([\^x]|%5E)/, /([#\$0123456789\?JL_abcdeghknopqsuvyz]|%(23|24|3F))/, /([\+<=>FTZ~]|%(2B|3C|3D|3E|7E))/, /([&ABEKPSVXY]|%26)/, /[CDHNRUw]/, /[GOQ]/, /[Mm]/, /(%|%25)/, /W/, /(@|%40)/],
				"serif": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"tahoma": [9, , , , /(['il]|%27)/, /([,\.j,]|%(2C|2C))/, /([ !\-:;frt ]|%(20|21|3A|3B|20))/, /(["\(\)\/IJ\[\\\]\|]|%(22|28|29|2F|5B|5C|5D|7C))/, /([\?csxz\{\}]|%(3F|7B|7D))/, /([\$\*0123456789FLPSZ_`abdeghknopquvy]|%(24|60))/, /[ABCEKRTVXY]/, /([&DGHNU]|%26)/, /([#\+<=>OQ\^w~]|%(23|2B|3C|3D|3E|5E|7E))/, /M/, /m/, /([@W]|%40)/, /(%|%25)/],
				"tex": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"times": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"times new roman": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/],
				"trebuchet ms": [9, , , /('|%27)/, , /([ Iil ]|%(20|20))/, /([!"\(\)\*,\-\.:;\?\[\\\]fj\{\},]|%(21|22|28|29|2C|3A|3B|3F|5B|5C|5D|7B|7D|2C))/, /[rst]/, /[JScvyz]/, /([#\$\+\/0123456789<=>EFLPXZ\^_`abdeghknopqux\|~]|%(23|24|2B|2F|3C|3D|3E|5E|60|7C|7E))/, /([%ABCDKRTVY]|%25)/, /[GHNOQU]/, /([&Mw]|%26)/, /(@|%40)/, /[Wm]/],
				"verdana": [11, , , , , /(['il]|%27)/, /([ ,\.fj ,]|%(20|2C|20|2C))/, /([!Irt]|%21)/, /(["\(\)\-\/:;J\[\\\]\|]|%(22|28|29|2F|3A|3B|5B|5C|5D|7C))/, /([\?Lcsz]|%3F)/, /[FPTYaekovxy]/, /([\$\*0123456789AESV_`bdghnpqu\{\}]|%(24|60|7B|7D))/, /([&BCKRUXZ]|%26)/, /[DGHNOQ]/, /([#\+<=>M\^w~]|%(23|2B|3C|3D|3E|5E|7E))/, , /[Wm]/, /(@|%40)/, /(%|%25)/],
				"verona": [10, , , /('|%27)/, /([\|]|%7C)/, /([ ,\.\/:;\\ijlt ,]|%(20|2C|2F|3A|3B|5C|20|2C))/, /([!\(\)\-I\[\]`fr]|%(21|28|29|5B|5D|60))/, /(["Js]|%22)/, /([\?\^acez\{\}]|%(3F|5E|7B|7D))/, /([#\$\*0123456789FPS_bdghknopquvxy~]|%(23|24|7E))/, /([\+<=>ELTZ]|%(2B|3C|3D|3E))/, /[BCR]/, /[ADGHKNOQUVXYw]/, /([&m]|%26)/, /(%|%25)/, /([@M]|%40)/, /W/]
			},

			// ==================================================
			// TEXT PROCESSING
			// ==================================================

			// minimum size of a still readable font
			minSize: 7,

			//
			// convert the value of measures in pixels
			// ---------------------------------------
			//
			// @param  String/Number value the value to convert
			// @return String/Number       the value converted
			//
			fontSizeInPixels: function(value) {

				// if the value is in points
				if (/^\d+([\.,]\d+)?pt$/i.test(value)) value = (parseFloat(value) * 16) / 12;
				// if the value is in font size
				else if (/^\d+([\.,]\d+)?em$/i.test(value)) value = parseFloat(value) * 16;
				// if the value is in percentages
				else if (/^\d+([\.,]\d+)?%$/i.test(value)) value = (parseFloat(value) * 16) / 100;
				// if the value is in pixels
				else if (/^\d+([\.,]\d+)?px$/i.test(value)) value = parseFloat(value);

				return value;
			},

			//
			// Return the value of the css property asked
			// ------------------------------------------
			//
			// @param  Object DOM    the DOM object selected (NOT JQuery selector)
			// @param  String css    the property's name
			// @param  Boolean loop  if it's call by the function himself
			// @return String/Number the value
			//
			getCssProperty: function(DOM, css, loop) {

				// defines the returned value
				var value = "";

				// if the DOM element is not a string
				if (DOM && DOM.nodeName && !/#text/i.test(DOM.nodeName)) {

					var getComputedStyle = doc.defaultView && typeof doc.defaultView.getComputedStyle === tyFct ? doc.defaultView.getComputedStyle(DOM, null) : (typeof window.getComputedStyle === tyFct ? window.getComputedStyle(DOM, null) : null);

					if (getComputedStyle) value = getComputedStyle.getPropertyValue(css);
					else if (DOM.currentStyle) value = DOM.currentStyle[css];
					else if (DOM.style) value = DOM.style[css];

				}

				// if a value was found
				if (value) value = /(px|pt|em|%)/i.test(value) ? this.fontSizeInPixels(value) : value;

				// try to convert css name to find value example : font-family <> fontFamily
				else if (!loop) {

					var split_css = [];

					if (/\-/.test(css)) {
						split_css = css.split('-');

						if (split_css.length > 1) value = this.getCssProperty(DOM, split_css[0] + split_css[1].charAt(0)
							.toUpperCase() + split_css[1].slice(1), true);

					} else if (/[A-Z]/.test(css)) {
						split_css = css.match(/([a-z]*)([A-Z])([a-z]*)/);

						if (split_css.length > 3) value = this.getCssProperty(DOM, split_css[1] + '-' + split_css[2].toLowerCase() + split_css[3], true);

					}

				} else if (DOM.parentNode) value = this.getCssProperty(DOM.parentNode, css);
				else if (DOM.parentElement) value = this.getCssProperty(DOM.parentElement, css);


				return value;
			},

			//
			// Computes in pixels the size of the sentence
			// -------------------------------------------
			//
			// @param  String word     the sentence
			// @param  String fontName the name of the font used
			// @return Number          the size of the sentence in pixels
			//
			wordSize: function(word, fontName) {

				// defines size of word
				var size = 0;

				// if some words
				if (word) {

					// gets number of letters in the word
					var word_length = word.length;

					// if the font is registered
					if (this.fonts[fontName]) {

						// gets numbers of different letter's size
						var different_length = this.fonts[fontName].length;

						// for each letter in the word
						for (var i = 0; i < word_length; i++) {

							var letter = word.charAt(i), // gets the letter
								median_size = this.fonts[fontName][0]; // get's the median size of the font (average of all sizes)

							// if the letter is an hexa code
							if (letter.match(/%/gi)) {

								// gets the complete hexa code
								letter = word.substr(i, 3);

								// move up on the loop
								i += 3;
							}

							// looking for the letter's size
							for (var j = 1; j < different_length; j++) {

								// if found the letter
								if (this.fonts[fontName][j] && this.fonts[fontName][j].test(letter)) {

									// replace median size by the letter size
									median_size = j;

									// break the loop
									j = different_length;
								}
							}

							// compute the word size by letters
							size += median_size;
						}

						// if the font is NOT registered
					} else size = word_length * 7;

				}

				// return computed word size
				return size;
			},

			//
			// rescue text in DOM
			// ------------------
			//
			// @param  Object DOM        valid DOM
			// @param  Boolean recursive loop in children of the DOM to find every texts
			// @return String            string value in DOM
			//
			getText: function(DOM, recursive) {
				var text = "",
					nodeName = DOM.nodeName;

				if (/^#text$/i.test(nodeName)) text += DOM.nodeValue;
				else if (/^(input|textarea)$/i.test(nodeName)) text += DOM.value;
				else if (recursive) {
					var length = DOM.childNodes ? DOM.childNodes.length : 0;
					for (var i = 0; i < length; i++) text += this.getText(DOM.childNodes[i], true);
				}

				return text;
			},

			//
			// gets sentence size in selector
			// ------------------------------
			//
			// @param  Object DOM           selection of the container in the DOM
			// @param  Boolean/Number limit enforce a size limit for text and adjust its size and its contents so that it does not exceed
			// @param  Number min           defines the threshold beyond which the text can not be reduced
			// @return Number      the size of sentence in pixels
			//
			getWordSize: function(DOM, limit, min) {

				var size = 0;

				if (typeof DOM === tyDom && DOM.nodeName) {

					var fontSize = this.getCssProperty(DOM, "font-size"),
						fontFamily = this.getCssProperty(DOM, "font-family"),
						textIndent = this.getCssProperty(DOM, "text-indent"),
						text = this.getText(DOM, true),
						limitString = parseInt(limit, 10).toString();

					textIndent = textIndent.toString() !== nan ? textIndent : 0;

					fontFamily = fontFamily
						.replace(/["']/gi, "")
						.toLowerCase();

					size = textIndent + Math.ceil(((this.wordSize(text, fontFamily) * fontSize) / 16));

					if (limit && limitString === nan) {
						limit = DOM.offsetWidth || DOM.clientWidth;
						var paddingRight = parseInt(this.getCssProperty(DOM, "padding-right"), 10),
							paddingLeft = parseInt(this.getCssProperty(DOM, "padding-left"), 10);

						if (paddingRight.toString() !== nan) limit -= paddingRight;
						if (paddingLeft.toString() !== nan) limit -= paddingLeft;

						limit = Math.max(limit - 10, 0);

						limitString = parseInt(limit, 10).toString();
					}

					if (limit && limitString !== nan) {

						if (size > limit) {
							if (!DOM.TextYSize) DOM.TextYSize = fontSize;
						fontSize = min || this.minSize;

							size = textIndent + Math.ceil(((this.wordSize(text, fontFamily) * fontSize) / 16));

							if (size > limit || (DOM.TextYText && text !== DOM.TextYText)) {
								if (!DOM.TextYText) DOM.TextYText = text;
								else text = DOM.TextYText;

								var newText = "";

								while (size > limit && textIndent < limit) {
									text = text.substring(0, text.length - 1);
									newText = text + " ...";
									size = textIndent + Math.ceil(((this.wordSize(newText, fontFamily) * fontSize) / 16));
								}
								text = newText;
							} else {
								DOM.TextYText = null;
								while (size <= limit) {
									fontSize++;
									size = textIndent + Math.ceil(((this.wordSize(text, fontFamily) * fontSize) / 16));
								}
								fontSize--;
							}

							DOM.style.fontSize = fontSize + "px";
							if (/^#text$/i.test(DOM.firstChild.nodeName)) DOM.firstChild.nodeValue = text;
						} else if (DOM.TextYSize && fontSize !== DOM.TextYSize) {
							while (size > 0 && size <= limit) {
								fontSize++;
								size = textIndent + Math.ceil(((this.wordSize(text, fontFamily) * fontSize) / 16));
							}
							fontSize--;
							fontSize = Math.min(fontSize, DOM.TextYSize);

							DOM.style.fontSize = fontSize + "px";

							if (fontSize === DOM.TextYSize) {
								DOM.TextYSize = null;
							}
						}
					}
				}

				return size;
			},

			// ==================================================
			// GENERATOR DEFINITIONS
			// ==================================================

			// generates default div to clone
			div: doc.createElement("div"),

			// generates default span to clone
			span: doc.createElement("span"),

			// generates default style to clone
			sty: doc.createElement("style"),

			// list of letters to computes
			letters: [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', ' ', ','],

			// prevent multiple definition generating at the same time
			processing: false,

			// list of definitions awaiting processing
			waiting: [],

			// list of features javascript to encode special characters
			hexaWin: ['escape', 'encodeURI', 'encodeURIComponent'],

			// container to generate a sequence of characters to retrieve their actual size in the DOM
			$genContainer: null,

			//
			// convert special character in their hexadecimal code
			// ---------------------------------------------------
			//
			// @param  String string the character to convert
			// @return String        the converted character
			//
			toHexa: function(string) {
				var hexa = string;
				for (var i = 0, winLength = this.hexaWin.length; i < winLength; i++) {
					if (typeof win[this.hexaWin[i]] === tyFct) {

						hexa = win[this.hexaWin[i]](string);

						if (hexa !== string) {

							i = winLength;
							break;
						}
					}
				}
				return hexa;
			},

			//
			// generates a list of characters rendered in the DOM to calculate their size and update the font
			// ----------------------------------------------------------------------------------------------
			//
			// @param  String font name of the font
			// @return Object      access TextY
			//
			generatesFontMap: function(font) {
				if (!this.processing) {
					this.processing = true;

					var length = this.letters.length;

					if (!this.$genContainer) {

						this.$genContainer = this.div.cloneNode(true);
						var $style = this.sty.cloneNode(true),
							$telltale = this.span.cloneNode(true);

						this.$genContainer.id = 'TextY-genContainer';

						this.$genContainer.style.fontFamily = font;
						this.$genContainer.style.fontWeight = "normal";
						this.$genContainer.style.fontSize = "160px";
						this.$genContainer.style.color = "transparent";
						this.$genContainer.style.position = "absolute";
						this.$genContainer.style.bottom = "100%";
						this.$genContainer.style.right = "100%";

						$style.type = "text/css";
						$style.appendChild(doc.createTextNode("#TextY-genContainer span{display:inline-block;float:left;margin:0;padding:0;font-size:160px;}"));
						this.$genContainer.appendChild($style);

						$telltale.appendChild(doc.createTextNode(".."));
						this.$genContainer.appendChild($telltale);

						for (var i = 0; i < length; i++) {
							var $simpleLetter = this.span.cloneNode(true);

							$simpleLetter.appendChild(doc.createTextNode("." + this.letters[i] + "."));

							this.$genContainer.appendChild($simpleLetter);
						}

						doc.body.appendChild(this.$genContainer);
					} else {

						this.$genContainer.style.fontFamily = font;
					}

					(function(self, tLength, tFont) {
						win.setTimeout(function() {

							var result = [],
								hexaResult = [],
								median = 0,
								medianLength = 0,
								waitingLength = self.waiting.length,
								newWaiting = [],
								telltaleSize = self.$genContainer.childNodes[1] ? self.$genContainer.childNodes[1].offsetWidth : 0;

							for (i = 0; i < tLength; i++) {

								var child = self.$genContainer.childNodes[i + 2],
									size = child ? (((child.offsetWidth - telltaleSize) / 10) << 0) + 1 : 0;

								var selected = result[size] || "",
									hexa = self.letters[i];

								if (hexa.length === 1) {

									if (/[a-zA-Z0-9]/.test(hexa)) {
										median += size;
										medianLength++;
									}

									selected += hexa.replace(/([\\\.\$\[\]\(\)\{\}\^\?\*\+\-\|\/])/, "\\$1")
										.replace('/\s/', "\\s");

									result[size] = selected;

									hexa = self.toHexa(hexa);

									if (hexa !== self.letters[i] && hexa.length === 3) {

										var hexaSelected = hexaResult[size] || "";

										if (hexaSelected.length > 0) hexaSelected += '|';

										hexaSelected += hexa.replace('%', '');

										hexaResult[size] = hexaSelected;
									}
								}
							}

							var fontMap = [(0.5 + (median / medianLength)) << 0],
								resultLength = result.length;

							for (i = 1; i < resultLength; i++) {
								var content = "";

								if (hexaResult[i]) content += "(";

								if (result[i]) {
									if (result[i].length > 1) {
										content += "[";
										content += result[i];
										content += "]";
									} else content += result[i];
								}

								if (hexaResult[i]) {
									if (/\|/.test(hexaResult[i])) {
										content += "|%(";
										content += hexaResult[i];
										content += "))";
									} else {
										content += "|%";
										content += hexaResult[i];
										content += ")";
									}
								}

								fontMap[i] = content.length > 0 ? new RegExp(content) : null;
							}

							self.fonts[tFont.toLowerCase()] = fontMap;

							for (i = 0; i < waitingLength; i++) {
								if (self.waiting[i] !== tFont) {
									newWaiting[newWaiting.length] = self.waiting[i];
								}
							}

							self.waiting = newWaiting;

							if (newWaiting.length > 0) {
								self.processing = false;
								self.generatesFontMap(newWaiting[0]);
							} else {

								if (win.console && typeof win.console.log == tyFct) {
									var textLog = "";
									for (var fontName in self.fonts) {
										textLog += ('"' + fontName + '":[' + self.fonts[fontName] + "],");
									}
									console.log(textLog.substring(0, textLog.length - 1));
								}

								doc.body.removeChild(self.$genContainer);
								self.$genContainer = null;
								self.processing = false;
							}

						}, 0);
					})(this, length, font);
				} else this.waiting[this.waiting.length] = font;

				return this;
			}
		},

		// ==================================================
		//
		//                    PUBLIC API
		//
		// ==================================================

		//
		// perform the calculation and resizing text in its container
		// ----------------------------------------------------------
		//
		// @param  Object DOM     selection of the container in the DOM
		// @param  Object options settings : {
		//                            limit: Boolean/Number enforce a size limit for text and adjust its size and its contents so that it does not exceed
		//                            clear: Boolean        deletes the reference text container to the update before calculating its size
		//                            min:   Number         defines the threshold beyond which the text can not be reduced
		//                        }
		// @return Number         font size when treated
		//
		texty = function(DOM, options) {

			var limit = false,
				min = TEXTY.minSize;

			if (typeof options === tyObj) {
				if (options.clear) DOM.TextYText = null;
				limit = options.limit;

				var userMin = parseInt(options.min, 10);

				if (userMin.toString() !== nan) min = userMin;
			}

			return TEXTY.getWordSize(DOM, limit, min);
		};

	//
	// Adds a new definition of the size of characters in a font
	// ---------------------------------------------------------
	//
	// @param String/Object font name of the new font or size chart of characters in the new font
	// @param Boolean override   overwrites a definition if it already exists
	// @return Object            Public Library TextY for chaining
	//
	texty.addFont = function(font, override) {
		if (typeof font === tyObj) {
			for (var name in font) {
				var lowerName = name.toLowerCase();
				if (override || !TEXTY.fonts[lowerName])
					TEXTY.fonts[lowerName] = font[lowerName];

			}
		} else if (typeof font === typeof "a") {
			var fontLower = font.toLowerCase();

			if (override || !TEXTY.fonts[fontLower])
				TEXTY.generatesFontMap(font);
		}
		return this;
	};

	// attaches the TextY library windows
	win.TextY = texty;
})(window);