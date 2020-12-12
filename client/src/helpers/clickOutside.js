import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, callback) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				callback(false);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideClick(props) {
	const wrapperRef = useRef(null);
	const { children, callback, classN } = props;
	useOutsideAlerter(wrapperRef, callback);

	return (
		<div className={classN} ref={wrapperRef}>
			{children}
		</div>
	);
}

export default OutsideClick;
