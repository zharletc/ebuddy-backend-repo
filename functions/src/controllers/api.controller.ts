import { User } from "../interface";
import { Request, Response } from 'express';
import db from '../config/firebase.config';
import moment from "moment";
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = 'de410b80bd3c1197d7e9b9b08baf0db7e44dd3e1469e3ac05e060169cc46f723';
// export const generateToken = async (req: Request, res: Response) => {
//     const payload = {
//         id: '1',
//         name: 'Admin',
//         role: 'admin',
//         email: 'admin@gmail.com'
//     };

//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).send({ success: true, message: "Token generated successfully", token });
// };


export const updateUserData = async (req: Request, res: Response) => {
    const { id, name, role, email }: User = req.body;
    const userCollection = db.collection('users');
    let userRef
    if (id) {
        userRef = await userCollection.doc(id).set({ name, role, email }, { merge: true });
        const data = (await userCollection.doc(id).get()).data();
        const user = {
            id: id,
            name: data?.name,
            email: data?.email,
            role: data?.role,
            createdAt: moment(data?.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
        }
        res.status(200).send({ success: true, message: "Success to update user", data: user })
    } else {
        userRef = await userCollection.add({ name, role, email, createdAt: new Date() });
        const data = (await userCollection.doc(userRef.id).get()).data();
        const user = {
            id: userRef.id,
            name: data?.name,
            email: data?.email,
            role: data?.role,
            createdAt: moment(data?.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
        }
        res.status(200).send({ success: true, message: "Success to creae user", data: user })
    }


};


export const fetchUserData = async (req: Request, res: Response) => {
    const users: User[] = [];
    const userCollection = db.collection('users');
    const snapshot = await userCollection.get();
    snapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            role: data.role,
            createdAt: moment(data.createdAt.toDate()).format('YYYY-MM-DD HH:mm:ss'),
        });
    });

    res.status(200).send({ success: true, message: "Success to fetch user", data: users })
};