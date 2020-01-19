import { Document } from 'mongoose';
import { Account } from '../types';
declare const createAccount: (account: Account) => Promise<Document>;
export default createAccount;
