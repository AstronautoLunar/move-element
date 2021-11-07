const div = new ElementInterface();

div.style([
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

div.render();

div.moveElement({
	action: {
		on: element => {
			element.style.backgroundColor = "#ff0000";
		},
		off: element => {
			element.style.backgroundColor = "#0000ff";
		}
	}
})