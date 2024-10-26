import auth from '@react-native-firebase/auth';



export const loginWithPassword = async (email: string, password: string) => {
  const {user} = await auth().signInWithEmailAndPassword(
    email,
    password,
  );
  const token = await user.getIdToken()

  return token
};

export const signUpWithPassword = async (email: string, password: string) => {
  const { user} = await auth().createUserWithEmailAndPassword(email, password);
  const token = await user.getIdToken()

  return token
};
export const refreshAuthToken = () => {
  return auth().currentUser?.getIdToken(true)
}
// export const loginWithToken = (token: TokenType) => {
//   const t = await auth().
// }