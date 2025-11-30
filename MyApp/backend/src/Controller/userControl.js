import client from "../config/db.js";
import moment from "moment-timezone";
import argon, { hash } from "argon2";


export async function Adduser(req,res) {

    try {
        const { username, customer_name, email, phone, password } = req.body;


        const usercheck = await client.query(`select username from public.users where email=$1 or phone=$2`, [email, phone]);

        if (usercheck.rows.length != 0) {
            res.status(201).json({ message: "User Already Exist" });
        }
        else {

            async function hashpassword(password) {
                try {
                    const hash = await argon.hash(password, {
                        type: argon.argon2id,
                        memoryCost: 2 ** 16,
                        timeCost: 5,
                        parallelism: 1,
                    })
                    return hash;
                }
                catch (err) {
                    throw new Error(err.message);
                }
            }

            //const isValid = await argon2.verify(storedHash, inputPassword);  //Verify password

            const hash = await hashpassword(password);

            const query = {
                text: `insert into public.users(username,customer_name,email,phone,password,account_status) values($1,$2,$3,$4,$5,$6)`,
                values: [username, customer_name, email, phone, hash, true]
            };

            await client.query(query);

            res.status(201).json({ message: "User added successfully" });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message })
    }
    
}



export async function RemoveUser(req,res) {
    try{
    const { id } = req.query;

    if (isNaN(parseInt(id))) {
        return res.status(400).json({ message: "Invalid userid" });
    }

    const checkuser = await client.query(`select name from public.employees where id=${id}`)

    if (checkuser.rows.length === 0) {
        return res.status(404).json({ message: "Data not found!" });
    }
    else {
        await client.query(`delete from public.employees where id=${id}`);

        return res.status(201).json({ message: "User Removed" });
    }
    }
    catch(err){
        throw new Error(err.message);
    }
    
}

export async function SearchUser(req,res) {

    
    try{
        const { id } = req.query;
    
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid User Id" });
        }
    
        const result = await client.query(`select name from public.employees where id=${id}`)
    
        if (result.rows.length === 0) {
            res.status(404).json({ message: "No data found" });
        }
        else {
            res.status(200).json({ message: "Success", Data: result.rows[0] })
        }
    }
    catch(err){
        throw new Error(err.message);
    }
}


export async function AccountBlock(req,res) {

    try {
        const { userid } = req.body;

        const chekuser = await client.query('select count(*) from public.users where userid=$1 and account_status=true', [userid]);

        if (parseInt(chekuser.rows[0].count) === 0) {
            return res.status(404).json({ message: "No Account Found" });
        }

        await client.query('update public.users set account_status=false where userid=$1', [userid]);
        return res.status(201).json({ message: "Account Blocked Successfully" });

    }
    catch (err) {
        console.log(err.message);
        throw new Error(err.message);
    }
    
}


export async function AccountUnblock(req,res) {
   
    try {
        const { userid } = req.body;

        const checkuser = await client.query('select count(*) from public.users where userid=$1 and account_status=false', [userid]);

        if (checkuser.rows[0].count === 0) {
            return res.status(404).json({ message: "No Account Found" });
        }

        await client.query('update public.users set account_status=true where userid=$1', [userid]);
        return res.status(201).json({ message: "Account Unblocked Successfully" });
    }
    catch (err) {
        throw new Error(err.message);
    }
    
}