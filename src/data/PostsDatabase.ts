import { BaseDatabase } from "./BaseDatabase";
import moment, { Moment } from "moment";

export class PostsDatabase extends BaseDatabase {
  private static TABLE_NAME = "Posts";

  public async createPost(
    id: string,
    photo_url: string,
    description: string,
    creation_date: string,
    type: string,
    creator_id: string
  ): Promise<void> {
    await this.getConnection()
      .insert({ id, photo_url, description, creation_date, type, creator_id })
      .into(PostsDatabase.TABLE_NAME);
  }

  public async getTypeFeed(type: string) : Promise<any> {
    const result = await this.getConnection()
    .raw(
      `select name, creator_id, description, photo_url, creation_date, type from
       Users JOIN '${PostsDatabase.TABLE_NAME}' 
       where type = "${type}" order by creation_date ASC`
    )
    return result[0][0];
  }
}
