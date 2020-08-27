import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { PostsDatabase } from "../data/PostsDatabase";
import moment from "moment";

export class PostsBusiness {
  public async createPost(
    photo_url: string,
    description: string,
    creationDate: string,
    type: string,
    creator_id: string
  ): Promise<void> {
    if (!photo_url || !description || !creationDate || !type || creator_id) {
      throw new Error("Confira os dados do post!");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const userDatabase = new UserDatabase();
    const user = userDatabase.getUserById(id);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const date = moment(creationDate);

    const creation_date = date.format("YYYY-MM-DD");

    const postsDatabase = new PostsDatabase();

    // Validação para data?

    await postsDatabase.createPost(
      id,
      photo_url,
      description,
      creation_date,
      type,
      creator_id
    );
  }
}
