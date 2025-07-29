
require('dotenv').config();

const bcrypt = require('bcryptjs');
const User = require('../users/User'); 
const sequelize = require('../config/database'); 

/**
 * Creates a default administrator account if one does not already exist.
 *
 * @param {string} defaultEmail - The email for the default admin account.
 * @param {string} defaultPassword - The password for the default admin account.
 * @param {string} defaultName - The name for the default admin account.
 * @param {string} defaultBirthDate - The birth date for the default admin account (e.g., 'YYYY-MM-DD').
 */
async function createDefaultAdmin(defaultEmail, defaultPassword, defaultName, defaultBirthDate) {
    try {
        await sequelize.sync(); 

        const existingAdmin = await User.findOne({ where: { email: defaultEmail } });

        if (existingAdmin) {
            console.log(`Admin user with email '${defaultEmail}' already exists. Skipping creation.`);
            return; 
        }

        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const newAdmin = await User.create({
            name: defaultName,
            email: defaultEmail,
            password: hashedPassword,
            role: 'administrator', 
            birthDate: defaultBirthDate
        });

        console.log(`Default administrator account created successfully: ID ${newAdmin.id}, Email: ${newAdmin.email}`);
    } catch (error) {
        console.error('Error creating default administrator account:', error);
       
    }
}

module.exports = createDefaultAdmin;
