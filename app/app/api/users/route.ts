import { NextResponse, NextRequest } from "next/server";
import { getConexaoDB } from "@/utils/database-utis";

export const GET = async (request: NextRequest) => {
    let connection = null
	try {
        
        connection = await getConexaoDB();
        const { rows } = await connection.query(`SELECT * FROM aula.users`);
        return NextResponse.json({ message: "Success", data: rows }, { status: 200 });

	} catch(e: any){
		return NextResponse.json({ message: "Error", error: e.message }, { status: 500 });

	} finally {
        if(connection){
            await connection.end();
        }
    }
	
}
export const POST = async (request: NextRequest) => {
    let connection = null
    try {
        const { name, email, password } = await request.json() as { name: string, email: string, password: string };
        
        connection = await getConexaoDB();
        const { rows } = await connection.query(`INSERT INTO aula.users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name, email, password]);
        return NextResponse.json({ message: "Success", data: rows[0] }, { status: 200 });

    } catch(e: any){
        return NextResponse.json({ message: "Error", error: e.message }, { status: 500 });

    } finally {
        if(connection){
            await connection.end();
        }
    }
    
}