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

		this._element = element;
		this._elementFather = elementFather;
	}

	get element() {
		return this._element;
	}

	get elementFather() {
		return this._elementFather;
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
		this.element.addEventListener('click', ({ target }) => {
			target.classList.toggle("selected");

			const verifySelectedTarget = target.classList.contains("selected");

			if(verifySelectedTarget) {
				action.on(this.element);
			} else {
				action.off(this.element);
			}
		})

		this.element.addEventListener('mousemove', ({ 
			target, 
			pageX, 
			pageY 
		}) => {
			const verifySelectedTarget = target.classList.contains("selected");
			const centerWidthTarget = Number(target.style.width.split("px")[0]) / 2;
	
			if(verifySelectedTarget) {
				target.style.position = "absolute";
				target.style.left = `${pageX - centerWidthTarget}px`;
				target.style.top = `${pageY - centerWidthTarget}px`;
			}
		})
	}
}