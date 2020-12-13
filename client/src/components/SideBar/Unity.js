import React from "react";
import UnityItem from "./UnityItem";

function App() {
	return (
		<div className="sidebar__group">
			<div className="sidebar__caption caption-sm">Unity</div>
			<div className="sidebar__menu">
				<UnityItem
					icon="icon-chat"
					name="Chat"
					counter={10}
					href="/messenger"
				/>
				<UnityItem icon="icon-settings" name="Setting" />
				<UnityItem icon="icon-chart" name="Analytics" />
			</div>
		</div>
	);
}

export default App;
