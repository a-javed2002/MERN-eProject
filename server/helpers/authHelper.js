import bcrypt from 'bcrypt';
import colors from 'colors';

export const hashPassword = async (password) => {
    try {
        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltrounds);
        return hashedPassword;
    } catch (error) {
        console.log(`Error In AuthHelper hashPassword ${error}`.bgRed.white);
    }
}

export const comparePassword = async (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
} 