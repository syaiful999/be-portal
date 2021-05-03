import mutationGenerator from "../../../utils/mutation-generator";
import { pool } from "../../../utils/database-connector";

const newsTag = {
  create_news_tag: async (_parent, { data }) => {
    const query = mutationGenerator("INSERT", "cms_news_tag", data);
    const client = await pool.connect();
    try {
      const isExits = await client.query(
        `SELECT * FROM cms_news_tag where UPPER(tag_name) = ${data.tag_name.upper()}`
      );
      if (isExits) {
        throw new Error("Data is already exist");
      } else {
        const mutationReturn = await client.query(query);
        const [{ id }] = mutationReturn.rows;
        const { rows } = await client.query(
          `select * from cms_news_tag where id = ${id}`
        );
        client.release();
        return rows[0];
      }
    } catch (e) {
      client.release();
      throw new Error(e);
    }
  },
};
export default newsTag;
