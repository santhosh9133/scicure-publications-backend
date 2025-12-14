const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // mandatory fields
    journalId: { type: String, unique: true, sparse: true },
    userName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    mobile: { type: String },
    role: { type: String, default: "journal", enum: ["admin", "journal"] },

    // journal specific fields
    journalImage: { type: String, default: "" },
    journalName: { type: String, default: "" },
    journalTitle: { type: String, default: "" },
    journalISSN: { type: String, default: "" },
    journalCategory: {
      type: String,
      default: "Medical",
      enum: ["Science", "Medical", "Engineering, Other"],
    },
    journalDescription: { type: String, default: "" },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Auto-generate journalId before saving
userSchema.pre("save", async function (next) {
  // Only generate if journalId not already set (important for updates)
  if (this.journalId) return next();

  try {
    const lastJournal = await this.constructor.findOne().sort({ _id: -1 });

    let newNumber = 1;

    if (lastJournal && lastJournal.journalId) {
      const lastNumber = parseInt(lastJournal.journalId.replace("JRN", ""));
      newNumber = lastNumber + 1;
    }

    // Format: JRN0001
    this.journalId = "JRN" + newNumber.toString().padStart(4, "0");

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
