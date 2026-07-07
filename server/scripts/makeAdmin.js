// Run this AFTER you've registered your own account through /api/auth/register
// Usage: node scripts/makeAdmin.js your-email@example.com

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const email = process.argv[2];

if (!email) {
  console.log('Usage: node scripts/makeAdmin.js your-email@example.com');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );

    if (!user) {
      console.log(`No user found with email: ${email}`);
    } else {
      console.log(`${user.name} (${user.email}) is now an admin.`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();