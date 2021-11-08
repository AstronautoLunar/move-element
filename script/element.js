class ElementInterface {
	constructor({ 
		type = "div", 
		attributeElement, 
		classElement, 
		elementFather = window.document.body
	} = {}) {
		let element = window.document.createElement(type);
		if(attributeElement) {
			element.setAttribute(attributeElement.name, attribute.value);
		}

		if(classElement) {
			element.classList.add(classElement);
		}

		const exitElementCreated = window.document.createElement("div");
		exitElementCreated.classList.add("exit-radius");

		this._exitElement = exitElementCreated;
		this._element = element;
		this._elementFather = elementFather;
		this._localization = {};
		this._dataElement = {};
	}

	get element() {
		return this._element;
	}

	get elementFather() {
		return this._elementFather;
	}

	set localization(value) {
		this._localization = value;
	}

	get localization() {
		return this._localization;
	}

	set dataElement(value) {
		this._dataElement = value;
	}

	get dataElement() {
		return this._dataElement;
	}

	get exitElement() {
		return this._exitElement;
	}

	render() {
		this.elementFather.appendChild(this.element);
	}

	children({ type = "text", value }) {
		let typeValidate = null;
		const errorType = {
			text: "Invalid text type",
			html: "Invalid pure HTML type",
			element: "Invalid element type"
		}

		switch(type) {
			case "text":
				typeValidate = "";

				if(typeof typeValidate == typeof value) {
					this.element.innerText = value;
				} else {
					return console.log(new Error(errorType.text));
				}

				break;
			case "html-pure":
				typeValidate = "";

				if(typeof typeValidate == typeof value) {
					this.element.innerHTML = value;
				} else {
					return console.log(new Error(errorType.html));
				}

				break;
			case "element":
				typeValidate = {};

				if(typeof typeValidate == typeof value) {
					this.element.appendChild(value);
				} else {
					console.log(errorType.element);
					return console.log(new Error(errorType.element));
				}

				break;
			default:
				return new Error("Invalid type");
		}
	}

	style(declarationArray = []) {
		declarationArray.forEach(item => {
			this.element.style[item.property] = item.value;
		});
	}

	values() {
		return [
			this.element,
			this.elementFather
		]
	}

	eventApply(eventArray = []) {
		eventArray.forEach(item => {
			this.element.addEventListener(item.event, item.action);
		});
	}

	moveElement({
		action = {}
	}) {
		

		const eventClick = ({ target }) => {
			target.classList.toggle("selected");

			const verifySelectedTarget = target.classList.contains("selected");

			if(verifySelectedTarget) {
				action.on(this.element);
			} else {
				action.off(this.element);
			}
		}

		const eventMouseMove = ({ 
			target, 
			pageX, 
			pageY 
		}) => {
			const verifySelectedTarget = target.classList.contains("selected");
			let widthElement = Number(target.style.width.split("px")[0]);
			let heightElement = Number(target.style.height.split("px")[0]);
			let centerWidthTarget = widthElement / 2;
			let centerHeightTarget = heightElement / 2;
			
			this.dataElement = {
				widthElement,
				heightElement,
				centerWidthTarget,
				centerHeightTarget
			}

			if(verifySelectedTarget) {
				target.style.position = "absolute";
				target.style.left = `${pageX - centerWidthTarget}px`;
				target.style.top = `${pageY - centerHeightTarget}px`;
				this.localization = {
					x: pageX - centerWidthTarget,
					y: pageY - centerHeightTarget
				}
			}
		}

		this.element.addEventListener('click', eventClick);
		this.element.addEventListener('mousemove', eventMouseMove);

		this.element.addEventListener("dblclick", ({ target }) => {
			this.element.removeEventListener('mousemove', eventMouseMove);

			target.classList.toggle("radiusSelected");
			const verifyRadiusSelected = target.classList.contains("radiusSelected");

			if(verifyRadiusSelected) {
				let { x, y } = this.localization;
				// let { widthElement, heightElement } = this.dataElement;

				this.createElementExitForRadius({
					x,
					y
				});

				// target.addEventListener('mousemove', ({ offsetY }) => {
				// 	console.log(offsetY);
				// });

			}
		});

		this.exitElement.addEventListener("click", () => {
			window.document.body.removeChild(this.exitElement);

			setTimeout(() => {
				this.element.addEventListener("mousemove", eventMouseMove);
			}, 500)
		}, false);
	}

	createElementExitForRadius({
			x, 
			y 
		}) {
		this.exitElement.style.position = "absolute";
		this.exitElement.style.top = `${y + 10}px`;
		this.exitElement.style.left = `${x - 40}px`;

		window.document.body.appendChild(this.exitElement);
	}
}