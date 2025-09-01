import { PROJECT_DESCRIPTION } from "#!/common/constants.js";
import { sql } from "#!/common/utils/mark-template.js";
import { renderToc } from "#!/components/toc/toc.js";
import { database } from "#!/server/lib/db.js";

const sqlQuery = database.prepare(sql`SELECT id, heading FROM pages ORDER BY id;`);

export const mainRoute = {
	/** @type {RouteMethod} */
	GET({ isAmp }) {
		const pages = sqlQuery.all();

		return {
			page: {
				description: PROJECT_DESCRIPTION,
				pageTemplate: renderToc(pages, isAmp),
			},
		};
	},
};
