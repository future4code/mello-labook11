import { BaseDatabase } from "./BaseDatabase";
import { format } from "path";

export class UsersRelationsDatabase extends BaseDatabase {
  private static TABLE_NAME = "UsersRelations";

  public async befriendUser(
    userId: string,
    userToBefriend: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        user_id: userId,
        friend_id: userToBefriend,
      })
      .insert({
        user_id: userToBefriend,
        friend_id: userId,
      })
      .into(UsersRelationsDatabase.TABLE_NAME);
  }

  public async getUserRelation(
    userId: string,
    userToBefriend: string
  ): Promise<string> {
    const result = await this.getConnection()
      .select("*")
      .from(UsersRelationsDatabase.TABLE_NAME)
      .where({ user_id: userId, friend_id: userToBefriend });

    return result[0];
  }

  public async removeFriendship(
    userId: string,
    userToUnfriend: string
  ): Promise<void> {
    await this.getConnection()
      .del()
      .where({ user_id: userId, friend_id: userToUnfriend })
      .from(UsersRelationsDatabase.TABLE_NAME);
  }
}
