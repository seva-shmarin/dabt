import { html } from "#!/common/utils/mark-template.js";

/** @type {(isAmp?: boolean) => string} */
export function renderNav(isAmp = false) {
	return html`
		<nav>
			<a href="/dabt${isAmp ? "/amp" : ""}/" aria-label="Содержание"></a>
		</nav>
	`;
}
