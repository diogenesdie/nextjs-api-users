import { NextResponse, NextRequest } from "next/server";
import { getConexaoDB } from "@/utils/database-utis";

export const PUT = async (request: NextRequest, context: {params: any}) => {
    let connection = null
    try {
        const { name, email, password } = await request.json() as { name: string, email: string, password: string };
        const id = context.params.id
        
        connection = await getConexaoDB();
        const { rows } = await connection.query(`UPDATE aula.users SET name = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *`, [name, email, password, id]);
        return NextResponse.json({ message: "Success", data: rows[0] }, { status: 200 });

    } catch(e: any){
        return NextResponse.json({ message: "Error", error: e.message }, { status: 500 });

    } finally {
        if(connection){
            await connection.end();
        }
    }
    
}
export const DELETE = async (request: NextRequest, context: {params: any}) => {
    let connection = null
    try {
        const id = context.params.id
        
        connection = await getConexaoDB();
        const { rows } = await connection.query(`DELETE FROM aula.users WHERE user_id = $1 RETURNING *`, [id]);
        return NextResponse.json({ message: "Success", data: rows[0] }, { status: 200 });

    } catch(e: any){
        return NextResponse.json({ message: "Error", error: e.message }, { status: 500 });

    } finally {
        if(connection){
            await connection.end();
        }
    }
}