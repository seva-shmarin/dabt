import { html } from "#!/common/utils/mark-template.js";

/** @type {(nav: NavData, isAmp?: boolean) => string} */
export function renderNavRing({ next, prev }, isAmp = false) {
	const prefix = `/dabt${isAmp ? "/amp" : ""}`;

	const prevTemplate = prev ? html`<li><a href="${prefix}${prev}" rel="prev">Назад</a></li>` : "";
	const nextTtmplate = next ? html`<li><a href="${prefix}${next}" rel="next">Вперёд</a></li>` : "";

	return html`
		<nav class="nav-ring">
			<ul>
				${prevTemplate}
				<li><a href="${prefix}/" rel="toc">Главная</a></li>
				${nextTtmplate}
			</ul>
		</nav>
	`;
}
