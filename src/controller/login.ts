import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const userBusiness = new UserBusiness();
		const token = await userBusiness.login(email, password);

		res.status(200).send({
			message: "Usuário logado com sucesso",
			token,
		});
	} catch (error) {
		res.status(400).send({
			message: error.sqlMessage || error.message,
		});
	}
	await BaseDatabase.destroyConnection();
};
