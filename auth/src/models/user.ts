import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

//INTERFACE THAT DESCRIBES the properties
//that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties 
// tha a User Document has
interface UserDoc extends mongoose.Document{
  email:string;
  password: string;
}



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.build = (attrs: UserAttrs) =>{
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user= User.build({
  email: 'test@test.com',
  password: 'password'
  
});

user.email
user.password

export { User };
