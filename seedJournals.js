const mongoose = require("mongoose");
const User = require("./models/user.model");
require("dotenv").config();

const seedJournals = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const journalsData = [
      {
        journalId: "jamcrr",
        journalTitle:
          "Journal of Advanced Medical & Clinical Research and Reviews",
        journalName: "JAMCRR",
        journalDescription:
          "Leading research in advanced medical and clinical studies",
        journalImage:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
        email: "jamcrr@scicure.com",
        password: "password123",
        role: "journal",
        userName: "JAMCRR Editor",
        mobile: "1234567890",
      },
      {
        journalId: "jgccr",
        journalTitle:
          "Journal of Global Clinical Case Reports - Reports & Studies",
        journalName: "JGCCR",
        journalDescription:
          "Comprehensive clinical case reports and studies from around the world",
        journalImage:
          "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=300&fit=crop",
        email: "jgccr@scicure.com",
        password: "password123",
        role: "journal",
        userName: "JGCCR Editor",
        mobile: "1234567891",
      },
      {
        journalId: "scrt",
        journalTitle: "Science in Clinical Trials",
        journalName: "SCRT",
        journalDescription:
          "Advancing the science and methodology of clinical trials",
        journalImage:
          "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
        email: "scrt@scicure.com",
        password: "password123",
        role: "journal",
        userName: "SCRT Editor",
        mobile: "1234567892",
      },
      {
        journalId: "jgfns",
        journalTitle: "Journal of Global Food and Nutritional Sciences",
        journalName: "JGFNS",
        journalDescription:
          "Research in food science, nutrition, and dietary health",
        journalImage:
          "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
        email: "jgfns@scicure.com",
        password: "password123",
        role: "journal",
        userName: "JGFNS Editor",
        mobile: "1234567893",
      },
    ];

    // Delete existing journals
    await User.deleteMany({ role: "journal" });
    console.log("🗑️  Existing journals deleted");

    // Create new journals
    for (const data of journalsData) {
      const user = new User(data);
      await user.save();
      console.log(`✅ Created journal: ${data.journalName}`);
    }

    console.log("🎉 Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding journals:", error);
    process.exit(1);
  }
};

seedJournals();
