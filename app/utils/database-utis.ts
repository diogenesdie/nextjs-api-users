import { config } from 'dotenv';
config();
import { Client } from 'pg';

/**
 * Conecta ao banco de dados e retorna a conexão ativa
 */
export const getConexaoDB = (): Promise<Client> => {
    return new Promise(async (resolve, reject) => {

        let conexao = new Client({
            user: process.env.DATABASE_USER,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            port: Number(process.env.DATABASE_PORT)
        })

        conexao.connect().then(() => {
            conexao.query(`set lc_numeric = 'pt_BR'`).then(() => {
                resolve(conexao)
            }).catch((er: any) => {
                console.log('Não foi possível alterar local da conexão')
                resolve(conexao)
            })

        }).catch((err: any) => {
            reject(err)
        });
    });
};
