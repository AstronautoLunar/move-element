const div1 = new ElementInterface();
const div2 = new ElementInterface();

div1.style([
	{
		property: "width",
		value: "100px",
	},
	{
		property: "height",
		value: "100px"
	},
	{
		property: "backgroundColor",
		value: "#0000ff"
	},
	{
		property: "transition",
		value: "background-color 200ms"
	}
])

div2.style([
	{
		property: "width",
		value: "100px",
	},
	{
		property: "height",
		value: "200px"
	},
	{
		property: "backgroundColor",
		value: "#00ff00"
	},
	{
		property: "transition",
		value: "background-color 200ms"
	}
])

div1.render();
div2.render();

div1.moveElement({
	action: {
		on: element => {
			element.style.backgroundColor = "#ff0000";
		},
		off: element => {
			element.style.backgroundColor = "#0000ff";
		}
	}
});

div2.moveElement({
	action: {
		on: element => {
			element.style.backgroundColor = "#ff0000";
		},
		off: element => {
			element.style.backgroundColor = "#00ff00";
		}
	}
});