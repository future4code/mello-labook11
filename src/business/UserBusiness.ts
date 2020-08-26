import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {

    public async signUp(name: string, email: string, password: string): Promise<string> {

        if (!name || !email || !password) {
            throw new Error('Insira todas as informações necessárias para o cadastro');
        }

        if (password.length < 6) {
            throw new Error('A senha deve conter no mínimo seis caracteres');
        }

        const idGenerator = new IdGenerator();//colocar na business
        const id = idGenerator.generateId();

        const hashManager = new HashManager(); //colocar na business
        const hashPassword = await hashManager.hash(password);

        const userDataBase = new UserDatabase(); // colocar na business
        await userDataBase.registerUser(
            id,
            name,
            email,
            hashPassword
        );

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({ id });

        return token;
    }

    public async login(email: string, password: string): Promise<string> {

        const userDataBase = new UserDatabase();//dependencia
        const user = await userDataBase.getUserByEmail(email);

        const hashManager = new HashManager();//dependencia
        const isPasswordCorrect = await hashManager.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error('Usuário ou senha errados');
        }//regra de negocio

        const authenticator = new Authenticator();//dependencia
        const token = authenticator.generateToken({
            id: user.id
        });

        return token;
    }

    public async getUserProfile(token: string): Promise<any> {

        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);

        const userDataBase = new UserDatabase();//dependencia
        const user = await userDataBase.getUserById(authenticationData.id);

        // const recipeDatabase = new RecipeDatabase();
        // const userRecipes =  await recipeDatabase.getRecipeByUserId(user.getId());
        
        // user.setRecipes(userRecipes);

        return user;

    }

}