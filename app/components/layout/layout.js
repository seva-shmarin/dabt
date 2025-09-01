import { PROJECT_TITLE } from "#!/common/constants.js";
import { YANDEX_METRIKA_TEMPLATE } from "#!/common/lib/yandex-metrika.js";
import { html } from "#!/common/utils/mark-template.js";

/** @type {(data: LayoutData) => string} */
export function renderLayout({ heading, isAmp, isDev, pageTemplate }) {
	return html`
		<body>
      ${isAmp || isDev ? "" : YANDEX_METRIKA_TEMPLATE}

			<main>
				<address>
					<a href="https://seva-shmarin.github.io/">Сева Шмарин</a>
				</address>
				<h1>${heading || PROJECT_TITLE}</h1>
				${pageTemplate}
			</main>
		</body>
	`;
}
