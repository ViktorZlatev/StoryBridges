/**
 * Run:  node scripts/hashPassword.js <your-password>
 * Copy the printed hash into server/.env as ADMIN_PASSWORD_HASH
 */
import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/hashPassword.js <password>')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 12)
console.log('\nADMIN_PASSWORD_HASH=' + hash + '\n')
