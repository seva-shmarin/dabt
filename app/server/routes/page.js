import { html, sql } from "#!/common/utils/mark-template.js";
import { renderNav } from "#!/components/nav/nav.js";
import { database } from "#!/server/lib/db.js";

const sqlQuery = database.prepare(sql`
	SELECT
		content,
		description,
		STRFTIME('%d.%m.%Y', writedAt ) AS formattedWritedAt,
		heading,
		writedAt
	FROM pages WHERE id = ? ORDER BY id;
`);

export const pageRoute = {
	/** @type {RouteMethod} */
	GET({ isAmp, pathname }) {
		const { content, description, formattedWritedAt, heading, writedAt } =
			sqlQuery.get(Number(pathname.slice(1))) || {};

		const contentTemplate = content
			? html`
					${content}
					<time class="_separated" datetime="${writedAt}">${formattedWritedAt}</time>
				`
			: "";

		return {
			page: {
				description: `${description}`,
				heading: heading ? `${heading}` : "Страница не найдена",
				pathname,
				pageTemplate: contentTemplate + renderNav(isAmp),
			},
		};
	},
};
