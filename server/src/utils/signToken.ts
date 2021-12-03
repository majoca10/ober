import jwt from 'jsonwebtoken';

export default ({ email, isDriver }:{email:string, isDriver:boolean}) => {
  return jwt.sign({
    email,
    isDriver,
  },
  process.env.JWT_SECRET_KEY || '1q2w3e4r5t6y',
  {
    expiresIn: '1d',
  });
};
