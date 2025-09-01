import { html, sql } from "#!/common/utils/mark-template.js";
import { renderNavRing } from "#!/components/nav-ring/nav-ring.js";
import { database } from "#!/server/lib/db.js";

const sqlQuery = database.prepare(sql`
	SELECT
		content,
		description,
		STRFTIME('%d.%m.%Y', writedAt ) AS formattedWritedAt,
		heading,
		id as rawId,
		writedAt
	FROM pages WHERE id = ? ORDER BY id;
`);
const sqlMaxQuery = database.prepare(sql`SELECT MAX(id) AS length FROM pages;`);

export const pageRoute = {
	/** @type {RouteMethod} */
	GET({ isAmp, pathname }) {
		const { content, description, formattedWritedAt, heading, rawId, writedAt } =
			sqlQuery.get(Number(pathname.slice(1))) || {};
		const id = Number(rawId);
		const length = Number(sqlMaxQuery.get()?.length);

		const contentTemplate = content
			? html`
					${content}
					<time class="_separated" datetime="${writedAt}">${formattedWritedAt}</time>
				`
			: "";

		/** @type {NavData} */
		const nav = {
			next: id === length ? "" : `/${id + 1}/`,
			prev: id === 1 ? "" : `/${id - 1}/`,
			toc: "/",
		};

		return {
			page: {
				description: `${description}`,
				heading: heading ? `${heading}` : "Страница не найдена",
				nav,
				pathname,
				pageTemplate: contentTemplate + renderNavRing(nav, isAmp),
			},
		};
	},
};
