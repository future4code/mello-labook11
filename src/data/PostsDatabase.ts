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
}
