import * as  bcrypt from 'bcryptjs';

class PasswordHash {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async correctPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}

export default new PasswordHash();