import { PROJECT_DESCRIPTION } from "#!/common/constants.js";
import { sql } from "#!/common/utils/mark-template.js";
import { renderToc } from "#!/components/toc/toc.js";
import { database } from "#!/server/lib/db.js";

const sqlQuery = database.prepare(sql`SELECT id, heading FROM pages ORDER BY id;`);
const sqlMaxQuery = database.prepare(sql`SELECT MAX(id) AS length FROM pages;`);

export const mainRoute = {
	/** @type {RouteMethod} */
	GET({ isAmp }) {
		const pages = sqlQuery.all();
		const length = sqlMaxQuery.get()?.length;

		return {
			page: {
				description: PROJECT_DESCRIPTION,
				nav: {
					next: "/1/",
					prev: `/${length}/`,
				},
				pageTemplate: renderToc(pages, isAmp),
			},
		};
	},
};
