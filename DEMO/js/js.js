;
(function(win, undefined) {
	/**
	 * ==================================================
	 *
	 * PRIVATE API
	 *
	 * ==================================================
	 */

	var doc = win.document,
		tyFunc = typeof

		function() {},
		tyStr = typeof "a",
		tyObj = typeof {},
		JS = {

			/**
			 * ==================================================
			 * LOCK TARGET
			 * ==================================================
			 */


			/**
			 * verrouille la cible pour le traitement
			 * @type élément DOM
			 */
			$target: null,

			/**
			 * récupère l'accès à la cible et la verrouille sur $target pour les traitements
			 *
			 * @param  {String/Object} l’objet à récupérer sur le DOM
			 * @return l’objet JS
			 */
			$: function(target) {

				switch (typeof(target)) {
					case tyStr:
						this.$target = doc.getElementById(target);
						break;
					case tyObj:
						var nodeName = target.nodeName;
						if ((nodeName && (!nodeName.match(/#/gi) || nodeName.match(/#document/gi))) || target.document) this.$target = target;
						break;
				}
				return this;
			},

			/**
			 * ==================================================
			 * LISTENER
			 * ==================================================
			 */

			/**
			 * écoute les événements du DOM
			 * @param {String}   nom de l’événement DOM
			 * @param {Function} fonction à lancé dès l’événement détecté
			 */
			ON: function(eventName, callback) {
				if (this.$target && typeof callback === tyFunc) {
					(function(self, evtName, called) {
						var run = function(evt) {
							called.call(self, evt);
						};
						if (self.$target.addEventListener) self.$target.addEventListener(evtName, run, false);
						else if (self.$target.attachEvent) self.$target.attachEvent('on' + evtName, run);
						else {
							var lowerName = evtName.toLowerCase(),
								capitalizeName = evtName.charAt(0)
									.toUpperCase() + evtName.slice(1)
									.toLowerCase();
							switch (lowerName) {
								case "keydown":
									self.$target.setAttribute('onKeydown', "return " + called.toString());
									if (doc.all) self.$target.onkeydown = run;
									else self.$target.onKeydown = run;
									break;
								case "keypress":
									self.$target.setAttribute('onKeypress', "return " + called.toString());
									if (doc.all) self.$target.onkeypress = run;
									else self.$target.onKeypress = run;
									break;
								case "keyup":
									self.$target.setAttribute('onKeyup', "return " + called.toString());
									if (doc.all) self.$target.onkeyup = run;
									else self.$target.onKeyup = run;
									break;
								case "unload":
									self.$target.setAttribute('unload', "return " + called.toString());
									self.$target.unload = run;
									break;
								default:
									if (self.$target['on' + lowerName] !== undefined) self.$target['on' + lowerName] = run;
									else if (self.$target['on' + evtName] !== undefined) self.$target['on' + evtName] = run;
									else if (self.$target['on' + capitalizeName] !== undefined) self.$target['on' + capitalizeName] = run;
									break;
							}
						}
					})(this, eventName, callback);
				}
				return this;
			},

			/**
			 * ==================================================
			 * WINDOW RESIZE
			 * ==================================================
			 */

			/**
			 * dimension du document : width, height
			 * @type {Array}
			 */
			size: [0, 0],

			/**
			 * redimensionne les éléments de la page qui doivent d’adaptés à la résolution de la fenêtre
			 * @return {l’objet JS}
			 */
			resize: function() {

				var detect = [doc.body.offsetWidth, doc.body.offsetHeight];
				if (detect[0] !== this.size[0] || detect[1] !== this.size[1]) {
					this.size = detect;

					var $wrapper = doc.getElementById('wrapper'),
						contentSize = Math.max(this.size[0] - 194, 1000),
						middleSize = Math.round((contentSize / 2) - 134);

					$wrapper.style.width = Math.max(this.size[0] - 2, 0) + "px";
					$wrapper.style.height = Math.max(this.size[1] - 2, 0) + "px";
					$wrapper.scrollLeft = Math.max(Math.round((1194 - doc.body.offsetWidth) / 2), 0);

					doc.getElementById('content')
						.style.width = contentSize + "px";

					doc.getElementById('tools')
						.style.width = middleSize + "px";
					doc.getElementById('informations')
						.style.width = middleSize + "px";

					doc.getElementById('footer')
						.style.left = Math.round((contentSize - 600) / 2) + "px";

					this.TextY();

				}
				return this;
			},

			/**
			 * ==================================================
			 * TESTY LIBRARY
			 * ==================================================
			 */

			/**
			 * redimensionne le champ de texte en fonction de son contenu
			 * @return {l’objet JS}
			 */
			TextY: function() {

				var min = 50,
					textSize = min,
					$textSize = doc.getElementById('textSize'),
					$pixelSize = doc.getElementById('pixelSize'),
					text = $textSize.value,
					$textLimit = doc.getElementById('textLimit');

				if (win.TextY) {
					textSize = win.TextY($textSize) + min;

					while (textSize > Math.max(this.size[0] - 436, 760)) {
						text = text.substring(0, text.length - 1);
						$textSize.value = text;
						textSize = win.TextY($textSize) + min;
					}

					if (!$textLimit.firstChild) $textLimit.appendChild(doc.createTextNode(text));
					else $textLimit.firstChild.nodeValue = text;

					win.TextY($textLimit, {
						limit: true,
						clear: true,
						min: 12
					});
				}

				$textSize
					.style.width = Math.max(textSize, min) + "px";
				doc.getElementById('textWrapp')
					.style.width = Math.max(textSize + 4, min) + "px";
				doc.getElementById('head')
					.style.width = Math.max(textSize + 244, min) + "px";
				if (!$pixelSize.firstChild)
					$pixelSize.appendChild(doc.createTextNode((textSize - min) + "px"));
				else
					$pixelSize.firstChild.nodeValue = (textSize - min) + "px";

				return this;
			},

			/**
			 * change la police affichée pour le champ de texte
			 * @return {l’objet JS}
			 */
			applyFont: function() {

				var fontClass = doc.getElementById('fontPicker')
					.value;

				doc.getElementById('textSize')
					.className = fontClass;

				doc.getElementById('textLimit')
					.className = fontClass;
				JS.TextY();
				return this;
			},

			applySize: function() {
				var size = parseInt(doc.getElementById('sizePicker')
					.value, 10);

				if (size && size !== parseInt(null, 10)) {
					doc.getElementById('textSize')
						.style.fontSize = size + "px";
					doc.getElementById('textLimit')
						.style.fontSize = size + "px";
				}
				JS.TextY();
				return this;
			}
		},

		/**
		 * ==================================================
		 *
		 * PUBLIC API
		 *
		 * ==================================================
		 */

		js = {
			/**
			 * met en forme la page une fois chargée
			 * @return l’objet js
			 */
			init: function() {

				JS.$(win)
					.ON('resize', JS.resize)
					.$(doc)
					.ON('resize', JS.resize)
					.$(doc.body)
					.ON('resize', JS.resize)
					.resize()
					.$('fontPicker')
					.ON('change', JS.applyFont)
					.$('sizePicker')
					.ON('change', JS.applySize)
					.$('textSize')
					.ON('keypress', JS.TextY)
					.ON('keydown', JS.TextY)
					.ON('keyup', JS.TextY)
					.$target.focus();

				if (win.TextY) win.TextY
					.addFont('cursive', true)
					.addFont('monospace', true)
					.addFont('serif', true)
					.addFont('sans-serif', true)
					.addFont('fantasy', true)
					.addFont('default', true)
					.addFont('Arial', true)
					.addFont('Arial Black', true)
					.addFont('Arial Narrow', true)
					.addFont('Arial Rounded MT Bold', true)
					.addFont('Bookman Old Style', true)
					.addFont('Bradley Hand ITC', true)
					.addFont('Century', true)
					.addFont('Century Gothic', true)
					.addFont('Comic Sans MS', true)
					.addFont('Courier', true)
					.addFont('Courier New', true)
					.addFont('Georgia', true)
					.addFont('Gentium', true)
					.addFont('Impact', true)
					.addFont('King', true)
					.addFont('Lucida Console', true)
					.addFont('Lalit', true)
					.addFont('Modena', true)
					.addFont('Monotype Corsiva', true)
					.addFont('Papyrus', true)
					.addFont('Tahoma', true)
					.addFont('TeX', true)
					.addFont('Times', true)
					.addFont('Times New Roman', true)
					.addFont('Trebuchet MS', true)
					.addFont('Verdana', true)
					.addFont('Verona', true);

				return this;
			}
		};

	win.JS = js.init();

})(window);