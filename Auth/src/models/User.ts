import mongoose, { Document, Model } from "mongoose";
import { Password } from "../services/password";

// Interface which describes the User
interface IUser {
  email: string;
  password: string;
}

interface IUserModel extends Model<IUserDoc> {
  build(attrs: IUser): IUserDoc;
}

interface IUserDoc extends Document {
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

export const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = function(attrs: IUser) {
  return new User(attrs);
};
